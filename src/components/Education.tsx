import { Award, GraduationCap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { certifications, education } from '../data/cv'
import type { Education as EducationItem } from '../data/cv'
import { Section } from './Section'

function Column({ title, icon: Icon, items }: { title: string; icon: LucideIcon; items: EducationItem[] }) {
  const id = `col-${title.toLowerCase()}`
  return (
    <section className="edu-column" aria-labelledby={id} data-reveal>
      <h3 id={id} className="subheading subheading--icon">
        <Icon size={20} aria-hidden="true" />
        {title}
      </h3>
      <ul className="edu-list">
        {items.map((item) => (
          <li key={item.id} className="card edu-card">
            <div className="edu-card__top">
              <span className={`badge ${item.status === 'En curso' ? 'badge--live' : 'badge--done'}`}>
                {item.status}
              </span>
              <span className="edu-card__period">{item.period}</span>
            </div>
            <h4 className="edu-card__title">{item.title}</h4>
            <p className="edu-card__inst">{item.institution}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Education() {
  return (
    <Section id="formacion" index="04" eyebrow="Formación" title="Educación y certificaciones">
      <div className="edu-grid">
        <Column title="Educación" icon={GraduationCap} items={education} />
        <Column title="Certificaciones" icon={Award} items={certifications} />
      </div>
    </Section>
  )
}
