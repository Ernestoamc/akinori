import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Plus, Trash2, Edit2, Save, X, LogOut, LayoutDashboard, FolderKanban, GraduationCap, Briefcase, User } from 'lucide-react';
import { Project, Experience, Education, Course, Skill } from '../types';

const AdminPanel: React.FC = () => {
  const { 
    profile, projects, experience, education, courses, skills,
    updateProfile, addProject, updateProject, deleteProject,
    addExperience, updateExperience, deleteExperience,
    addEducation, updateEducation, deleteEducation,
    addCourse, deleteCourse, updateSkills, resetToDefaults
  } = useData();

  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experience' | 'education'>('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // --- Handlers for Project Editor ---
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      if (projects.find(p => p.id === editingProject.id)) {
        updateProject(editingProject);
      } else {
        addProject(editingProject);
      }
      setEditingProject(null);
    }
  };

  const createNewProject = () => {
    const newId = `p${Date.now()}`;
    setEditingProject({
      id: newId,
      title: 'Nuevo Proyecto',
      category: 'Residencial',
      year: new Date().getFullYear().toString(),
      location: 'Ubicación',
      description: 'Descripción del proyecto...',
      tags: [],
      images: [{ url: 'https://images.unsplash.com/photo-1600596542815-2a43847c13d9', type: 'render', caption: 'Vista Principal' }]
    });
  };

  // --- Render Functions ---

  const renderProfileEditor = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6">Editar Perfil</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Nombre Completo</label>
          <input 
            value={profile.name} 
            onChange={e => updateProfile({...profile, name: e.target.value})}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Título Profesional</label>
          <input 
            value={profile.title} 
            onChange={e => updateProfile({...profile, title: e.target.value})}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm text-slate-400">Sobre Mí</label>
          <textarea 
            value={profile.about} 
            onChange={e => updateProfile({...profile, about: e.target.value})}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white h-32"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Email</label>
          <input 
            value={profile.email} 
            onChange={e => updateProfile({...profile, email: e.target.value})}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Teléfono</label>
          <input 
            value={profile.phone} 
            onChange={e => updateProfile({...profile, phone: e.target.value})}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
          />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mt-8 mb-4">Habilidades</h3>
      <div className="space-y-4">
        {skills.map((skill, idx) => (
          <div key={idx} className="flex gap-4 items-center">
            <input 
              value={skill.name}
              onChange={(e) => {
                const newSkills = [...skills];
                newSkills[idx].name = e.target.value;
                updateSkills(newSkills);
              }}
              className="flex-1 bg-slate-800 border border-slate-700 rounded p-2 text-white"
            />
            <input 
              type="number"
              min="0" max="100"
              value={skill.level}
              onChange={(e) => {
                const newSkills = [...skills];
                newSkills[idx].level = parseInt(e.target.value);
                updateSkills(newSkills);
              }}
              className="w-20 bg-slate-800 border border-slate-700 rounded p-2 text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjectEditor = () => {
    if (editingProject) {
      return (
        <div className="bg-slate-800 p-6 rounded-lg animate-fade-in border border-slate-700">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-bold text-white">
               {projects.find(p => p.id === editingProject.id) ? 'Editar Proyecto' : 'Nuevo Proyecto'}
             </h3>
             <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white"><X /></button>
          </div>
          <form onSubmit={handleSaveProject} className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <input 
                 placeholder="Título" 
                 value={editingProject.title} 
                 onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                 className="bg-slate-900 border border-slate-700 rounded p-2 text-white"
                 required
               />
               <input 
                 placeholder="Categoría (Ej: Residencial)" 
                 value={editingProject.category} 
                 onChange={e => setEditingProject({...editingProject, category: e.target.value})}
                 className="bg-slate-900 border border-slate-700 rounded p-2 text-white"
               />
               <input 
                 placeholder="Año" 
                 value={editingProject.year} 
                 onChange={e => setEditingProject({...editingProject, year: e.target.value})}
                 className="bg-slate-900 border border-slate-700 rounded p-2 text-white"
               />
               <input 
                 placeholder="Ubicación" 
                 value={editingProject.location} 
                 onChange={e => setEditingProject({...editingProject, location: e.target.value})}
                 className="bg-slate-900 border border-slate-700 rounded p-2 text-white"
               />
             </div>
             <textarea 
               placeholder="Descripción" 
               value={editingProject.description}
               onChange={e => setEditingProject({...editingProject, description: e.target.value})}
               className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white h-24"
             />
             
             <div>
               <label className="text-sm text-slate-400 mb-2 block">Imágenes (URL)</label>
               {editingProject.images.map((img, idx) => (
                 <div key={idx} className="flex gap-2 mb-2">
                   <input 
                     placeholder="URL de imagen" 
                     value={img.url}
                     onChange={e => {
                        const newImages = [...editingProject.images];
                        newImages[idx].url = e.target.value;
                        setEditingProject({...editingProject, images: newImages});
                     }}
                     className="flex-1 bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm"
                   />
                   <select
                      value={img.type}
                      onChange={e => {
                        const newImages = [...editingProject.images];
                        newImages[idx].type = e.target.value as any;
                        setEditingProject({...editingProject, images: newImages});
                     }}
                     className="bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm"
                   >
                     <option value="render">Render</option>
                     <option value="plan">Plano</option>
                     <option value="detail">Detalle</option>
                   </select>
                   <button 
                     type="button"
                     onClick={() => {
                        const newImages = editingProject.images.filter((_, i) => i !== idx);
                        setEditingProject({...editingProject, images: newImages});
                     }}
                     className="text-red-400 hover:text-red-300 px-2"
                   >
                     <Trash2 size={16} />
                   </button>
                 </div>
               ))}
               <button 
                 type="button"
                 onClick={() => setEditingProject({...editingProject, images: [...editingProject.images, { url: '', type: 'render', caption: '' }]})}
                 className="text-sm text-arch-accent hover:underline flex items-center gap-1 mt-2"
               >
                 <Plus size={14} /> Agregar URL de imagen
               </button>
             </div>

             <button type="submit" className="bg-arch-accent text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 w-full">Guardar Proyecto</button>
          </form>
        </div>
      );
    }

    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Proyectos</h2>
          <button onClick={createNewProject} className="flex items-center gap-2 bg-arch-accent text-black px-4 py-2 rounded font-medium hover:bg-yellow-500">
            <Plus size={18} /> Nuevo
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <div key={p.id} className="bg-slate-800 border border-slate-700 rounded p-4 relative group">
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditingProject(p)} className="p-1 bg-blue-600 rounded text-white"><Edit2 size={14}/></button>
                <button onClick={() => { if(confirm('¿Borrar?')) deleteProject(p.id) }} className="p-1 bg-red-600 rounded text-white"><Trash2 size={14}/></button>
              </div>
              <img src={p.images[0]?.url} alt={p.title} className="w-full h-32 object-cover rounded mb-3 bg-slate-900" />
              <h3 className="font-bold text-white truncate">{p.title}</h3>
              <p className="text-xs text-slate-400">{p.category} | {p.year}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderExperienceEditor = () => (
    <div className="space-y-6 animate-fade-in">
       <h2 className="text-2xl font-bold text-white mb-4">Experiencia</h2>
       {experience.map(exp => (
         <div key={exp.id} className="bg-slate-800 p-4 rounded border border-slate-700 flex gap-4">
            <div className="flex-1 space-y-2">
               <input 
                 value={exp.role} 
                 onChange={(e) => updateExperience({...exp, role: e.target.value})}
                 className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-bold"
                 placeholder="Rol"
               />
               <input 
                 value={exp.company} 
                 onChange={(e) => updateExperience({...exp, company: e.target.value})}
                 className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm"
                 placeholder="Empresa"
               />
               <textarea 
                 value={exp.description} 
                 onChange={(e) => updateExperience({...exp, description: e.target.value})}
                 className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm h-20"
                 placeholder="Descripción"
               />
            </div>
            <button onClick={() => deleteExperience(exp.id)} className="text-red-500 self-start"><Trash2 size={18}/></button>
         </div>
       ))}
       <button 
         onClick={() => addExperience({id: `e${Date.now()}`, role: 'Nuevo Rol', company: 'Empresa', period: '2025', description: 'Descripción...'})}
         className="w-full py-2 border-2 border-dashed border-slate-700 text-slate-400 rounded hover:border-arch-accent hover:text-arch-accent transition-colors"
       >
         + Agregar Experiencia
       </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-arch-dark flex">
      {/* Sidebar */}
      <div className="w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-800 font-bold text-white hidden md:block">PANEL ADMIN</div>
        <div className="flex-1 py-6 space-y-2">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-white/5 transition-colors ${activeTab === 'projects' ? 'text-arch-accent border-r-2 border-arch-accent bg-white/5' : 'text-slate-400'}`}
          >
            <FolderKanban size={20} /> <span className="hidden md:inline">Proyectos</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-white/5 transition-colors ${activeTab === 'profile' ? 'text-arch-accent border-r-2 border-arch-accent bg-white/5' : 'text-slate-400'}`}
          >
            <User size={20} /> <span className="hidden md:inline">Perfil</span>
          </button>
          <button 
            onClick={() => setActiveTab('experience')}
            className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-white/5 transition-colors ${activeTab === 'experience' ? 'text-arch-accent border-r-2 border-arch-accent bg-white/5' : 'text-slate-400'}`}
          >
            <Briefcase size={20} /> <span className="hidden md:inline">Experiencia</span>
          </button>
        </div>
        <div className="p-4 border-t border-slate-800">
           <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white mb-4">
             <LogOut size={16} /> <span className="hidden md:inline">Volver al sitio</span>
           </a>
           <button onClick={resetToDefaults} className="text-xs text-red-500 hover:text-red-400 underline w-full text-left">
             Resetear Fábrica
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-20 md:ml-64 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'projects' && renderProjectEditor()}
          {activeTab === 'profile' && renderProfileEditor()}
          {activeTab === 'experience' && renderExperienceEditor()}
          {activeTab === 'education' && <div className="text-white">Sección de Educación en construcción...</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;