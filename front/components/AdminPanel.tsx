import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Project, Experience, ArchitectProfile, ProjectImage, Education, Course, Skill, Interest } from '../types';
import { X, Plus, Trash2, Edit2, Save, Upload, LogOut, LayoutDashboard, Briefcase, User, GraduationCap, Award, Zap, Heart, AlertTriangle, CheckCircle } from 'lucide-react';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1').replace(/\/+$/, '');

// --- SUB-COMPONENT: CONFIRMATION MODAL ---
const ConfirmationModal: React.FC<{
  isOpen: boolean;
  message: string;
  type: 'save' | 'delete';
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
}> = ({ isOpen, message, type, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg shadow-2xl max-w-sm w-full transform transition-all scale-100">
        <div className="flex flex-col items-center text-center">
          <div className={`p-4 rounded-full mb-4 ${type === 'delete' ? 'bg-red-500/20 text-red-500' : 'bg-arch-accent/20 text-arch-accent'}`}>
            {type === 'delete' ? <AlertTriangle size={32} /> : <CheckCircle size={32} />}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Confirmación</h3>
          <p className="text-slate-400 mb-6">{message}</p>
          
          <div className="flex gap-3 w-full">
            <button 
              onClick={onCancel}
              className="flex-1 py-2 px-4 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button 
              onClick={() => void onConfirm()}
              className={`flex-1 py-2 px-4 rounded text-black font-bold transition-colors ${type === 'delete' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-arch-accent hover:bg-yellow-600'}`}
            >
              {type === 'delete' ? 'Eliminar' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationToast: React.FC<{
  notification: { type: 'success' | 'error'; message: string } | null;
}> = ({ notification }) => {
  if (!notification) return null;

  return (
    <div className={`fixed top-6 right-6 z-[70] px-4 py-3 rounded-lg border shadow-xl flex items-center gap-2 ${notification.type === 'success' ? 'bg-emerald-950/90 border-emerald-700 text-emerald-200' : 'bg-red-950/90 border-red-700 text-red-200'}`}>
      {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
      <span className="text-sm font-medium">{notification.message}</span>
    </div>
  );
};

// --- SUB-COMPONENT: PROFILE EDITOR ---
const ProfileEditor: React.FC<{ 
  profile: ArchitectProfile; 
  updateProfile: (p: ArchitectProfile) => Promise<void>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, cb: (url: string) => void) => Promise<void>;
  requestConfirmation: (msg: string, type: 'save' | 'delete', action: () => Promise<void> | void, successMessage?: string, errorMessage?: string) => void;
}> = ({ profile, updateProfile, handleImageUpload, requestConfirmation }) => {
  const [localProfile, setLocalProfile] = useState<ArchitectProfile>(profile);

  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestConfirmation(
      '¿Estás seguro de guardar los cambios en tu perfil?',
      'save',
      () => updateProfile(localProfile),
      'Perfil actualizado correctamente.',
      'No se pudo actualizar el perfil.'
    );
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg animate-fade-in max-w-3xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-6">Editar Perfil</h3>
      <form onSubmit={handleProfileSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h4 className="text-arch-accent text-sm font-bold uppercase border-b border-slate-700 pb-2">Información Básica</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Nombre Completo</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" value={localProfile.name || ''} onChange={e => setLocalProfile({...localProfile, name: e.target.value})} />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Título Profesional</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" value={localProfile.title || ''} onChange={e => setLocalProfile({...localProfile, title: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Texto del Logo (Navbar)</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" 
                placeholder="ARQUINORI"
                value={localProfile.logoName || ''} 
                onChange={e => setLocalProfile({...localProfile, logoName: e.target.value})} 
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Subtítulo Hero (Arriba del nombre)</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" 
                placeholder="Portafolio 2025"
                value={localProfile.heroSubtitle || ''} 
                onChange={e => setLocalProfile({...localProfile, heroSubtitle: e.target.value})} 
              />
            </div>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Texto Hero Línea 1 (Grande)</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" 
                placeholder="ERNESTO"
                value={localProfile.heroTitlePrimary || ''} 
                onChange={e => setLocalProfile({...localProfile, heroTitlePrimary: e.target.value})} 
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Texto Hero Línea 2 (Grande)</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" 
                placeholder="AKINORI"
                value={localProfile.heroTitleSecondary || ''} 
                onChange={e => setLocalProfile({...localProfile, heroTitleSecondary: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-xs mb-1 block">Sobre Mí</label>
            <textarea className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white h-24" value={localProfile.about || ''} onChange={e => setLocalProfile({...localProfile, about: e.target.value})} />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-arch-accent text-sm font-bold uppercase border-b border-slate-700 pb-2">Contacto</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Email</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" value={localProfile.email || ''} onChange={e => setLocalProfile({...localProfile, email: e.target.value})} />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Teléfono</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" value={localProfile.phone || ''} onChange={e => setLocalProfile({...localProfile, phone: e.target.value})} />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Dirección / Ciudad</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" value={localProfile.address || ''} onChange={e => setLocalProfile({...localProfile, address: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="space-y-4">
          <h4 className="text-arch-accent text-sm font-bold uppercase border-b border-slate-700 pb-2">Redes Sociales</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Instagram URL</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" value={localProfile.socials?.instagram || ''} onChange={e => setLocalProfile({...localProfile, socials: {...localProfile.socials, instagram: e.target.value}})} />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">LinkedIn URL</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" value={localProfile.socials?.linkedin || ''} onChange={e => setLocalProfile({...localProfile, socials: {...localProfile.socials, linkedin: e.target.value}})} />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Behance URL</label>
              <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" value={localProfile.socials?.behance || ''} onChange={e => setLocalProfile({...localProfile, socials: {...localProfile.socials, behance: e.target.value}})} />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h4 className="text-arch-accent text-sm font-bold uppercase border-b border-slate-700 pb-2">Imágenes de Perfil</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Portrait */}
            <div>
              <label className="text-slate-400 text-xs mb-2 block">Foto Principal (Retrato)</label>
              <div className="flex items-center gap-4">
                <img src={localProfile.portraitUrl || '/placeholder.png'} className="w-20 h-24 object-cover rounded bg-slate-700 border border-slate-600" />
                <label className="cursor-pointer bg-slate-700 px-3 py-1.5 rounded text-xs text-white hover:bg-slate-600 transition-colors">
                  Subir Foto
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setLocalProfile({...localProfile, portraitUrl: url}))} />
                </label>
              </div>
            </div>
            {/* Formal */}
            <div>
              <label className="text-slate-400 text-xs mb-2 block">Foto Formal (Pequeña)</label>
              <div className="flex items-center gap-4">
                <img src={localProfile.formalUrl || '/placeholder.png'} className="w-20 h-24 object-cover rounded bg-slate-700 border border-slate-600" />
                <label className="cursor-pointer bg-slate-700 px-3 py-1.5 rounded text-xs text-white hover:bg-slate-600 transition-colors">
                  Subir Foto
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setLocalProfile({...localProfile, formalUrl: url}))} />
                </label>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full py-3 bg-arch-accent text-black font-bold rounded hover:bg-yellow-600 mt-6 shadow-lg shadow-yellow-900/20">
          Guardar Cambios del Perfil
        </button>
      </form>
    </div>
  );
};

const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { 
    projects, addProject, updateProject, deleteProject,
    experience, addExperience, updateExperience, deleteExperience,
    education, addEducation, updateEducation, deleteEducation,
    courses, addCourse, updateCourse, deleteCourse,
    skills, addSkill, updateSkill, deleteSkill,
    interests, addInterest, updateInterest, deleteInterest,
    profile, updateProfile, logout
  } = useData();

  const [activeTab, setActiveTab] = useState<'projects' | 'experience' | 'education' | 'courses' | 'skills' | 'interests' | 'profile'>('projects');
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingInterest, setEditingInterest] = useState<Interest | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
  };

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  // --- CONFIRMATION STATE ---
  const [confirmation, setConfirmation] = useState<{
    isOpen: boolean;
    message: string;
    type: 'save' | 'delete';
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    message: '',
    type: 'save',
    onConfirm: async () => {}
  });

  const requestConfirmation = (
    message: string,
    type: 'save' | 'delete',
    action: () => Promise<void> | void,
    successMessage = 'Acción completada correctamente.',
    errorMessage = 'No se pudo completar la acción.'
  ) => {
    setConfirmation({
      isOpen: true,
      message,
      type,
      onConfirm: async () => {
        try {
          await Promise.resolve(action());
          showNotification('success', successMessage);
        } catch (error) {
          console.error(error);
          showNotification('error', errorMessage);
        } finally {
          setConfirmation(prev => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  // --- HANDLERS FOR IMAGE UPLOAD ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      showNotification('error', 'Necesitas iniciar sesión como admin para subir imágenes.');
      e.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error al subir imagen: ${response.status}`);
      }

      const payload = await response.json() as { url?: string };
      if (!payload.url) {
        throw new Error('La API no devolvió URL de imagen.');
      }

      callback(payload.url);
      showNotification('success', 'Imagen subida correctamente. Recuerda guardar el perfil.');
    } catch (error) {
      console.error(error);
      showNotification('error', 'No se pudo subir la imagen. Revisa sesión admin, backend y Cloudinary.');
    } finally {
      e.target.value = '';
    }
  };

  // --- RENDERERS ---

  const renderProjectForm = () => {
    const isNew = !editingProject?.id;
    const formData = editingProject || {
      id: '',
      title: '',
      category: '',
      year: new Date().getFullYear().toString(),
      location: '',
      description: '',
      tags: [],
      images: []
    } as Project;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      requestConfirmation(
        isNew ? '¿Crear nuevo proyecto?' : '¿Guardar cambios del proyecto?',
        'save',
        () => {
          if (isNew) {
            addProject({ ...formData, id: Date.now().toString() });
          } else {
            updateProject(formData);
          }
          setEditingProject(null);
        }
      );
    };

    return (
      <div className="bg-slate-800 p-6 rounded-lg animate-fade-in">
        <h3 className="text-xl font-bold text-white mb-4">{isNew ? 'Nuevo Proyecto' : 'Editar Proyecto'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              className="bg-slate-900 border border-slate-700 p-2 rounded text-white" 
              placeholder="Título" 
              value={formData.title || ''} 
              onChange={e => setEditingProject({...formData, title: e.target.value})} 
              required
            />
            <input 
              className="bg-slate-900 border border-slate-700 p-2 rounded text-white" 
              placeholder="Categoría (ej. Residencial)" 
              value={formData.category || ''} 
              onChange={e => setEditingProject({...formData, category: e.target.value})} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <input 
              className="bg-slate-900 border border-slate-700 p-2 rounded text-white" 
              placeholder="Año" 
              value={formData.year || ''} 
              onChange={e => setEditingProject({...formData, year: e.target.value})} 
            />
            <input 
              className="bg-slate-900 border border-slate-700 p-2 rounded text-white" 
              placeholder="Ubicación" 
              value={formData.location || ''} 
              onChange={e => setEditingProject({...formData, location: e.target.value})} 
            />
          </div>
          <textarea 
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white h-24" 
            placeholder="Descripción" 
            value={formData.description || ''} 
            onChange={e => setEditingProject({...formData, description: e.target.value})} 
          />
          
          {/* Tags */}
          <div>
            <label className="text-slate-400 text-sm">Etiquetas (separadas por coma)</label>
            <input 
              className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" 
              placeholder="Sostenible, Concreto, Minimalista..." 
              value={formData.tags ? formData.tags.join(', ') : ''} 
              onChange={e => setEditingProject({...formData, tags: e.target.value.split(',').map(t => t.trim())})} 
            />
          </div>

          {/* Image Manager */}
          <div className="space-y-2">
            <label className="text-slate-400 text-sm">Imágenes</label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {(formData.images || []).map((img, idx) => (
                <div key={idx} className="relative group aspect-square bg-slate-900 rounded overflow-hidden">
                  <img src={img.url} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setEditingProject({...formData, images: formData.images.filter((_, i) => i !== idx)})}
                    className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <label className="cursor-pointer border-2 border-dashed border-slate-600 rounded flex flex-col items-center justify-center hover:border-arch-accent transition-colors min-h-[100px]">
                <Upload size={24} className="text-slate-500 mb-1" />
                <span className="text-xs text-slate-500">Subir</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => {
                  const newImg: ProjectImage = { url, type: 'render', caption: 'Nueva imagen' };
                  const currentImages = formData.images || [];
                  setEditingProject({...formData, images: [...currentImages, newImg]});
                })} />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setEditingProject(null)} className="px-4 py-2 text-slate-400 hover:text-white">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-arch-accent text-black font-bold rounded hover:bg-yellow-600 flex items-center gap-2">
              <Save size={18} /> Guardar
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderExperienceForm = () => {
    const isNew = !editingExperience?.id;
    const formData = editingExperience || {
      id: '',
      role: '',
      company: '',
      period: '',
      description: ''
    } as Experience;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      requestConfirmation(
        isNew ? '¿Añadir nueva experiencia?' : '¿Guardar cambios en experiencia?',
        'save',
        () => {
          if (isNew) {
            addExperience({ ...formData, id: Date.now().toString() });
          } else {
            updateExperience(formData);
          }
          setEditingExperience(null);
        }
      );
    };

    return (
      <div className="bg-slate-800 p-6 rounded-lg animate-fade-in max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-white mb-4">{isNew ? 'Nueva Experiencia' : 'Editar Experiencia'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-slate-400 text-sm">Rol / Puesto</label>
            <input 
              className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" 
              value={formData.role || ''} 
              onChange={e => setEditingExperience({...formData, role: e.target.value})} 
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-sm">Empresa</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" 
                value={formData.company || ''} 
                onChange={e => setEditingExperience({...formData, company: e.target.value})} 
                required
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm">Periodo</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" 
                placeholder="ej. 2023 - Presente"
                value={formData.period || ''} 
                onChange={e => setEditingExperience({...formData, period: e.target.value})} 
                required
              />
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-sm">Descripción</label>
            <textarea 
              className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white h-32" 
              value={formData.description || ''} 
              onChange={e => setEditingExperience({...formData, description: e.target.value})} 
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setEditingExperience(null)} className="px-4 py-2 text-slate-400 hover:text-white">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-arch-accent text-black font-bold rounded hover:bg-yellow-600 flex items-center gap-2">
              <Save size={18} /> Guardar
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderEducationForm = () => {
    const isNew = !editingEducation?.id;
    const formData = editingEducation || {
      id: '',
      degree: '',
      institution: '',
      year: ''
    } as Education;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      requestConfirmation(
        isNew ? '¿Añadir nuevo estudio?' : '¿Guardar cambios en estudio?',
        'save',
        () => {
          if (isNew) {
            addEducation({ ...formData, id: Date.now().toString() });
          } else {
            updateEducation(formData);
          }
          setEditingEducation(null);
        }
      );
    };

    return (
      <div className="bg-slate-800 p-6 rounded-lg animate-fade-in max-w-2xl mx-auto mb-8">
        <h4 className="font-bold text-white mb-4 text-lg">{isNew ? 'Añadir Estudio' : 'Editar Estudio'}</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" placeholder="Título / Grado" value={formData.degree || ''} onChange={e => setEditingEducation({...formData, degree: e.target.value})} required />
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" placeholder="Institución" value={formData.institution || ''} onChange={e => setEditingEducation({...formData, institution: e.target.value})} required />
            <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" placeholder="Año (ej. 2020-2025)" value={formData.year || ''} onChange={e => setEditingEducation({...formData, year: e.target.value})} required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setEditingEducation(null)} className="px-4 py-2 text-slate-400 hover:text-white">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-arch-accent text-black font-bold rounded hover:bg-yellow-600 flex items-center gap-2">
              <Save size={18} /> Guardar
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderCourseForm = () => {
    const isNew = !editingCourse?.id;
    const formData = editingCourse || {
      id: '',
      name: '',
      institution: '',
      year: ''
    } as Course;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      requestConfirmation(
        isNew ? '¿Añadir nuevo curso?' : '¿Guardar cambios en curso?',
        'save',
        () => {
           if (isNew) {
            addCourse({ ...formData, id: Date.now().toString() });
          } else {
            updateCourse(formData);
          }
          setEditingCourse(null);
        }
      );
    };

    return (
       <div className="bg-slate-800 p-6 rounded-lg animate-fade-in max-w-2xl mx-auto mb-8">
        <h4 className="font-bold text-white mb-4 text-lg">{isNew ? 'Añadir Curso' : 'Editar Curso'}</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" placeholder="Nombre del Curso" value={formData.name || ''} onChange={e => setEditingCourse({...formData, name: e.target.value})} required />
          <div className="grid grid-cols-2 gap-4">
             <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" placeholder="Institución" value={formData.institution || ''} onChange={e => setEditingCourse({...formData, institution: e.target.value})} required />
             <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" placeholder="Año" value={formData.year || ''} onChange={e => setEditingCourse({...formData, year: e.target.value})} required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setEditingCourse(null)} className="px-4 py-2 text-slate-400 hover:text-white">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-arch-accent text-black font-bold rounded hover:bg-yellow-600 flex items-center gap-2">
              <Save size={18} /> Guardar
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderSkillForm = () => {
    const isNew = !editingSkill?.id;
    const formData = editingSkill || {
      id: '',
      name: '',
      level: 50
    } as Skill;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      requestConfirmation(
        isNew ? '¿Añadir nueva habilidad?' : '¿Guardar cambios en habilidad?',
        'save',
        () => {
          if (isNew) {
            addSkill({ ...formData, id: Date.now().toString() });
          } else {
            updateSkill(formData);
          }
          setEditingSkill(null);
        }
      );
    };

    return (
       <div className="bg-slate-800 p-6 rounded-lg animate-fade-in max-w-lg mx-auto mb-8">
        <h4 className="font-bold text-white mb-4 text-lg">{isNew ? 'Añadir Habilidad' : 'Editar Habilidad'}</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
             <label className="text-slate-400 text-xs mb-1 block">Habilidad / Interés</label>
             <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" placeholder="Ej. Diseño 3D" value={formData.name || ''} onChange={e => setEditingSkill({...formData, name: e.target.value})} required />
          </div>
          <div>
            <label className="text-slate-400 text-xs mb-1 block">Nivel (0-100%)</label>
            <div className="flex items-center gap-4">
               <input 
                type="range" 
                min="0" 
                max="100" 
                value={formData.level} 
                onChange={e => setEditingSkill({...formData, level: parseInt(e.target.value)})}
                className="w-full"
               />
               <span className="text-arch-accent font-bold w-12 text-right">{formData.level}%</span>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setEditingSkill(null)} className="px-4 py-2 text-slate-400 hover:text-white">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-arch-accent text-black font-bold rounded hover:bg-yellow-600 flex items-center gap-2">
              <Save size={18} /> Guardar
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderInterestForm = () => {
    const isNew = !editingInterest?.id;
    const formData = editingInterest || {
      id: '',
      name: '',
      icon: '✨'
    } as Interest;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      requestConfirmation(
        isNew ? '¿Añadir nuevo interés?' : '¿Guardar cambios en interés?',
        'save',
        () => {
          if (isNew) {
            addInterest({ ...formData, id: Date.now().toString() });
          } else {
            updateInterest(formData);
          }
          setEditingInterest(null);
        }
      );
    };

    return (
       <div className="bg-slate-800 p-6 rounded-lg animate-fade-in max-w-lg mx-auto mb-8">
        <h4 className="font-bold text-white mb-4 text-lg">{isNew ? 'Añadir Interés' : 'Editar Interés'}</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
             <label className="text-slate-400 text-xs mb-1 block">Nombre</label>
             <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white" placeholder="Ej. Fotografía" value={formData.name || ''} onChange={e => setEditingInterest({...formData, name: e.target.value})} required />
          </div>
          <div>
             <label className="text-slate-400 text-xs mb-1 block">Emoji / Icono</label>
             <input className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-center text-2xl" placeholder="📷" maxLength={2} value={formData.icon || ''} onChange={e => setEditingInterest({...formData, icon: e.target.value})} required />
             <p className="text-xs text-slate-500 mt-1 text-center">Pega un emoji aquí (Win + . o Cmd + Ctrl + Space)</p>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setEditingInterest(null)} className="px-4 py-2 text-slate-400 hover:text-white">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-arch-accent text-black font-bold rounded hover:bg-yellow-600 flex items-center gap-2">
              <Save size={18} /> Guardar
            </button>
          </div>
        </form>
      </div>
    );
  };


  return (
    <div className="fixed inset-0 z-50 bg-arch-dark flex flex-col md:flex-row animate-fade-in">
      <NotificationToast notification={notification} />
      
      {/* CONFIRMATION MODAL OVERLAY */}
      <ConfirmationModal 
        isOpen={confirmation.isOpen}
        message={confirmation.message}
        type={confirmation.type}
        onConfirm={confirmation.onConfirm}
        onCancel={() => setConfirmation(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
        <h2 className="text-xl font-display font-bold text-white mb-8">Admin Panel</h2>
        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === 'projects' ? 'bg-arch-accent text-black font-bold' : 'text-slate-400 hover:bg-slate-800'}`}>
            <LayoutDashboard size={20} /> Proyectos
          </button>
          <button onClick={() => setActiveTab('experience')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === 'experience' ? 'bg-arch-accent text-black font-bold' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Briefcase size={20} /> Experiencia
          </button>
          <button onClick={() => setActiveTab('education')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === 'education' ? 'bg-arch-accent text-black font-bold' : 'text-slate-400 hover:bg-slate-800'}`}>
            <GraduationCap size={20} /> Formación
          </button>
           <button onClick={() => setActiveTab('courses')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === 'courses' ? 'bg-arch-accent text-black font-bold' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Award size={20} /> Cursos
          </button>
          <button onClick={() => setActiveTab('skills')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === 'skills' ? 'bg-arch-accent text-black font-bold' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Zap size={20} /> Habilidades
          </button>
          <button onClick={() => setActiveTab('interests')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === 'interests' ? 'bg-arch-accent text-black font-bold' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Heart size={20} /> Intereses
          </button>
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === 'profile' ? 'bg-arch-accent text-black font-bold' : 'text-slate-400 hover:bg-slate-800'}`}>
            <User size={20} /> Perfil
          </button>
        </nav>
        <div className="pt-6 border-t border-slate-800">
          <button onClick={() => { logout(); onClose(); }} className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 px-4 py-2">
            <LogOut size={18} /> Cerrar Sesión
          </button>
          <button onClick={onClose} className="w-full flex items-center gap-2 text-slate-500 hover:text-slate-300 px-4 py-2 mt-2">
             <X size={18} /> Salir al Sitio
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-black/50">
        
        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Gestionar Proyectos</h2>
              {!editingProject && (
                <button 
                  onClick={() => setEditingProject({ 
                    id: '', title: '', category: '', year: new Date().getFullYear().toString(), 
                    location: '', description: '', tags: [], images: [] 
                  })} 
                  className="bg-arch-accent text-black px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-yellow-600"
                >
                  <Plus size={18} /> Nuevo Proyecto
                </button>
              )}
            </div>

            {editingProject ? renderProjectForm() : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <div key={project.id} className="bg-slate-800 rounded border border-slate-700 overflow-hidden group">
                    <div className="aspect-video bg-slate-900 relative">
                      <img src={project.images?.[0]?.url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-white mb-1">{project.title}</h4>
                      <p className="text-xs text-slate-400 mb-4">{project.category} | {project.year}</p>
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingProject(project)} className="p-2 bg-slate-700 rounded hover:bg-white hover:text-black transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => requestConfirmation('¿Eliminar este proyecto permanentemente?', 'delete', () => deleteProject(project.id))} 
                          className="p-2 bg-slate-700 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <ProfileEditor 
            profile={profile} 
            updateProfile={updateProfile} 
            handleImageUpload={handleImageUpload}
            requestConfirmation={requestConfirmation}
          />
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Gestionar Experiencia</h2>
              {!editingExperience && (
                <button 
                  onClick={() => setEditingExperience({ 
                    id: '', role: '', company: '', period: '', description: '' 
                  })} 
                  className="bg-arch-accent text-black px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-yellow-600"
                >
                  <Plus size={18} /> Nueva Experiencia
                </button>
              )}
            </div>

             {editingExperience ? renderExperienceForm() : (
                <div className="space-y-4">
                  {experience.map(exp => (
                    <div key={exp.id} className="bg-slate-800 p-6 rounded border border-slate-700 flex justify-between items-start group">
                      <div>
                        <h4 className="font-bold text-white text-lg">{exp.role}</h4>
                        <div className="text-arch-accent text-sm font-mono mb-2">{exp.period}</div>
                        <div className="text-slate-300 font-medium mb-2">{exp.company}</div>
                        <p className="text-slate-500 text-sm max-w-2xl">{exp.description}</p>
                      </div>
                      <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => setEditingExperience(exp)} className="p-2 bg-slate-700 rounded hover:bg-white hover:text-black transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => requestConfirmation('¿Eliminar esta experiencia profesional?', 'delete', () => deleteExperience(exp.id))} 
                          className="p-2 bg-slate-700 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {experience.length === 0 && <div className="text-slate-500 text-center py-10">No hay experiencia registrada.</div>}
                </div>
             )}
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'education' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Gestionar Estudios</h2>
              {!editingEducation && (
                <button 
                  onClick={() => setEditingEducation({ id: '', degree: '', institution: '', year: '' })} 
                  className="bg-arch-accent text-black px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-yellow-600"
                >
                  <Plus size={18} /> Nuevo Estudio
                </button>
              )}
            </div>
            
            {editingEducation && renderEducationForm()}

            <div className="grid gap-4">
              {education.map(edu => (
                <div key={edu.id} className="bg-slate-800 p-4 rounded border border-slate-700 flex justify-between items-center group">
                    <div>
                      <h4 className="font-bold text-white text-lg">{edu.degree}</h4>
                      <p className="text-slate-400">{edu.institution} <span className="text-arch-accent ml-2 text-sm font-mono">{edu.year}</span></p>
                    </div>
                    <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingEducation(edu)} className="p-2 bg-slate-700 rounded hover:bg-white hover:text-black transition-colors"><Edit2 size={16}/></button>
                      <button 
                        onClick={() => requestConfirmation('¿Eliminar este registro académico?', 'delete', () => deleteEducation(edu.id))} 
                        className="p-2 bg-slate-700 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                </div>
              ))}
              {education.length === 0 && <p className="text-slate-500 italic text-center py-8">No hay estudios registrados.</p>}
            </div>
          </div>
        )}

        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <div className="max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Gestionar Cursos</h2>
              {!editingCourse && (
                <button 
                  onClick={() => setEditingCourse({ id: '', name: '', institution: '', year: '' })} 
                  className="bg-arch-accent text-black px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-yellow-600"
                >
                  <Plus size={18} /> Nuevo Curso
                </button>
              )}
            </div>

            {editingCourse && renderCourseForm()}

            <div className="grid gap-4">
              {courses.map(course => (
                <div key={course.id} className="bg-slate-800 p-4 rounded border border-slate-700 flex justify-between items-center group">
                    <div>
                      <h4 className="font-bold text-white text-lg">{course.name}</h4>
                      <p className="text-slate-400">{course.institution} <span className="text-arch-accent ml-2 text-sm font-mono">{course.year}</span></p>
                    </div>
                    <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingCourse(course)} className="p-2 bg-slate-700 rounded hover:bg-white hover:text-black transition-colors"><Edit2 size={16}/></button>
                      <button 
                        onClick={() => requestConfirmation('¿Eliminar este curso?', 'delete', () => deleteCourse(course.id))} 
                        className="p-2 bg-slate-700 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                </div>
              ))}
              {courses.length === 0 && <p className="text-slate-500 italic text-center py-8">No hay cursos registrados.</p>}
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Gestionar Habilidades</h2>
              {!editingSkill && (
                <button 
                  onClick={() => setEditingSkill({ id: '', name: '', level: 50 })} 
                  className="bg-arch-accent text-black px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-yellow-600"
                >
                  <Plus size={18} /> Nueva Habilidad
                </button>
              )}
            </div>

            {editingSkill && renderSkillForm()}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map(skill => (
                <div key={skill.id} className="bg-slate-800 p-4 rounded border border-slate-700 flex justify-between items-center group">
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between mb-1">
                         <h4 className="font-bold text-white">{skill.name}</h4>
                         <span className="text-arch-accent font-mono text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-1 bg-slate-700 w-full rounded-full overflow-hidden">
                        <div className="h-full bg-arch-accent" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingSkill(skill)} className="p-2 bg-slate-700 rounded hover:bg-white hover:text-black transition-colors"><Edit2 size={16}/></button>
                      <button 
                        onClick={() => requestConfirmation('¿Eliminar esta habilidad?', 'delete', () => deleteSkill(skill.id))} 
                        className="p-2 bg-slate-700 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                </div>
              ))}
              {skills.length === 0 && <p className="text-slate-500 italic text-center py-8 col-span-2">No hay habilidades registradas.</p>}
            </div>
          </div>
        )}

        {/* INTERESTS TAB */}
        {activeTab === 'interests' && (
          <div className="max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Gestionar Intereses</h2>
              {!editingInterest && (
                <button 
                  onClick={() => setEditingInterest({ id: '', name: '', icon: '' })} 
                  className="bg-arch-accent text-black px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-yellow-600"
                >
                  <Plus size={18} /> Nuevo Interés
                </button>
              )}
            </div>

            {editingInterest && renderInterestForm()}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {interests.map(interest => (
                <div key={interest.id} className="bg-slate-800 p-4 rounded border border-slate-700 flex flex-col items-center justify-center group relative hover:border-arch-accent/50 transition-colors">
                    <span className="text-4xl mb-2">{interest.icon}</span>
                    <h4 className="font-bold text-white text-center">{interest.name}</h4>
                    <div className="absolute top-2 right-2 flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingInterest(interest)} className="p-1.5 bg-slate-700 rounded hover:bg-white hover:text-black transition-colors"><Edit2 size={14}/></button>
                      <button 
                        onClick={() => requestConfirmation('¿Eliminar este interés?', 'delete', () => deleteInterest(interest.id))} 
                        className="p-1.5 bg-slate-700 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                </div>
              ))}
              {interests.length === 0 && <p className="text-slate-500 italic text-center py-8 col-span-4">No hay intereses registrados.</p>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;