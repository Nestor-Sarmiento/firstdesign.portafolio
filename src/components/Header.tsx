import { useEffect, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { CircleHelp, Languages, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { getSections, person } from '../data/cv'
import type { SectionId } from '../data/cv'
import type { Theme } from '../hooks/useTheme'
import { scrollToSection } from '../hooks/useScroll'
import { modKey } from '../lib/platform'
import { useContent, useUi } from '../i18n/context'

type Props = {
  active: SectionId
  progress: number
  scrolled: boolean
  theme: Theme
  onToggleTheme: () => void
  onToggleLang: () => void
  onOpenPalette: () => void
  onOpenHelp: () => void
}

export function Header({
  active,
  progress,
  scrolled,
  theme,
  onToggleTheme,
  onToggleLang,
  onOpenPalette,
  onOpenHelp,
}: Props) {
  const t = useUi().header
  const sections = getSections(useContent())
  const navSections = sections.filter((s) => s.id !== 'inicio')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    const onResize = () => window.innerWidth > 960 && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  const go = (id: string) => (event: ReactMouseEvent) => {
    event.preventDefault()
    setMenuOpen(false)
    scrollToSection(id)
  }

  const themeLabel = t.themeTo(theme !== 'dark')
  const activeLabel = sections.find((s) => s.id === active)?.label

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div
        className="read-progress"
        role="progressbar"
        aria-label={t.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        style={{ transform: `scaleX(${progress})` }}
      />
      <div className="container site-header__inner">
        <a href="#inicio" className="brand" onClick={go('inicio')} aria-label={t.goHome(person.shortName)}>
          <span className="brand__mark" aria-hidden="true">
            {person.initials}
          </span>
          <span className="brand__text">
            <span className="brand__name">{person.shortName}</span>
            <span className="brand__section" aria-live="polite">
              {activeLabel}
            </span>
          </span>
        </a>

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} id="main-nav" aria-label={t.nav}>
          <ul>
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={go(s.id)}
                  aria-current={active === s.id ? 'location' : undefined}
                  className="main-nav__link"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button type="button" className="search-btn" onClick={onOpenPalette} aria-label={t.searchAria}>
            <Search size={16} aria-hidden="true" />
            <span className="search-btn__label">{t.search}</span>
            <span className="search-btn__keys" aria-hidden="true">
              <kbd className="kbd">{modKey}</kbd>
              <kbd className="kbd">K</kbd>
            </span>
          </button>
          <button
            type="button"
            className="lang-btn"
            onClick={onToggleLang}
            aria-label={t.langAria}
            title={t.langTitle}
          >
            <Languages size={17} aria-hidden="true" />
            <span aria-hidden="true">{t.langButton}</span>
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={themeLabel}
            title={`${themeLabel} (T)`}
          >
            {theme === 'dark' ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>
          <button type="button" className="icon-btn" onClick={onOpenHelp} aria-label={t.help} title={t.helpTitle}>
            <CircleHelp size={19} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}
