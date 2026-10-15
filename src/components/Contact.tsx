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
import { contact, person } from '../data/cv'
import { copyText } from '../lib/clipboard'
import { emptyForm, limits, subjectIds, suggestEmail, validateForm } from '../lib/validation'
import type { ContactForm, FieldName, SubjectId } from '../lib/validation'
import { useUi } from '../i18n/context'
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './Icons'
import { Section } from './Section'
import { useToast } from './toast-context'

const DRAFT_KEY = 'contact-draft'

function loadDraft(): ContactForm {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return emptyForm
    const draft = { ...emptyForm, ...(JSON.parse(raw) as Partial<ContactForm>) }
    if (!subjectIds.includes(draft.subject as SubjectId)) draft.subject = ''
    return draft
  } catch {
    return emptyForm
  }
}

function useCopy() {
  const notify = useToast()
  const t = useUi().contact
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (key: string, value: string, label: string) => {
    const ok = await copyText(value)
    if (ok) {
      setCopied(key)
      window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 2000)
      notify({ tone: 'success', message: t.copied(label), description: value })
    } else {
      notify({
        tone: 'error',
        message: t.copyFailed(label),
        description: t.copyFailedDesc(value),
        duration: 8000,
      })
    }
    return ok
  }

  return { copied, copy }
}

type MethodKey = 'email' | 'phone' | 'whatsapp' | 'linkedin' | 'github'

type Method = {
  key: MethodKey
  value: string
  icon: ReactNode
  href: string
  external?: boolean
  copyValue?: string
}

