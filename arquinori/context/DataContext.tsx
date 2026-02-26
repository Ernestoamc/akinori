import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Experience, Education, Course, Skill, ArchitectProfile } from '../types';
import { PROJECTS as INITIAL_PROJECTS, EXPERIENCE as INITIAL_EXPERIENCE, EDUCATION as INITIAL_EDUCATION, COURSES as INITIAL_COURSES, SKILLS as INITIAL_SKILLS, PROFILE as INITIAL_PROFILE } from '../constants';

interface DataContextType {
  profile: ArchitectProfile;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  courses: Course[];
  skills: Skill[];
  updateProfile: (profile: ArchitectProfile) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (exp: Experience) => void;
  deleteExperience: (id: string) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (edu: Education) => void;
  deleteEducation: (id: string) => void;
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  updateSkills: (skills: Skill[]) => void;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or constants
  const [profile, setProfile] = useState<ArchitectProfile>(() => {
    const saved = localStorage.getItem('arch_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('arch_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [experience, setExperience] = useState<Experience[]>(() => {
    const saved = localStorage.getItem('arch_experience');
    return saved ? JSON.parse(saved) : INITIAL_EXPERIENCE;
  });

  const [education, setEducation] = useState<Education[]>(() => {
    const saved = localStorage.getItem('arch_education');
    return saved ? JSON.parse(saved) : INITIAL_EDUCATION;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('arch_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('arch_skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  // Persistence Effects
  useEffect(() => localStorage.setItem('arch_profile', JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem('arch_projects', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('arch_experience', JSON.stringify(experience)), [experience]);
  useEffect(() => localStorage.setItem('arch_education', JSON.stringify(education)), [education]);
  useEffect(() => localStorage.setItem('arch_courses', JSON.stringify(courses)), [courses]);
  useEffect(() => localStorage.setItem('arch_skills', JSON.stringify(skills)), [skills]);

  // Actions
  const updateProfile = (p: ArchitectProfile) => setProfile(p);
  
  const addProject = (p: Project) => setProjects(prev => [...prev, p]);
  const updateProject = (p: Project) => setProjects(prev => prev.map(item => item.id === p.id ? p : item));
  const deleteProject = (id: string) => setProjects(prev => prev.filter(item => item.id !== id));

  const addExperience = (e: Experience) => setExperience(prev => [...prev, e]);
  const updateExperience = (e: Experience) => setExperience(prev => prev.map(item => item.id === e.id ? e : item));
  const deleteExperience = (id: string) => setExperience(prev => prev.filter(item => item.id !== id));

  const addEducation = (e: Education) => setEducation(prev => [...prev, e]);
  const updateEducation = (e: Education) => setEducation(prev => prev.map(item => item.id === e.id ? e : item));
  const deleteEducation = (id: string) => setEducation(prev => prev.filter(item => item.id !== id));

  const addCourse = (c: Course) => setCourses(prev => [...prev, c]);
  const deleteCourse = (id: string) => setCourses(prev => prev.filter(item => item.id !== id));

  const updateSkills = (s: Skill[]) => setSkills(s);

  const resetToDefaults = () => {
    if(window.confirm("¿Estás seguro? Esto borrará todos tus cambios.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <DataContext.Provider value={{
      profile, projects, experience, education, courses, skills,
      updateProfile,
      addProject, updateProject, deleteProject,
      addExperience, updateExperience, deleteExperience,
      addEducation, updateEducation, deleteEducation,
      addCourse, deleteCourse,
      updateSkills,
      resetToDefaults
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};