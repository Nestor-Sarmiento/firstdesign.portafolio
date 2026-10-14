import { useId, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, ReactElement } from 'react'
import { CornerDownLeft, Search, SearchX } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Dialog } from './Dialog'
import { normalize } from '../lib/format'

export type Command = {
  id: string
  label: string
  group: 'Navegación' | 'Acciones' | 'Enlaces' | 'Preferencias'
  icon: LucideIcon | ((props: { size?: number }) => ReactElement)
  keywords?: string
  shortcut?: string
  run: () => void
}

type Props = {
  open: boolean
  onClose: () => void
  commands: Command[]
}

const SUGGESTIONS = ['experiencia', 'correo', 'cv', 'tema']

export function CommandPalette({ open, onClose, commands }: Props) {
  const pending = useRef<(() => void) | null>(null)

  const handleClosed = () => {
    onClose()
    const action = pending.current
    pending.current = null
    if (action) window.setTimeout(action, 0)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClosed}
      title="Paleta de comandos"
      className="dialog--palette"
      hideHeader
    >
      <PaletteBody
        commands={commands}
        onRun={(command) => {
          pending.current = command.run
          onClose()
        }}
      />
    </Dialog>
  )
}

function PaletteBody({
  commands,
  onRun,
}: {
  commands: Command[]
  onRun: (command: Command) => void
}) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const listId = useId()
  const listRef = useRef<HTMLUListElement>(null)

  const results = useMemo(() => {
    const q = normalize(query)
    if (!q) return commands
    const terms = q.split(/\s+/)
    return commands.filter((c) => {
      const haystack = normalize(`${c.label} ${c.group} ${c.keywords ?? ''}`)
      return terms.every((t) => haystack.includes(t))
    })
  }, [commands, query])

  const safeIndex = Math.min(activeIndex, Math.max(0, results.length - 1))

  const moveTo = (index: number) => {
    setActiveIndex(index)
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveTo((safeIndex + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveTo((safeIndex - 1 + results.length) % results.length)
    } else if (event.key === 'Home') {
      event.preventDefault()
      moveTo(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      moveTo(results.length - 1)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      onRun(results[safeIndex])
    }
  }

  return (
    <div className="palette">
      <div className="palette__search">
        <Search size={20} aria-hidden="true" />
        <input
          autoFocus
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results.length ? `${listId}-${safeIndex}` : undefined}
          aria-label="Buscar una sección o acción"
          placeholder="Busca una sección o acción…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActiveIndex(0)
          }}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
        />
        <kbd className="kbd">Esc</kbd>
      </div>

      {results.length > 0 ? (
        <ul className="palette__list" id={listId} role="listbox" ref={listRef}>
          {results.map((command, index) => {
            const showGroup = index === 0 || results[index - 1].group !== command.group
            const Icon = command.icon
            return (
              <li key={command.id} role="presentation">
                {showGroup && (
                  <div className="palette__group" role="presentation">
                    {command.group}
                  </div>
                )}
                <div
                  id={`${listId}-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={index === safeIndex}
                  className="palette__item"
                  onMouseMove={() => index !== safeIndex && setActiveIndex(index)}
                  onClick={() => onRun(command)}
                >
                  <span className="palette__icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="palette__label">{command.label}</span>
                  {command.shortcut && <kbd className="kbd">{command.shortcut}</kbd>}
                  <CornerDownLeft className="palette__enter" size={16} aria-hidden="true" />
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="palette__empty" role="status">
          <SearchX size={28} aria-hidden="true" />
          <p>
            No encontramos resultados para <strong>“{query}”</strong>.
          </p>
          <p className="muted">Revisa la ortografía o prueba con:</p>
          <div className="palette__suggestions">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className="chip"
                onClick={() => {
                  setQuery(s)
                  setActiveIndex(0)
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <footer className="palette__footer" aria-hidden="true">
        <span>
          <kbd className="kbd">↑</kbd>
          <kbd className="kbd">↓</kbd> para moverte
        </span>
        <span>
          <kbd className="kbd">Enter</kbd> para elegir
        </span>
        <span>
          <kbd className="kbd">Esc</kbd> para cerrar
        </span>
      </footer>
    </div>
  )
}
