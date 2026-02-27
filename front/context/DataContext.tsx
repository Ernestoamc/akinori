import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Project, Experience, Education, Course, Skill, Interest, ArchitectProfile } from '../types';
import { 
  PROFILE as INITIAL_PROFILE,
  PROJECTS as INITIAL_PROJECTS,
  EXPERIENCE as INITIAL_EXPERIENCE,
  EDUCATION as INITIAL_EDUCATION,
  COURSES as INITIAL_COURSES,
  SKILLS as INITIAL_SKILLS,
  INTERESTS as INITIAL_INTERESTS
} from '../constants';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1').replace(/\/+$/, '');

type ApiEnvelope<T> = {
  ok?: boolean;
  data?: T;
  token?: string;
};

interface DataContextType {
  profile: ArchitectProfile;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  courses: Course[];
  skills: Skill[];
  interests: Interest[];
  isAdmin: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: ArchitectProfile) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addExperience: (exp: Experience) => Promise<void>;
  updateExperience: (exp: Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  addEducation: (edu: Education) => Promise<void>;
  updateEducation: (edu: Education) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  addCourse: (course: Course) => Promise<void>;
  updateCourse: (course: Course) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  addSkill: (skill: Skill) => Promise<void>;
  updateSkill: (skill: Skill) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  addInterest: (interest: Interest) => Promise<void>;
  updateInterest: (interest: Interest) => Promise<void>;
  deleteInterest: (id: string) => Promise<void>;
  resetData: () => void;
  isDemoMode: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialToken = (() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken === 'demo-token-12345') {
      localStorage.removeItem('token');
      return null;
    }
    return savedToken;
  })();

  const [profile, setProfile] = useState<ArchitectProfile>(INITIAL_PROFILE);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [experience, setExperience] = useState<Experience[]>(INITIAL_EXPERIENCE);
  const [education, setEducation] = useState<Education[]>(INITIAL_EDUCATION);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [interests, setInterests] = useState<Interest[]>(INITIAL_INTERESTS);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(initialToken);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Helper for authorized fetches
  const authFetch = useCallback(async <T,>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };
    try {
      const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
      if (!response.ok) {
        if (response.status === 401) {
          setToken(null);
          localStorage.removeItem('token');
          setIsAdmin(false);
        }
        throw new Error(`API Error: ${response.statusText}`);
      }

      const payload = (await response.json()) as ApiEnvelope<T> | T;
      if (typeof payload === 'object' && payload !== null && 'data' in payload) {
        return (payload as ApiEnvelope<T>).data as T;
      }

      return payload as T;
    } catch (error) {
      console.warn(`Request to ${endpoint} failed, falling back to local state handling if possible.`, error);
      throw error; // Re-throw to be handled by specific functions
    }
  }, [token]);

  // Load Initial Data
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const fetchJson = async <T,>(endpoint: string): Promise<T> => {
        const res = await fetch(`${API_URL}${endpoint}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);

        const payload = (await res.json()) as ApiEnvelope<T> | T;
        if (typeof payload === 'object' && payload !== null && 'data' in payload) {
          return (payload as ApiEnvelope<T>).data as T;
        }

        return payload as T;
      };

      // We use allSettled so if 'projects' fails but 'profile' works, we keep what worked.
      const results = await Promise.allSettled([
        fetchJson<ArchitectProfile>('/profile'),
        fetchJson<Project[]>('/projects'),
        fetchJson<Experience[]>('/experience'),
        fetchJson<Education[]>('/education'),
        fetchJson<Course[]>('/courses'),
        fetchJson<Skill[]>('/skills'),
        fetchJson<Interest[]>('/interests'),
      ]);

      const [profRes, projRes, expRes, eduRes, courseRes, skillRes, intRes] = results;
      let hasError = false;

      if (profRes.status === 'fulfilled' && profRes.value) setProfile(profRes.value);
      else { setProfile(INITIAL_PROFILE); hasError = true; }

      if (projRes.status === 'fulfilled' && Array.isArray(projRes.value)) setProjects(projRes.value);
      else { setProjects(INITIAL_PROJECTS); hasError = true; }

      if (expRes.status === 'fulfilled' && Array.isArray(expRes.value)) setExperience(expRes.value);
      else { setExperience(INITIAL_EXPERIENCE); hasError = true; }

      if (eduRes.status === 'fulfilled' && Array.isArray(eduRes.value)) setEducation(eduRes.value);
      else { setEducation(INITIAL_EDUCATION); hasError = true; }

      if (courseRes.status === 'fulfilled' && Array.isArray(courseRes.value)) setCourses(courseRes.value);
      else { setCourses(INITIAL_COURSES); hasError = true; }

      if (skillRes.status === 'fulfilled' && Array.isArray(skillRes.value)) setSkills(skillRes.value);
      else { setSkills(INITIAL_SKILLS); hasError = true; }

      if (intRes.status === 'fulfilled' && Array.isArray(intRes.value)) setInterests(intRes.value);
      else { setInterests(INITIAL_INTERESTS); hasError = true; }

      if (hasError) {
        console.warn("Some API endpoints failed (likely CORS or offline). Using local backup data.");
        setIsDemoMode(true);
      } else {
        setIsDemoMode(false);
      }

    } catch (error) {
      console.error("Critical error in fetchData", error);
      setIsDemoMode(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (token) {
      setIsAdmin(true);
    }
  }, [token]);

  // --- Auth ---
  const login = async (password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        const data = await res.json() as { token?: string };
        if (data.token) {
          setToken(data.token);
          localStorage.setItem('token', data.token);
          setIsAdmin(true);
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error("Login failed (Backend unreachable?)", err);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAdmin(false);
  };

  // --- Wrapper to handle Offline/Demo mode updates ---
  // In a real app with offline-first, we might update local state optimistically. 
  // Here, if API fails, we just log it, but the UI might not reflect changes persistently.

  // --- Profile ---
  const updateProfile = async (newProfile: ArchitectProfile) => {
    try {
      await authFetch('/profile', { method: 'PUT', body: JSON.stringify(newProfile) });
      setProfile(newProfile);
    } catch (e) { 
      console.error(e);
      // Optimistic update for demo purposes even if backend fails
      if(isDemoMode) setProfile(newProfile); 
    }
  };

  // --- Projects ---
  const addProject = async (project: Project) => {
    try {
      const { id, ...data } = project; 
      const newProject = await authFetch('/projects', { method: 'POST', body: JSON.stringify(data) });
      setProjects(prev => [newProject, ...prev]);
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setProjects(prev => [project, ...prev]);
    }
  };

  const updateProject = async (project: Project) => {
    try {
      const updated = await authFetch(`/projects/${project.id}`, { method: 'PUT', body: JSON.stringify(project) });
      setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setProjects(prev => prev.map(p => p.id === project.id ? project : p));
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await authFetch(`/projects/${id}`, { method: 'DELETE' });
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  // --- Experience ---
  const addExperience = async (exp: Experience) => {
    try {
      const { id, ...data } = exp;
      const newExp = await authFetch('/experience', { method: 'POST', body: JSON.stringify(data) });
      setExperience(prev => [newExp, ...prev]);
    } catch (e) { 
       console.error(e);
       if(isDemoMode) setExperience(prev => [exp, ...prev]);
    }
  };

  const updateExperience = async (exp: Experience) => {
    try {
      const updated = await authFetch(`/experience/${exp.id}`, { method: 'PUT', body: JSON.stringify(exp) });
      setExperience(prev => prev.map(e => e.id === updated.id ? updated : e));
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setExperience(prev => prev.map(e => e.id === exp.id ? exp : e));
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      await authFetch(`/experience/${id}`, { method: 'DELETE' });
      setExperience(prev => prev.filter(e => e.id !== id));
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setExperience(prev => prev.filter(e => e.id !== id));
    }
  };

  // --- Education ---
  const addEducation = async (edu: Education) => {
    try {
      const { id, ...data } = edu;
      const newEdu = await authFetch('/education', { method: 'POST', body: JSON.stringify(data) });
      setEducation(prev => [newEdu, ...prev]);
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setEducation(prev => [edu, ...prev]);
    }
  };

  const updateEducation = async (edu: Education) => {
    try {
      const updated = await authFetch(`/education/${edu.id}`, { method: 'PUT', body: JSON.stringify(edu) });
      setEducation(prev => prev.map(e => e.id === updated.id ? updated : e));
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setEducation(prev => prev.map(e => e.id === edu.id ? edu : e));
    }
  };

  const deleteEducation = async (id: string) => {
    try {
      await authFetch(`/education/${id}`, { method: 'DELETE' });
      setEducation(prev => prev.filter(e => e.id !== id));
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setEducation(prev => prev.filter(e => e.id !== id));
    }
  };

  // --- Courses ---
  const addCourse = async (course: Course) => {
    try {
      const { id, ...data } = course;
      const newCourse = await authFetch('/courses', { method: 'POST', body: JSON.stringify(data) });
      setCourses(prev => [newCourse, ...prev]);
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setCourses(prev => [course, ...prev]);
    }
  };

  const updateCourse = async (course: Course) => {
    try {
      const updated = await authFetch(`/courses/${course.id}`, { method: 'PUT', body: JSON.stringify(course) });
      setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setCourses(prev => prev.map(c => c.id === course.id ? course : c));
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await authFetch(`/courses/${id}`, { method: 'DELETE' });
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  // --- Skills ---
  const addSkill = async (skill: Skill) => {
    try {
      const { id, ...data } = skill;
      const newSkill = await authFetch('/skills', { method: 'POST', body: JSON.stringify(data) });
      setSkills(prev => [...prev, newSkill]);
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setSkills(prev => [...prev, skill]);
    }
  };

  const updateSkill = async (skill: Skill) => {
    try {
      const updated = await authFetch(`/skills/${skill.id}`, { method: 'PUT', body: JSON.stringify(skill) });
      setSkills(prev => prev.map(s => s.id === updated.id ? updated : s));
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setSkills(prev => prev.map(s => s.id === skill.id ? skill : s));
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      await authFetch(`/skills/${id}`, { method: 'DELETE' });
      setSkills(prev => prev.filter(s => s.id !== id));
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setSkills(prev => prev.filter(s => s.id !== id));
    }
  };

  // --- Interests ---
  const addInterest = async (interest: Interest) => {
    try {
      const { id, ...data } = interest;
      const newInt = await authFetch('/interests', { method: 'POST', body: JSON.stringify(data) });
      setInterests(prev => [...prev, newInt]);
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setInterests(prev => [...prev, interest]);
    }
  };

  const updateInterest = async (interest: Interest) => {
    try {
      const updated = await authFetch(`/interests/${interest.id}`, { method: 'PUT', body: JSON.stringify(interest) });
      setInterests(prev => prev.map(i => i.id === updated.id ? updated : i));
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setInterests(prev => prev.map(i => i.id === interest.id ? interest : i));
    }
  };

  const deleteInterest = async (id: string) => {
    try {
      await authFetch(`/interests/${id}`, { method: 'DELETE' });
      setInterests(prev => prev.filter(i => i.id !== id));
    } catch (e) { 
      console.error(e);
      if(isDemoMode) setInterests(prev => prev.filter(i => i.id !== id));
    }
  };

  const resetData = () => {
    logout();
    fetchData(); // Reload original data from API
  };

  return (
    <DataContext.Provider value={{
      profile, projects, experience, education, courses, skills, interests, isAdmin, isLoading,
      login, logout, updateProfile, 
      addProject, updateProject, deleteProject,
      addExperience, updateExperience, deleteExperience,
      addEducation, updateEducation, deleteEducation,
      addCourse, updateCourse, deleteCourse,
      addSkill, updateSkill, deleteSkill,
      addInterest, updateInterest, deleteInterest,
      resetData, isDemoMode
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};