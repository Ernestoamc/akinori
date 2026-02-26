export interface ProjectImage {
  url: string;
  type: 'render' | 'plan' | 'detail' | 'sketch';
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  description: string;
  images: ProjectImage[];
  tags: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface Course {
  id: string;
  name: string;
  institution: string;
  year: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface ArchitectProfile {
  name: string;
  title: string;
  about: string;
  phone: string;
  email: string;
  address: string;
  socials: {
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
  portraitUrl?: string; // Main hero image
  formalUrl?: string;   // Secondary formal image
}
