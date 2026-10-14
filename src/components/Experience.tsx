import { Building2, CalendarDays, Clock } from 'lucide-react'
import { experience } from '../data/cv'
import { formatDuration, formatPeriod } from '../lib/format'
import { Section } from './Section'

export function Experience() {
  return (
    <Section
      id="experiencia"
      index="02"
      eyebrow="Experiencia"
      title="Experiencia profesional"
      description="De la más reciente a la más antigua."
    >
      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.id} className="timeline__item" data-reveal>
            <span className="timeline__dot" aria-hidden="true" />
            <article className="card job" aria-labelledby={`job-${job.id}`}>
              <header className="job__header">
                <div>
                  <span className="badge">{job.type}</span>
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
                    <span className="sr-only">Periodo: </span>
                    {formatPeriod(job.start, job.end)}
                  </p>
                  <p className="muted">
                    <Clock size={16} aria-hidden="true" />
                    <span className="sr-only">Duración: </span>
                    {formatDuration(job.start, job.end)}
                  </p>
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
                <ul className="tag-list" aria-label="Tecnologías utilizadas">
                  {job.stack.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
