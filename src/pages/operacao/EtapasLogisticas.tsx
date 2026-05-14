import { useNavigate } from 'react-router-dom'
import { Eye } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import KPIGrid from '../../components/ui/KPIGrid'
import MetricCard from '../../components/ui/MetricCard'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import RiskBadge from '../../components/ui/RiskBadge'
import TrackingSourceBadge from '../../components/ui/TrackingSourceBadge'
import { orders } from '../../data/mockData'
import { LogisticLeg } from '../../data/types'
import { Workflow, Plug, MapPin, Building2, AlertTriangle, Activity } from 'lucide-react'

export default function EtapasLogisticas() {
  const navigate = useNavigate()
  // Flatten all legs
  type LegRow = LogisticLeg & { orderNumber: string; client: string }
  const allLegs: LegRow[] = orders.flatMap((o) => o.legs.map((l) => ({ ...l, orderNumber: o.number, client: o.client })))

  const columns: Column<LegRow>[] = [
    { key: 'order', header: 'Ordem / Cliente', render: (r) => <span className="text-xs"><span className="font-semibold text-graphite-900 block">{r.orderNumber}</span>{r.client}</span> },
    { key: 'route', header: 'Origem → Destino', render: (r) => <span className="text-xs">{r.origin}<br/><span className="text-graphite-500">→ {r.destination}</span></span> },
    { key: 'type', header: 'Tipo', render: (r) => <span className="text-xs">{r.type}</span> },
    { key: 'carrier', header: 'Transportador', render: (r) => <span className="text-xs">{r.carrier}<br/><span className="text-graphite-500">{r.vehiclePlate} · {r.driverName}</span></span> },
    { key: 'source', header: 'Fonte', render: (r) => <TrackingSourceBadge source={r.trackingSource} /> },
    { key: 'last', header: 'Último evento', render: (r) => <span className="text-xs">{r.lastEvent || '—'}</span> },
    { key: 'eta', header: 'ETA', render: (r) => <span className="text-xs">{r.eta}</span> },
    { key: 'risk', header: 'Risco', render: (r) => <RiskBadge level={r.risk} /> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', header: '', render: (r) => <button onClick={() => navigate(`/operacao/ordens/${r.orderId}/etapas`)} className="btn-ghost"><Eye size={14} /></button> },
  ]

  return (
    <div>
      <PageTitle
        title="Etapas logísticas"
        subtitle="Visibilidade por perna logística — coleta, transferências, cross-docking, última milha e devoluções."
        breadcrumb={['Operação', 'Etapas logísticas']}
      />

      <KPIGrid columns={6}>
        <MetricCard label="Em andamento" value="14" icon={<Workflow size={18} />} tone="brand" />
        <MetricCard label="Atrasadas" value="3" icon={<AlertTriangle size={18} />} tone="danger" />
        <MetricCard label="Apenas por evento" value="6" icon={<Building2 size={18} />} />
        <MetricCard label="Com API de rastreador" value="5" icon={<Plug size={18} />} tone="brand" />
        <MetricCard label="Em última milha" value="4" icon={<MapPin size={18} />} tone="accent" />
        <MetricCard label="Sem rastreio mínimo" value="1" icon={<Activity size={18} />} tone="warning" />
      </KPIGrid>

      <div className="mt-5">
        <DataTable columns={columns} data={allLegs} empty="Nenhuma etapa em andamento" />
      </div>
    </div>
  )
}
