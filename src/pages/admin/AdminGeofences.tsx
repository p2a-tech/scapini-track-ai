import PageTitle from '../../components/layout/PageTitle'
import RealMap, { RealGeofence, RealMarker } from '../../components/ui/RealMap'
import { geofences } from '../../data/mockData'
import StatusBadge from '../../components/ui/StatusBadge'
import { Edit2, Plus } from 'lucide-react'

const positions: Record<string, [number, number]> = {
  'gf-1': [-23.4350, -46.5350], // CD Guarulhos
  'gf-2': [-25.4500, -49.2500], // Filial Curitiba
  'gf-3': [-27.5900, -48.5400], // Filial Florianópolis
  'gf-4': [-30.0100, -51.2000], // CD Porto Alegre
  'gf-5': [-29.9177, -51.1839], // Cliente Canoas
  'gf-6': [-23.5505, -46.6333], // Região Metropolitana SP (centroid)
  'gf-7': [-26.3100, -48.8500], // Hub Joinville
}

export default function AdminGeofences() {
  const markers: RealMarker[] = geofences.map((g) => ({
    id: g.id,
    position: positions[g.id] || [-26.5, -49.5],
    label: g.name,
    detail: `${g.type} · raio ${g.radius >= 1000 ? (g.radius / 1000).toFixed(0) + ' km' : g.radius + ' m'}`,
    status: g.type === 'CD' || g.type === 'Filial' ? 'cd' : g.type === 'Cliente' ? 'cliente' : 'evento',
  }))
  const circles: RealGeofence[] = geofences.map((g) => ({
    id: 'c-' + g.id,
    center: positions[g.id] || [-26.5, -49.5],
    radius: g.radius,
    color: g.type === 'CD' || g.type === 'Filial' ? '#1f365c' : g.type === 'Cliente' ? '#ff7d2e' : '#356bb6',
    label: g.name,
  }))

  return (
    <div>
      <PageTitle
        title="Geofences"
        subtitle="Áreas geográficas que disparam eventos automáticos (filiais, CDs, clientes, regiões)."
        breadcrumb={['Administração', 'Geofences']}
        actions={<button className="btn-primary"><Plus size={14} /> Nova geofence</button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-4 lg:col-span-2">
          <div className="font-semibold text-graphite-900 mb-3">Visão geral — OpenStreetMap</div>
          <RealMap height={460} markers={markers} geofences={circles} />
        </div>
        <div className="card p-4 max-h-[480px] overflow-y-auto">
          <div className="font-semibold text-graphite-900 mb-3">Lista</div>
          <div className="space-y-2">
            {geofences.map((g) => (
              <div key={g.id} className="border border-graphite-200 rounded-lg p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-graphite-900">{g.name}</div>
                    <div className="text-xs text-graphite-500">{g.address}</div>
                    <div className="text-xs text-graphite-500">Raio: {g.radius >= 1000 ? `${(g.radius / 1000).toFixed(0)} km` : `${g.radius} m`}</div>
                  </div>
                  <StatusBadge status={g.status} />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] uppercase text-graphite-500">{g.type}</span>
                  <button className="btn-ghost"><Edit2 size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
