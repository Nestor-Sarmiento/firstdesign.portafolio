import { Bot, Check, LayoutTemplate, Server, ShieldCheck, Waypoints, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Capability } from '../data/cv'
import { useContent, useUi } from '../i18n/context'
import { Section } from './Section'

const capabilityIcons: Record<Capability['id'], LucideIcon> = {
  backend: Waypoints,
  automation: Workflow,
  ai: Bot,
  infra: Server,
  frontend: LayoutTemplate,
  security: ShieldCheck,
}

export function About() {
  const t = useUi().about
  const c = useContent()

  return (
    <Section id="perfil" index="01" eyebrow={t.eyebrow} title={t.title}>
      <div className="about">
        <div className="about__text" data-reveal>
          <p className="about__lead">{c.summary}</p>
          <p>{c.goal}</p>
        </div>

        <aside className="card about__interests" data-reveal aria-labelledby="interests-title">
          <h3 id="interests-title" className="card__title">
            {t.interests}
          </h3>
          <ul className="check-list">
            {c.interests.map((item) => (
              <li key={item}>
                <Check size={18} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <h3 className="subheading" data-reveal>
        {t.contribute}
      </h3>
      <ul className="capabilities">
        {c.capabilities.map((cap) => {
          const Icon = capabilityIcons[cap.id]
          return (
            <li key={cap.id} className="card capability" data-reveal>
              <span className="capability__icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <h4 className="capability__title">{cap.title}</h4>
              <p className="capability__desc">{cap.description}</p>
              <ul className="tag-list" aria-label={t.techOf(cap.title)}>
                {cap.tools.map((tool) => (
                  <li key={tool} className="tag">
                    {tool}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
