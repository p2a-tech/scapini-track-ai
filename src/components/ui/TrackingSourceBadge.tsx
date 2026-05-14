import { Satellite, Smartphone, Link2, Cpu, Building2, Plug, Hand, ShieldCheck } from 'lucide-react'
import { trackingSourceColor } from '../../utils/status'

const icon: Record<string, any> = {
  'GPS próprio': Satellite,
  'API rastreador terceiro': Plug,
  'App motorista': Smartphone,
  'Link temporário': Link2,
  'Device na carga': Cpu,
  'Apenas eventos': Building2,
  'Atualização manual': Hand,
  'Exceção aprovada': ShieldCheck,
}

export default function TrackingSourceBadge({ source }: { source: string }) {
  const Icon = icon[source] || Building2
  const c = trackingSourceColor(source)
  return (
    <span className={`chip ${c.bg} ${c.text}`}>
      <Icon size={11} />
      {source}
    </span>
  )
}
