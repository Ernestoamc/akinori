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
  id: string;
  name: string;
  level: number; // 0-100
}

export interface Interest {
  id: string;
  name: string;
  icon: string; // Emoji character
}

export interface ArchitectProfile {
  name: string;
  title: string;
  logoName: string;      // The text appearing in the Navbar (e.g., ARQUINORI)
  heroSubtitle: string;  // The text above the name (e.g., Portafolio 2025)
  heroTitlePrimary: string;   // Big Text Line 1 (e.g. ERNESTO)
  heroTitleSecondary: string; // Big Text Line 2 (e.g. AKINORI)
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
  cvUrl?: string;       // Resume PDF URL
}