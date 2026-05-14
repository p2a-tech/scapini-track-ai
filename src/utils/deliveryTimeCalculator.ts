import type { DeliveryTimeStatus, LegTime, PedidoTime } from '../data/timeTypes'

// "Now" fixo para o protótipo — 14/05/2026 às 21h50 (perna 2 em andamento)
export const NOW_MOCK = new Date('2026-05-14T21:50:00-03:00')

export function now(): Date {
  return NOW_MOCK
}

export function parseISO(s: string): Date {
  return new Date(s)
}

export function calculateEstimatedArrival(departureAt: string, durationMinutes: number): Date {
  const d = parseISO(departureAt)
  return new Date(d.getTime() + durationMinutes * 60_000)
}

export function diffMinutes(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / 60_000)
}

/**
 * Retorna texto amigável do tempo restante: "3h20", "18h40", "1d 4h", "Chegou", "Atrasado há 45min"
 */
export function calculateRemainingTime(nowDate: Date, estimatedArrivalAt: string, actualArrivalAt?: string): string {
  if (actualArrivalAt) return 'Chegou'
  const target = parseISO(estimatedArrivalAt)
  const diff = diffMinutes(target, nowDate)
  if (diff < 0) {
    const late = Math.abs(diff)
    return `Atrasado há ${formatDurationShort(late)}`
  }
  return formatDurationShort(diff)
}

export function formatDurationShort(minutes: number): string {
  if (minutes < 1) return '0min'
  if (minutes < 60) return `${minutes}min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours < 24) {
    return mins === 0 ? `${hours}h` : `${hours}h${pad2(mins)}`
  }
  const days = Math.floor(hours / 24)
  const remHours = hours % 24
  return remHours === 0 ? `${days}d` : `${days}d ${remHours}h`
}

function pad2(n: number): string { return n.toString().padStart(2, '0') }

export function calculateDelay(promisedDeliveryAt: string, estimatedArrivalAt: string) {
  const promised = parseISO(promisedDeliveryAt)
  const eta = parseISO(estimatedArrivalAt)
  const delayMinutes = diffMinutes(eta, promised)
  const isDelayed = delayMinutes > 0
  return {
    delayMinutes,
    isDelayed,
    status: isDelayed ? 'Atrasado' : 'No prazo',
    message: isDelayed
      ? `Previsão de chegada após o prazo prometido (${formatDurationShort(delayMinutes)} de atraso).`
      : `Previsão dentro do prazo prometido — folga de ${formatDurationShort(Math.abs(delayMinutes))}.`,
  }
}

export function calculateTimeStatus(
  promisedDeliveryAt: string,
  estimatedArrivalAt: string,
  actualArrivalAt?: string,
): DeliveryTimeStatus {
  const promised = parseISO(promisedDeliveryAt)
  if (actualArrivalAt) {
    const actual = parseISO(actualArrivalAt)
    const diff = diffMinutes(actual, promised)
    if (diff <= -15) return 'Entregue adiantado'
    if (diff <= 15) return 'Entregue no prazo'
    return 'Entregue com atraso'
  }
  if (!estimatedArrivalAt) return 'Sem previsão suficiente'
  const eta = parseISO(estimatedArrivalAt)
  const folga = diffMinutes(promised, eta) // positiva = sobra tempo
  if (folga >= 60) return 'No prazo'
  if (folga >= 0) return 'Em atenção'
  if (folga >= -60) return 'Risco de atraso'
  return 'Atrasado'
}

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isTomorrow(a: Date, b: Date): boolean {
  const t = new Date(b)
  t.setDate(t.getDate() + 1)
  return isSameDay(a, t)
}

function formatHHmm(d: Date): string {
  return `${pad2(d.getHours())}h${pad2(d.getMinutes())}`
}

function formatDateLabel(d: Date, ref: Date = now()): string {
  if (isSameDay(d, ref)) return 'hoje'
  if (isTomorrow(d, ref)) return 'amanhã'
  const yest = new Date(ref); yest.setDate(yest.getDate() - 1)
  if (isSameDay(d, yest)) return 'ontem'
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`
}

