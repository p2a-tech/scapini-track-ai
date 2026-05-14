import { Clock, MapPin, Timer, Target, CheckCircle2, AlertTriangle, Activity, CalendarClock, User } from 'lucide-react'
import type { PedidoTime } from '../../../data/timeTypes'
import {
  formatDateTime, formatDateTimeFull, formatDeliveryWindow, formatDurationShort, formatArrivalMessage,
} from '../../../utils/deliveryTimeCalculator'
import { DeadlineRiskBadge } from './TimeBadges'

/** Card "Quanto tempo leva" */
export function DeliveryDurationCard({ pedido }: { pedido: PedidoTime }) {
  const totalEst = pedido.promise.estimatedTotalDurationMinutes
  const currentLeg = pedido.legs.find((l) => l.legId === pedido.currentLegId) || pedido.legs[0]
  const previousLeg = pedido.legs.find((l) => l.actualArrivalAt && l.legNumber === currentLeg.legNumber - 1)
  return (
    <div className="card p-4">
      <div className="text-xs text-graphite-500 uppercase tracking-wide flex items-center gap-1">
        <Clock size={12} /> Quanto tempo leva
      </div>
      <div className="mt-2 space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-graphite-500">Duração total estimada</span><span className="font-semibold text-graphite-900">{formatDurationShort(totalEst)}</span></div>
        <div className="flex justify-between"><span className="text-graphite-500">Perna atual ({currentLeg.legNumber})</span><span className="font-semibold text-graphite-900">{formatDurationShort(currentLeg.estimatedDurationMinutes)}</span></div>
        {previousLeg && (
          <div className="flex justify-between"><span className="text-graphite-500">Perna anterior concluída em</span><span className="font-semibold text-graphite-900">{formatDurationShort(previousLeg.actualDurationMinutes || previousLeg.estimatedDurationMinutes)}</span></div>
        )}
      </div>
    </div>
  )
}

/** Card "Quanto tempo falta" — com barra de progresso */
export function RemainingTimeCard({ pedido }: { pedido: PedidoTime }) {
  const { promise } = pedido
  const currentLeg = pedido.legs.find((l) => l.legId === pedido.currentLegId)
  const percent = Math.min(100, Math.max(0, Math.round((promise.elapsedTimeMinutes / promise.estimatedTotalDurationMinutes) * 100)))
  if (promise.actualDeliveredAt) {
    return (
      <div className="card p-4 bg-success-50 border-success-100">
        <div className="text-xs text-success-700 uppercase tracking-wide flex items-center gap-1"><CheckCircle2 size={12} /> Quanto tempo falta</div>
        <div className="mt-2 text-sm text-success-900 font-semibold">Pedido entregue.</div>
        <div className="text-xs text-success-700 mt-0.5">Chegou {formatDateTime(promise.actualDeliveredAt)}.</div>
      </div>
    )
  }
  const late = promise.isDelayed
  return (
    <div className="card p-4">
      <div className="text-xs text-graphite-500 uppercase tracking-wide flex items-center gap-1">
        <Timer size={12} /> Quanto tempo falta
      </div>
      {currentLeg && (
        <div className="mt-2 text-sm">
          <span className="text-graphite-500">Próximo destino: </span>
          <span className="font-medium text-graphite-900">{currentLeg.destination}</span>
        </div>
      )}
      <div className="text-2xl font-bold text-graphite-900 mt-1">
        {late
          ? <span className="text-danger-700">Atrasado há {formatDurationShort(Math.abs(promise.delayMinutes))}</span>
          : <>{formatDurationShort(promise.remainingTimeMinutes)} <span className="text-sm font-medium text-graphite-500">até a entrega final</span></>
        }
      </div>
      <div className="mt-3 w-full rounded-full bg-graphite-200 h-2 overflow-hidden">
        <div className={`h-full transition-all ${late ? 'bg-danger-500' : 'bg-brand-600'}`} style={{ width: `${percent}%` }}></div>
      </div>
      <div className="mt-1 text-[11px] text-graphite-500">
        {percent}% concluído · {formatDurationShort(promise.elapsedTimeMinutes)} já percorrido de {formatDurationShort(promise.estimatedTotalDurationMinutes)}
      </div>
    </div>
  )
}

