import type { Lang } from '../i18n/context'

const base = import.meta.env.BASE_URL

export const person = {
  firstName: 'Néstor David',
  lastName: 'Sarmiento Caillagua',
  shortName: 'Néstor Sarmiento',
  initials: 'NS',
  photo: `${base}nestor-sarmiento.jpg`,
  cv: {
    href: `${base}CV-Nestor-Sarmiento.pdf`,
    fileName: 'CV-Nestor-Sarmiento.pdf',
    preview: {
      src: `${base}cv-preview-800.jpg`,
      srcSet: `${base}cv-preview-800.jpg 800w, ${base}cv-preview-1400.jpg 1400w`,
      width: 800,
      height: 1131,
    },
  },
  stack: 'Python · FastAPI · n8n · Docker',
  semester: { current: 7, total: 9 },
}

export const contact = {
  email: 'nesdav1005@gmail.com',
  phoneDisplay: '096 128 4734',
  phoneHref: 'tel:+593961284734',
  phoneRaw: '0961284734',
  whatsapp: {
    display: '+593 96 128 4734',
    href: (message: string) => `https://wa.me/593961284734?text=${encodeURIComponent(message)}`,
  },
  linkedin: {
    label: 'Néstor Sarmiento',
    href: 'https://www.linkedin.com/in/nestorsarmiento1005/',
  },
  github: {
    label: 'Nestor-Sarmiento',
    href: 'https://github.com/Nestor-Sarmiento',
  },
}

export const sectionIds = ['inicio', 'perfil', 'experiencia', 'habilidades', 'formacion', 'contacto'] as const
export type SectionId = (typeof sectionIds)[number]

export const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
type Cefr = (typeof cefrLevels)[number]

type MonthYear = { month: number; year: number }

export type Capability = {
  id: 'backend' | 'automation' | 'ai' | 'infra' | 'frontend' | 'security'
  title: string
  description: string
  tools: string[]
}

export type Experience = {
  id: string
  role: string
  organization: string
  type: string
  location?: string
  start: MonthYear
  end: MonthYear | null
  highlights: string[]
  stack: string[]
}

export type Education = {
  id: string
  title: string
  institution: string
  period?: string
  status: 'inProgress' | 'completed'
  detail?: string
  progress?: { current: number; total: number }
}

export type SkillCategory = { id: string; label: string; skills: string[] }

export type Language = {
  name: string
  level: string
  cefr?: { reached: Cefr; inProgress?: Cefr }
}

export type Content = {
  role: string
  focus: string
  status: string
  tagline: string
  summary: string
  goal: string
  interests: string[]
  sections: Record<SectionId, string>
  capabilities: Capability[]
  experience: Experience[]
  education: Education[]
  certifications: Education[]
  skillCategories: SkillCategory[]
  languages: Language[]
  lastUpdated: string
}

const sectionShortcuts: Record<SectionId, string> = {
  inicio: '1',
  perfil: '2',
  experiencia: '3',
  habilidades: '4',
  formacion: '5',
  contacto: '6',
}

export function getSections(content: Content) {
  return sectionIds.map((id) => ({ id, label: content.sections[id], shortcut: sectionShortcuts[id] }))
}

const dates = {
  arellano: { start: { month: 8, year: 2026 }, end: null },
  vibratio: { start: { month: 3, year: 2026 }, end: { month: 6, year: 2026 } },
  inclusion: { start: { month: 4, year: 2025 }, end: { month: 7, year: 2025 } },
}

const stacks = {
  arellano: [
    'n8n',
    'Chatwoot',
    'Evolution API',
    'Meta API',
    'TikTok API',
    'Google AI Studio',
    'Docker',
    'Traefik',
    'PostgreSQL',
    'Redis',
    'Linux VPS',
    'WordPress',
  ],
  vibratio: ['Python', 'FastAPI', 'n8n', 'Gemini API', 'RAG', 'Linux', 'Git'],
}

const skills = {
  lenguajes: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'C++'],
  frameworks: ['FastAPI', 'NestJS', 'Spring Boot', 'React', 'Tailwind CSS'],
  'bases-de-datos': ['PostgreSQL', 'SQL Server', 'MySQL', 'MongoDB', 'Redis'],
  infraestructura: ['Docker', 'Traefik', 'Linux (VPS)', 'Git', 'Postman', 'Vite', 'Maven', 'Azure DevOps', 'WordPress'],
  ia: ['n8n', 'Gemini API', 'Google AI Studio', 'RAG', 'Chatwoot', 'Evolution API', 'Meta API', 'TikTok API'],
}

