import { Boxes, Truck, FileText } from 'lucide-react'
import type { PedidoTime } from '../../../data/timeTypes'
import { formatDateTime, formatDeliveryWindow, formatDurationShort } from '../../../utils/deliveryTimeCalculator'
import StatusBadge from '../StatusBadge'

export default function Cargo360Header({ pedido, qtdPedidos = 1, pesoTotal = '1.250 kg', volume = '3,4 m³', valor = 'R$ 84.500,00', mdfe = '550001' }: {
  pedido: PedidoTime
  qtdPedidos?: number
  pesoTotal?: string
  volume?: string
  valor?: string
  mdfe?: string
}) {
  const { cargo } = pedido
  const currentLeg = pedido.legs.find((l) => l.legId === cargo.currentLegId) || pedido.legs[0]
  return (
    <div className="card-elevated p-5 mb-4 bg-gradient-to-br from-graphite-900 via-navy-800 to-brand-700 text-white">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs text-navy-200 uppercase tracking-wide flex items-center gap-2">
            <Boxes size={12} /> Carga · MDF-e {mdfe} · Romaneio {cargo.cargaId}
          </div>
          <div className="mt-1 text-2xl font-bold">{pedido.cargaNumero}</div>
          <div className="mt-1 text-sm text-navy-200">
            {pedido.origem} → {pedido.destino} · veículo {currentLeg.vehicle} · motorista {currentLeg.driver}
          </div>
          <div className="text-xs text-navy-300 mt-2 flex items-center gap-2 flex-wrap">
            <span><Truck className="inline" size={11} /> Transportador {currentLeg.carrier}</span>
            <span>· {qtdPedidos} pedido(s) · {pesoTotal} · {volume}</span>
            <span>· Valor mercadoria <FileText className="inline" size={11} /> {valor}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:items-end">
          <StatusBadge status={cargo.timeStatus} />
          <div className="text-xs text-navy-200 lg:text-right">
            {cargo.actualArrivalAt
              ? <div className="text-white">Chegou {formatDateTime(cargo.actualArrivalAt)}</div>
              : <div className="text-white font-semibold">Chegada prevista: {formatDateTime(cargo.estimatedArrivalAt)}</div>
            }
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white/10 backdrop-blur rounded-lg p-3">
          <div className="text-navy-200">Quanto tempo leva (total)</div>
          <div className="font-bold text-base">{formatDurationShort(cargo.estimatedDurationMinutes)}</div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-3">
          <div className="text-navy-200">Quanto tempo falta</div>
          <div className="font-bold text-base">{cargo.actualArrivalAt ? 'Chegou' : formatDurationShort(cargo.remainingTimeMinutes)}</div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-3">
          <div className="text-navy-200">Quando vai chegar</div>
          <div className="font-bold text-base">{cargo.actualArrivalAt ? '—' : formatDateTime(cargo.estimatedArrivalAt)}</div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-3">
          <div className="text-navy-200">Janela do pedido</div>
          <div className="font-bold text-base">{formatDeliveryWindow(pedido.promise.promisedDeliveryWindowStart, pedido.promise.promisedDeliveryWindowEnd)}</div>
        </div>
      </div>
    </div>
  )
}
