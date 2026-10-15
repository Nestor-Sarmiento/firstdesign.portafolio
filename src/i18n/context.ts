import { createContext, useContext } from 'react'
import { ui } from './ui'
import type { UiStrings } from './ui'
import { content } from '../data/cv'
import type { Content } from '../data/cv'

export type Lang = 'es' | 'en'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: 'es',
  setLang: () => {},
})

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useUi(): UiStrings {
  return ui[useLanguage().lang]
}

export function useContent(): Content {
  return content[useLanguage().lang]
}
