import { CheckCircle2, Truck, MapPin } from 'lucide-react'
import type { PedidoTime } from '../../../data/timeTypes'

/** Barra horizontal de progresso por perna, com etapas marcadas */
export default function DeliveryProgressBar({ pedido }: { pedido: PedidoTime }) {
  return (
    <div className="card p-4">
      <div className="text-xs text-graphite-500 uppercase tracking-wide mb-3">Progresso do pedido</div>
      <ol className="flex items-center gap-2 overflow-x-auto">
        {pedido.legs.map((leg, i) => {
          const isLast = i === pedido.legs.length - 1
          const done = leg.status === 'Concluída'
          const current = leg.status === 'Em andamento'
          return (
            <li key={leg.legId} className="flex items-center flex-1 min-w-[160px]">
              <div className="flex flex-col items-center text-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  done ? 'bg-success-100 text-success-700' : current ? 'bg-brand-100 text-brand-700 ring-4 ring-brand-200' : 'bg-graphite-100 text-graphite-400'
                }`}>
                  {done ? <CheckCircle2 size={18} /> : current ? <Truck size={18} /> : <MapPin size={18} />}
                </div>
                <div className={`mt-1 text-[10px] font-semibold uppercase tracking-wide ${current ? 'text-brand-700' : 'text-graphite-500'}`}>Perna {leg.legNumber}</div>
                <div className={`text-xs ${done ? 'text-success-700' : current ? 'text-graphite-900 font-medium' : 'text-graphite-500'}`}>{leg.destination}</div>
              </div>
              {!isLast && (
                <div className={`h-0.5 flex-1 min-w-[24px] mx-1 ${
                  done ? 'bg-success-500' : current ? 'bg-gradient-to-r from-brand-500 to-graphite-200' : 'bg-graphite-200'
                }`}></div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
