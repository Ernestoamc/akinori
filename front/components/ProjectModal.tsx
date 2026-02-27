import React, { useState } from 'react';
import { Project, ProjectImage } from '../types';
import { X, Layers, Image as ImageIcon, Map, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'render' | 'plan' | 'detail'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const allImages = Array.isArray(project.images)
    ? project.images.filter((img) => Boolean(img?.url))
    : [];

  const hasAll = allImages.length > 0;
  const hasRender = allImages.some((img) => img.type === 'render');
  const hasPlan = allImages.some((img) => img.type === 'plan');
  const hasDetail = allImages.some((img) => img.type === 'detail');
  const countAll = allImages.length;
  const countRender = allImages.filter((img) => img.type === 'render').length;
  const countPlan = allImages.filter((img) => img.type === 'plan').length;
  const countDetail = allImages.filter((img) => img.type === 'detail').length;

  const getTabClassName = (tab: 'all' | 'render' | 'plan' | 'detail', isDisabled: boolean) => {
    if (isDisabled) {
      return 'flex flex-col items-center justify-center p-2 rounded-md bg-slate-800/30 text-slate-600 cursor-not-allowed opacity-50';
    }

    return `flex flex-col items-center justify-center p-2 rounded-md transition-all ${activeTab === tab ? 'bg-slate-800 text-arch-accent ring-1 ring-arch-accent' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'}`;
  };

  // Filter images based on tab
  const filteredImages = activeTab === 'all' 
    ? allImages 
    : allImages.filter(img => img.type === activeTab);

  // Show only images matching current tab; if none match, show empty state
  const currentImages = filteredImages;
  const currentImage = currentImages[selectedIndex] || currentImages[0];

  const handleNext = () => {
    if (currentImages.length === 0) return;
    setSelectedIndex((prev) => (prev + 1) % currentImages.length);
  };

  const handlePrev = () => {
    if (currentImages.length === 0) return;
    setSelectedIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-arch-accent transition-colors z-50"
      >
        <X size={32} />
      </button>

      <div className={`bg-arch-dark w-full max-w-6xl rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl border border-slate-800 ${isFullScreen ? 'h-full' : 'max-h-[90vh]'}`}>
        
        {/* Main Viewer Area */}
        <div className="relative flex-1 bg-black flex items-center justify-center group overflow-hidden">
          
          {currentImage ? (
            <img 
              src={currentImage.url} 
              alt={currentImage.caption}
              className={`object-contain w-full h-full transition-transform duration-700 ${isFullScreen ? 'scale-100' : ''}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
              Este proyecto no tiene imágenes disponibles.
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

          {/* Navigation Arrows */}
          {currentImages.length > 0 && (
            <>
              <button 
                onClick={handlePrev}
                className="absolute left-4 p-2 bg-black/50 text-white rounded-full hover:bg-arch-accent transition-colors opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 p-2 bg-black/50 text-white rounded-full hover:bg-arch-accent transition-colors opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image Caption & Type */}
          {currentImage && (
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-2 py-1 text-xs font-bold tracking-wider text-black bg-arch-accent uppercase rounded-sm mb-2">
                {currentImage.type}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-medium text-white">{currentImage.caption}</h3>
            </div>
          )}

          <button 
             onClick={() => setIsFullScreen(!isFullScreen)}
             className="absolute top-4 right-4 text-white/50 hover:text-white"
          >
            <Maximize2 size={20}/>
          </button>
        </div>

        {/* Sidebar / Info Panel */}
        <div className="w-full md:w-96 bg-slate-900 p-6 flex flex-col border-l border-slate-800 overflow-y-auto">
          
          <div className="mb-6">
            <h2 className="text-3xl font-display font-bold text-white mb-2">{project.title}</h2>
            <div className="text-arch-accent text-sm font-medium mb-4">{project.location} | {project.year}</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs border border-slate-700 text-slate-300 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* View Controls */}
          <div className="mt-auto">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Modo de Visualización</h4>
            <div className="grid grid-cols-4 gap-2 mb-4">
               <button 
                disabled={!hasAll}
                onClick={() => { setActiveTab('all'); setSelectedIndex(0); }}
                className={getTabClassName('all', !hasAll)}
               >
                 <Layers size={18} className="mb-1" />
                 <span className="text-[10px]">Todo ({countAll})</span>
               </button>
               <button 
                disabled={!hasRender}
                onClick={() => { setActiveTab('render'); setSelectedIndex(0); }}
                className={getTabClassName('render', !hasRender)}
               >
                 <ImageIcon size={18} className="mb-1" />
                 <span className="text-[10px]">Renders ({countRender})</span>
               </button>
               <button 
                disabled={!hasPlan}
                onClick={() => { setActiveTab('plan'); setSelectedIndex(0); }}
                className={getTabClassName('plan', !hasPlan)}
               >
                 <Map size={18} className="mb-1" />
                 <span className="text-[10px]">Planos ({countPlan})</span>
               </button>
               <button 
                disabled={!hasDetail}
                onClick={() => { setActiveTab('detail'); setSelectedIndex(0); }}
                className={getTabClassName('detail', !hasDetail)}
               >
                 <Maximize2 size={18} className="mb-1" />
                 <span className="text-[10px]">Detalle ({countDetail})</span>
               </button>
            </div>

            {/* Thumbnail Grid */}
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Galería</h4>
            {currentImages.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {currentImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative aspect-square overflow-hidden rounded-md ${selectedIndex === idx ? 'ring-2 ring-arch-accent' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img.url} className="w-full h-full object-cover" alt="thumbnail" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Sin galería para este proyecto.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
