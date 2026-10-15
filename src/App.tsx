import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  BriefcaseBusiness,
  CircleHelp,
  Code2,
  Copy,
  Download,
  Eye,
  GraduationCap,
  House,
  Languages,
  Mail,
  Monitor,
  Moon,
  Sun,
  UserRound,
} from 'lucide-react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { BackToTop, Footer, WhatsAppButton } from './components/Footer'
import { CommandPalette } from './components/CommandPalette'
import type { Command } from './components/CommandPalette'
import { HelpDialog } from './components/HelpDialog'
import { CvPreviewDialog } from './components/CvPreviewDialog'
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './components/Icons'
import { useToast } from './components/toast-context'
import { contact, getSections, person, sectionIds } from './data/cv'
import type { SectionId } from './data/cv'
import { useContent, useLanguage, useUi } from './i18n/context'
import { ui as dictionary } from './i18n/ui'
import { useTheme } from './hooks/useTheme'
import { scrollToSection, useScrollProgress, useScrollSpy } from './hooks/useScroll'
import { useReveal } from './hooks/useReveal'
import { copyText } from './lib/clipboard'
import { isTypingTarget } from './lib/platform'
import './App.css'

const spyIds = [...sectionIds]

const sectionIcons = {
  inicio: House,
  perfil: UserRound,
  experiencia: BriefcaseBusiness,
  habilidades: Code2,
  formacion: GraduationCap,
  contacto: Mail,
} satisfies Record<SectionId, unknown>

