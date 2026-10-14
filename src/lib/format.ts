const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

type MonthYear = { month: number; year: number }

export function formatMonthYear({ month, year }: MonthYear) {
  return `${MONTHS[month - 1]} ${year}`
}

export function formatPeriod(start: MonthYear, end: MonthYear | null) {
  return `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : 'actualidad'}`
}

export function formatDuration(start: MonthYear, end: MonthYear | null) {
  const now = new Date()
  const to = end ?? { month: now.getMonth() + 1, year: now.getFullYear() }
  const months = (to.year - start.year) * 12 + (to.month - start.month) + 1
  if (months < 12) return `${months} ${months === 1 ? 'mes' : 'meses'}`
  const years = Math.floor(months / 12)
  const rest = months % 12
  const yearsLabel = `${years} ${years === 1 ? 'año' : 'años'}`
  return rest ? `${yearsLabel} y ${rest} ${rest === 1 ? 'mes' : 'meses'}` : yearsLabel
}

export function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}
