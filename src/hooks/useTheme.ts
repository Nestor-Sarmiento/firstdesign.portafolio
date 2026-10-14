import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const media = () => window.matchMedia('(prefers-color-scheme: dark)')

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

export function useTheme() {
  const [followsSystem, setFollowsSystem] = useState(() => readStored() === null)
  const [theme, setTheme] = useState<Theme>(
    () => readStored() ?? (media().matches ? 'dark' : 'light'),
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    if (!followsSystem) return
    const query = media()
    const onChange = () => setTheme(query.matches ? 'dark' : 'light')
    onChange()
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [followsSystem])

  const choose = useCallback((next: Theme) => {
    setFollowsSystem(false)
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable: the choice still applies for this visit */
    }
  }, [])

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    choose(next)
    return next
  }, [theme, choose])

  const followSystem = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    setFollowsSystem(true)
  }, [])

  return { theme, followsSystem, toggle, followSystem }
}
