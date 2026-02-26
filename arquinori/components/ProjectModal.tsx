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

  // Filter images based on tab
  const filteredImages = activeTab === 'all' 
    ? project.images 
    : project.images.filter(img => img.type === activeTab);

  // Use filtered images for the main view, fallback to first if filter empties selection
  const currentImages = filteredImages.length > 0 ? filteredImages : project.images;
  const currentImage = currentImages[selectedIndex] || currentImages[0];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % currentImages.length);
  };

  const handlePrev = () => {
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
          
          <img 
            src={currentImage.url} 
            alt={currentImage.caption}
            className={`object-contain w-full h-full transition-transform duration-700 ${isFullScreen ? 'scale-100' : ''}`}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

          {/* Navigation Arrows */}
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

          {/* Image Caption & Type */}
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-2 py-1 text-xs font-bold tracking-wider text-black bg-arch-accent uppercase rounded-sm mb-2">
              {currentImage.type}
            </span>
            <h3 className="text-xl md:text-2xl font-display font-medium text-white">{currentImage.caption}</h3>
          </div>

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
                onClick={() => { setActiveTab('all'); setSelectedIndex(0); }}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all ${activeTab === 'all' ? 'bg-slate-800 text-arch-accent ring-1 ring-arch-accent' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'}`}
               >
                 <Layers size={18} className="mb-1" />
                 <span className="text-[10px]">Todo</span>
               </button>
               <button 
                onClick={() => { setActiveTab('render'); setSelectedIndex(0); }}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all ${activeTab === 'render' ? 'bg-slate-800 text-arch-accent ring-1 ring-arch-accent' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'}`}
               >
                 <ImageIcon size={18} className="mb-1" />
                 <span className="text-[10px]">Renders</span>
               </button>
               <button 
                onClick={() => { setActiveTab('plan'); setSelectedIndex(0); }}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all ${activeTab === 'plan' ? 'bg-slate-800 text-arch-accent ring-1 ring-arch-accent' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'}`}
               >
                 <Map size={18} className="mb-1" />
                 <span className="text-[10px]">Planos</span>
               </button>
               <button 
                onClick={() => { setActiveTab('detail'); setSelectedIndex(0); }}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all ${activeTab === 'detail' ? 'bg-slate-800 text-arch-accent ring-1 ring-arch-accent' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'}`}
               >
                 <Maximize2 size={18} className="mb-1" />
                 <span className="text-[10px]">Detalle</span>
               </button>
            </div>

            {/* Thumbnail Grid */}
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Galería</h4>
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
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
