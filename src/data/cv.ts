export const profile = {
  firstName: 'Néstor David',
  lastName: 'Sarmiento Caillagua',
  shortName: 'Néstor Sarmiento',
  initials: 'NS',
  role: 'Estudiante de Ingeniería en Software',
  focus: 'Desarrollo Backend · Automatización · IA aplicada',
  tagline:
    'Construyo APIs REST, automatizaciones e integraciones con inteligencia artificial usando Python, FastAPI y Java.',
  summary:
    'Estudiante de Ingeniería en Software de la Escuela Politécnica Nacional con experiencia en desarrollo backend utilizando Python, FastAPI y Java. He participado en el desarrollo e integración de APIs REST, automatización de procesos mediante n8n, despliegue de aplicaciones y trabajo colaborativo con Git.',
  goal:
    'Me interesa desarrollarme como ingeniero de software Full Stack, participando en proyectos de desarrollo web, automatización, inteligencia artificial aplicada a negocios e integración de plataformas digitales.',
  interests: [
    'Desarrollo web Full Stack',
    'Automatización de procesos',
    'IA aplicada a negocios',
    'Integración de plataformas digitales',
  ],
  photo: `${import.meta.env.BASE_URL}nestor-sarmiento.jpg`,
  cv: {
    href: `${import.meta.env.BASE_URL}CV-Nestor-Sarmiento.pdf`,
    fileName: 'CV-Nestor-Sarmiento.pdf',
    meta: 'PDF · 1 página',
  },
}

export const contact = {
  email: 'nesdav1005@gmail.com',
  phoneDisplay: '096 128 4734',
  phoneHref: 'tel:+593961284734',
  phoneRaw: '0961284734',
  whatsapp: {
    display: '+593 96 128 4734',
    href: `https://wa.me/593961284734?text=${encodeURIComponent(
      'Hola Néstor, vi tu portafolio y me gustaría conversar contigo.',
    )}`,
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

export type Capability = {
  id: string
  title: string
  description: string
  tools: string[]
}

export const capabilities: Capability[] = [
  {
    id: 'apis',
    title: 'APIs REST',
    description: 'Diseño, desarrollo e integración de APIs REST entre servicios.',
    tools: ['FastAPI', 'Spring Boot', 'Postman'],
  },
  {
    id: 'automation',
    title: 'Automatización',
    description: 'Flujos automatizados con webhooks y consumo de APIs externas.',
    tools: ['n8n', 'Webhooks'],
  },
  {
    id: 'ai',
    title: 'IA aplicada',
    description: 'Soluciones RAG con Gemini, como un asistente jurídico inteligente.',
    tools: ['Gemini API', 'RAG'],
  },
  {
    id: 'deploy',
    title: 'Despliegue',
    description: 'Configuración y despliegue de aplicaciones en servidores Linux.',
    tools: ['Linux', 'Docker', 'Git'],
  },
]

export type Experience = {
  id: string
  role: string
  organization: string
  type: string
  start: { month: number; year: number }
  end: { month: number; year: number } | null
  highlights: string[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    id: 'vibratio',
    role: 'Pasante de Desarrollo Backend',
    organization: 'Vibratio EC S.A.S.',
    type: 'Pasantía',
    start: { month: 3, year: 2026 },
    end: { month: 6, year: 2026 },
    highlights: [
      'Desarrollo de funcionalidades backend utilizando Python y FastAPI.',
      'Implementación e integración de APIs REST entre servicios.',
      'Desarrollo de flujos de automatización utilizando n8n, webhooks y consumo de APIs.',
      'Desarrollo de una solución RAG basada en Gemini para la construcción de un asistente jurídico con inteligencia artificial.',
      'Configuración y despliegue de aplicaciones en servidores Linux.',
      'Implementación de mecanismos de seguridad para el consumo de APIs.',
      'Trabajo colaborativo mediante control de versiones con Git y metodologías ágiles.',
    ],
    stack: ['Python', 'FastAPI', 'n8n', 'Gemini API', 'RAG', 'Linux', 'Git'],
  },
  {
    id: 'inclusion-digital',
    role: 'Prácticas Preprofesionales',
    organization: 'Proyecto de Inclusión Digital',
    type: 'Prácticas',
    start: { month: 4, year: 2025 },
    end: { month: 7, year: 2025 },
    highlights: [],
    stack: [],
  },
]

export type Education = {
  id: string
  title: string
  institution: string
  period: string
  status: 'En curso' | 'Completado'
}

export const education: Education[] = [
  {
    id: 'epn',
    title: 'Ingeniería en Software',
    institution: 'Escuela Politécnica Nacional',
    period: '2023 – Actualidad',
    status: 'En curso',
  },
  {
    id: 'colegio',
    title: 'Bachiller en Ciencias',
    institution: 'Colegio Fernández Madrid',
    period: '2016 – 2022',
    status: 'Completado',
  },
]

export const certifications: Education[] = [
  {
    id: 'academic-two',
    title: 'Academic Two · Inglés B2',
    institution: 'Centro de Educación Continua · EPN',
    period: 'Actualmente',
    status: 'En curso',
  },
  {
    id: 'advanced-two',
    title: 'Advanced Two · Inglés B1',
    institution: 'Centro de Educación Continua · EPN',
    period: 'Certificado',
    status: 'Completado',
  },
]

export type SkillCategory = {
  id: string
  label: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'lenguajes',
    label: 'Lenguajes',
    skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'C++'],
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    skills: ['Spring Boot', 'React', 'FastAPI'],
  },
  {
    id: 'bases-de-datos',
    label: 'Bases de datos',
    skills: ['PostgreSQL', 'SQL Server', 'MySQL', 'MongoDB'],
  },
  {
    id: 'herramientas',
    label: 'Herramientas',
    skills: ['Git', 'Docker', 'Postman', 'Maven', 'Azure DevOps'],
  },
  {
    id: 'ia',
    label: 'IA y automatización',
    skills: ['Gemini API', 'n8n', 'RAG'],
  },
]

export const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

export type Language = {
  name: string
  level: string
  cefr?: { reached: (typeof cefrLevels)[number]; inProgress?: (typeof cefrLevels)[number] }
}

export const languages: Language[] = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'B1 · cursando B2', cefr: { reached: 'B1', inProgress: 'B2' } },
]

export const sections = [
  { id: 'inicio', label: 'Inicio', shortcut: '1' },
  { id: 'perfil', label: 'Perfil', shortcut: '2' },
  { id: 'experiencia', label: 'Experiencia', shortcut: '3' },
  { id: 'habilidades', label: 'Habilidades', shortcut: '4' },
  { id: 'formacion', label: 'Formación', shortcut: '5' },
  { id: 'contacto', label: 'Contacto', shortcut: '6' },
] as const

export type SectionId = (typeof sections)[number]['id']

export const lastUpdated = 'octubre de 2026'
