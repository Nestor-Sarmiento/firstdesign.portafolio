import type { UiStrings } from '../i18n/ui'

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

export const subjectIds = ['job', 'internship', 'freelance', 'academic', 'other'] as const
export type SubjectId = (typeof subjectIds)[number]

type Messages = UiStrings['validation']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateField(field: FieldName, value: string, m: Messages): string | null {
  const v = value.trim()
  switch (field) {
    case 'name':
      if (!v) return m.nameEmpty
      if (v.length < 2) return m.nameShort
      return null
    case 'email':
      if (!v) return m.emailEmpty
      if (/\s/.test(v)) return m.emailSpaces
      if (!v.includes('@')) return m.emailNoAt
      if (v.startsWith('@')) return m.emailNoUser
      if (!v.split('@')[1]?.includes('.')) return m.emailNoTld
      if (!EMAIL_RE.test(v)) return m.emailFormat
      return null
    case 'subject':
      if (!subjectIds.includes(v as SubjectId)) return m.subjectEmpty
      return null
    case 'message':
      if (!v) return m.messageEmpty
      if (v.length < limits.messageMin) return m.messageShort(limits.messageMin - v.length, limits.messageMin)
      if (v.length > limits.messageMax) return m.messageLong(v.length - limits.messageMax)
      return null
  }
}

export function validateForm(form: ContactForm, m: Messages) {
  const errors: Partial<Record<FieldName, string>> = {}
  for (const field of Object.keys(form) as FieldName[]) {
    const error = validateField(field, form[field], m)
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
