import { useEffect, useState } from 'react'

export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const onScroll = () => {
      const marker = window.innerHeight * 0.35
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= marker) current = id
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      setActive(atBottom ? ids[ids.length - 1] : current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}

export function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, scrolled: false })

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      const scrolled = window.scrollY > 16
      setState((prev) =>
        Math.abs(prev.progress - progress) < 0.002 && prev.scrolled === scrolled
          ? prev
          : { progress, scrolled },
      )
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return state
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return false
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', id === 'inicio' ? location.pathname : `#${id}`)
  const heading = el.querySelector<HTMLElement>('[data-section-heading]')
  heading?.focus({ preventScroll: true })
  return true
}
