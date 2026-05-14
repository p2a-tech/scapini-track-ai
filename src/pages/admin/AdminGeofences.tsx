import PageTitle from '../../components/layout/PageTitle'
import MockMap from '../../components/ui/MockMap'
import { geofences } from '../../data/mockData'
import StatusBadge from '../../components/ui/StatusBadge'
import { Edit2, Plus } from 'lucide-react'

export default function AdminGeofences() {
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
          <div className="font-semibold text-graphite-900 mb-3">Visão geral</div>
          <MockMap height={420} markers={[
            { id: 'g1', x: 30, y: 20, label: 'CD Guarulhos', status: 'evento' },
            { id: 'g2', x: 50, y: 35, label: 'Filial Curitiba', status: 'evento' },
            { id: 'g3', x: 64, y: 55, label: 'Filial Floripa', status: 'evento' },
            { id: 'g4', x: 70, y: 78, label: 'CD POA', status: 'evento' },
            { id: 'g5', x: 28, y: 70, label: 'Hub Joinville', status: 'evento' },
          ]} />
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
