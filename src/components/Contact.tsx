import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Eraser,
  Lightbulb,
  Mail,
  Pencil,
  Phone,
  Send,
} from 'lucide-react'
import { contact, profile } from '../data/cv'
import { copyText } from '../lib/clipboard'
import {
  emptyForm,
  fieldLabels,
  limits,
  subjects,
  suggestEmail,
  validateForm,
} from '../lib/validation'
import type { ContactForm, FieldName } from '../lib/validation'
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './Icons'
import { Section } from './Section'
import { useToast } from './toast-context'

const DRAFT_KEY = 'contact-draft'

function loadDraft(): ContactForm {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return emptyForm
    return { ...emptyForm, ...(JSON.parse(raw) as Partial<ContactForm>) }
  } catch {
    return emptyForm
  }
}

function useCopy() {
  const notify = useToast()
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (key: string, value: string, label: string) => {
    const ok = await copyText(value)
    if (ok) {
      setCopied(key)
      window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 2000)
      notify({ tone: 'success', message: `${label} copiado`, description: value })
    } else {
      notify({
        tone: 'error',
        message: `No se pudo copiar el ${label.toLowerCase()}`,
        description: `Tu navegador bloqueó el portapapeles. Selecciona el texto “${value}” y cópialo manualmente.`,
        duration: 8000,
      })
    }
    return ok
  }

  return { copied, copy }
}

type Method = {
  key: string
  label: string
  value: string
  icon: ReactNode
  href: string
  actionLabel: string
  external?: boolean
  copyValue?: string
}

const methods: Method[] = [
  {
    key: 'email',
    label: 'Correo',
    value: contact.email,
    icon: <Mail size={20} aria-hidden="true" />,
    href: `mailto:${contact.email}`,
    actionLabel: 'Escribir',
    copyValue: contact.email,
  },
  {
    key: 'phone',
    label: 'Teléfono',
    value: contact.phoneDisplay,
    icon: <Phone size={20} aria-hidden="true" />,
    href: contact.phoneHref,
    actionLabel: 'Llamar',
    copyValue: contact.phoneRaw,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    value: contact.whatsapp.display,
    icon: <WhatsAppIcon size={20} aria-hidden="true" />,
    href: contact.whatsapp.href,
    actionLabel: 'Chatear',
    external: true,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: contact.linkedin.label,
    icon: <LinkedInIcon size={20} aria-hidden="true" />,
    href: contact.linkedin.href,
    actionLabel: 'Ver perfil',
    external: true,
  },
  {
    key: 'github',
    label: 'GitHub',
    value: contact.github.label,
    icon: <GitHubIcon size={20} aria-hidden="true" />,
    href: contact.github.href,
    actionLabel: 'Ver repositorios',
    external: true,
  },
]

