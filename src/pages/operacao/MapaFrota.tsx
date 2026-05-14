import { useState } from 'react'
import { Filter, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../components/layout/PageTitle'
import RealMap, { RealMarker, RealRoute } from '../../components/ui/RealMap'
import StatusBadge from '../../components/ui/StatusBadge'
import TrackingSourceBadge from '../../components/ui/TrackingSourceBadge'
import TrackingScore from '../../components/ui/TrackingScore'
import RiskBadge from '../../components/ui/RiskBadge'
import { orders } from '../../data/mockData'
import { coordsFor } from '../../data/coords'

// posições simuladas em rota (aproximação entre origem e destino) para cada ordem
const livePositions: Record<string, [number, number]> = {
  'ord-001': [-25.4400, -49.3200],  // entre Guarulhos e Curitiba
  'ord-002': [-27.4000, -48.7000],  // próximo a Florianópolis
  'ord-003': [-24.9558, -53.4552],  // Cascavel (sem sinal)
  'ord-004': [-23.4543, -46.5337],  // Guarulhos (aguardando)
  'ord-005': [-23.3500, -51.5500],  // Londrina → Maringá
  'ord-006': [-26.5000, -50.0000],  // Caxias → SP em transferência
  'ord-007': [-26.5500, -48.9300],  // Joinville → Blumenau última milha
  'ord-008': [-26.9077, -48.6618],  // Itajaí — aguardando
}

const statusToMarker: Record<string, 'normal' | 'atencao' | 'parado' | 'aguardando' | 'terceiro' | 'evento'> = {
  'Em trânsito': 'normal',
  'Saiu para entrega': 'normal',
  'Em carregamento': 'aguardando',
  'Aguardando expedição': 'aguardando',
  'Na filial': 'aguardando',
  'Entregue': 'normal',
  'Ocorrência': 'parado',
}

export default function MapaFrota() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(orders[0].id)

  const markers: RealMarker[] = orders.map((o) => {
    const pos = livePositions[o.id] || coordsFor(o.origin) || [-26.5, -49.5]
    let status = statusToMarker[o.status] || 'normal'
    if (o.trackingScore === 0 || o.trackingScore < 30) status = 'parado'
    else if (o.driver.toLowerCase().includes('terceiro') || o.driver.includes('Wagner') || o.driver.includes('Mauro') || o.driver.includes('Tiago')) {
      status = o.riskAi === 'alto' ? 'atencao' : 'terceiro'
    } else if (o.riskAi === 'alto') status = 'atencao'
    return {
      id: o.id,
      position: pos,
      label: o.vehicle.split('→')[0].trim(),
      detail: `${o.driver} · ${o.client}`,
      status,
      popup: (
        <div className="space-y-1">
          <div className="text-xs text-graphite-500">{o.origin} → {o.destination}</div>
          <div className="text-xs">ETA: <strong>{o.etaAi}</strong></div>
          <button
            onClick={() => navigate(`/operacao/ordens/${o.id}`)}
            className="text-xs text-brand-700 font-semibold hover:underline mt-1"
          >Ver ordem →</button>
        </div>
      ),
    }
  })

  // rotas planejadas — origem → destino
  const routes: RealRoute[] = orders.slice(0, 4).map((o) => {
    const a = coordsFor(o.origin)
    const b = coordsFor(o.destination)
    if (!a || !b) return null
    return {
      id: `route-${o.id}`,
      positions: [a, livePositions[o.id] || a, b],
      color: o.riskAi === 'alto' ? '#ef4444' : '#1f365c',
      dashArray: '6 6',
      weight: 2,
    }
  }).filter(Boolean) as RealRoute[]

  const sel = orders.find((o) => o.id === selected)

  return (
    <div>
      <PageTitle
        title="Mapa da frota"
        subtitle="Visão consolidada em tempo real — OpenStreetMap, frota própria, terceiros via API, devices e eventos de filial."
        breadcrumb={['Operação', 'Mapa da frota']}
        actions={<button className="btn-outline"><Filter size={14} /> Filtros</button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <RealMap
            markers={markers}
            routes={routes}
            height={620}
            onMarkerClick={(m) => setSelected(m.id)}
          />
        </div>
        <div className="card p-4 max-h-[620px] overflow-y-auto">
          <div className="font-semibold text-graphite-900 mb-2">Veículos em rota</div>
          <div className="space-y-2">
            {markers.map((m) => {
              const o = orders.find((x) => x.id === m.id)
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
                  {o && <div className="text-[11px] text-graphite-700 mt-1 truncate">{o.origin} → {o.destination}</div>}
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
