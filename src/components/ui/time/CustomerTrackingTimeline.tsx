import { CheckCircle2, Clock, Circle, AlertTriangle } from 'lucide-react'
import type { PedidoTime } from '../../../data/timeTypes'
import { formatDateTime } from '../../../utils/deliveryTimeCalculator'

/** Linha do tempo amigável para o cliente — usa linguagem simples e datas formatadas */
export default function CustomerTrackingTimeline({ pedido, compact = false }: { pedido: PedidoTime; compact?: boolean }) {
  return (
    <ol className="relative">
      {pedido.events.map((e, idx) => {
        const last = idx === pedido.events.length - 1
        const stateIcon = e.status === 'done' ? <CheckCircle2 size={14} className="text-success-600" />
          : e.status === 'current' ? <Clock size={14} className="text-brand-600" />
          : e.status === 'late' ? <AlertTriangle size={14} className="text-warning-600" />
          : <Circle size={14} className="text-graphite-400" />
        const lineColor = e.status === 'done' ? 'bg-success-300' : e.status === 'current' ? 'bg-brand-300' : e.status === 'late' ? 'bg-warning-300' : 'bg-graphite-200'
        return (
          <li key={e.id} className="relative pl-7 pb-5 last:pb-0">
            {!last && <span className={`absolute left-[7px] top-5 w-0.5 h-[calc(100%-12px)] ${lineColor}`} />}
            <span className="absolute left-0 top-0.5 w-3.5 h-3.5 rounded-full bg-white ring-2 ring-white flex items-center justify-center">
              {stateIcon}
            </span>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className={`text-sm font-medium ${e.status === 'pending' ? 'text-graphite-500' : 'text-graphite-900'}`}>{e.label}</div>
                {!compact && e.description && <div className="text-xs text-graphite-500 mt-0.5">{e.description}</div>}
              </div>
              <div className="text-xs text-graphite-500 whitespace-nowrap">
                {e.actualAt
                  ? formatDateTime(e.actualAt)
                  : e.plannedAt
                    ? <span className="text-graphite-400 italic">Previsto {formatDateTime(e.plannedAt)}</span>
                    : '—'}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
