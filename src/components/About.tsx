import { Bot, Check, Server, Waypoints, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { capabilities, profile } from '../data/cv'
import { Section } from './Section'

const capabilityIcons: Record<string, LucideIcon> = {
  apis: Waypoints,
  automation: Workflow,
  ai: Bot,
  deploy: Server,
}

export function About() {
  return (
    <Section
      id="perfil"
      index="01"
      eyebrow="Perfil"
      title="Backend sólido, con la mirada puesta en el Full Stack"
    >
      <div className="about">
        <div className="about__text" data-reveal>
          <p className="about__lead">{profile.summary}</p>
          <p>{profile.goal}</p>
        </div>

        <aside className="card about__interests" data-reveal aria-labelledby="interests-title">
          <h3 id="interests-title" className="card__title">
            Áreas de interés
          </h3>
          <ul className="check-list">
            {profile.interests.map((item) => (
              <li key={item}>
                <Check size={18} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <h3 className="subheading" data-reveal>
        Lo que puedo aportar a un equipo
      </h3>
      <ul className="capabilities">
        {capabilities.map((cap) => {
          const Icon = capabilityIcons[cap.id]
          return (
            <li key={cap.id} className="card capability" data-reveal>
              <span className="capability__icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <h4 className="capability__title">{cap.title}</h4>
              <p className="capability__desc">{cap.description}</p>
              <ul className="tag-list" aria-label={`Tecnologías de ${cap.title}`}>
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
