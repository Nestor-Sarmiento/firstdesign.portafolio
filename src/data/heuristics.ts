export type Heuristic = {
  number: number
  title: string
  applied: string
}

export const heuristics: Heuristic[] = [
  {
    number: 1,
    title: 'Visibilidad del estado del sistema',
    applied:
      'Barra de progreso de lectura, sección activa resaltada en el menú, avisos al copiar o descargar, y estado visible del borrador y del envío del formulario.',
  },
  {
    number: 2,
    title: 'Relación entre el sistema y el mundo real',
    applied:
      'Lenguaje cotidiano en español, fechas en formato local con duración calculada, línea de tiempo para la experiencia y escala MCER real para los idiomas.',
  },
  {
    number: 3,
    title: 'Control y libertad del usuario',
    applied:
      'Todo diálogo se cierra con Esc o con su botón, el formulario se puede limpiar y deshacer, el tema claro/oscuro es elegible y hay botón para volver arriba.',
  },
  {
    number: 4,
    title: 'Consistencia y estándares',
    applied:
      'Un solo sistema de colores, tipografía y botones; menú de navegación en la parte superior; los enlaces externos siempre muestran el mismo ícono.',
  },
  {
    number: 5,
    title: 'Prevención de errores',
    applied:
      'Validación del formulario mientras se escribe, límites de caracteres visibles, detección de dominios de correo mal escritos y borrador guardado automáticamente.',
  },
  {
    number: 6,
    title: 'Reconocimiento en lugar de recuerdo',
    applied:
      'Menú siempre visible con etiquetas, íconos acompañados de texto, atajos mostrados junto a cada acción y asuntos de contacto predefinidos.',
  },
  {
    number: 7,
    title: 'Flexibilidad y eficiencia de uso',
    applied:
      'Paleta de comandos (Ctrl/⌘ + K), atajos numéricos para cada sección, filtro y búsqueda de habilidades y copia del correo con un clic.',
  },
  {
    number: 8,
    title: 'Diseño estético y minimalista',
    applied:
      'Jerarquía tipográfica clara, espacio en blanco generoso, paleta reducida y contenido limitado a lo que aporta valor al lector.',
  },
  {
    number: 9,
    title: 'Ayudar a reconocer, diagnosticar y corregir errores',
    applied:
      'Mensajes de error en lenguaje claro que indican cómo corregir, resumen de errores con enlaces al campo y alternativas cuando una acción falla.',
  },
  {
    number: 10,
    title: 'Ayuda y documentación',
    applied:
      'Este panel de ayuda (tecla ?) con guía de navegación, lista de atajos y la explicación de cómo se aplicó cada principio.',
  },
]
