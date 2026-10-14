import { ArrowUp, CircleHelp } from 'lucide-react'
import { contact, lastUpdated, profile } from '../data/cv'
import { scrollToSection } from '../hooks/useScroll'
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './Icons'

export function Footer({ onOpenHelp }: { onOpenHelp: () => void }) {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__name">{profile.shortName}</p>
          <p className="muted">Actualizado en {lastUpdated} · Hecho con React</p>
        </div>
        <div className="site-footer__links">
          <a href={contact.linkedin.href} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn (se abre en una pestaña nueva)" title="LinkedIn">
            <LinkedInIcon size={18} aria-hidden="true" />
          </a>
          <a href={contact.github.href} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub (se abre en una pestaña nueva)" title="GitHub">
            <GitHubIcon size={18} aria-hidden="true" />
          </a>
          <button type="button" className="btn btn--ghost btn--sm" onClick={onOpenHelp}>
            <CircleHelp size={16} aria-hidden="true" />
            Ayuda y atajos
          </button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => scrollToSection('inicio')}>
            <ArrowUp size={16} aria-hidden="true" />
            Volver arriba
          </button>
        </div>
      </div>
    </footer>
  )
}

export function WhatsAppButton() {
  return (
    <a
      href={contact.whatsapp.href}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab"
      aria-label={`Escribir por WhatsApp al ${contact.whatsapp.display} (se abre en una pestaña nueva)`}
      title={`WhatsApp · ${contact.whatsapp.display}`}
    >
      <WhatsAppIcon size={26} aria-hidden="true" />
      <span className="whatsapp-fab__label" aria-hidden="true">
        WhatsApp
      </span>
    </a>
  )
}

export function BackToTop({ visible }: { visible: boolean }) {
  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'is-visible' : ''}`}
      onClick={() => scrollToSection('inicio')}
      aria-label="Volver al inicio"
      title="Volver al inicio (1)"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  )
}
