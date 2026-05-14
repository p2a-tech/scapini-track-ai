import { AlertTriangle, Clock, CheckCircle2, Timer } from 'lucide-react'
import { DeliveryTimeStatus } from '../../../data/timeTypes'
import { formatDurationShort } from '../../../utils/deliveryTimeCalculator'

const TONE: Record<DeliveryTimeStatus, { bg: string; text: string; Icon: any }> = {
  'No prazo':                  { bg: 'bg-success-50 border-success-100', text: 'text-success-700', Icon: CheckCircle2 },
  'Em atenção':                { bg: 'bg-warning-50 border-warning-100', text: 'text-warning-700', Icon: Clock },
  'Risco de atraso':           { bg: 'bg-accent-50 border-accent-100',   text: 'text-accent-700',  Icon: AlertTriangle },
  'Atrasado':                  { bg: 'bg-danger-50 border-danger-100',   text: 'text-danger-700',  Icon: AlertTriangle },
  'Entregue no prazo':         { bg: 'bg-success-50 border-success-100', text: 'text-success-700', Icon: CheckCircle2 },
  'Entregue com atraso':       { bg: 'bg-danger-50 border-danger-100',   text: 'text-danger-700',  Icon: AlertTriangle },
  'Entregue adiantado':        { bg: 'bg-success-50 border-success-100', text: 'text-success-700', Icon: CheckCircle2 },
  'Sem previsão suficiente':   { bg: 'bg-graphite-100 border-graphite-200', text: 'text-graphite-700', Icon: Timer },
}

export function DeadlineRiskBadge({ status }: { status: DeliveryTimeStatus }) {
  const t = TONE[status]
  const Icon = t.Icon
  return (
    <span className={`chip border ${t.bg} ${t.text}`}>
      <Icon size={11} />
      {status}
    </span>
  )
}

export function RemainingTimeBadge({ minutes, delivered = false, lateMinutes = 0 }: { minutes: number; delivered?: boolean; lateMinutes?: number }) {
  if (delivered) {
    return <span className="chip bg-success-50 text-success-700"><CheckCircle2 size={11} /> Chegou</span>
  }
  if (lateMinutes > 0) {
    return <span className="chip bg-danger-50 text-danger-700"><AlertTriangle size={11} /> Atrasado {formatDurationShort(lateMinutes)}</span>
  }
  return <span className="chip bg-brand-50 text-brand-700"><Timer size={11} /> Faltam {formatDurationShort(minutes)}</span>
}
