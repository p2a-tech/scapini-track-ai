import { useState } from 'react'
import { Filter, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../components/layout/PageTitle'
import MockMap from '../../components/ui/MockMap'
import StatusBadge from '../../components/ui/StatusBadge'
import TrackingSourceBadge from '../../components/ui/TrackingSourceBadge'
import TrackingScore from '../../components/ui/TrackingScore'
import RiskBadge from '../../components/ui/RiskBadge'
import { orders } from '../../data/mockData'

export default function MapaFrota() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(orders[0].id)

  const markers = [
    { id: orders[0].id, x: 18, y: 22, label: 'SCA-1A23', status: 'normal' as const, detail: 'João Pereira' },
    { id: orders[1].id, x: 38, y: 35, label: 'SCA-2B45', status: 'normal' as const, detail: 'Carlos Mendes' },
    { id: orders[2].id, x: 62, y: 50, label: 'TRC-9X88', status: 'parado' as const, detail: 'Frete Rápido PR — sem sinal' },
    { id: orders[3].id, x: 30, y: 60, label: 'SCA-4D89', status: 'aguardando' as const, detail: 'Aguardando saída' },
    { id: orders[4].id, x: 52, y: 28, label: 'SCA-5E10', status: 'aguardando' as const, detail: 'Carregando' },
    { id: orders[5].id, x: 80, y: 38, label: 'RDB-2024', status: 'terceiro' as const, detail: 'Rodobras (API)' },
    { id: orders[6].id, x: 70, y: 65, label: 'SUL-1010', status: 'atencao' as const, detail: 'Device na carga' },
    { id: 'ev1', x: 14, y: 75, label: 'CD POA', status: 'evento' as const, detail: 'Cross-docking' },
  ]
  const sel = orders.find((o) => o.id === selected)

  return (
    <div>
      <PageTitle
        title="Mapa da frota"
        subtitle="Visão consolidada — frota própria, terceiros via API, devices e eventos de filial."
        breadcrumb={['Operação', 'Mapa da frota']}
        actions={<button className="btn-outline"><Filter size={14} /> Filtros</button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <MockMap markers={markers} height={620} onClickMarker={(m) => setSelected(m.id)} />
        </div>
        <div className="card p-4 max-h-[620px] overflow-y-auto">
          <div className="font-semibold text-graphite-900 mb-2">Veículos em rota</div>
          <div className="space-y-2">
            {markers.map((m) => {
              const order = orders.find((o) => o.id === m.id)
              return (
                <button
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selected === m.id ? 'border-brand-400 bg-brand-50' : 'border-graphite-200 hover:bg-graphite-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold flex items-center gap-1"><Truck size={12} className="text-brand-700" />{m.label}</div>
                    <span className="text-[10px] text-graphite-500 uppercase">{m.status}</span>
                  </div>
                  <div className="text-xs text-graphite-500 truncate">{m.detail}</div>
                  {order && <div className="text-[11px] text-graphite-700 mt-1">{order.client}</div>}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {sel && (
        <div className="card-elevated mt-4 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <div className="text-xs text-graphite-500">Detalhes do veículo</div>
              <div className="font-semibold text-graphite-900">{sel.vehicle} · {sel.driver}</div>
              <div className="text-xs text-graphite-500">{sel.client} · {sel.origin} → {sel.destination}</div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={sel.status} />
              <TrackingSourceBadge source={sel.trackingSource} />
              <RiskBadge level={sel.riskAi} />
              <TrackingScore score={sel.trackingScore} size="sm" />
              <button onClick={() => navigate(`/operacao/ordens/${sel.id}`)} className="btn-primary">Ver detalhes</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div><div className="text-xs text-graphite-500">Velocidade</div><div className="font-medium">78 km/h</div></div>
            <div><div className="text-xs text-graphite-500">Última posição</div><div className="font-medium">Lapa/PR — BR-376</div></div>
            <div><div className="text-xs text-graphite-500">ETA</div><div className="font-medium">{sel.etaAi}</div></div>
            <div><div className="text-xs text-graphite-500">Entregas vinculadas</div><div className="font-medium">{sel.legs.length || 1} perna(s)</div></div>
          </div>
        </div>
      )}
    </div>
  )
}
