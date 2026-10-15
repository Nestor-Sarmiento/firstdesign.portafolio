import { useState } from 'react'
import { Compass, Keyboard, Lightbulb } from 'lucide-react'
import { Dialog } from './Dialog'
import { heuristics } from '../data/heuristics'
import { getSections } from '../data/cv'
import { modKey } from '../lib/platform'
import { useContent, useLanguage, useUi } from '../i18n/context'

type Props = { open: boolean; onClose: () => void }

const tabs = [
  { id: 'guide', icon: Compass },
  { id: 'shortcuts', icon: Keyboard },
  { id: 'principles', icon: Lightbulb },
] as const

type TabId = (typeof tabs)[number]['id']

export function HelpDialog({ open, onClose }: Props) {
  const { lang } = useLanguage()
  const t = useUi().help
  const sections = getSections(useContent())
  const [tab, setTab] = useState<TabId>('guide')
  const g = t.guide
  const s = t.shortcuts

  return (
    <Dialog open={open} onClose={onClose} title={t.title} description={t.desc} className="dialog--help">
      <div className="tabs" role="tablist" aria-label={t.tabsAria}>
        {tabs.map(({ id, icon: Icon }) => (
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
            {t.tabs[id]}
          </button>
        ))}
      </div>

      <div className="dialog__body" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'guide' && (
          <div className="help-guide">
            <ol className="help-steps">
              <li>
                <strong>{g.nav[0]}</strong> {g.nav[1]}
              </li>
              <li>
                <strong>{g.searchStrong}</strong> {g.searchBefore} <kbd className="kbd">{modKey}</kbd>{' '}
                <kbd className="kbd">K</kbd>
                {g.searchAfter}
              </li>
              <li>
                <strong>{g.skills[0]}</strong> {g.skills[1]}
              </li>
              <li>
                <strong>{g.contact[0]}</strong> {g.contact[1]}
              </li>
              <li>
                <strong>{g.read[0]}</strong> {g.read[1]}
              </li>
            </ol>
          </div>
        )}

        {tab === 'shortcuts' && (
          <table className="shortcuts">
            <caption className="sr-only">{t.shortcutsCaption}</caption>
            <tbody>
              <tr>
                <th scope="row">{s.search}</th>
                <td>
                  <kbd className="kbd">{modKey}</kbd> <kbd className="kbd">K</kbd> {s.or}{' '}
                  <kbd className="kbd">/</kbd>
                </td>
              </tr>
              <tr>
                <th scope="row">{s.help}</th>
                <td>
                  <kbd className="kbd">?</kbd>
                </td>
              </tr>
              <tr>
                <th scope="row">{s.theme}</th>
                <td>
                  <kbd className="kbd">T</kbd>
                </td>
              </tr>
              <tr>
                <th scope="row">{s.language}</th>
                <td>
                  <kbd className="kbd">L</kbd>
                </td>
              </tr>
              <tr>
                <th scope="row">{s.preview}</th>
                <td>
                  <kbd className="kbd">V</kbd>
                </td>
              </tr>
              {sections.map((section) => (
                <tr key={section.id}>
                  <th scope="row">{s.goTo(section.label)}</th>
                  <td>
                    <kbd className="kbd">{section.shortcut}</kbd>
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row">{s.close}</th>
                <td>
                  <kbd className="kbd">Esc</kbd>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {tab === 'principles' && (
          <>
            <p className="muted help-intro">{t.principlesIntro}</p>
            <ol className="heuristics">
              {heuristics[lang].map((h, i) => (
                <li key={h.title} className="heuristic">
                  <span className="heuristic__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
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
