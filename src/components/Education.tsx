import { Award, GraduationCap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Education as EducationItem } from '../data/cv'
import { useContent, useUi } from '../i18n/context'
import { Section } from './Section'

function Column({
  id,
  title,
  icon: Icon,
  items,
}: {
  id: string
  title: string
  icon: LucideIcon
  items: EducationItem[]
}) {
  const t = useUi().education
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
              <span className={`badge ${item.status === 'inProgress' ? 'badge--live' : 'badge--done'}`}>
                {item.status === 'inProgress' ? t.inProgress : t.completed}
              </span>
              {item.period && <span className="edu-card__period">{item.period}</span>}
            </div>
            <h4 className="edu-card__title">{item.title}</h4>
            <p className="edu-card__inst">{item.institution}</p>
            {item.detail && <p className="edu-card__detail">{item.detail}</p>}
            {item.progress && (
              <div
                className="semester-bar"
                role="img"
                aria-label={t.progressAria(item.progress.current, item.progress.total)}
              >
                {Array.from({ length: item.progress.total }, (_, i) => (
                  <span
                    key={i}
                    className={`semester-bar__step ${
                      i + 1 < item.progress!.current
                        ? 'is-done'
                        : i + 1 === item.progress!.current
                          ? 'is-current'
                          : ''
                    }`}
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Education() {
  const t = useUi().education
  const c = useContent()
  return (
    <Section id="formacion" index="04" eyebrow={t.eyebrow} title={t.title}>
      <div className="edu-grid">
        <Column id="col-education" title={t.education} icon={GraduationCap} items={c.education} />
        <Column id="col-certifications" title={t.certifications} icon={Award} items={c.certifications} />
      </div>
    </Section>
  )
}
