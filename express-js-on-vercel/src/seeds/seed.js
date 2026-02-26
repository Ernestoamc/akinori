const mongoose = require('mongoose');
require('dotenv').config();

const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Course = require('../models/Course');
const Skill = require('../models/Skill');
const Interest = require('../models/Interest');

const profileData = {
  name: 'Ernesto Akinori Flores Gutiérrez',
  title: 'Arquitecto & Diseñador de Interiores',
  logoName: 'ARQUINORI',
  heroSubtitle: `Portafolio ${new Date().getFullYear()}`,
  heroTitlePrimary: 'ERNESTO',
  heroTitleSecondary: 'AKINORI',
  about:
    '¡Hola! Soy Ernesto Akinori, tengo 23 años. Soy arquitecto egresado por la Universidad Autónoma de Sinaloa y diseñador de interiores por la Universidad Casa Blanca. Me considero una persona creativa, que utiliza el diseño de los espacios como un medio para la solución de problemas.',
  phone: '667-485-4587',
  email: 'arquinori02@gmail.com',
  address: 'Culiacán, Sinaloa',
  socials: {
    instagram: 'https://instagram.com/arquinori',
    linkedin: 'https://linkedin.com/',
    behance: 'https://behance.net/',
  },
  portraitUrl: '/ernesto-casco.png',
  formalUrl: '/ernesto-traje.png',
};

const projectsData = [
  {
    title: 'Residencia Bosque Alto',
    category: 'Residencial',
    year: '2023',
    location: 'Sinaloa, México',
    description:
      'Una residencia unifamiliar integrada en el entorno natural. El diseño prioriza las vistas panorámicas y la conservación de la vegetación existente. Estructura mixta de acero y concreto aparente.',
    tags: ['Sostenible', 'Residencial', 'Concreto', 'Minimalista'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-2a43847c13d9?auto=format&fit=crop&q=80&w=1600',
        type: 'render',
        caption: 'Vista Exterior Principal',
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600',
        type: 'detail',
        caption: 'Detalle de Fachada',
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600',
        type: 'render',
        caption: 'Patio Interior',
      },
      {
        url: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&q=80&w=1600',
        type: 'plan',
        caption: 'Planta Arquitectónica',
      },
    ],
    order: 1,
  },
  {
    title: 'Apartamento Loft Urbano',
    category: 'Interiorismo',
    year: '2024',
    location: 'Culiacán, Sinaloa',
    description:
      'Remodelación de interiores enfocada en optimizar espacios pequeños mediante mobiliario a medida y una paleta de colores neutros para maximizar la iluminación natural.',
    tags: ['Interiorismo', 'Mobiliario', 'Remodelación'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1600',
        type: 'render',
        caption: 'Estancia Principal',
      },
      {
        url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1600',
        type: 'render',
        caption: 'Cocina y Comedor',
      },
    ],
    order: 2,
  },
  {
    title: 'Pabellón Cultural',
    category: 'Cultural',
    year: '2022',
    location: 'México',
    description:
      'Centro comunitario y galería de arte. El volumen principal juega con la luz y la sombra mediante celosías de ladrillo.',
    tags: ['Público', 'Cultural', 'Ladrillo'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1600',
        type: 'render',
        caption: 'Acceso Principal',
      },
      {
        url: 'https://images.unsplash.com/photo-1517581177697-a06a1891bdd2?auto=format&fit=crop&q=80&w=1600',
        type: 'plan',
        caption: 'Axonométrico',
      },
    ],
    order: 3,
  },
];

const experienceData = [
  {
    role: 'Independiente',
    company: 'Quinta Negra',
    period: '2025 - Presente',
    description:
      'Gestión y desarrollo de proyectos arquitectónicos y de interiorismo propios. Supervisión de diseño y ejecución.',
    order: 1,
  },
  {
    role: 'Diseño de Mobiliario y Plantas Arquitectónicas',
    company: 'URMEX DEVELOPMENT',
    period: '2025',
    description:
      'Elaboración de documentación ejecutiva, plantas arquitectónicas y diseño detallado de mobiliario fijo y exento.',
    order: 2,
  },
];

const educationData = [
  {
    degree: 'Diplomado en Diseño de Interiores',
    institution: 'Universidad Casa Blanca',
    year: '2025',
    order: 1,
  },
  {
    degree: 'Licenciatura en Arquitectura',
    institution: 'Universidad Autónoma de Sinaloa',
    year: '2020-2025',
    order: 2,
  },
];

const coursesData = [
  {
    name: 'Modelado BIM & Revit',
    institution: 'Autodidacta / Académico',
    year: '2023',
    order: 1,
  },
  {
    name: 'Visualización Arquitectónica',
    institution: 'Curso Especializado',
    year: '2024',
    order: 2,
  },
];

const skillsData = [
  { name: 'Diseño Arquitectónico', level: 95, order: 1 },
  { name: 'Diseño de Interiores', level: 90, order: 2 },
  { name: 'Diseño de Mobiliario', level: 85, order: 3 },
  { name: 'AutoCAD / Revit', level: 90, order: 4 },
  { name: 'Renderizado 3D', level: 80, order: 5 },
];

const interestsData = [
  { name: 'Fotografía', icon: '📷', order: 1 },
  { name: 'Viajes', icon: '✈️', order: 2 },
  { name: 'Mobiliario', icon: '🛋️', order: 3 },
  { name: 'Paisajismo', icon: '🌿', order: 4 },
];

const seed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear collections
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Education.deleteMany({});
    await Course.deleteMany({});
    await Skill.deleteMany({});
    await Interest.deleteMany({});
    console.log('✅ Collections cleared');

    // Create profile
    const profile = await Profile.create({
      ...profileData,
      isSingleton: true,
    });
    console.log('✅ Profile created:', profile._id);

    // Create projects
    const projects = await Project.insertMany(projectsData);
    console.log('✅ Projects created:', projects.length);

    // Create experience
    const experience = await Experience.insertMany(experienceData);
    console.log('✅ Experience created:', experience.length);

    // Create education
    const education = await Education.insertMany(educationData);
    console.log('✅ Education created:', education.length);

    // Create courses
    const courses = await Course.insertMany(coursesData);
    console.log('✅ Courses created:', courses.length);

    // Create skills
    const skills = await Skill.insertMany(skillsData);
    console.log('✅ Skills created:', skills.length);

    // Create interests
    const interests = await Interest.insertMany(interestsData);
    console.log('✅ Interests created:', interests.length);

    console.log('\n🎉 Database seeded successfully!');
    console.log(`
📊 Summary:
- Profile: 1
- Projects: ${projects.length}
- Experience: ${experience.length}
- Education: ${education.length}
- Courses: ${courses.length}
- Skills: ${skills.length}
- Interests: ${interests.length}
    `);

    await mongoose.connection.close();
    console.log('✅ Connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seed();