export default function App() {
  const notify = useToast()
  const { lang, setLang } = useLanguage()
  const ui = useUi()
  const content = useContent()
  const sections = useMemo(() => getSections(content), [content])
  const { theme, followsSystem, toggle, followSystem } = useTheme()
  const active = useScrollSpy(spyIds) as SectionId
  const { progress, scrolled } = useScrollProgress()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [cvOpen, setCvOpen] = useState(false)
  const hashChecked = useRef(false)
  useReveal()

  const closePalette = useCallback(() => setPaletteOpen(false), [])
  const closeHelp = useCallback(() => setHelpOpen(false), [])
  const closeCv = useCallback(() => setCvOpen(false), [])

  const toggleTheme = useCallback(() => {
    const next = toggle()
    notify({ message: ui.toasts.themeOn(next === 'dark'), description: ui.toasts.themeHint })
  }, [toggle, notify, ui])

  const toggleLang = useCallback(() => {
    const next = lang === 'es' ? 'en' : 'es'
    setLang(next)
    notify({ message: dictionary[next].toasts.language, description: dictionary[next].toasts.languageHint })
  }, [lang, setLang, notify])

  useEffect(() => {
    if (hashChecked.current) return
    hashChecked.current = true
    const hash = decodeURIComponent(location.hash.slice(1))
    if (!hash) return
    if (sectionIds.includes(hash as SectionId)) {
      requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView())
    } else {
      history.replaceState(null, '', location.pathname)
      notify({
        tone: 'error',
        message: ui.toasts.hashMissing(hash),
        description: ui.toasts.hashMissingDesc,
        duration: 7000,
      })
    }
  }, [notify, ui])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setHelpOpen(false)
        setCvOpen(false)
        setPaletteOpen((open) => !open)
        return
      }
      if (paletteOpen || helpOpen || cvOpen || event.metaKey || event.ctrlKey || event.altKey) return
      if (isTypingTarget(event.target)) return

      const key = event.key.toLowerCase()
      if (event.key === '/') {
        event.preventDefault()
        setPaletteOpen(true)
      } else if (event.key === '?') {
        event.preventDefault()
        setHelpOpen(true)
      } else if (key === 't') {
        toggleTheme()
      } else if (key === 'l') {
        toggleLang()
      } else if (key === 'v') {
        setCvOpen(true)
      } else {
        const section = sections.find((s) => s.shortcut === event.key)
        if (section) scrollToSection(section.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen, helpOpen, cvOpen, toggleTheme, toggleLang, sections])

  const commands = useMemo<Command[]>(() => {
    const c = ui.palette.commands
    const k = ui.palette.keywords
    const nav: Command[] = sections.map((s) => ({
      id: `go-${s.id}`,
      label: c.goTo(s.label),
      group: 'nav',
      icon: sectionIcons[s.id],
      shortcut: s.shortcut,
      keywords: s.id === 'formacion' ? k.formacion : s.id === 'contacto' ? k.contacto : '',
      run: () => scrollToSection(s.id),
    }))
    return [
      ...nav,
      {
        id: 'copy-email',
        label: c.copyEmail,
        group: 'actions',
        icon: Copy,
        keywords: `${k.email} ${contact.email}`,
        run: async () => {
          const ok = await copyText(contact.email)
          notify(
            ok
              ? { tone: 'success', message: ui.toasts.emailCopied, description: contact.email }
              : {
                  tone: 'error',
                  message: ui.toasts.emailCopyFailed,
                  description: ui.toasts.copyManually(contact.email),
                  duration: 8000,
                },
          )
        },
      },
      {
        id: 'preview-cv',
        label: c.previewCv,
        group: 'actions',
        icon: Eye,
        shortcut: 'V',
        keywords: k.preview,
        run: () => setCvOpen(true),
      },
      {
        id: 'download-cv',
        label: c.downloadCv,
        group: 'actions',
        icon: Download,
        keywords: k.cv,
        run: () => {
          const link = document.createElement('a')
          link.href = person.cv.href
          link.download = person.cv.fileName
          link.click()
          notify({ tone: 'success', message: ui.hero.downloadStarted, description: person.cv.fileName })
        },
      },
      {
        id: 'open-whatsapp',
        label: c.whatsapp,
        group: 'links',
        icon: WhatsAppIcon,
        keywords: `${k.whatsapp} ${contact.whatsapp.display}`,
        run: () => window.open(contact.whatsapp.href(ui.footer.whatsappMessage), '_blank', 'noreferrer'),
      },
      {
        id: 'open-linkedin',
        label: c.linkedin,
        group: 'links',
        icon: LinkedInIcon,
        keywords: k.linkedin,
        run: () => window.open(contact.linkedin.href, '_blank', 'noreferrer'),
      },
      {
        id: 'open-github',
        label: c.github,
        group: 'links',
        icon: GitHubIcon,
        keywords: k.github,
        run: () => window.open(contact.github.href, '_blank', 'noreferrer'),
      },
      {
        id: 'toggle-language',
        label: c.language,
        group: 'prefs',
        icon: Languages,
        shortcut: 'L',
        keywords: k.language,
        run: toggleLang,
      },
      {
        id: 'toggle-theme',
        label: theme === 'dark' ? c.themeLight : c.themeDark,
        group: 'prefs',
        icon: theme === 'dark' ? Sun : Moon,
        shortcut: 'T',
        keywords: k.theme,
        run: toggleTheme,
      },
      ...(followsSystem
        ? []
        : [
            {
              id: 'system-theme',
              label: c.systemTheme,
              group: 'prefs' as const,
              icon: Monitor,
              keywords: k.system,
              run: () => {
                followSystem()
                notify({ message: ui.toasts.systemTheme })
              },
            },
          ]),
      {
        id: 'help',
        label: c.help,
        group: 'prefs',
        icon: CircleHelp,
        shortcut: '?',
        keywords: k.help,
        run: () => setHelpOpen(true),
      },
    ]
  }, [ui, sections, theme, followsSystem, followSystem, toggleTheme, toggleLang, notify])

  return (
    <>
      <a href="#main" className="skip-link">
        {ui.common.skipToContent}
      </a>
      <Header
        active={active}
        progress={progress}
        scrolled={scrolled}
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleLang={toggleLang}
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenHelp={() => setHelpOpen(true)}
      />
      <main id="main" tabIndex={-1}>
        <Hero onPreviewCv={() => setCvOpen(true)} />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer onOpenHelp={() => setHelpOpen(true)} />
      <WhatsAppButton />
      <BackToTop visible={progress > 0.12} />
      <CommandPalette open={paletteOpen} onClose={closePalette} commands={commands} />
      <HelpDialog open={helpOpen} onClose={closeHelp} />
      <CvPreviewDialog open={cvOpen} onClose={closeCv} />
    </>
  )
}
