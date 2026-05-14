import PageTitle from '../../components/layout/PageTitle'
import KPIGrid from '../../components/ui/KPIGrid'
import MetricCard from '../../components/ui/MetricCard'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import TrackingSourceBadge from '../../components/ui/TrackingSourceBadge'
import RiskBadge from '../../components/ui/RiskBadge'
import { MapPin, Truck, AlertTriangle, CheckCircle2, Users, Eye } from 'lucide-react'
import { ultimaMilhaList } from '../../data/mockData'

export default function UltimaMilha() {
  const columns: Column<any>[] = [
    { key: 'delivery', header: 'Entrega', render: (r) => <span className="font-semibold">{r.delivery}</span> },
    { key: 'client', header: 'Cliente / Destinatário', render: (r) => <span className="text-xs">{r.client}<br/><span className="text-graphite-500">{r.recipient}</span></span> },
    { key: 'driver', header: 'Motorista / Veículo', render: (r) => <span className="text-xs">{r.driver}<br/><span className="text-graphite-500">{r.vehicle}</span></span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'eta', header: 'ETA', render: (r) => <span className="text-xs">{r.eta}</span> },
    { key: 'last', header: 'Última atualização', render: (r) => <span className="text-xs text-graphite-500">{r.lastUpdate}</span> },
    { key: 'source', header: 'Fonte', render: (r) => <TrackingSourceBadge source={r.trackingSource} /> },
    { key: 'risk', header: 'Risco', render: (r) => <RiskBadge level={r.risk} /> },
    { key: 'actions', header: '', render: () => <button className="btn-ghost"><Eye size={14} /></button> },
  ]
  return (
    <div>
      <PageTitle
        title="Última milha"
        subtitle="Controle de entregas em rota final, motoristas em distribuição e SLA do cliente."
        breadcrumb={['Operação', 'Última milha']}
      />
      <KPIGrid columns={6}>
        <MetricCard label="Em rota" value="22" icon={<Truck size={18} />} tone="brand" />
        <MetricCard label="Próximas" value="7" hint="chegada em < 30 min" icon={<MapPin size={18} />} />
        <MetricCard label="Atrasadas" value="3" icon={<AlertTriangle size={18} />} tone="danger" />
        <MetricCard label="Motoristas em rota" value="9" icon={<Users size={18} />} />
        <MetricCard label="Concluídas hoje" value="58" icon={<CheckCircle2 size={18} />} tone="success" />
        <MetricCard label="Ocorrências última milha" value="2" icon={<AlertTriangle size={18} />} tone="warning" />
      </KPIGrid>

      <div className="mt-5">
        <DataTable columns={columns} data={ultimaMilhaList.map((u) => ({ ...u, id: u.id }))} />
      </div>
    </div>
  )
}
