import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../components/layout/PageTitle'
import FilterBar from '../../components/ui/FilterBar'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import RiskBadge from '../../components/ui/RiskBadge'
import TrackingScore from '../../components/ui/TrackingScore'
import { orders } from '../../data/mockData'
import { Order } from '../../data/types'

export default function OrdensList() {
  const navigate = useNavigate()
  const columns: Column<Order>[] = [
    { key: 'number', header: 'Ordem', render: (r) => (
      <button onClick={() => navigate(`/operacao/ordens/${r.id}`)} className="font-semibold text-brand-700 hover:underline">{r.number}</button>
    )},
    { key: 'client', header: 'Cliente', render: (r) => r.client },
    { key: 'route', header: 'Origem → Destino', render: (r) => <span className="text-xs">{r.origin}<br/><span className="text-graphite-500">→ {r.destination}</span></span> },
    { key: 'docs', header: 'Docs', render: (r) => <span className="text-xs">NF {r.nf}<br/>CT-e {r.cte} · MDF-e {r.mdfe}</span> },
    { key: 'transport', header: 'Veículo/Motorista', render: (r) => <span className="text-xs">{r.vehicle}<br/><span className="text-graphite-500">{r.driver}</span></span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'eta', header: 'ETA IA', render: (r) => <span className="text-xs">{r.etaAi}</span> },
    { key: 'risk', header: 'Risco', render: (r) => <RiskBadge level={r.riskAi} /> },
    { key: 'score', header: 'Rastreio', render: (r) => <TrackingScore score={r.trackingScore} size="sm" /> },
    { key: 'actions', header: '', render: (r) => <button onClick={() => navigate(`/operacao/ordens/${r.id}`)} className="btn-ghost"><Eye size={14} /></button> },
  ]

  return (
    <div>
      <PageTitle
        title="Ordens de transporte"
        subtitle="Acompanhe todas as ordens em circulação, ETAs e riscos preditivos."
        breadcrumb={['Operação', 'Ordens de transporte']}
      />

      <FilterBar placeholder="Buscar ordem, NF, CT-e, cliente ou motorista...">
        <select className="input md:w-40"><option>Todos status</option><option>Em trânsito</option><option>Saiu para entrega</option><option>Na filial</option></select>
        <select className="input md:w-40"><option>Todos riscos</option><option>Alto</option><option>Médio</option><option>Baixo</option></select>
      </FilterBar>

      <DataTable columns={columns} data={orders} />
    </div>
  )
}
