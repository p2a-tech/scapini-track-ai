import { Package, Truck, FileText, ChevronRight } from 'lucide-react'
import type { PedidoTime } from '../../../data/timeTypes'
import { formatDateTime, formatDeliveryWindow, formatDurationShort } from '../../../utils/deliveryTimeCalculator'
import StatusBadge from '../StatusBadge'
import { DeadlineRiskBadge, RemainingTimeBadge } from './TimeBadges'

export default function Order360Header({ pedido }: { pedido: PedidoTime }) {
  const { promise } = pedido
  return (
    <div className="card-elevated p-5 mb-4 bg-gradient-to-br from-navy-900 via-navy-800 to-brand-700 text-white">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs text-navy-200 uppercase tracking-wide flex items-center gap-2">
            <Package size={12} /> Pedido · NF {pedido.nf} · CT-e {pedido.cte}
          </div>
          <div className="mt-1 text-2xl font-bold">{pedido.trackingCode}</div>
          <div className="mt-1 text-sm text-navy-200">
            <span className="text-white font-medium">{pedido.cliente}</span>
            {pedido.varejista && <> · varejista <span className="text-white">{pedido.varejista}</span></>}
            <span className="block sm:inline"> · destino <span className="text-white">{pedido.destinatario}</span></span>
          </div>
          <div className="mt-2 text-xs text-navy-300 flex items-center gap-2 flex-wrap">
            <span><Truck className="inline" size={11} /> Ordem {pedido.ordemNumero}</span>
            <ChevronRight size={10} />
            <span><FileText className="inline" size={11} /> Carga {pedido.cargaNumero}</span>
            <ChevronRight size={10} />
            <span>{pedido.origem} → {pedido.destino}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:items-end">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={pedido.statusAtual} />
            <DeadlineRiskBadge status={promise.deliveryTimeStatus} />
            <RemainingTimeBadge minutes={promise.remainingTimeMinutes} delivered={!!promise.actualDeliveredAt} lateMinutes={promise.isDelayed ? Math.abs(promise.delayMinutes) : 0} />
          </div>
          <div className="text-xs text-navy-200 lg:text-right space-y-0.5">
            {promise.actualDeliveredAt ? (
              <div className="text-white">Entregue {formatDateTime(promise.actualDeliveredAt)}</div>
            ) : (
              <>
                <div className="text-white font-semibold">{formatDeliveryWindow(promise.estimatedArrivalWindowStart, promise.estimatedArrivalWindowEnd)}</div>
                <div>Prazo prometido: {formatDateTime(promise.promisedDeliveryAt)}</div>
              </>
            )}
            <div>Última atualização: {formatDateTime(promise.lastUpdatedAt)}</div>
          </div>
        </div>
      </div>

      {/* Métricas inline */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white/10 backdrop-blur rounded-lg p-3">
          <div className="text-navy-200">Quanto tempo leva</div>
          <div className="font-bold text-base">{formatDurationShort(promise.estimatedTotalDurationMinutes)}</div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-3">
          <div className="text-navy-200">Quanto tempo falta</div>
          <div className="font-bold text-base">{promise.actualDeliveredAt ? 'Chegou' : formatDurationShort(promise.remainingTimeMinutes)}</div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-3">
          <div className="text-navy-200">Quando vai chegar</div>
          <div className="font-bold text-base">{promise.actualDeliveredAt ? '—' : formatDateTime(promise.estimatedArrivalAt)}</div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-3">
          <div className="text-navy-200">Quando chegou</div>
          <div className="font-bold text-base">{promise.actualDeliveredAt ? formatDateTime(promise.actualDeliveredAt) : 'Ainda não entregue'}</div>
        </div>
      </div>
    </div>
  )
}
