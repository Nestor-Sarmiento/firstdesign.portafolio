import { useMemo, useState } from 'react'
import { Languages, Search, SearchX, X } from 'lucide-react'
import { cefrLevels, languages, skillCategories } from '../data/cv'
import { normalize } from '../lib/format'
import { Section } from './Section'

const ALL = 'todas'
const total = skillCategories.reduce((sum, c) => sum + c.skills.length, 0)
const everySkill = skillCategories.flatMap((c) => c.skills)

function closestSkill(query: string) {
  const q = normalize(query)
  if (q.length < 2) return null
  return everySkill.find((s) => normalize(s).startsWith(q.slice(0, 2))) ?? null
}

export function Skills() {
  const [category, setCategory] = useState(ALL)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = normalize(query)
    return skillCategories
      .filter((c) => category === ALL || c.id === category)
      .map((c) => ({ ...c, skills: c.skills.filter((s) => !q || normalize(s).includes(q)) }))
      .filter((c) => c.skills.length > 0)
  }, [category, query])

  const shown = filtered.reduce((sum, c) => sum + c.skills.length, 0)
  const isFiltering = category !== ALL || query !== ''
  const suggestion = shown === 0 ? closestSkill(query) : null

  const reset = () => {
    setCategory(ALL)
    setQuery('')
  }

  return (
    <Section
      id="habilidades"
      index="03"
      eyebrow="Habilidades"
      title="Competencias técnicas"
      description="Filtra por categoría o busca una tecnología específica."
    >
      <div className="skills-toolbar" data-reveal>
        <div className="filter-group" role="group" aria-label="Filtrar por categoría">
          <button
            type="button"
            className="chip chip--filter"
            aria-pressed={category === ALL}
            onClick={() => setCategory(ALL)}
          >
            Todas <span className="chip__count">{total}</span>
          </button>
          {skillCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip chip--filter"
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.label} <span className="chip__count">{c.skills.length}</span>
            </button>
          ))}
        </div>

        <div className="search-field">
          <Search size={18} aria-hidden="true" />
          <label htmlFor="skill-search" className="sr-only">
            Buscar tecnología
          </label>
          <input
            id="skill-search"
            type="search"
            placeholder="Buscar tecnología, p. ej. React"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && query && (e.stopPropagation(), setQuery(''))}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button type="button" className="icon-btn icon-btn--sm" onClick={() => setQuery('')} aria-label="Borrar búsqueda">
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p className="skills-status" role="status">
        Mostrando <strong>{shown}</strong> de {total} tecnologías
        {isFiltering && (
          <button type="button" className="link-btn" onClick={reset}>
            Quitar filtros
          </button>
        )}
      </p>

      {shown > 0 ? (
        <div className="skills-grid">
          {filtered.map((c) => (
            <article key={c.id} className="card skill-group" data-reveal aria-labelledby={`skills-${c.id}`}>
              <h3 id={`skills-${c.id}`} className="skill-group__title">
                {c.label}
              </h3>
              <ul className="skill-list">
                {c.skills.map((s) => (
                  <li key={s} className="skill">
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <SearchX size={28} aria-hidden="true" />
          <p>
            <strong>“{query}”</strong> no aparece
            {category !== ALL && ' en esta categoría'}.
          </p>
          <p className="muted">
            {suggestion ? (
              <>
                ¿Buscabas{' '}
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setCategory(ALL)
                    setQuery(suggestion)
                  }}
                >
                  {suggestion}
                </button>
                ?
              </>
            ) : (
              'Revisa la ortografía o busca en todas las categorías.'
            )}
          </p>
          <button type="button" className="btn btn--secondary btn--sm" onClick={reset}>
            Ver todas las tecnologías
          </button>
        </div>
      )}

      <article className="card languages" data-reveal aria-labelledby="languages-title">
        <h3 id="languages-title" className="skill-group__title">
          <Languages size={18} aria-hidden="true" />
          Idiomas
        </h3>
        <ul className="language-list">
          {languages.map((lang) => (
            <li key={lang.name} className="language">
              <div className="language__head">
                <span className="language__name">{lang.name}</span>
                <span className="muted">{lang.level}</span>
              </div>
              {!lang.cefr && (
                <div className="cefr cefr--native" aria-hidden="true">
                  <span className="cefr__step cefr__step--done">Lengua materna</span>
                </div>
              )}
              {lang.cefr && (
                <ol className="cefr" aria-label={`Escala MCER: nivel ${lang.cefr.reached} alcanzado, ${lang.cefr.inProgress} en curso`}>
                  {cefrLevels.map((level) => {
                    const reachedIndex = cefrLevels.indexOf(lang.cefr!.reached)
                    const i = cefrLevels.indexOf(level)
                    const state =
                      i <= reachedIndex ? 'done' : level === lang.cefr!.inProgress ? 'progress' : 'todo'
                    return (
                      <li key={level} className={`cefr__step cefr__step--${state}`} aria-hidden="true">
                        {level}
                      </li>
                    )
                  })}
                </ol>
              )}
            </li>
          ))}
        </ul>
        <p className="languages__legend muted" aria-hidden="true">
          <span className="legend legend--done" /> Alcanzado
          <span className="legend legend--progress" /> En curso
          <span className="legend legend--todo" /> Próximo
        </p>
      </article>
    </Section>
  )
}
