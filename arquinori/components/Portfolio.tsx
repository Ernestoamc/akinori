import React, { useState } from 'react';
import Navbar from './Navbar';
import ProjectModal from './ProjectModal';
import AllProjectsModal from './AllProjectsModal';
import { useData } from '../context/DataContext';
import { ArrowRight, Download, Mail, Phone, MapPin, Instagram, Linkedin, Briefcase, GraduationCap, Check, Copy } from 'lucide-react';
import { Project } from '../types';

const Portfolio: React.FC = () => {
  const { profile, projects, experience, education, courses, skills } = useData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const featuredProjects = projects.slice(0, 4);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(`${label} copiado al portapapeles`);
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-arch-dark text-slate-200 selection:bg-arch-accent selection:text-black font-sans">
      <Navbar />

      {/* Toast Notification */}
      <div className={`fixed top-24 right-6 z-50 bg-white text-black px-6 py-4 rounded shadow-2xl flex items-center gap-3 transition-all duration-300 transform ${toastMessage ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-green-500 rounded-full p-1 text-white"><Check size={14} strokeWidth={3} /></div>
        <span className="font-medium text-sm">{toastMessage}</span>
      </div>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0a0f1c] scroll-mt-20">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-arch-accent/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-slate-700/10 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6 animate-fade-in">
                 <div className="h-[1px] w-12 bg-arch-accent"></div>
                 <span className="text-arch-accent font-mono tracking-[0.2em] text-sm uppercase">Portafolio {new Date().getFullYear()}</span>
              </div>
              
              <h1 className="font-display font-bold leading-[0.9] text-white mb-8 animate-slide-up">
                <span className="block text-6xl md:text-8xl lg:text-[7rem] tracking-tighter uppercase">{profile.name.split(' ')[0]}</span>
                <span className="block text-6xl md:text-8xl lg:text-[7rem] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-500 via-slate-200 to-white uppercase">
                  {profile.name.split(' ')[1]}
                </span>
              </h1>
              
              <div className="flex flex-col md:flex-row gap-6 md:items-center mb-10 animate-slide-up delay-100">
                <div className="px-4 py-2 bg-white/5 border-l-2 border-arch-accent">
                  <p className="text-xl text-white font-light">{profile.title}</p>
                </div>
                <div className="hidden md:block h-px w-16 bg-slate-700"></div>
                <p className="text-slate-400 max-w-md leading-relaxed">{profile.about}</p>
              </div>

              <div className="flex flex-wrap gap-4 animate-slide-up delay-150 relative z-20">
                <button type="button" onClick={(e) => { e.preventDefault(); setIsAllProjectsOpen(true); }} className="group relative px-8 py-4 bg-white text-black font-bold overflow-hidden cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow">
                  <span className="relative z-10 flex items-center gap-2">Ver Proyectos <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></span>
                  <div className="absolute inset-0 bg-arch-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                </button>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="px-8 py-4 border border-slate-600 text-white font-medium hover:bg-white/5 hover:border-white transition-colors cursor-pointer flex items-center justify-center">Contactar</a>
              </div>
            </div>

            <div className="lg:col-span-5 relative order-1 lg:order-2 h-[500px] md:h-[600px] flex items-center justify-center animate-fade-in delay-200">
              <div className="relative w-full max-w-md h-[450px] md:h-[550px]">
                <div className="absolute top-8 right-8 w-full h-full border-2 border-slate-700 z-0 hidden md:block"></div>
                <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 bg-arch-accent/10 z-0"></div>
                <div className="absolute inset-0 overflow-hidden bg-slate-800 z-10 group shadow-2xl">
                  {profile.portraitUrl ? (
                    <>
                      <img src={profile.portraitUrl} alt={profile.name} className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-arch-dark/90 via-transparent to-transparent opacity-80"></div>
                    </>
                  ) : <div className="w-full h-full flex items-center justify-center text-slate-500 border border-slate-700">Sin Imagen</div>}
                  <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/10 backdrop-blur-sm bg-black/20">
                     <div className="flex justify-between items-end">
                        <div>
                          <p className="text-arch-accent font-mono text-xs mb-1">UBICACIÓN</p>
                          <p className="text-white font-bold">{profile.address.split(',')[0]}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-arch-accent font-mono text-xs mb-1">ESPECIALIDAD</p>
                          <p className="text-white font-bold">Residencial & Interiorismo</p>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 bg-black/30 relative scroll-mt-28">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">Proyectos Destacados</h2>
              <div className="h-1 w-20 bg-arch-accent"></div>
            </div>
            <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
               <p className="text-slate-500 text-sm max-w-md text-right">Selección de obras recientes.</p>
               <button onClick={() => setIsAllProjectsOpen(true)} className="text-arch-accent text-sm font-bold border-b border-arch-accent hover:text-white hover:border-white transition-colors">Ver galería completa →</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="group cursor-pointer relative overflow-hidden rounded-sm border border-white/5" onClick={() => setSelectedProject(project)}>
                <div className="aspect-[4/5] overflow-hidden bg-slate-800">
                  <img src={project.images[0].url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-arch-accent text-xs font-bold uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.category}</span>
                  <h3 className="text-2xl font-display font-bold text-white mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 bg-slate-900 border-y border-white/5 scroll-mt-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-12">
                <Briefcase className="text-arch-accent" size={32} />
                <h2 className="text-3xl font-display font-bold text-white">Experiencia Profesional</h2>
              </div>
              <div className="space-y-12 border-l border-slate-700 ml-3 pl-8 relative">
                {experience.map((job) => (
                  <div key={job.id} className="relative group">
                    <div className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-slate-900 bg-slate-600 group-hover:bg-arch-accent transition-colors"></div>
                    <span className="text-arch-accent font-mono text-sm mb-1 block">{job.period}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                    <h4 className="text-slate-400 font-medium mb-4">{job.company}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div id="education" className="mb-12 scroll-mt-32">
                <div className="flex justify-between items-start mb-12">
                   <div className="flex items-center gap-3">
                    <GraduationCap className="text-arch-accent" size={32} />
                    <h2 className="text-3xl font-display font-bold text-white">Formación</h2>
                   </div>
                   {profile.formalUrl && <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-arch-accent hidden md:block"><img src={profile.formalUrl} alt="Formal" className="w-full h-full object-cover" /></div>}
                </div>
                <div className="space-y-8">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-white/5 p-6 rounded-sm border border-white/5 hover:border-arch-accent/50 transition-colors relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><GraduationCap size={48} /></div>
                      <div className="flex justify-between items-start mb-2 relative z-10">
                        <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                        <span className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">{edu.year}</span>
                      </div>
                      <p className="text-arch-accent relative z-10">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-2">Cursos & Certificaciones</h3>
                <ul className="space-y-4">
                  {courses.map((course) => (
                    <li key={course.id} className="flex justify-between items-center text-sm p-3 hover:bg-white/5 rounded transition-colors cursor-default">
                      <span className="text-slate-300 font-medium">{course.name} <span className="text-slate-500 block text-xs font-normal mt-1">{course.institution}</span></span>
                      <span className="text-arch-accent font-mono text-xs border border-arch-accent/30 px-2 py-1 rounded">{course.year}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="py-24 bg-arch-dark">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ca8a04 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <h2 className="text-2xl font-display font-bold text-white mb-10 text-center relative z-10">Habilidades & Intereses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-8">
                {skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{skill.name}</span>
                      <span className="text-xs text-arch-accent font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-slate-800 w-full"><div className="h-full bg-arch-accent transition-all duration-1000 ease-out" style={{ width: `${skill.level}%` }}></div></div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-800/50 border border-white/5 p-6 rounded-sm text-center flex flex-col items-center justify-center hover:bg-white/5 hover:border-arch-accent/50 transition-all duration-300 group"><span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📷</span><span className="text-sm text-slate-400 group-hover:text-white">Fotografía</span></div>
                 <div className="bg-slate-800/50 border border-white/5 p-6 rounded-sm text-center flex flex-col items-center justify-center hover:bg-white/5 hover:border-arch-accent/50 transition-all duration-300 group"><span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">✈️</span><span className="text-sm text-slate-400 group-hover:text-white">Viajes</span></div>
                 <div className="bg-slate-800/50 border border-white/5 p-6 rounded-sm text-center flex flex-col items-center justify-center hover:bg-white/5 hover:border-arch-accent/50 transition-all duration-300 group"><span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🛋️</span><span className="text-sm text-slate-400 group-hover:text-white">Mobiliario</span></div>
                 <div className="bg-slate-800/50 border border-white/5 p-6 rounded-sm text-center flex flex-col items-center justify-center hover:bg-white/5 hover:border-arch-accent/50 transition-all duration-300 group"><span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🌿</span><span className="text-sm text-slate-400 group-hover:text-white">Paisajismo</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-black relative overflow-hidden scroll-mt-28">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Construyamos Algo Extraordinario</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div onClick={() => copyToClipboard(profile.email, 'Email')} className="cursor-pointer flex flex-col items-center p-6 bg-white/5 border border-white/5 rounded-lg hover:border-arch-accent transition-all hover:bg-white/10 group relative">
                <div className="p-4 bg-slate-900 rounded-full mb-4 text-arch-accent group-hover:bg-arch-accent group-hover:text-black transition-colors"><Mail size={24} /></div>
                <h3 className="text-white font-bold mb-2">Email</h3>
                <span className="text-slate-400 group-hover:text-white transition-colors text-sm">{profile.email}</span>
              </div>
              <div onClick={() => copyToClipboard(profile.phone, 'Teléfono')} className="cursor-pointer flex flex-col items-center p-6 bg-white/5 border border-white/5 rounded-lg hover:border-arch-accent transition-all hover:bg-white/10 group relative">
                <div className="p-4 bg-slate-900 rounded-full mb-4 text-arch-accent group-hover:bg-arch-accent group-hover:text-black transition-colors"><Phone size={24} /></div>
                <h3 className="text-white font-bold mb-2">Teléfono</h3>
                <span className="text-slate-400 text-sm">{profile.phone}</span>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/5 border border-white/5 rounded-lg hover:border-arch-accent transition-colors group">
                <div className="p-4 bg-slate-900 rounded-full mb-4 text-arch-accent group-hover:bg-arch-accent group-hover:text-black transition-colors"><MapPin size={24} /></div>
                <h3 className="text-white font-bold mb-2">Ubicación</h3>
                <span className="text-slate-400 text-sm">{profile.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-black border-t border-slate-900 text-center"><p className="text-slate-600 text-sm">© {new Date().getFullYear()} {profile.name}. Todos los derechos reservados.</p></footer>
      
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {isAllProjectsOpen && <AllProjectsModal projects={projects} onClose={() => setIsAllProjectsOpen(false)} onSelectProject={(p) => { setIsAllProjectsOpen(false); setSelectedProject(p); }} />}
    </div>
  );
};

export default Portfolio;