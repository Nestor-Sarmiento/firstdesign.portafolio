import { useState } from 'react'
import { ArrowRight, Download, Eye, GraduationCap, Mail } from 'lucide-react'
import { contact, person } from '../data/cv'
import { GitHubIcon, LinkedInIcon } from './Icons'
import { scrollToSection } from '../hooks/useScroll'
import { useToast } from './toast-context'
import { modKey } from '../lib/platform'
import { useContent, useUi } from '../i18n/context'

export function Hero({ onPreviewCv }: { onPreviewCv: () => void }) {
  const notify = useToast()
  const ui = useUi()
  const t = ui.hero
  const c = useContent()
  const [photoFailed, setPhotoFailed] = useState(false)

  const totalSkills = c.skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0)
  const stats = [
    { value: String(c.experience.length), label: t.stats.experience },
    { value: String(totalSkills), label: t.stats.technologies },
    { value: `${person.semester.current}/${person.semester.total}`, label: t.stats.semester },
  ]

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="status-pill">
            <span className="status-pill__dot" aria-hidden="true" />
            {c.status}
          </p>

          <h1 id="hero-title" className="hero__title" tabIndex={-1} data-section-heading>
            {person.firstName}
            <span className="hero__title-accent">{person.lastName}</span>
          </h1>

          <p className="hero__role">
            <GraduationCap size={20} aria-hidden="true" />
            {c.role}
          </p>
          <p className="hero__focus">{c.focus}</p>

          <p className="hero__lead">{c.tagline}</p>

          <div className="hero__actions">
            <a
              href="#contacto"
              className="btn btn--primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('contacto')
              }}
            >
              <Mail size={18} aria-hidden="true" />
              {t.contact}
              <ArrowRight size={18} aria-hidden="true" className="btn__trail" />
            </a>
            <a
              href={person.cv.href}
              download={person.cv.fileName}
              className="btn btn--secondary"
              onClick={() =>
                notify({
                  tone: 'success',
                  message: t.downloadStarted,
                  description: t.downloadDesc(person.cv.fileName),
                })
              }
            >
              <Download size={18} aria-hidden="true" />
              {t.downloadCv}
              <span className="btn__meta">{t.cvMeta}</span>
            </a>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onPreviewCv}
              aria-label={t.previewCvAria}
              title={`${t.previewCvAria} (V)`}
            >
              <Eye size={18} aria-hidden="true" />
              {t.previewCv}
            </button>
          </div>

          <ul className="hero__social" aria-label={t.profiles}>
            <li>
              <a href={contact.linkedin.href} target="_blank" rel="noreferrer" className="social-link">
                <LinkedInIcon size={18} aria-hidden="true" />
                LinkedIn
                <span className="sr-only">{ui.common.opensNewTab}</span>
              </a>
            </li>
            <li>
              <a href={contact.github.href} target="_blank" rel="noreferrer" className="social-link">
                <GitHubIcon size={18} aria-hidden="true" />
                GitHub
                <span className="sr-only">{ui.common.opensNewTab}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="hero__visual">
          <figure className="portrait">
            {photoFailed ? (
              <div className="portrait__fallback" role="img" aria-label={t.initialsAlt(person.shortName)}>
                {person.initials}
              </div>
            ) : (
              <img
                src={person.photo}
                alt={t.photoAlt(person.shortName)}
                width={600}
                height={540}
                onError={() => setPhotoFailed(true)}
              />
            )}
            <figcaption className="portrait__badge">
              <span className="portrait__badge-label">{t.stackLabel}</span>
              <span className="portrait__badge-value">{person.stack}</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="container">
        <dl className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stats__item">
              <dt className="stats__label">{s.label}</dt>
              <dd className="stats__value">{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="hero__hint">
          {t.hintBefore} <kbd className="kbd">{modKey}</kbd> <kbd className="kbd">K</kbd> {t.hintMiddle}{' '}
          <kbd className="kbd">?</kbd> {t.hintAfter}
        </p>
      </div>
    </section>
  )
}
