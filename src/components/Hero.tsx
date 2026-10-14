import { useState } from 'react'
import { ArrowRight, Download, GraduationCap, Mail } from 'lucide-react'
import { contact, experience, profile, skillCategories } from '../data/cv'
import { GitHubIcon, LinkedInIcon } from './Icons'
import { scrollToSection } from '../hooks/useScroll'
import { useToast } from './toast-context'
import { modKey } from '../lib/platform'

const totalSkills = skillCategories.reduce((sum, c) => sum + c.skills.length, 0)

const stats = [
  { value: String(experience.length), label: 'experiencias profesionales' },
  { value: `${totalSkills}`, label: 'tecnologías en el stack' },
  { value: 'EPN', label: 'Ingeniería en Software' },
]

export function Hero() {
  const notify = useToast()
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="status-pill">
            <span className="status-pill__dot" aria-hidden="true" />
            Abierto a oportunidades como desarrollador Full Stack
          </p>

          <h1 id="hero-title" className="hero__title" tabIndex={-1} data-section-heading>
            {profile.firstName}
            <span className="hero__title-accent">{profile.lastName}</span>
          </h1>

          <p className="hero__role">
            <GraduationCap size={20} aria-hidden="true" />
            {profile.role}
          </p>
          <p className="hero__focus">{profile.focus}</p>

          <p className="hero__lead">{profile.tagline}</p>

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
              Contactar
              <ArrowRight size={18} aria-hidden="true" className="btn__trail" />
            </a>
            <a
              href={profile.cv.href}
              download={profile.cv.fileName}
              className="btn btn--secondary"
              onClick={() =>
                notify({
                  tone: 'success',
                  message: 'Descarga iniciada',
                  description: `${profile.cv.fileName} se guardará en tu carpeta de descargas.`,
                })
              }
            >
              <Download size={18} aria-hidden="true" />
              Descargar CV
              <span className="btn__meta">{profile.cv.meta}</span>
            </a>
          </div>

          <ul className="hero__social" aria-label="Perfiles profesionales">
            <li>
              <a href={contact.linkedin.href} target="_blank" rel="noreferrer" className="social-link">
                <LinkedInIcon size={18} aria-hidden="true" />
                LinkedIn
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>
            </li>
            <li>
              <a href={contact.github.href} target="_blank" rel="noreferrer" className="social-link">
                <GitHubIcon size={18} aria-hidden="true" />
                GitHub
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="hero__visual">
          <figure className="portrait">
            {photoFailed ? (
              <div className="portrait__fallback" role="img" aria-label={`Iniciales de ${profile.shortName}`}>
                {profile.initials}
              </div>
            ) : (
              <img
                src={profile.photo}
                alt={`Fotografía de ${profile.shortName}`}
                width={600}
                height={540}
                onError={() => setPhotoFailed(true)}
              />
            )}
            <figcaption className="portrait__badge">
              <span className="portrait__badge-label">Stack principal</span>
              <span className="portrait__badge-value">Python · FastAPI · Java</span>
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
          Consejo: presiona <kbd className="kbd">{modKey}</kbd> <kbd className="kbd">K</kbd> para buscar o{' '}
          <kbd className="kbd">?</kbd> para ver la ayuda.
        </p>
      </div>
    </section>
  )
}