const es: Content = {
  role: 'Estudiante de Ingeniería en Software',
  focus: 'Backend · Automatización · IA aplicada',
  status: 'Pasante en Arellano Store · Abierto a nuevas oportunidades',
  tagline:
    'Automatizo procesos y construyo APIs e integraciones con inteligencia artificial usando Python, FastAPI, n8n y Docker.',
  summary:
    'Estudiante de séptimo semestre de Ingeniería en Software en la Escuela Politécnica Nacional, con experiencia en desarrollo backend con Python, FastAPI y Java, y en automatización de procesos con n8n e inteligencia artificial. He desarrollado e integrado APIs REST, flujos de atención automatizada en redes sociales y soluciones conectadas a un ERP, además de administrar servidores Linux con Docker.',
  goal:
    'También desarrollo interfaces con React, Vite y Tailwind CSS, y backends con NestJS y TypeScript. Me interesa crecer como ingeniero de software Full Stack en proyectos de desarrollo web, automatización, inteligencia artificial aplicada a negocios e integración de plataformas digitales.',
  interests: [
    'Desarrollo web Full Stack',
    'Automatización de procesos',
    'IA aplicada a negocios',
    'Integración de plataformas digitales',
  ],
  sections: {
    inicio: 'Inicio',
    perfil: 'Perfil',
    experiencia: 'Experiencia',
    habilidades: 'Habilidades',
    formacion: 'Formación',
    contacto: 'Contacto',
  },
  capabilities: [
    {
      id: 'backend',
      title: 'Backend y APIs',
      description: 'Desarrollo e integración de APIs REST y consumo de endpoints de sistemas ERP.',
      tools: ['FastAPI', 'NestJS', 'Spring Boot'],
    },
    {
      id: 'automation',
      title: 'Automatización',
      description: 'Flujos que responden mensajes y comentarios en redes sociales y agilizan procesos internos.',
      tools: ['n8n', 'Chatwoot', 'Evolution API'],
    },
    {
      id: 'ai',
      title: 'IA aplicada',
      description: 'Asistentes con RAG y Gemini, con control y optimización del consumo en Google AI Studio.',
      tools: ['Gemini API', 'RAG', 'Google AI Studio'],
    },
    {
      id: 'infra',
      title: 'Infraestructura',
      description: 'Administración de servidores Linux (VPS) con múltiples contenedores Docker.',
      tools: ['Docker', 'Traefik', 'Linux'],
    },
    {
      id: 'frontend',
      title: 'Frontend',
      description: 'Interfaces modernas y responsivas con componentes reutilizables.',
      tools: ['React', 'Vite', 'Tailwind CSS'],
    },
    {
      id: 'security',
      title: 'Seguridad',
      description: 'Prevención de prompt injection, consumo seguro de APIs y gestión de credenciales.',
      tools: ['n8n', 'APIs REST'],
    },
  ],
  experience: [
    {
      id: 'arellano',
      role: 'Pasante de Automatización e IA',
      organization: 'Arellano Store',
      type: 'Pasantía · 6 meses',
      location: 'Quito, Ecuador',
      ...dates.arellano,
      highlights: [
        'Automatización de procesos internos y de atención al cliente para mejorar la experiencia de usuario.',
        'Flujos para responder automáticamente mensajes y comentarios en redes sociales (Meta y TikTok) integrando Chatwoot, Evolution API y n8n.',
        'Soluciones para consultar inventario y generar proformas automáticamente consumiendo endpoints del ERP.',
        'Medidas de seguridad para prevenir prompt injection en los asistentes con inteligencia artificial.',
        'Administración del servidor Linux (VPS) con varios contenedores Docker, Traefik, PostgreSQL y Redis.',
        'Gestión de credenciales en n8n y revisión y optimización del consumo en Google AI Studio.',
        'Soporte e integración del sitio web desarrollado en WordPress.',
      ],
      stack: stacks.arellano,
    },
    {
      id: 'vibratio',
      role: 'Pasante de Desarrollo Backend',
      organization: 'Vibratio EC S.A.S.',
      type: 'Pasantía',
      ...dates.vibratio,
      highlights: [
        'Desarrollo de funcionalidades backend utilizando Python y FastAPI.',
        'Implementación e integración de APIs REST entre servicios.',
        'Desarrollo de flujos de automatización utilizando n8n, webhooks y consumo de APIs.',
        'Desarrollo de una solución RAG basada en Gemini para la construcción de un asistente jurídico con inteligencia artificial.',
        'Configuración y despliegue de aplicaciones en servidores Linux.',
        'Implementación de mecanismos de seguridad para el consumo de APIs.',
        'Trabajo colaborativo mediante control de versiones con Git y metodologías ágiles.',
      ],
      stack: stacks.vibratio,
    },
    {
      id: 'inclusion-digital',
      role: 'Prácticas Preprofesionales',
      organization: 'Proyecto de Inclusión Digital',
      type: 'Prácticas',
      ...dates.inclusion,
      highlights: [],
      stack: [],
    },
  ],
  education: [
    {
      id: 'epn',
      title: 'Ingeniería en Software',
      institution: 'Escuela Politécnica Nacional',
      period: '2023 – Actualidad',
      status: 'inProgress',
      detail: 'Séptimo semestre de 9 (más un semestre de nivelación)',
      progress: person.semester,
    },
    {
      id: 'colegio',
      title: 'Bachiller en Ciencias',
      institution: 'Colegio Fernández Madrid',
      period: '2016 – 2022',
      status: 'completed',
    },
  ],
  certifications: [
    {
      id: 'academic-three',
      title: 'Academic Three · Inglés B2',
      institution: 'Centro de Educación Continua · EPN',
      status: 'inProgress',
    },
    {
      id: 'academic-two',
      title: 'Academic Two · Inglés B2',
      institution: 'Centro de Educación Continua · EPN',
      status: 'completed',
    },
    {
      id: 'advanced-two',
      title: 'Advanced Two · Inglés B1',
      institution: 'Centro de Educación Continua · EPN',
      status: 'completed',
    },
  ],
  skillCategories: [
    { id: 'lenguajes', label: 'Lenguajes', skills: skills.lenguajes },
    { id: 'frameworks', label: 'Frameworks y librerías', skills: skills.frameworks },
    { id: 'bases-de-datos', label: 'Bases de datos', skills: skills['bases-de-datos'] },
    { id: 'infraestructura', label: 'Infraestructura y herramientas', skills: skills.infraestructura },
    { id: 'ia', label: 'IA y automatización', skills: skills.ia },
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    {
      name: 'Inglés',
      level: 'B1 · cursando B2 (Academic Three)',
      cefr: { reached: 'B1', inProgress: 'B2' },
    },
  ],
  lastUpdated: 'octubre de 2026',
}

