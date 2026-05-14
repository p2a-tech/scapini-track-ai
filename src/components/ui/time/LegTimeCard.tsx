import { Truck, ArrowRight, Clock, Timer, MapPin, AlertTriangle, CheckCircle2, Wifi } from 'lucide-react'
import type { LegTime } from '../../../data/timeTypes'
import {
  formatDateTime, formatDurationShort, formatDeliveryWindow, calculateLegTimeProgress,
} from '../../../utils/deliveryTimeCalculator'
import StatusBadge from '../StatusBadge'
import RiskBadge from '../RiskBadge'
import TrackingSourceBadge from '../TrackingSourceBadge'

const STATUS_TONE: Record<string, string> = {
  'planned': 'bg-graphite-100',
  'on-track': 'bg-brand-500',
  'at-risk': 'bg-warning-500',
  'late': 'bg-danger-500',
  'done': 'bg-success-500',
  'done-late': 'bg-danger-500',
  'done-early': 'bg-success-500',
}

export default function LegTimeCard({ leg }: { leg: LegTime }) {
  const progress = calculateLegTimeProgress(leg)
  const isCurrent = leg.status === 'Em andamento'
  const isDone = leg.status === 'Concluída'
  const isLate = leg.timeStatus === 'Atrasada' || leg.timeStatus === 'Concluída com atraso'

  return (
    <div className={`card p-4 ${isCurrent ? 'ring-2 ring-brand-400/40' : ''}`}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-graphite-500">
            <span className="bg-brand-100 text-brand-700 rounded-full w-6 h-6 inline-flex items-center justify-center text-[11px] font-bold">{leg.legNumber}</span>
            <span>Perna {leg.legNumber} · {leg.legType}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-base font-semibold text-graphite-900">
            <span>{leg.origin}</span>
            <ArrowRight size={16} className="text-graphite-400" />
            <span>{leg.destination}</span>
          </div>

          {/* Progresso */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-graphite-500">Progresso</span>
              <span className="font-medium text-graphite-900">{progress.percent}%</span>
            </div>
            <div className="w-full rounded-full bg-graphite-200 h-2 overflow-hidden">
              <div className={`h-full ${STATUS_TONE[progress.status]} transition-all`} style={{ width: `${progress.percent}%` }}></div>
            </div>
          </div>

          {/* Tempos */}
          <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <div className="text-graphite-500 flex items-center gap-1"><Clock size={10} />Saída planejada</div>
              <div className="font-medium">{formatDateTime(leg.plannedDepartureAt)}</div>
            </div>
            <div>
              <div className="text-graphite-500 flex items-center gap-1"><Truck size={10} />Saída real</div>
              <div className={`font-medium ${leg.actualDepartureAt ? '' : 'text-graphite-400'}`}>{leg.actualDepartureAt ? formatDateTime(leg.actualDepartureAt) : '—'}</div>
            </div>
            <div>
              <div className="text-graphite-500 flex items-center gap-1"><Clock size={10} />Chegada planejada</div>
              <div className="font-medium">{formatDateTime(leg.plannedArrivalAt)}</div>
            </div>
            <div>
              <div className="text-graphite-500 flex items-center gap-1"><MapPin size={10} />Chegada real / prevista</div>
              <div className={`font-medium ${isLate ? 'text-danger-700' : isDone ? 'text-success-700' : 'text-brand-700'}`}>
                {leg.actualArrivalAt
                  ? formatDateTime(leg.actualArrivalAt)
                  : formatDeliveryWindow(leg.estimatedArrivalWindowStart, leg.estimatedArrivalWindowEnd)
                }
              </div>
            </div>
          </div>

          {/* Duração */}
          <div className="mt-3 grid grid-cols-3 gap-3 text-xs border-t border-graphite-100 pt-3">
            <div>
              <div className="text-graphite-500">Duração estimada</div>
              <div className="font-medium">{formatDurationShort(leg.estimatedDurationMinutes)}</div>
            </div>
            <div>
              <div className="text-graphite-500">Duração real</div>
              <div className="font-medium">{leg.actualDurationMinutes ? formatDurationShort(leg.actualDurationMinutes) : '—'}</div>
            </div>
            <div>
              <div className="text-graphite-500">Tempo restante</div>
              <div className={`font-medium ${isLate ? 'text-danger-700' : ''}`}>
                {isDone
                  ? <span className="text-success-700 inline-flex items-center gap-1"><CheckCircle2 size={11} />Concluída</span>
                  : leg.remainingTimeMinutes > 0
                    ? <span className="inline-flex items-center gap-1"><Timer size={11} />{formatDurationShort(leg.remainingTimeMinutes)}</span>
                    : <span className="text-danger-700 inline-flex items-center gap-1"><AlertTriangle size={11} />Atrasada</span>}
              </div>
            </div>
          </div>

          {/* Próximo evento + Último evento */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="bg-graphite-50 rounded-lg p-2">
              <div className="text-graphite-500">Próximo evento esperado</div>
              <div className="font-medium text-graphite-900">{leg.nextExpectedEvent}</div>
            </div>
            <div className="bg-graphite-50 rounded-lg p-2">
              <div className="text-graphite-500">Último evento</div>
              <div className="font-medium text-graphite-900">{leg.lastEventDescription}</div>
              <div className="text-graphite-500">{formatDateTime(leg.lastEventAt)}</div>
            </div>
          </div>

          {/* Resultado da perna */}
          {isDone && (
            <div className={`mt-3 text-xs font-medium ${isLate ? 'text-danger-700' : leg.delayMinutes < -10 ? 'text-success-700' : 'text-graphite-700'}`}>
              {leg.delayMinutes > 15
                ? `Resultado: chegou com ${formatDurationShort(leg.delayMinutes)} de atraso`
                : leg.delayMinutes < -10
                  ? `Resultado: chegou ${formatDurationShort(Math.abs(leg.delayMinutes))} adiantado`
                  : 'Resultado: chegou no prazo'}
            </div>
          )}
        </div>

        {/* Painel lateral — meta */}
        <div className="flex lg:flex-col lg:items-end gap-2 flex-wrap">
          <StatusBadge status={leg.status} />
          <TrackingSourceBadge source={leg.trackingSource as any} />
          <RiskBadge level={leg.riskLevel} />
          <div className="text-xs text-graphite-500 lg:text-right">
            <div className="flex items-center gap-1 lg:justify-end"><Truck size={11} />{leg.vehicle}</div>
            <div>{leg.driver}</div>
            <div>{leg.carrier}</div>
          </div>
          {(leg.estimatedCost || leg.pedagioCost || leg.fuelEstimate) && (
            <div className="text-xs lg:text-right bg-graphite-50 rounded-lg px-2 py-1">
              {leg.estimatedCost && <div>Custo: <strong>R$ {leg.estimatedCost.toLocaleString('pt-BR')}</strong></div>}
              {leg.pedagioCost ? <div className="text-graphite-500">Pedágio: R$ {leg.pedagioCost}</div> : null}
              {leg.fuelEstimate ? <div className="text-graphite-500">Combustível: R$ {leg.fuelEstimate}</div> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/** Lista de pernas */
export function LegTimelineDetailed({ legs }: { legs: LegTime[] }) {
  return (
    <div className="space-y-3">
      {legs.map((l) => <LegTimeCard key={l.legId} leg={l} />)}
    </div>
  )
}
