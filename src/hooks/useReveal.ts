import { useEffect } from 'react'

const SELECTOR = '[data-reveal]:not(.is-visible)'

export function useReveal() {
  useEffect(() => {
    const check = () => {
      const limit = window.innerHeight * 0.92
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (el.getBoundingClientRect().top < limit) el.classList.add('is-visible')
      })
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)

    const mutations = new MutationObserver(check)
    mutations.observe(document.body, { childList: true, subtree: true })

    const failSafe = window.setTimeout(check, 400)

    return () => {
      window.clearTimeout(failSafe)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      mutations.disconnect()
    }
  }, [])
}
