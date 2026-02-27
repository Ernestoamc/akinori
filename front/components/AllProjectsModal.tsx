import React from 'react';
import { Project } from '../types';
import { X, ArrowRight } from 'lucide-react';

interface AllProjectsModalProps {
  projects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

const AllProjectsModal: React.FC<AllProjectsModalProps> = ({ projects, onClose, onSelectProject }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="min-h-screen w-full container mx-auto px-6 md:px-[50px] py-12 relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12 sticky top-0 bg-black/95 py-4 z-10 border-b border-white/10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Archivo Completo</h2>
            <p className="text-slate-400 text-sm mt-1">Explorando {projects.length} obras y colaboraciones</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-arch-accent hover:text-black text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          {projects.map((project) => (
            (() => {
              const coverImageUrl = project.images?.[0]?.url;
              return (
            <div 
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer bg-slate-900 border border-white/5 hover:border-arch-accent/50 transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden relative">
                {coverImageUrl ? (
                  <img 
                    src={coverImageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-xs text-slate-500">
                    Sin imagen
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-arch-accent text-xs font-bold px-2 py-1 uppercase tracking-widest">
                  {project.year}
                </div>
              </div>
              
              <div className="p-5">
                <span className="text-arch-accent text-xs font-bold uppercase tracking-widest mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-arch-accent transition-colors">
                  {project.title}
                </h3>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                  <span className="text-xs text-slate-500">{project.location}</span>
                  <ArrowRight size={16} className="text-slate-500 group-hover:text-arch-accent transition-colors transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
              );
            })()
          ))}
        </div>

      </div>
    </div>
  );
};

export default AllProjectsModal;