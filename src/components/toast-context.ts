import { createContext, useContext } from 'react'

export type Tone = 'success' | 'error' | 'info'

export type ToastInput = {
  message: string
  description?: string
  tone?: Tone
  action?: { label: string; onClick: () => void }
  duration?: number
}

export const ToastContext = createContext<(toast: ToastInput) => void>(() => {})

export function useToast() {
  return useContext(ToastContext)
}