/** Card "Quando vai chegar" — ETA da perna + ETA final + prazo prometido */
export function DeliveryTimeCard({ pedido }: { pedido: PedidoTime }) {
  const { promise } = pedido
  const currentLeg = pedido.legs.find((l) => l.legId === pedido.currentLegId)
  const folga = -promise.delayMinutes // negativo = atrasado
  return (
    <div className="card p-4">
      <div className="text-xs text-graphite-500 uppercase tracking-wide flex items-center gap-1">
        <Target size={12} /> Quando vai chegar
      </div>
      <div className="mt-2 text-sm space-y-2">
        {currentLeg && currentLeg.status !== 'Concluída' && (
          <div>
            <div className="text-graphite-500">Chegada na perna atual</div>
            <div className="font-semibold text-graphite-900">{formatDeliveryWindow(currentLeg.estimatedArrivalWindowStart, currentLeg.estimatedArrivalWindowEnd)}</div>
          </div>
        )}
        <div>
          <div className="text-graphite-500">Entrega final prevista</div>
          <div className="font-semibold text-brand-700">{formatDeliveryWindow(promise.estimatedArrivalWindowStart, promise.estimatedArrivalWindowEnd)}</div>
        </div>
        <div>
          <div className="text-graphite-500">Prazo prometido</div>
          <div className="font-semibold text-graphite-900 flex items-center gap-1"><CalendarClock size={12} />{formatDateTime(promise.promisedDeliveryAt)}</div>
        </div>
        <div className="pt-2 border-t border-graphite-100">
          <DeadlineRiskBadge status={promise.deliveryTimeStatus} />
          <div className="text-xs text-graphite-600 mt-1">
            {folga > 0
              ? `Folga estimada de ${formatDurationShort(folga)} em relação ao prazo prometido.`
              : folga === 0
                ? 'No limite — chega exatamente no prazo prometido.'
                : `Atraso previsto de ${formatDurationShort(Math.abs(folga))} em relação ao prazo prometido.`}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Card "Quando chegou" — chegada real perna anterior + chegada real cliente */
export function ArrivalActualCard({ pedido }: { pedido: PedidoTime }) {
  const lastDone = [...pedido.legs].reverse().find((l) => l.actualArrivalAt)
  const { promise } = pedido
  return (
    <div className="card p-4">
      <div className="text-xs text-graphite-500 uppercase tracking-wide flex items-center gap-1">
        <CheckCircle2 size={12} /> Quando chegou
      </div>
      <div className="mt-2 text-sm space-y-2">
        {promise.actualDeliveredAt ? (
          <>
            <div>
              <div className="text-graphite-500">Entrega final</div>
              <div className="font-semibold text-success-700">{formatDateTime(promise.actualDeliveredAt)}</div>
            </div>
            {promise.recipientName && (
              <div>
                <div className="text-graphite-500">Recebedor</div>
                <div className="font-medium text-graphite-900 flex items-center gap-1"><User size={12} />{promise.recipientName}</div>
              </div>
            )}
          </>
        ) : (
          <div className="text-graphite-500">Entrega final ainda não realizada.</div>
        )}
        {lastDone && (
          <div className="pt-2 border-t border-graphite-100">
            <div className="text-graphite-500">Última chegada registrada</div>
            <div className="font-medium text-graphite-900 flex items-start gap-1">
              <MapPin size={12} className="mt-0.5 shrink-0" />
              <span>Chegou em {lastDone.destination} {formatDateTime(lastDone.actualArrivalAt!)}{lastDone.delayMinutes > 15 ? ` (${formatDurationShort(lastDone.delayMinutes)} de atraso)` : ''}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/** Card específico de "promessa ao cliente" — janela e prazo */
export function DeliveryPromiseCard({ pedido }: { pedido: PedidoTime }) {
  const { promise } = pedido
  return (
    <div className="card p-4">
      <div className="text-xs text-graphite-500 uppercase tracking-wide flex items-center gap-1">
        <CalendarClock size={12} /> Promessa ao cliente
      </div>
      <div className="mt-2 text-sm space-y-1">
        <div className="flex justify-between"><span className="text-graphite-500">Janela prometida</span><span className="font-medium">{formatDeliveryWindow(promise.promisedDeliveryWindowStart, promise.promisedDeliveryWindowEnd)}</span></div>
        <div className="flex justify-between"><span className="text-graphite-500">Limite final</span><span className="font-medium">{formatDateTimeFull(promise.promisedDeliveryAt)}</span></div>
        <div className="flex justify-between"><span className="text-graphite-500">SLA contratado</span><span className="font-medium">48h</span></div>
      </div>
    </div>
  )
}

/** Comparação ETA x Prazo */
export function ETAComparisonCard({ pedido }: { pedido: PedidoTime }) {
  const { promise } = pedido
  const folga = -promise.delayMinutes
  const isOK = folga >= 0
  return (
    <div className={`card p-4 ${isOK ? 'bg-success-50/30' : 'bg-danger-50/30'}`}>
      <div className="text-xs text-graphite-500 uppercase tracking-wide flex items-center gap-1">
        <Activity size={12} /> ETA vs Prazo prometido
      </div>
      <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-graphite-500 text-xs">ETA atual</div>
          <div className="font-semibold text-brand-700">{formatDateTime(promise.estimatedArrivalAt)}</div>
        </div>
        <div>
          <div className="text-graphite-500 text-xs">Prazo prometido</div>
          <div className="font-semibold text-graphite-900">{formatDateTime(promise.promisedDeliveryAt)}</div>
        </div>
      </div>
      <div className={`mt-3 text-sm font-semibold ${isOK ? 'text-success-700' : 'text-danger-700'}`}>
        {isOK
          ? <><CheckCircle2 className="inline mr-1" size={14} />No prazo — folga de {formatDurationShort(folga)}</>
          : <><AlertTriangle className="inline mr-1" size={14} />Atraso previsto de {formatDurationShort(Math.abs(folga))}</>
        }
      </div>
    </div>
  )
}

/** Próximo evento esperado */
export function NextEventCard({ pedido }: { pedido: PedidoTime }) {
  const next = pedido.events.find((e) => e.status === 'current' || e.status === 'pending')
  const { cargo } = pedido
  return (
    <div className="card p-4">
      <div className="text-xs text-graphite-500 uppercase tracking-wide flex items-center gap-1">
        <Activity size={12} /> Próximo evento esperado
      </div>
      <div className="mt-2 text-sm">
        <div className="font-semibold text-graphite-900">{next?.label || cargo.nextStop}</div>
        {next?.plannedAt && <div className="text-xs text-graphite-500">Previsto para {formatDateTime(next.plannedAt)}</div>}
        {next?.description && <div className="text-xs text-graphite-600 mt-1">{next.description}</div>}
      </div>
      <div className="pt-2 mt-2 border-t border-graphite-100 text-xs text-graphite-500">
        Última atualização: {formatDateTime(cargo.lastEventAt)} · {cargo.lastEventDescription}
      </div>
    </div>
  )
}

/** Mensagem de chegada amigável (cliente) */
export function ArrivalMessageCard({ pedido }: { pedido: PedidoTime }) {
  const message = formatArrivalMessage(pedido)
  const delivered = !!pedido.promise.actualDeliveredAt
  return (
    <div className={`rounded-xl border p-4 ${delivered ? 'bg-success-50 border-success-100 text-success-900' : pedido.promise.isDelayed ? 'bg-danger-50 border-danger-100 text-danger-900' : 'bg-brand-50 border-brand-100 text-brand-900'}`}>
      <div className="text-xs uppercase tracking-wide opacity-70 mb-1">Quando vai chegar</div>
      <div className="font-semibold text-base">{message}</div>
      {!delivered && (
        <div className="text-xs opacity-80 mt-1">
          Última atualização: {formatDateTime(pedido.promise.lastUpdatedAt)}
        </div>
      )}
    </div>
  )
}
