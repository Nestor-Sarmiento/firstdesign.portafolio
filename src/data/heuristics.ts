import type { Lang } from '../i18n/context'

export type Heuristic = {
  title: string
  applied: string
}

export const heuristics: Record<Lang, Heuristic[]> = {
  es: [
    {
      title: 'Visibilidad del estado del sistema',
      applied:
        'Barra de progreso de lectura, sección activa resaltada en el menú, avisos al copiar, descargar o cambiar de idioma, estado del borrador y avance real de la carrera (semestre 7 de 9).',
    },
    {
      title: 'Relación entre el sistema y el mundo real',
      applied:
        'Lenguaje cotidiano, fechas en formato local con duración calculada, línea de tiempo para la experiencia, escala MCER real para los idiomas e íconos reconocibles como el de WhatsApp.',
    },
    {
      title: 'Control y libertad del usuario',
      applied:
        'Todo diálogo se cierra con Esc o con su botón, el formulario se puede limpiar y deshacer, y el usuario elige tema (claro/oscuro) e idioma (español/inglés).',
    },
    {
      title: 'Consistencia y estándares',
      applied:
        'Un solo sistema de colores, tipografía y botones; menú en la parte superior; botón de WhatsApp en la esquina inferior derecha, donde se espera; enlaces externos siempre con el mismo ícono.',
    },
    {
      title: 'Prevención de errores',
      applied:
        'Validación del formulario mientras se escribe, límites de caracteres visibles, detección de dominios de correo mal escritos, borrador guardado automáticamente y vista previa del CV antes de descargarlo.',
    },
    {
      title: 'Reconocimiento en lugar de recuerdo',
      applied:
        'Menú siempre visible con etiquetas, íconos acompañados de texto, atajos mostrados junto a cada acción y motivos de contacto predefinidos.',
    },
    {
      title: 'Flexibilidad y eficiencia de uso',
      applied:
        'Paleta de comandos (Ctrl/⌘ + K), atajos numéricos por sección, tecla L para cambiar de idioma, filtro y búsqueda de habilidades y contacto directo por WhatsApp.',
    },
    {
      title: 'Diseño estético y minimalista',
      applied:
        'Jerarquía tipográfica clara, espacio en blanco generoso, paleta reducida y contenido limitado a lo que aporta valor al lector.',
    },
    {
      title: 'Ayudar a reconocer, diagnosticar y corregir errores',
      applied:
        'Mensajes de error en lenguaje claro que indican cómo corregir, resumen de errores con enlaces al campo y alternativas cuando una acción falla.',
    },
    {
      title: 'Ayuda y documentación',
      applied:
        'Este panel de ayuda (tecla ?) con guía de navegación, lista de atajos y la explicación de cómo se aplicó cada principio, disponible en ambos idiomas.',
    },
  ],
  en: [
    {
      title: 'Visibility of system status',
      applied:
        'Reading progress bar, active section highlighted in the menu, notifications when copying, downloading or switching language, draft status and actual degree progress (semester 7 of 9).',
    },
    {
      title: 'Match between the system and the real world',
      applied:
        'Everyday language, localized dates with computed durations, a timeline for experience, the real CEFR scale for languages and familiar icons such as WhatsApp.',
    },
    {
      title: 'User control and freedom',
      applied:
        'Every dialog closes with Esc or its button, the form can be cleared and the action undone, and users choose the theme (light/dark) and language (Spanish/English).',
    },
    {
      title: 'Consistency and standards',
      applied:
        'A single system of colors, type and buttons; the menu at the top; the WhatsApp button in the bottom-right corner where people expect it; external links always use the same icon.',
    },
    {
      title: 'Error prevention',
      applied:
        'Live form validation, visible character limits, detection of misspelled email domains, an automatically saved draft and a CV preview before downloading it.',
    },
    {
      title: 'Recognition rather than recall',
      applied:
        'An always-visible labeled menu, icons paired with text, shortcuts shown next to each action and predefined contact reasons.',
    },
    {
      title: 'Flexibility and efficiency of use',
      applied:
        'Command palette (Ctrl/⌘ + K), numeric shortcuts per section, the L key to switch language, skill filtering and search, and direct contact over WhatsApp.',
    },
    {
      title: 'Aesthetic and minimalist design',
      applied:
        'Clear typographic hierarchy, generous white space, a reduced palette and content limited to what is valuable to the reader.',
    },
    {
      title: 'Help users recognize, diagnose and recover from errors',
      applied:
        'Plain-language error messages that explain how to fix the problem, an error summary linking to each field and alternatives when an action fails.',
    },
    {
      title: 'Help and documentation',
      applied:
        'This help panel (? key) with a navigation guide, the list of shortcuts and an explanation of how each principle was applied, available in both languages.',
    },
  ],
}