export function Contact() {
  const ui = useUi()
  const t = ui.contact
  const { copied, copy } = useCopy()

  const methods: Method[] = [
    {
      key: 'email',
      value: contact.email,
      icon: <Mail size={20} aria-hidden="true" />,
      href: `mailto:${contact.email}`,
      copyValue: contact.email,
    },
    {
      key: 'phone',
      value: contact.phoneDisplay,
      icon: <Phone size={20} aria-hidden="true" />,
      href: contact.phoneHref,
      copyValue: contact.phoneRaw,
    },
    {
      key: 'whatsapp',
      value: contact.whatsapp.display,
      icon: <WhatsAppIcon size={20} aria-hidden="true" />,
      href: contact.whatsapp.href(ui.footer.whatsappMessage),
      external: true,
    },
    {
      key: 'linkedin',
      value: contact.linkedin.label,
      icon: <LinkedInIcon size={20} aria-hidden="true" />,
      href: contact.linkedin.href,
      external: true,
    },
    {
      key: 'github',
      value: contact.github.label,
      icon: <GitHubIcon size={20} aria-hidden="true" />,
      href: contact.github.href,
      external: true,
    },
  ]

  return (
    <Section id="contacto" index="05" eyebrow={t.eyebrow} title={t.title} description={t.desc}>
      <div className="contact">
        <ul className="contact-methods" data-reveal>
          {methods.map((m) => {
            const label = t.methods[m.key]
            return (
              <li key={m.key} className="card method">
                <span className="method__icon">{m.icon}</span>
                <div className="method__body">
                  <span className="method__label">{label}</span>
                  <span className="method__value">{m.value}</span>
                </div>
                <div className="method__actions">
                  {m.copyValue && (
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => copy(m.key, m.copyValue!, label)}
                      aria-label={t.copy(label)}
                      title={t.copy(label)}
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
                    {t.actions[m.key]}
                    {m.external && (
                      <>
                        <ArrowUpRight size={16} aria-hidden="true" />
                        <span className="sr-only">{ui.common.opensNewTab}</span>
                      </>
                    )}
                  </a>
                </div>
              </li>
            )
          })}
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
  const ui = useUi()
  const t = ui.contact
  const f = t.form
  const [form, setForm] = useState<ContactForm>(loadDraft)
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [showSummary, setShowSummary] = useState(false)
  const [status, setStatus] = useState<Status>('editing')
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  const isEmpty = Object.values(form).every((v) => !v.trim())
  const errors = validateForm(form, ui.validation)
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

  const update = (field: FieldName, value: string) => setForm((prev) => ({ ...prev, [field]: value }))
  const blur = (field: FieldName) => setTouched((prev) => ({ ...prev, [field]: true }))
  const errorFor = (field: FieldName) => (touched[field] || showSummary ? errors[field] : undefined)

  const clear = () => {
    const previous = form
    setForm(emptyForm)
    setTouched({})
    setShowSummary(false)
    notify({
      message: f.cleared,
      description: f.clearedDesc,
      action: {
        label: f.undo,
        onClick: () => setForm(previous),
      },
    })
  }

  const composeBody = () =>
    `${t.mail.greeting}\n\n${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (errorEntries.length > 0) {
      setShowSummary(true)
      setTouched({ name: true, email: true, subject: true, message: true })
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    const subjectLabel = f.subjects[form.subject as SubjectId]
    const subject = `${t.mail.subjectPrefix} ${subjectLabel} — ${form.name.trim()}`
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
        <h3 className="contact-form__title">{t.sent.title}</h3>
        <p>
          {t.sent.before} <strong>{t.sent.send}</strong>.
        </p>
        <div className="callout">
          <Lightbulb size={18} aria-hidden="true" />
          <p>
            {t.sent.fallbackBefore} <strong>{contact.email}</strong> {t.sent.fallbackAfter}
          </p>
        </div>
        <div className="contact-form__actions">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => onCopy('body', composeBody(), f.messageLabel)}
          >
            <Copy size={18} aria-hidden="true" />
            {t.sent.copy}
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => setStatus('editing')}>
            <Pencil size={18} aria-hidden="true" />
            {t.sent.edit}
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
            {t.sent.another}
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="card contact-form" onSubmit={onSubmit} noValidate aria-labelledby="form-title">
      <div className="contact-form__head">
        <h3 id="form-title" className="contact-form__title">
          {f.title}
        </h3>
        <p className="draft-status" aria-live="polite">
          {savedAt ? (
            <>
              <Check size={14} aria-hidden="true" /> {f.draftSaved}
            </>
          ) : (
            f.required
          )}
        </p>
      </div>

      {showSummary && errorEntries.length > 0 && (
        <div className="error-summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <p className="error-summary__title">
            <AlertCircle size={18} aria-hidden="true" />
            {f.summary(errorEntries.length)}
          </p>
          <ul>
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a
                  href={`#field-${field}`}
                  onClick={(e) => (e.preventDefault(), document.getElementById(`field-${field}`)?.focus())}
                >
                  <strong>{f.labels[field]}:</strong> {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-row">
        <Field id="name" label={f.labels.name} error={errorFor('name')}>
          <input
            id="field-name"
            type="text"
            autoComplete="name"
            maxLength={limits.nameMax}
            placeholder={f.placeholders.name}
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
          label={f.labels.email}
          error={errorFor('email')}
          extra={
            emailSuggestion && (
              <p className="field__hint field__hint--warn" id="hint-email">
                <Lightbulb size={14} aria-hidden="true" />
                {f.didYouMean}{' '}
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
            placeholder={f.placeholders.email}
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

      <Field id="subject" label={f.labels.subject} error={errorFor('subject')}>
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
            {f.chooseSubject}
          </option>
          {subjectIds.map((id) => (
            <option key={id} value={id}>
              {f.subjects[id]}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="message"
        label={f.labels.message}
        error={errorFor('message')}
        extra={
          <p
            className={`field__counter ${messageLength > limits.messageMax * 0.9 ? 'is-warn' : ''}`}
            id="counter-message"
          >
            {messageLength} / {limits.messageMax}
            <span className="sr-only"> {f.characters}</span>
          </p>
        }
      >
        <textarea
          id="field-message"
          rows={5}
          maxLength={limits.messageMax}
          placeholder={f.placeholders.message}
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
          {f.submit}
        </button>
        <button type="button" className="btn btn--ghost" onClick={clear} disabled={isEmpty}>
          <Eraser size={18} aria-hidden="true" />
          {f.clear}
        </button>
      </div>
      <p className="contact-form__note muted">{f.note(person.shortName)}</p>
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
