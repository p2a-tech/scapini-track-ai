import { Battery, BatteryLow, MapPin, Clock } from 'lucide-react'
import { Device } from '../../data/types'
import StatusBadge from './StatusBadge'

export default function DeviceStatusCard({ device }: { device: Device }) {
  const low = device.battery < 20
  return (
    <div className="card p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-semibold text-graphite-900">{device.code}</div>
          <div className="text-xs text-graphite-500">IMEI {device.imei}</div>
        </div>
        <StatusBadge status={device.status} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          {low ? <BatteryLow size={14} className="text-danger-600" /> : <Battery size={14} className="text-success-600" />}
          <span className={`font-medium ${low ? 'text-danger-700' : 'text-graphite-900'}`}>Bateria {device.battery}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-graphite-600">
          <Clock size={14} />
          <span>{device.lastCommunication}</span>
        </div>
        <div className="col-span-2 flex items-start gap-1.5 text-graphite-700">
          <MapPin size={14} className="mt-0.5 shrink-0" />
          <span>{device.lastPosition}</span>
        </div>
      </div>
      {device.orderId && (
        <div className="mt-3 border-t border-graphite-100 pt-3 text-xs">
          <div className="text-graphite-500">Vinculado à</div>
          <div className="font-medium text-graphite-900">{device.client}</div>
        </div>
      )}
    </div>
  )
}
