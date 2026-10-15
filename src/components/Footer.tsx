import { ArrowUp, CircleHelp } from 'lucide-react'
import { contact, person } from '../data/cv'
import { scrollToSection } from '../hooks/useScroll'
import { useContent, useUi } from '../i18n/context'
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './Icons'

export function Footer({ onOpenHelp }: { onOpenHelp: () => void }) {
  const ui = useUi()
  const t = ui.footer
  const { lastUpdated } = useContent()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__name">{person.shortName}</p>
          <p className="muted">{t.updated(lastUpdated)}</p>
        </div>
        <div className="site-footer__links">
          <a
            href={contact.linkedin.href}
            target="_blank"
            rel="noreferrer"
            className="icon-btn"
            aria-label={`LinkedIn ${ui.common.opensNewTab}`}
            title="LinkedIn"
          >
            <LinkedInIcon size={18} aria-hidden="true" />
          </a>
          <a
            href={contact.github.href}
            target="_blank"
            rel="noreferrer"
            className="icon-btn"
            aria-label={`GitHub ${ui.common.opensNewTab}`}
            title="GitHub"
          >
            <GitHubIcon size={18} aria-hidden="true" />
          </a>
          <button type="button" className="btn btn--ghost btn--sm" onClick={onOpenHelp}>
            <CircleHelp size={16} aria-hidden="true" />
            {t.help}
          </button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => scrollToSection('inicio')}>
            <ArrowUp size={16} aria-hidden="true" />
            {t.backTop}
          </button>
        </div>
      </div>
    </footer>
  )
}

export function WhatsAppButton() {
  const t = useUi().footer
  return (
    <a
      href={contact.whatsapp.href(t.whatsappMessage)}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab"
      aria-label={t.whatsappAria(contact.whatsapp.display)}
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
  const t = useUi().footer
  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'is-visible' : ''}`}
      onClick={() => scrollToSection('inicio')}
      aria-label={t.backTopAria}
      title={`${t.backTopAria} (1)`}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  )
}