export function Contact() {
  const { copied, copy } = useCopy()

  return (
    <Section
      id="contacto"
      index="05"
      eyebrow="Contacto"
      title="Hablemos"
      description="¿Tienes una oportunidad, un proyecto o una pregunta? Escríbeme por el medio que prefieras."
    >
      <div className="contact">
        <ul className="contact-methods" data-reveal>
          {methods.map((m) => (
            <li key={m.key} className="card method">
              <span className="method__icon">{m.icon}</span>
              <div className="method__body">
                <span className="method__label">{m.label}</span>
                <span className="method__value">{m.value}</span>
              </div>
              <div className="method__actions">
                {m.copyValue && (
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => copy(m.key, m.copyValue!, m.label)}
                    aria-label={`Copiar ${m.label.toLowerCase()}`}
                    title={`Copiar ${m.label.toLowerCase()}`}
                  >
                    {copied === m.key ? (
                      <Check size={18} aria-hidden="true" className="text-success" />
                    ) : (
                      <Copy size={18} aria-hidden="true" />
                    )}
                  </button>
                )}
                <a
                  className="btn btn--ghost btn--sm"
                  href={m.href}
                  {...(m.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {m.actionLabel}
                  {m.external && (
                    <>
                      <ArrowUpRight size={16} aria-hidden="true" />
                      <span className="sr-only">(se abre en una pestaña nueva)</span>
                    </>
                  )}
                </a>
              </div>
            </li>
          ))}
        </ul>

        <ContactFormCard onCopy={copy} />
      </div>
    </Section>
  )
}

type Status = 'editing' | 'sent'

function ContactFormCard({
  onCopy,
}: {
  onCopy: (key: string, value: string, label: string) => Promise<boolean>
}) {
  const notify = useToast()
  const [form, setForm] = useState<ContactForm>(loadDraft)
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [showSummary, setShowSummary] = useState(false)
  const [status, setStatus] = useState<Status>('editing')
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  const isEmpty = Object.values(form).every((v) => !v.trim())
  const errors = validateForm(form)
  const errorEntries = Object.entries(errors) as [FieldName, string][]
  const emailSuggestion = !errors.email ? suggestEmail(form.email) : null
  const messageLength = form.message.trim().length

  useEffect(() => {
    if (status !== 'editing') return
    const id = window.setTimeout(() => {
      try {
        if (isEmpty) {
          localStorage.removeItem(DRAFT_KEY)
          setSavedAt(null)
        } else {
          localStorage.setItem(DRAFT_KEY, JSON.stringify(form))
          setSavedAt(new Date())
        }
      } catch {
        /* storage unavailable: drafts are a convenience, not a requirement */
      }
    }, 600)
    return () => window.clearTimeout(id)
  }, [form, isEmpty, status])

  const update = (field: FieldName, value: string) => setForm((f) => ({ ...f, [field]: value }))
  const blur = (field: FieldName) => setTouched((t) => ({ ...t, [field]: true }))
  const errorFor = (field: FieldName) => (touched[field] || showSummary ? errors[field] : undefined)

  const clear = () => {
    const previous = form
    setForm(emptyForm)
    setTouched({})
    setShowSummary(false)
    notify({
      message: 'Formulario limpiado',
      description: 'Si fue un error, puedes recuperar lo que escribiste.',
      action: {
        label: 'Deshacer',
        onClick: () => setForm(previous),
      },
    })
  }

  const composeBody = () =>
    `Hola Néstor,\n\n${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (errorEntries.length > 0) {
      setShowSummary(true)
      setTouched({ name: true, email: true, subject: true, message: true })
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    const subject = `[Portafolio] ${form.subject} — ${form.name.trim()}`
    const url = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composeBody())}`
    window.location.href = url
    setStatus('sent')
    try {
      localStorage.removeItem(DRAFT_KEY)
    } catch {
      /* ignore */
    }
  }

  if (status === 'sent') {
    return (
      <div className="card contact-form contact-form--done" role="status">
        <CheckCircle2 size={40} className="text-success" aria-hidden="true" />
        <h3 className="contact-form__title">¡Mensaje listo para enviar!</h3>
        <p>
          Abrimos tu aplicación de correo con el mensaje ya redactado. Solo revisa y presiona{' '}
          <strong>Enviar</strong>.
        </p>
        <div className="callout">
          <Lightbulb size={18} aria-hidden="true" />
          <p>
            ¿No se abrió nada? Copia el mensaje y envíalo a <strong>{contact.email}</strong> desde tu correo
            habitual.
          </p>
        </div>
        <div className="contact-form__actions">
          <button type="button" className="btn btn--secondary" onClick={() => onCopy('body', composeBody(), 'Mensaje')}>
            <Copy size={18} aria-hidden="true" />
            Copiar mensaje
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => setStatus('editing')}>
            <Pencil size={18} aria-hidden="true" />
            Volver a editar
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setForm(emptyForm)
              setTouched({})
              setStatus('editing')
            }}
          >
            Escribir otro mensaje
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="card contact-form" onSubmit={onSubmit} noValidate aria-labelledby="form-title">
      <div className="contact-form__head">
        <h3 id="form-title" className="contact-form__title">
          Envíame un mensaje
        </h3>
        <p className="draft-status" aria-live="polite">
          {savedAt ? (
            <>
              <Check size={14} aria-hidden="true" /> Borrador guardado en este navegador
            </>
          ) : (
            'Los campos con * son obligatorios'
          )}
        </p>
      </div>

      {showSummary && errorEntries.length > 0 && (
        <div className="error-summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <p className="error-summary__title">
            <AlertCircle size={18} aria-hidden="true" />
            {errorEntries.length === 1
              ? 'Falta corregir 1 campo antes de enviar:'
              : `Faltan corregir ${errorEntries.length} campos antes de enviar:`}
          </p>
          <ul>
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#field-${field}`} onClick={(e) => (e.preventDefault(), document.getElementById(`field-${field}`)?.focus())}>
                  <strong>{fieldLabels[field]}:</strong> {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-row">
        <Field id="name" label="Nombre" error={errorFor('name')}>
          <input
            id="field-name"
            type="text"
            autoComplete="name"
            maxLength={limits.nameMax}
            placeholder="¿Cómo te llamas?"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => blur('name')}
            aria-invalid={!!errorFor('name')}
            aria-describedby={errorFor('name') ? 'error-name' : undefined}
            required
          />
        </Field>

        <Field
          id="email"
          label="Correo electrónico"
          error={errorFor('email')}
          extra={
            emailSuggestion && (
              <p className="field__hint field__hint--warn" id="hint-email">
                <Lightbulb size={14} aria-hidden="true" />
                ¿Quisiste decir{' '}
                <button type="button" className="link-btn" onClick={() => update('email', emailSuggestion)}>
                  {emailSuggestion}
                </button>
                ?
              </p>
            )
          }
        >
          <input
            id="field-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="nombre@empresa.com"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => blur('email')}
            aria-invalid={!!errorFor('email')}
            aria-describedby={
              [errorFor('email') && 'error-email', emailSuggestion && 'hint-email'].filter(Boolean).join(' ') ||
              undefined
            }
            required
          />
        </Field>
      </div>

      <Field id="subject" label="Motivo" error={errorFor('subject')}>
        <select
          id="field-subject"
          value={form.subject}
          onChange={(e) => {
            update('subject', e.target.value)
            blur('subject')
          }}
          onBlur={() => blur('subject')}
          aria-invalid={!!errorFor('subject')}
          aria-describedby={errorFor('subject') ? 'error-subject' : undefined}
          required
        >
          <option value="" disabled>
            Elige un motivo…
          </option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="message"
        label="Mensaje"
        error={errorFor('message')}
        extra={
          <p
            className={`field__counter ${messageLength > limits.messageMax * 0.9 ? 'is-warn' : ''}`}
            id="counter-message"
          >
            {messageLength} / {limits.messageMax}
            <span className="sr-only"> caracteres</span>
          </p>
        }
      >
        <textarea
          id="field-message"
          rows={5}
          maxLength={limits.messageMax}
          placeholder="Cuéntame sobre la oportunidad o el proyecto…"
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          onBlur={() => blur('message')}
          aria-invalid={!!errorFor('message')}
          aria-describedby={['counter-message', errorFor('message') && 'error-message'].filter(Boolean).join(' ')}
          required
        />
      </Field>

      <div className="contact-form__actions">
        <button type="submit" className="btn btn--primary">
          <Send size={18} aria-hidden="true" />
          Preparar correo
        </button>
        <button type="button" className="btn btn--ghost" onClick={clear} disabled={isEmpty}>
          <Eraser size={18} aria-hidden="true" />
          Limpiar
        </button>
      </div>
      <p className="contact-form__note muted">
        Al enviar se abrirá tu aplicación de correo con el mensaje dirigido a {profile.shortName}. No se
        almacena nada en servidores.
      </p>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  extra,
  children,
}: {
  id: string
  label: string
  error?: string
  extra?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={`field-${id}`} className="field__label">
        {label} <span aria-hidden="true" className="field__req">*</span>
      </label>
      {children}
      <div className="field__meta">
        {error ? (
          <p className="field__error" id={`error-${id}`}>
            <AlertCircle size={14} aria-hidden="true" />
            {error}
          </p>
        ) : (
          <span />
        )}
        {extra}
      </div>
    </div>
  )
}
