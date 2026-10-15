import { useMemo, useState } from 'react'
import { Languages, Search, SearchX, X } from 'lucide-react'
import { cefrLevels } from '../data/cv'
import { normalize } from '../lib/format'
import { useContent, useUi } from '../i18n/context'
import { Section } from './Section'

const ALL = 'all'

export function Skills() {
  const t = useUi().skills
  const { skillCategories, languages } = useContent()
  const [category, setCategory] = useState(ALL)
  const [query, setQuery] = useState('')

  const total = skillCategories.reduce((sum, c) => sum + c.skills.length, 0)

  const filtered = useMemo(() => {
    const q = normalize(query)
    return skillCategories
      .filter((c) => category === ALL || c.id === category)
      .map((c) => ({ ...c, skills: c.skills.filter((s) => !q || normalize(s).includes(q)) }))
      .filter((c) => c.skills.length > 0)
  }, [skillCategories, category, query])

  const shown = filtered.reduce((sum, c) => sum + c.skills.length, 0)
  const isFiltering = category !== ALL || query !== ''

  const suggestion = useMemo(() => {
    const q = normalize(query)
    if (shown > 0 || q.length < 2) return null
    return skillCategories.flatMap((c) => c.skills).find((s) => normalize(s).startsWith(q.slice(0, 2))) ?? null
  }, [skillCategories, query, shown])

  const reset = () => {
    setCategory(ALL)
    setQuery('')
  }

  return (
    <Section id="habilidades" index="03" eyebrow={t.eyebrow} title={t.title} description={t.desc}>
      <div className="skills-toolbar" data-reveal>
        <div className="filter-group" role="group" aria-label={t.filterGroup}>
          <button
            type="button"
            className="chip chip--filter"
            aria-pressed={category === ALL}
            onClick={() => setCategory(ALL)}
          >
            {t.all} <span className="chip__count">{total}</span>
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
            {t.searchLabel}
          </label>
          <input
            id="skill-search"
            type="search"
            placeholder={t.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && query && (e.stopPropagation(), setQuery(''))}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              type="button"
              className="icon-btn icon-btn--sm"
              onClick={() => setQuery('')}
              aria-label={t.clearSearch}
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p className="skills-status" role="status">
        {t.showing} <strong>{shown}</strong> {t.of} {total} {t.technologies}
        {isFiltering && (
          <button type="button" className="link-btn" onClick={reset}>
            {t.removeFilters}
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
            <strong>“{query}”</strong> {t.notFound}
            {category !== ALL && t.inCategory}.
          </p>
          <p className="muted">
            {suggestion ? (
              <>
                {t.didYouMean}{' '}
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
              t.checkSpelling
            )}
          </p>
          <button type="button" className="btn btn--secondary btn--sm" onClick={reset}>
            {t.seeAll}
          </button>
        </div>
      )}

      <article className="card languages" data-reveal aria-labelledby="languages-title">
        <h3 id="languages-title" className="skill-group__title">
          <Languages size={18} aria-hidden="true" />
          {t.languages}
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
                  <span className="cefr__step cefr__step--done">{t.native}</span>
                </div>
              )}
              {lang.cefr && (
                <ol className="cefr" aria-label={t.cefrAria(lang.cefr.reached, lang.cefr.inProgress)}>
                  {cefrLevels.map((level, i) => {
                    const reachedIndex = cefrLevels.indexOf(lang.cefr!.reached)
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
          <span className="legend legend--done" /> {t.legendDone}
          <span className="legend legend--progress" /> {t.legendProgress}
          <span className="legend legend--todo" /> {t.legendTodo}
        </p>
      </article>
    </Section>
  )
}
