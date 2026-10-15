import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { useUi } from '../i18n/context'

type DialogProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  className?: string
  hideHeader?: boolean
  children: ReactNode
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  className = '',
  hideHeader,
  children,
}: DialogProps) {
  const closeLabel = useUi().common.closeEsc
  const ref = useRef<HTMLDialogElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      returnFocus.current = document.activeElement as HTMLElement | null
      dialog.showModal()
      document.documentElement.classList.add('has-modal')
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const onNativeClose = () => {
      document.documentElement.classList.remove('has-modal')
      returnFocus.current?.focus?.({ preventScroll: true })
      onClose()
    }
    dialog.addEventListener('close', onNativeClose)
    return () => dialog.removeEventListener('close', onNativeClose)
  }, [onClose])

  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-label={title}
      onClick={(event) => {
        if (event.target === ref.current) ref.current?.close()
      }}
    >
      <div className="dialog__panel">
        {!hideHeader && (
          <header className="dialog__header">
            <div>
              <h2 className="dialog__title">{title}</h2>
              {description && <p className="dialog__desc">{description}</p>}
            </div>
            <button
              type="button"
              className="icon-btn"
              onClick={() => ref.current?.close()}
              aria-label={closeLabel}
              title={closeLabel}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </header>
        )}
        {open && children}
      </div>
    </dialog>
  )
}
