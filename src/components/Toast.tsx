import { useCallback, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import { ToastContext } from './toast-context'
import type { ToastInput, Tone } from './toast-context'
import { useUi } from '../i18n/context'

type ToastItem = ToastInput & { id: number; tone: Tone }

const icons = { success: CheckCircle2, error: AlertCircle, info: Info }

export function ToastProvider({ children }: { children: ReactNode }) {
  const t = useUi().common
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback(
    (input: ToastInput) => {
      const id = ++nextId.current
      const item: ToastItem = { tone: 'info', ...input, id }
      setToasts((list) => [...list.slice(-2), item])
      const duration = input.duration ?? (input.action ? 7000 : 4000)
      window.setTimeout(() => dismiss(id), duration)
    },
    [dismiss],
  )

  const value = useMemo(() => notify, [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-region" role="region" aria-label={t.notifications}>
        <ol aria-live="polite" aria-relevant="additions">
          {toasts.map((toast) => {
            const Icon = icons[toast.tone]
            return (
              <li key={toast.id} className={`toast toast--${toast.tone}`}>
                <Icon className="toast__icon" size={20} aria-hidden="true" />
                <div className="toast__body">
                  <p className="toast__title">{toast.message}</p>
                  {toast.description && <p className="toast__desc">{toast.description}</p>}
                </div>
                {toast.action && (
                  <button
                    type="button"
                    className="toast__action"
                    onClick={() => {
                      toast.action?.onClick()
                      dismiss(toast.id)
                    }}
                  >
                    {toast.action.label}
                  </button>
                )}
                <button
                  type="button"
                  className="icon-btn icon-btn--sm"
                  onClick={() => dismiss(toast.id)}
                  aria-label={t.closeNotification}
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </ToastContext.Provider>
  )
}