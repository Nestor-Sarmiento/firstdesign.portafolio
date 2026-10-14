import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  BriefcaseBusiness,
  CircleHelp,
  Code2,
  Copy,
  Download,
  GraduationCap,
  House,
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
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './components/Icons'
import { useToast } from './components/toast-context'
import { contact, profile, sections } from './data/cv'
import type { SectionId } from './data/cv'
import { useTheme } from './hooks/useTheme'
import { scrollToSection, useScrollProgress, useScrollSpy } from './hooks/useScroll'
import { useReveal } from './hooks/useReveal'
import { copyText } from './lib/clipboard'
import { isTypingTarget } from './lib/platform'
import './App.css'

const sectionIds = sections.map((s) => s.id)

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
  const { theme, followsSystem, toggle, followSystem } = useTheme()
  const active = useScrollSpy(sectionIds) as SectionId
  const { progress, scrolled } = useScrollProgress()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  useReveal()

  const closePalette = useCallback(() => setPaletteOpen(false), [])
  const closeHelp = useCallback(() => setHelpOpen(false), [])

  const toggleTheme = useCallback(() => {
    const next = toggle()
    notify({ message: `Tema ${next === 'dark' ? 'oscuro' : 'claro'} activado`, description: 'Presiona T para volver a cambiarlo.' })
  }, [toggle, notify])

  useEffect(() => {
    const hash = decodeURIComponent(location.hash.slice(1))
    if (!hash) return
    if (sectionIds.includes(hash as SectionId)) {
      requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView())
    } else {
      history.replaceState(null, '', location.pathname)
      notify({
        tone: 'error',
        message: `La sección “#${hash}” no existe`,
        description: 'Te dejamos en el inicio. Usa el menú o presiona ? para ver todas las secciones.',
        duration: 7000,
      })
    }
  }, [notify])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setHelpOpen(false)
        setPaletteOpen((open) => !open)
        return
      }
      if (paletteOpen || helpOpen || event.metaKey || event.ctrlKey || event.altKey) return
      if (isTypingTarget(event.target)) return

      if (event.key === '/') {
        event.preventDefault()
        setPaletteOpen(true)
      } else if (event.key === '?') {
        event.preventDefault()
        setHelpOpen(true)
      } else if (event.key.toLowerCase() === 't') {
        toggleTheme()
      } else {
        const section = sections.find((s) => s.shortcut === event.key)
        if (section) scrollToSection(section.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen, helpOpen, toggleTheme])

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = sections.map((s) => ({
      id: `go-${s.id}`,
      label: `Ir a ${s.label}`,
      group: 'Navegación',
      icon: sectionIcons[s.id],
      shortcut: s.shortcut,
      keywords: s.id === 'formacion' ? 'educacion estudios certificaciones universidad' : s.id === 'contacto' ? 'mensaje escribir' : '',
      run: () => scrollToSection(s.id),
    }))
    return [
      ...nav,
      {
        id: 'copy-email',
        label: 'Copiar correo electrónico',
        group: 'Acciones',
        icon: Copy,
        keywords: `email mail ${contact.email}`,
        run: async () => {
          const ok = await copyText(contact.email)
          notify(
            ok
              ? { tone: 'success', message: 'Correo copiado', description: contact.email }
              : {
                  tone: 'error',
                  message: 'No se pudo copiar el correo',
                  description: `Cópialo manualmente: ${contact.email}`,
                  duration: 8000,
                },
          )
        },
      },
      {
        id: 'download-cv',
        label: 'Descargar CV en PDF',
        group: 'Acciones',
        icon: Download,
        keywords: 'curriculum hoja de vida pdf',
        run: () => {
          const link = document.createElement('a')
          link.href = profile.cv.href
          link.download = profile.cv.fileName
          link.click()
          notify({ tone: 'success', message: 'Descarga iniciada', description: profile.cv.fileName })
        },
      },
      {
        id: 'open-whatsapp',
        label: 'Escribir por WhatsApp',
        group: 'Enlaces',
        icon: WhatsAppIcon,
        keywords: `chat mensaje celular telefono ${contact.whatsapp.display}`,
        run: () => window.open(contact.whatsapp.href, '_blank', 'noreferrer'),
      },
      {
        id: 'open-linkedin',
        label: 'Abrir LinkedIn',
        group: 'Enlaces',
        icon: LinkedInIcon,
        keywords: 'perfil red social',
        run: () => window.open(contact.linkedin.href, '_blank', 'noreferrer'),
      },
      {
        id: 'open-github',
        label: 'Abrir GitHub',
        group: 'Enlaces',
        icon: GitHubIcon,
        keywords: 'repositorios codigo proyectos',
        run: () => window.open(contact.github.href, '_blank', 'noreferrer'),
      },
      {
        id: 'toggle-theme',
        label: theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro',
        group: 'Preferencias',
        icon: theme === 'dark' ? Sun : Moon,
        shortcut: 'T',
        keywords: 'tema modo oscuro claro dark light',
        run: toggleTheme,
      },
      ...(followsSystem
        ? []
        : [
            {
              id: 'system-theme',
              label: 'Usar el tema del sistema',
              group: 'Preferencias' as const,
              icon: Monitor,
              keywords: 'tema automatico sistema',
              run: () => {
                followSystem()
                notify({ message: 'El tema ahora sigue la configuración de tu sistema' })
              },
            },
          ]),
      {
        id: 'help',
        label: 'Ver ayuda y atajos',
        group: 'Preferencias',
        icon: CircleHelp,
        shortcut: '?',
        keywords: 'ayuda atajos teclado documentacion heuristicas nielsen',
        run: () => setHelpOpen(true),
      },
    ]
  }, [theme, followsSystem, followSystem, toggleTheme, notify])

  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <Header
        active={active}
        progress={progress}
        scrolled={scrolled}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenHelp={() => setHelpOpen(true)}
      />
      <main id="main" tabIndex={-1}>
        <Hero />
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
    </>
  )
}