/** Ex: "Hoje entre 14h00 e 17h00" */
export function formatDeliveryWindow(start: string, end: string): string {
  const a = parseISO(start)
  const b = parseISO(end)
  const day = formatDateLabel(a)
  const capitalDay = day.charAt(0).toUpperCase() + day.slice(1)
  return `${capitalDay} entre ${formatHHmm(a)} e ${formatHHmm(b)}`
}

export function formatDateTime(iso: string): string {
  const d = parseISO(iso)
  return `${formatDateLabel(d)} às ${formatHHmm(d)}`
}

export function formatDateTimeFull(iso: string): string {
  const d = parseISO(iso)
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()} às ${formatHHmm(d)}`
}

export function formatDateShort(iso: string): string {
  const d = parseISO(iso)
  return `${pad2(d.getDate())}/${MONTHS[d.getMonth()]}`
}

/** Mensagens de chegada para uso no cliente ou operação */
export function formatArrivalMessage(p: PedidoTime): string {
  const { promise } = p
  if (promise.actualDeliveredAt) {
    return `Chegou ${formatDateTime(promise.actualDeliveredAt)}.`
  }
  if (promise.deliveryTimeStatus === 'Atrasado') {
    return `Atrasado há ${formatDurationShort(Math.abs(promise.delayMinutes))}.`
  }
  if (promise.deliveryTimeStatus === 'Sem previsão suficiente') {
    return 'Sem previsão suficiente no momento.'
  }
  const win = formatDeliveryWindow(promise.estimatedArrivalWindowStart, promise.estimatedArrivalWindowEnd)
  const remaining = formatDurationShort(promise.remainingTimeMinutes)
  return `${win}. Faltam aproximadamente ${remaining}.`
}

/** Progresso da perna: percentual + status visual */
export function calculateLegTimeProgress(leg: LegTime): {
  percent: number
  elapsedMinutes: number
  remainingMinutes: number
  delayMinutes: number
  status: 'planned' | 'on-track' | 'at-risk' | 'late' | 'done' | 'done-late' | 'done-early'
} {
  if (leg.actualArrivalAt) {
    const planned = parseISO(leg.plannedArrivalAt)
    const actual = parseISO(leg.actualArrivalAt)
    const d = diffMinutes(actual, planned)
    return {
      percent: 100,
      elapsedMinutes: leg.actualDurationMinutes || leg.estimatedDurationMinutes,
      remainingMinutes: 0,
      delayMinutes: d,
      status: d <= -15 ? 'done-early' : d <= 15 ? 'done' : 'done-late',
    }
  }
  if (!leg.actualDepartureAt) {
    return {
      percent: 0,
      elapsedMinutes: 0,
      remainingMinutes: leg.estimatedDurationMinutes,
      delayMinutes: 0,
      status: 'planned',
    }
  }
  const dep = parseISO(leg.actualDepartureAt)
  const elapsed = diffMinutes(now(), dep)
  const percent = Math.min(100, Math.max(0, Math.round((elapsed / leg.estimatedDurationMinutes) * 100)))
  const remaining = Math.max(0, leg.estimatedDurationMinutes - elapsed)
  const delayMinutes = Math.max(0, diffMinutes(now(), parseISO(leg.estimatedArrivalAt)))
  let status: 'on-track' | 'at-risk' | 'late' = 'on-track'
  if (delayMinutes > 30) status = 'late'
  else if (leg.riskLevel === 'alto' || delayMinutes > 0) status = 'at-risk'
  return { percent, elapsedMinutes: elapsed, remainingMinutes: remaining, delayMinutes, status }
}

/** Texto curto pra header de "Quando vai chegar?" */
export function whenWillArrive(p: PedidoTime): string {
  if (p.promise.actualDeliveredAt) return `Chegou ${formatDateTime(p.promise.actualDeliveredAt)}`
  return formatDeliveryWindow(p.promise.estimatedArrivalWindowStart, p.promise.estimatedArrivalWindowEnd)
}
