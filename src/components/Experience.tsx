import { Building2, CalendarDays, Clock, MapPin } from 'lucide-react'
import { formatDuration, formatPeriod } from '../lib/format'
import { useContent, useUi } from '../i18n/context'
import { Section } from './Section'

export function Experience() {
  const ui = useUi()
  const t = ui.experience
  const { experience } = useContent()

  return (
    <Section id="experiencia" index="02" eyebrow={t.eyebrow} title={t.title} description={t.desc}>
      <ol className="timeline">
        {experience.map((job) => {
          const isCurrent = job.end === null
          return (
            <li key={job.id} className={`timeline__item ${isCurrent ? 'is-current' : ''}`} data-reveal>
              <span className="timeline__dot" aria-hidden="true" />
              <article className="card job" aria-labelledby={`job-${job.id}`}>
                <header className="job__header">
                  <div>
                    <div className="job__badges">
                      {isCurrent && <span className="badge badge--live">{t.current}</span>}
                      <span className="badge">{job.type}</span>
                    </div>
                    <h3 id={`job-${job.id}`} className="job__role">
                      {job.role}
                    </h3>
                    <p className="job__org">
                      <Building2 size={17} aria-hidden="true" />
                      {job.organization}
                    </p>
                  </div>
                  <div className="job__time">
                    <p>
                      <CalendarDays size={16} aria-hidden="true" />
                      <span className="sr-only">{t.period}</span>
                      {formatPeriod(job.start, job.end, ui.format)}
                    </p>
                    <p className="muted">
                      <Clock size={16} aria-hidden="true" />
                      <span className="sr-only">{t.duration}</span>
                      {formatDuration(job.start, job.end, ui.format)}
                    </p>
                    {job.location && (
                      <p className="muted">
                        <MapPin size={16} aria-hidden="true" />
                        <span className="sr-only">{t.location}</span>
                        {job.location}
                      </p>
                    )}
                  </div>
                </header>

                {job.highlights.length > 0 && (
                  <ul className="job__highlights">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}

                {job.stack.length > 0 && (
                  <ul className="tag-list" aria-label={t.stack}>
                    {job.stack.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
