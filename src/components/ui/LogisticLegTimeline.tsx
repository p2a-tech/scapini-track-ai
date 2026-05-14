import { ArrowRight, Truck } from 'lucide-react'
import { LogisticLeg } from '../../data/types'
import StatusBadge from './StatusBadge'
import TrackingSourceBadge from './TrackingSourceBadge'
import RiskBadge from './RiskBadge'

export default function LogisticLegTimeline({ legs }: { legs: LogisticLeg[] }) {
  return (
    <div className="space-y-3">
      {legs.map((l) => (
        <div key={l.id} className="card p-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-graphite-500 uppercase tracking-wide">
                <span className="bg-brand-100 text-brand-700 rounded-full w-6 h-6 inline-flex items-center justify-center text-[11px] font-bold">{l.legNumber}</span>
                <span>{l.type}</span>
                <span>•</span>
                <span>{l.carrierType}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-graphite-900">
                <span>{l.origin}</span>
                <ArrowRight size={14} className="text-graphite-400" />
                <span>{l.destination}</span>
              </div>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-graphite-600">
                <div><div className="text-graphite-500">Transportador</div><div className="font-medium text-graphite-900">{l.carrier}</div></div>
                <div><div className="text-graphite-500">Veículo</div><div className="font-medium text-graphite-900 flex items-center gap-1"><Truck size={11} />{l.vehiclePlate}</div></div>
                <div><div className="text-graphite-500">Motorista</div><div className="font-medium text-graphite-900">{l.driverName}</div></div>
                <div><div className="text-graphite-500">ETA</div><div className="font-medium text-graphite-900">{l.eta}</div></div>
              </div>
              {l.events.length > 0 && (
                <div className="mt-3 border-t border-graphite-100 pt-3 text-xs">
                  <div className="text-graphite-500 mb-1">Eventos registrados</div>
                  <ul className="space-y-1">
                    {l.events.map((e, i) => (
                      <li key={i} className="flex items-center gap-2 text-graphite-700">
                        <span className="w-1 h-1 rounded-full bg-graphite-400"></span>
                        <span className="font-medium">{e.time}</span>
                        <span className="text-graphite-500">—</span>
                        <span>{e.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex flex-col md:items-end gap-2">
              <StatusBadge status={l.status} />
              <TrackingSourceBadge source={l.trackingSource} />
              <RiskBadge level={l.risk} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
