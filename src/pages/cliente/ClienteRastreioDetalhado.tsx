import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, Bell, Download, MessageSquare, MapPin, ChevronDown } from 'lucide-react'
import ClientShell from '../../components/layout/ClientShell'
import CustomerTrackingTimeline from '../../components/ui/time/CustomerTrackingTimeline'
import DeliveryProgressBar from '../../components/ui/time/DeliveryProgressBar'
import { ArrivalMessageCard } from '../../components/ui/time/DeliveryTimeCards'
import { findPedidoTime, pedidosTime } from '../../data/timeMocks'
import { formatDateTime, formatDeliveryWindow, formatDurationShort } from '../../utils/deliveryTimeCalculator'
import StatusBadge from '../../components/ui/StatusBadge'

export default function ClienteRastreioDetalhado() {
  const location = useLocation()
  const queryCode = new URLSearchParams(location.search).get('codigo') || 'SCP-2026-0001'
  const [code, setCode] = useState(queryCode)
  const [pedido, setPedido] = useState(() => findPedidoTime(queryCode) || pedidosTime[0])
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const found = findPedidoTime(code)
    if (found) setPedido(found)
  }, [code])

  const { promise } = pedido
  const currentLeg = pedido.legs.find((l) => l.legId === pedido.currentLegId) || pedido.legs[0]
  const delivered = !!promise.actualDeliveredAt

  return (
    <ClientShell>
      <h1 className="text-2xl sm:text-3xl font-bold text-graphite-900">Rastreamento detalhado</h1>
      <p className="text-sm text-graphite-500 mt-1">Acompanhe seu pedido em tempo real.</p>

      <div className="mt-4 card p-3 flex gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400" />
          <select value={code} onChange={(e) => setCode(e.target.value)} className="input pl-9">
            {pedidosTime.map((p) => (
              <option key={p.pedidoId} value={p.trackingCode}>
                {p.trackingCode} — {p.cliente} (NF {p.nf})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
        <div className="lg:col-span-2 space-y-4">
          {/* Status principal — linguagem cliente */}
          <div className="card-elevated p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="text-xs text-graphite-500">Código de rastreio</div>
                <div className="text-xl font-bold text-graphite-900">{pedido.trackingCode}</div>
                <div className="text-sm text-graphite-500">NF {pedido.nf}</div>
              </div>
              <StatusBadge status={pedido.statusAtual} />
            </div>

            <div className="mb-4">
              <ArrivalMessageCard pedido={pedido} />
            </div>

            {/* Status legível */}
            {delivered ? (
              <div className="bg-success-50 border border-success-100 rounded-lg p-4">
                <div className="font-semibold text-success-900">Seu pedido foi entregue.</div>
                <div className="text-sm text-success-700 mt-1">Chegou {formatDateTime(promise.actualDeliveredAt!)}.</div>
                {promise.recipientName && <div className="text-sm text-success-700">Recebedor: <strong>{promise.recipientName}</strong>.</div>}
                <button className="btn-outline mt-3 text-sm"><Download size={14} /> Baixar comprovante</button>
              </div>
            ) : pedido.statusAtual === 'Saiu para entrega' ? (
              <div className="bg-brand-50 border border-brand-100 rounded-lg p-4">
                <div className="font-semibold text-brand-900">Seu pedido saiu para entrega.</div>
                <div className="text-sm text-brand-700 mt-1">Chega {formatDeliveryWindow(promise.estimatedArrivalWindowStart, promise.estimatedArrivalWindowEnd)}.</div>
                <div className="text-sm text-brand-700">Tempo estimado restante: <strong>{formatDurationShort(promise.remainingTimeMinutes)}</strong>.</div>
                <div className="text-xs text-brand-700 mt-2">Última atualização: {formatDateTime(promise.lastUpdatedAt)}.</div>
              </div>
            ) : promise.isDelayed ? (
              <div className="bg-warning-50 border border-warning-100 rounded-lg p-4">
                <div className="font-semibold text-warning-900">Sua entrega teve alteração na previsão.</div>
                <div className="text-sm text-warning-700 mt-1">Nova previsão: {formatDeliveryWindow(promise.estimatedArrivalWindowStart, promise.estimatedArrivalWindowEnd)}.</div>
                <div className="text-sm text-warning-700">Motivo: atraso na transferência {currentLeg.origin} → {currentLeg.destination}.</div>
              </div>
            ) : (
              <div className="bg-brand-50 border border-brand-100 rounded-lg p-4">
                <div className="font-semibold text-brand-900">Seu pedido está em transferência para {currentLeg.destination}.</div>
                <div className="text-sm text-brand-700 mt-1">Previsão de entrega: <strong>{formatDeliveryWindow(promise.estimatedArrivalWindowStart, promise.estimatedArrivalWindowEnd)}</strong>.</div>
                <div className="text-sm text-brand-700">Tempo estimado até a entrega: <strong>{formatDurationShort(promise.remainingTimeMinutes)}</strong>.</div>
                <div className="text-xs text-brand-700 mt-2">Próxima atualização esperada: {currentLeg.nextExpectedEvent}.</div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="btn-primary"><Bell size={14} /> Receber atualizações por WhatsApp</button>
              <button className="btn-outline"><MessageSquare size={14} /> Falar com assistente</button>
            </div>
          </div>

          {/* Progresso visual em pernas */}
          <DeliveryProgressBar pedido={pedido} />

          {/* Timeline amigável */}
          <div className="card p-5">
            <div className="font-semibold text-graphite-900 mb-3">Linha do tempo</div>
            <CustomerTrackingTimeline pedido={pedido} />
          </div>

          {/* Detalhes expandíveis — cliente */}
          <div className="card p-5">
            <button onClick={() => setShowDetails((s) => !s)} className="w-full flex items-center justify-between text-left">
              <div>
                <div className="font-semibold text-graphite-900">Ver detalhes da entrega</div>
                <div className="text-xs text-graphite-500">Próximo destino, evento esperado e previsões intermediárias</div>
              </div>
              <ChevronDown size={16} className={`transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </button>
            {showDetails && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="bg-graphite-50 rounded-lg p-3">
                  <div className="text-xs text-graphite-500">Perna atual</div>
                  <div className="font-medium">{currentLeg.origin} → {currentLeg.destination}</div>
                </div>
                <div className="bg-graphite-50 rounded-lg p-3">
                  <div className="text-xs text-graphite-500">Próximo destino</div>
                  <div className="font-medium flex items-center gap-1"><MapPin size={12} />{currentLeg.destination}</div>
                </div>
                <div className="bg-graphite-50 rounded-lg p-3">
                  <div className="text-xs text-graphite-500">Próximo evento esperado</div>
                  <div className="font-medium">{currentLeg.nextExpectedEvent}</div>
                </div>
                <div className="bg-graphite-50 rounded-lg p-3">
                  <div className="text-xs text-graphite-500">Previsão de chegada no próximo centro</div>
                  <div className="font-medium">{formatDateTime(currentLeg.estimatedArrivalAt)}</div>
                </div>
                <div className="bg-graphite-50 rounded-lg p-3 md:col-span-2">
                  <div className="text-xs text-graphite-500">Previsão de entrega final</div>
                  <div className="font-medium text-brand-700">{formatDeliveryWindow(promise.estimatedArrivalWindowStart, promise.estimatedArrivalWindowEnd)}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {/* Pequena caixa de prazo */}
          <div className="card p-4">
            <div className="text-xs text-graphite-500 uppercase tracking-wide mb-2">Prazo prometido</div>
            <div className="font-semibold text-graphite-900">{formatDateTime(promise.promisedDeliveryAt)}</div>
            <div className="text-xs text-graphite-500 mt-1">Janela: {formatDeliveryWindow(promise.promisedDeliveryWindowStart, promise.promisedDeliveryWindowEnd)}</div>
          </div>

          <div className="card p-4">
            <div className="text-xs text-graphite-500 uppercase tracking-wide mb-2">Status do pedido</div>
            <StatusBadge status={pedido.statusAtual} />
            <div className="mt-3 text-xs text-graphite-700">
              {delivered
                ? 'Sua entrega foi concluída. Comprovante disponível.'
                : promise.isDelayed
                  ? 'Houve uma alteração na previsão original. Acompanhe os eventos para detalhes.'
                  : 'Seu pedido segue dentro do prazo prometido.'}
            </div>
          </div>

          <div className="card p-4 bg-brand-50 border-brand-100">
            <div className="text-xs text-brand-700 font-semibold uppercase tracking-wide mb-1">Por que minha localização exata não aparece?</div>
            <p className="text-xs text-brand-900">Para sua segurança, mostramos apenas eventos amigáveis (saídas e chegadas em filiais) e a previsão de entrega final.</p>
          </div>
        </div>
      </div>
    </ClientShell>
  )
}
