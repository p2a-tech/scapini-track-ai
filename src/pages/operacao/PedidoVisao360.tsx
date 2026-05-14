import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Box, ChevronRight, RotateCw, MapPin, MessageSquare, Bell } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import Order360Header from '../../components/ui/time/Order360Header'
import DeliveryProgressBar from '../../components/ui/time/DeliveryProgressBar'
import {
  DeliveryDurationCard, RemainingTimeCard, DeliveryTimeCard, ArrivalActualCard,
  DeliveryPromiseCard, ETAComparisonCard, NextEventCard,
} from '../../components/ui/time/DeliveryTimeCards'
import { LegTimelineDetailed } from '../../components/ui/time/LegTimeCard'
import CustomerTrackingTimeline from '../../components/ui/time/CustomerTrackingTimeline'
import RealMap from '../../components/ui/RealMap'
import { findPedidoTime, pedidosTime } from '../../data/timeMocks'
import { coordsFor } from '../../data/coords'
import { formatDateTime } from '../../utils/deliveryTimeCalculator'

export default function PedidoVisao360() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pedido = findPedidoTime(id || '') || pedidosTime[0]
  const currentLeg = pedido.legs.find((l) => l.legId === pedido.currentLegId) || pedido.legs[0]

  // mapa
  const origemCoord = coordsFor(pedido.origem)
  const destinoCoord = coordsFor(pedido.destino)
  const cwb = coordsFor('Curitiba/PR')!
  const fln = coordsFor('Florianópolis/SC')!
  const markers = [
    origemCoord && { id: 'o', position: origemCoord, label: pedido.origem, status: 'cd' as const },
    cwb && { id: 'cwb', position: cwb, label: 'Curitiba/PR', status: 'evento' as const },
    fln && { id: 'fln', position: fln, label: 'Florianópolis/SC', status: 'normal' as const },
    destinoCoord && { id: 'd', position: destinoCoord, label: pedido.destino, status: 'cliente' as const },
  ].filter(Boolean) as any[]

  return (
    <div>
      <PageTitle
        title={`Visão 360 — ${pedido.trackingCode}`}
        breadcrumb={['Operação', 'Pedidos', pedido.trackingCode, 'Visão 360']}
        actions={
          <>
            <button onClick={() => navigate(-1)} className="btn-outline"><ArrowLeft size={14} /> Voltar</button>
            <button className="btn-outline"><RotateCw size={14} /> Recalcular ETA</button>
            <button className="btn-outline"><Bell size={14} /> Notificar cliente</button>
            <button className="btn-primary"><MessageSquare size={14} /> Falar com IA</button>
          </>
        }
      />

      <Order360Header pedido={pedido} />

      <DeliveryProgressBar pedido={pedido} />

      {/* 4 cards principais que respondem às 4 perguntas */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <DeliveryDurationCard pedido={pedido} />
        <RemainingTimeCard pedido={pedido} />
        <DeliveryTimeCard pedido={pedido} />
        <ArrivalActualCard pedido={pedido} />
      </div>

      {/* Onde está agora + comparação ETA */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-xs text-graphite-500 uppercase tracking-wide mb-2 flex items-center gap-1"><MapPin size={12} /> Onde está agora?</div>
          <div className="text-sm space-y-2">
            <div>
              <div className="text-graphite-500 text-xs">Perna atual</div>
              <div className="font-semibold text-graphite-900">Perna {currentLeg.legNumber} — {currentLeg.origin} → {currentLeg.destination}</div>
            </div>
            <div>
              <div className="text-graphite-500 text-xs">Próximo destino</div>
              <div className="font-medium text-graphite-900">{currentLeg.destination}</div>
            </div>
            <div>
              <div className="text-graphite-500 text-xs">Próximo evento esperado</div>
              <div className="font-medium text-graphite-900">{currentLeg.nextExpectedEvent}</div>
            </div>
            <div className="pt-2 border-t border-graphite-100">
              <div className="text-graphite-500 text-xs">Fonte de rastreamento</div>
              <div className="font-medium text-graphite-900">{currentLeg.trackingSource}</div>
            </div>
            <div>
              <div className="text-graphite-500 text-xs">Última atualização</div>
              <div className="font-medium text-graphite-900">{currentLeg.lastEventDescription}</div>
              <div className="text-xs text-graphite-500">{formatDateTime(currentLeg.lastEventAt)}</div>
            </div>
          </div>
        </div>
        <ETAComparisonCard pedido={pedido} />
        <NextEventCard pedido={pedido} />
      </div>

      {/* Mapa */}
      <div className="card p-4 mt-4">
        <div className="font-semibold text-graphite-900 mb-3">Rota — OpenStreetMap</div>
        <RealMap height={320} showLegend={false} markers={markers} routes={[{ id: 'r', positions: markers.map((m) => m.position), color: '#1f365c', weight: 3, dashArray: '6 6' }]} />
      </div>

      {/* Hierarquia pedido → ordem → carga → pernas */}
      <div className="card p-4 mt-4">
        <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Box size={14} /> Pedido, carga e pernas</div>
        <ol className="flex items-center text-sm gap-1 overflow-x-auto pb-1">
          <li className="px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 font-medium whitespace-nowrap">Pedido {pedido.trackingCode}</li>
          <ChevronRight size={14} className="text-graphite-400 shrink-0" />
          <li className="px-3 py-1.5 rounded-lg bg-graphite-100 text-graphite-800 whitespace-nowrap">Ordem {pedido.ordemNumero}</li>
          <ChevronRight size={14} className="text-graphite-400 shrink-0" />
          <li className="px-3 py-1.5 rounded-lg bg-graphite-100 text-graphite-800 whitespace-nowrap">Carga {pedido.cargaNumero}</li>
          {pedido.legs.map((l) => (
            <span key={l.legId} className="contents">
              <ChevronRight size={14} className="text-graphite-400 shrink-0" />
              <li className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
                l.legId === pedido.currentLegId ? 'bg-accent-50 text-accent-700 font-medium' : l.status === 'Concluída' ? 'bg-success-50 text-success-700' : 'bg-graphite-100 text-graphite-700'
              }`}>
                Perna {l.legNumber}: {l.origin} → {l.destination}
              </li>
            </span>
          ))}
        </ol>
      </div>

      {/* Pernas detalhadas */}
      <div className="mt-5">
        <div className="font-semibold text-graphite-900 mb-3">Pernas logísticas — tempo e prazo</div>
        <LegTimelineDetailed legs={pedido.legs} />
      </div>

      {/* Timeline completa */}
      <div className="card p-5 mt-5">
        <div className="font-semibold text-graphite-900 mb-3">Timeline detalhada do pedido</div>
        <CustomerTrackingTimeline pedido={pedido} />
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        <DeliveryPromiseCard pedido={pedido} />
        <div className="card p-4 bg-brand-50 border-brand-100">
          <div className="text-xs text-brand-700 uppercase tracking-wide mb-2 flex items-center gap-1">Quer ver como o cliente enxerga?</div>
          <p className="text-sm text-brand-900">Acesse o <Link to={`/cliente/rastreio-detalhado?codigo=${pedido.trackingCode}`} className="font-semibold underline">rastreamento detalhado do cliente</Link> com linguagem amigável e sem informações internas.</p>
        </div>
      </div>
    </div>
  )
}