const en: Content = {
  role: 'Software Engineering Student',
  focus: 'Backend · Automation · Applied AI',
  status: 'Intern at Arellano Store · Open to new opportunities',
  tagline: 'I automate processes and build APIs and AI integrations with Python, FastAPI, n8n and Docker.',
  summary:
    'Seventh-semester Software Engineering student at Escuela Politécnica Nacional (Ecuador), with experience in backend development with Python, FastAPI and Java, and in process automation with n8n and artificial intelligence. I have built and integrated REST APIs, automated customer-service flows for social media and ERP-connected solutions, and I manage Linux servers running Docker.',
  goal:
    'I also build interfaces with React, Vite and Tailwind CSS, and backends with NestJS and TypeScript. I want to grow as a Full Stack software engineer working on web development, automation, AI for business and digital platform integration.',
  interests: [
    'Full Stack web development',
    'Process automation',
    'AI applied to business',
    'Digital platform integration',
  ],
  sections: {
    inicio: 'Home',
    perfil: 'Profile',
    experiencia: 'Experience',
    habilidades: 'Skills',
    formacion: 'Education',
    contacto: 'Contact',
  },
  capabilities: [
    {
      id: 'backend',
      title: 'Backend & APIs',
      description: 'Building and integrating REST APIs and consuming ERP system endpoints.',
      tools: ['FastAPI', 'NestJS', 'Spring Boot'],
    },
    {
      id: 'automation',
      title: 'Automation',
      description: 'Flows that answer social media messages and comments and streamline internal processes.',
      tools: ['n8n', 'Chatwoot', 'Evolution API'],
    },
    {
      id: 'ai',
      title: 'Applied AI',
      description: 'RAG assistants with Gemini, with usage monitoring and optimization in Google AI Studio.',
      tools: ['Gemini API', 'RAG', 'Google AI Studio'],
    },
    {
      id: 'infra',
      title: 'Infrastructure',
      description: 'Managing Linux servers (VPS) running multiple Docker containers.',
      tools: ['Docker', 'Traefik', 'Linux'],
    },
    {
      id: 'frontend',
      title: 'Frontend',
      description: 'Modern, responsive interfaces built from reusable components.',
      tools: ['React', 'Vite', 'Tailwind CSS'],
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Prompt injection prevention, secure API consumption and credential management.',
      tools: ['n8n', 'REST APIs'],
    },
  ],
  experience: [
    {
      id: 'arellano',
      role: 'Automation & AI Intern',
      organization: 'Arellano Store',
      type: 'Internship · 6 months',
      location: 'Quito, Ecuador',
      ...dates.arellano,
      highlights: [
        'Automate internal and customer-service processes to improve the user experience.',
        'Build flows that automatically answer social media messages and comments (Meta and TikTok) by integrating Chatwoot, Evolution API and n8n.',
        'Build solutions to check inventory and generate quotes automatically by consuming ERP endpoints.',
        'Implement safeguards against prompt injection in the AI assistants.',
        'Manage the Linux server (VPS) running several Docker containers, Traefik, PostgreSQL and Redis.',
        'Manage n8n credentials and review and optimize usage in Google AI Studio.',
        'Support and integrate the company website built on WordPress.',
      ],
      stack: stacks.arellano,
    },
    {
      id: 'vibratio',
      role: 'Backend Development Intern',
      organization: 'Vibratio EC S.A.S.',
      type: 'Internship',
      ...dates.vibratio,
      highlights: [
        'Developed backend features using Python and FastAPI.',
        'Implemented and integrated REST APIs between services.',
        'Built automation flows using n8n, webhooks and API consumption.',
        'Developed a Gemini-based RAG solution to build an AI legal assistant.',
        'Configured and deployed applications on Linux servers.',
        'Implemented security mechanisms for API consumption.',
        'Collaborated through Git version control and agile methodologies.',
      ],
      stack: stacks.vibratio,
    },
    {
      id: 'inclusion-digital',
      role: 'Pre-professional Internship',
      organization: 'Digital Inclusion Project',
      type: 'Internship',
      ...dates.inclusion,
      highlights: [],
      stack: [],
    },
  ],
  education: [
    {
      id: 'epn',
      title: 'Software Engineering',
      institution: 'Escuela Politécnica Nacional',
      period: '2023 – Present',
      status: 'inProgress',
      detail: 'Seventh semester of 9 (plus one preparatory semester)',
      progress: person.semester,
    },
    {
      id: 'colegio',
      title: 'High School Diploma in Sciences',
      institution: 'Colegio Fernández Madrid',
      period: '2016 – 2022',
      status: 'completed',
    },
  ],
  certifications: [
    {
      id: 'academic-three',
      title: 'Academic Three · English B2',
      institution: 'Continuing Education Center · EPN',
      status: 'inProgress',
    },
    {
      id: 'academic-two',
      title: 'Academic Two · English B2',
      institution: 'Continuing Education Center · EPN',
      status: 'completed',
    },
    {
      id: 'advanced-two',
      title: 'Advanced Two · English B1',
      institution: 'Continuing Education Center · EPN',
      status: 'completed',
    },
  ],
  skillCategories: [
    { id: 'lenguajes', label: 'Programming languages', skills: skills.lenguajes },
    { id: 'frameworks', label: 'Frameworks & libraries', skills: skills.frameworks },
    { id: 'bases-de-datos', label: 'Databases', skills: skills['bases-de-datos'] },
    { id: 'infraestructura', label: 'Infrastructure & tools', skills: skills.infraestructura },
    { id: 'ia', label: 'AI & automation', skills: skills.ia },
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    {
      name: 'English',
      level: 'B1 · studying B2 (Academic Three)',
      cefr: { reached: 'B1', inProgress: 'B2' },
    },
  ],
  lastUpdated: 'October 2026',
}

export const content: Record<Lang, Content> = { es, en }
