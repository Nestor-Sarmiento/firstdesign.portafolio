import type { ReactNode } from 'react'

type Props = {
  id: string
  index: string
  eyebrow: string
  title: string
  description?: string
  className?: string
  children: ReactNode
}

export function Section({ id, index, eyebrow, title, description, className = '', children }: Props) {
  const headingId = `${id}-title`
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={headingId}>
      <div className="container">
        <header className="section__header" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow__index">{index}</span>
            {eyebrow}
          </p>
          <h2 id={headingId} className="section__title" tabIndex={-1} data-section-heading>
            {title}
          </h2>
          {description && <p className="section__desc">{description}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
