import type { UiStrings } from '../i18n/ui'

type MonthYear = { month: number; year: number }
type FormatStrings = UiStrings['format']

export function formatMonthYear({ month, year }: MonthYear, t: FormatStrings) {
  return `${t.months[month - 1]} ${year}`
}

export function formatPeriod(start: MonthYear, end: MonthYear | null, t: FormatStrings) {
  return `${formatMonthYear(start, t)} – ${end ? formatMonthYear(end, t) : t.present}`
}

export function formatDuration(start: MonthYear, end: MonthYear | null, t: FormatStrings) {
  const now = new Date()
  const to = end ?? { month: now.getMonth() + 1, year: now.getFullYear() }
  const months = Math.max(1, (to.year - start.year) * 12 + (to.month - start.month) + 1)
  if (months < 12) return `${months} ${t.month(months)}`
  const years = Math.floor(months / 12)
  const rest = months % 12
  const yearsLabel = `${years} ${t.year(years)}`
  return rest ? `${yearsLabel} ${t.and} ${rest} ${t.month(rest)}` : yearsLabel
}

export function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}
