import { ArchitectProfile, Project, Experience, Education, Course, Skill } from './types';

export const PROFILE: ArchitectProfile = {
  name: "Ernesto Akinori Flores Gutiérrez",
  title: "Arquitecto & Diseñador de Interiores",
  about: "¡Hola! Soy Ernesto Akinori, tengo 23 años. Soy arquitecto egresado por la Universidad Autónoma de Sinaloa y diseñador de interiores por la Universidad Casa Blanca. Me considero una persona creativa, que utiliza el diseño de los espacios como un medio para la solución de problemas.",
  phone: "667-485-4587",
  email: "arquinori02@gmail.com",
  address: "Culiacán, Sinaloa",
  socials: {
    instagram: "https://instagram.com/arquinori",
    // Placeholder links for structure
    linkedin: "https://linkedin.com/",
    behance: "https://behance.net/"
  },
  portraitUrl: "/ernesto-casco.png", // Ensure this file exists in your public folder
  formalUrl: "/ernesto-traje.png"    // Ensure this file exists in your public folder
};

// Keeping projects as high-quality placeholders until user provides specific project images/details
export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Residencia Bosque Alto",
    category: "Residencial",
    year: "2023",
    location: "Sinaloa, México",
    description: "Una residencia unifamiliar integrada en el entorno natural. El diseño prioriza las vistas panorámicas y la conservación de la vegetación existente. Estructura mixta de acero y concreto aparente.",
    tags: ["Sostenible", "Residencial", "Concreto", "Minimalista"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-2a43847c13d9?auto=format&fit=crop&q=80&w=1600",
        type: "render",
        caption: "Vista Exterior Principal"
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600",
        type: "detail",
        caption: "Detalle de Fachada"
      },
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600",
        type: "render",
        caption: "Patio Interior"
      },
      {
        url: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&q=80&w=1600",
        type: "plan",
        caption: "Planta Arquitectónica"
      }
    ]
  },
  {
    id: "p2",
    title: "Apartamento Loft Urbano",
    category: "Interiorismo",
    year: "2024",
    location: "Culiacán, Sinaloa",
    description: "Remodelación de interiores enfocada en optimizar espacios pequeños mediante mobiliario a medida y una paleta de colores neutros para maximizar la iluminación natural.",
    tags: ["Interiorismo", "Mobiliario", "Remodelación"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1600",
        type: "render",
        caption: "Estancia Principal"
      },
      {
        url: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1600",
        type: "render",
        caption: "Cocina y Comedor"
      }
    ]
  },
  {
    id: "p3",
    title: "Pabellón Cultural",
    category: "Cultural",
    year: "2022",
    location: "México",
    description: "Centro comunitario y galería de arte. El volumen principal juega con la luz y la sombra mediante celosías de ladrillo.",
    tags: ["Público", "Cultural", "Ladrillo"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1600",
        type: "render",
        caption: "Acceso Principal"
      },
      {
        url: "https://images.unsplash.com/photo-1517581177697-a06a1891bdd2?auto=format&fit=crop&q=80&w=1600",
        type: "plan",
        caption: "Axonométrico"
      }
    ]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: "e1",
    role: "Independiente",
    company: "Quinta Negra",
    period: "2025 - Presente",
    description: "Gestión y desarrollo de proyectos arquitectónicos y de interiorismo propios. Supervisión de diseño y ejecución."
  },
  {
    id: "e2",
    role: "Diseño de Mobiliario y Plantas Arquitectónicas",
    company: "URMEX DEVELOPMENT",
    period: "2025",
    description: "Elaboración de documentación ejecutiva, plantas arquitectónicas y diseño detallado de mobiliario fijo y exento."
  }
];

export const EDUCATION: Education[] = [
  {
    id: "ed1",
    degree: "Diplomado en Diseño de Interiores",
    institution: "Universidad Casa Blanca",
    year: "2025"
  },
  {
    id: "ed2",
    degree: "Licenciatura en Arquitectura",
    institution: "Universidad Autónoma de Sinaloa",
    year: "2020-2025"
  }
];

export const COURSES: Course[] = [
  { id: "c1", name: "Modelado BIM & Revit", institution: "Autodidacta / Académico", year: "2023" },
  { id: "c2", name: "Visualización Arquitectónica", institution: "Curso Especializado", year: "2024" }
];

export const SKILLS: Skill[] = [
  { name: "Diseño Arquitectónico", level: 95 },
  { name: "Diseño de Interiores", level: 90 },
  { name: "Diseño de Mobiliario", level: 85 },
  { name: "AutoCAD / Revit", level: 90 },
  { name: "Renderizado 3D", level: 80 }
];
