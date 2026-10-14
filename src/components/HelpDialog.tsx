import { useState } from 'react'
import { Compass, Keyboard, Lightbulb } from 'lucide-react'
import { Dialog } from './Dialog'
import { heuristics } from '../data/heuristics'
import { sections } from '../data/cv'
import { modKey } from '../lib/platform'

type Props = { open: boolean; onClose: () => void }

const tabs = [
  { id: 'guia', label: 'Cómo navegar', icon: Compass },
  { id: 'atajos', label: 'Atajos', icon: Keyboard },
  { id: 'principios', label: 'Principios de diseño', icon: Lightbulb },
] as const

type TabId = (typeof tabs)[number]['id']

export function HelpDialog({ open, onClose }: Props) {
  const [tab, setTab] = useState<TabId>('guia')

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Ayuda"
      description="Todo lo que necesitas para recorrer este portafolio."
      className="dialog--help"
    >
      <div className="tabs" role="tablist" aria-label="Secciones de ayuda">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`panel-${id}`}
            className="tabs__tab"
            onClick={() => setTab(id)}
          >
            <Icon size={16} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <div className="dialog__body" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'guia' && (
          <div className="help-guide">
            <ol className="help-steps">
              <li>
                <strong>Usa el menú superior</strong> para saltar a cualquier sección. La sección en la que
                estás aparece resaltada y la barra fina sobre el menú indica cuánto llevas leído.
              </li>
              <li>
                <strong>Busca rápido</strong> con el botón “Buscar” o con <kbd className="kbd">{modKey}</kbd>{' '}
                <kbd className="kbd">K</kbd>: escribe “contacto”, “cv” o “tema” y presiona Enter.
              </li>
              <li>
                <strong>Filtra las habilidades</strong> por categoría o escribe una tecnología para ver si
                forma parte del perfil.
              </li>
              <li>
                <strong>Contacta sin perder nada:</strong> el formulario guarda un borrador automático en
                este navegador y abre tu aplicación de correo con el mensaje listo.
              </li>
              <li>
                <strong>Lee a tu manera:</strong> cambia entre tema claro y oscuro con el botón de la luna/sol.
              </li>
            </ol>
          </div>
        )}

        {tab === 'atajos' && (
          <table className="shortcuts">
            <caption className="sr-only">Atajos de teclado disponibles</caption>
            <tbody>
              <tr>
                <th scope="row">Abrir la búsqueda</th>
                <td>
                  <kbd className="kbd">{modKey}</kbd> <kbd className="kbd">K</kbd> o <kbd className="kbd">/</kbd>
                </td>
              </tr>
              <tr>
                <th scope="row">Abrir esta ayuda</th>
                <td>
                  <kbd className="kbd">?</kbd>
                </td>
              </tr>
              <tr>
                <th scope="row">Cambiar tema claro / oscuro</th>
                <td>
                  <kbd className="kbd">T</kbd>
                </td>
              </tr>
              {sections.map((s) => (
                <tr key={s.id}>
                  <th scope="row">Ir a {s.label}</th>
                  <td>
                    <kbd className="kbd">{s.shortcut}</kbd>
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row">Cerrar cualquier ventana</th>
                <td>
                  <kbd className="kbd">Esc</kbd>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {tab === 'principios' && (
          <>
            <p className="muted help-intro">
              Este portafolio se diseñó siguiendo las 10 heurísticas de usabilidad de Jakob Nielsen. Así se
              aplica cada una:
            </p>
            <ol className="heuristics">
              {heuristics.map((h) => (
                <li key={h.number} className="heuristic">
                  <span className="heuristic__num" aria-hidden="true">
                    {String(h.number).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="heuristic__title">{h.title}</h3>
                    <p className="heuristic__text">{h.applied}</p>
                  </div>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </Dialog>
  )
}
