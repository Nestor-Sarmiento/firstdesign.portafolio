export type ContactForm = {
  name: string
  email: string
  subject: string
  message: string
}

export type FieldName = keyof ContactForm

export const emptyForm: ContactForm = { name: '', email: '', subject: '', message: '' }

export const limits = {
  nameMax: 80,
  messageMin: 20,
  messageMax: 1000,
}

export const subjects = [
  'Oportunidad laboral',
  'Prácticas o pasantía',
  'Proyecto freelance',
  'Colaboración académica',
  'Otro motivo',
]

export const fieldLabels: Record<FieldName, string> = {
  name: 'Nombre',
  email: 'Correo electrónico',
  subject: 'Motivo',
  message: 'Mensaje',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateField(field: FieldName, value: string): string | null {
  const v = value.trim()
  switch (field) {
    case 'name':
      if (!v) return 'Escribe tu nombre para saber a quién responder.'
      if (v.length < 2) return 'El nombre parece incompleto: usa al menos 2 letras.'
      return null
    case 'email':
      if (!v) return 'Escribe tu correo para poder responderte.'
      if (/\s/.test(v)) return 'El correo no puede tener espacios. Revisa si se coló alguno.'
      if (!v.includes('@')) return 'Al correo le falta el símbolo @. Ejemplo: nombre@empresa.com'
      if (v.startsWith('@')) return 'Falta la parte antes del @. Ejemplo: nombre@empresa.com'
      if (!v.split('@')[1]?.includes('.'))
        return 'Al dominio le falta la extensión, por ejemplo .com o .ec'
      if (!EMAIL_RE.test(v)) return 'Revisa el formato del correo. Ejemplo: nombre@empresa.com'
      return null
    case 'subject':
      if (!v) return 'Elige el motivo que mejor describa tu mensaje.'
      return null
    case 'message':
      if (!v) return 'Escribe tu mensaje.'
      if (v.length < limits.messageMin)
        return `Cuéntame un poco más: faltan ${limits.messageMin - v.length} caracteres (mínimo ${limits.messageMin}).`
      if (v.length > limits.messageMax)
        return `El mensaje supera el máximo por ${v.length - limits.messageMax} caracteres. Intenta resumirlo.`
      return null
  }
}

export function validateForm(form: ContactForm) {
  const errors: Partial<Record<FieldName, string>> = {}
  for (const field of Object.keys(form) as FieldName[]) {
    const error = validateField(field, form[field])
    if (error) errors[field] = error
  }
  return errors
}

const DOMAIN_TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'hotmail.con': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com',
  'outlook.con': 'outlook.com',
  'yaho.com': 'yahoo.com',
  'yahoo.con': 'yahoo.com',
  'epn.edu.e': 'epn.edu.ec',
}

export function suggestEmail(email: string): string | null {
  const [user, domain] = email.trim().toLowerCase().split('@')
  if (!user || !domain) return null
  const fix = DOMAIN_TYPOS[domain]
  return fix ? `${user}@${fix}` : null
}
