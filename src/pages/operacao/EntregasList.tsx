import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../components/layout/PageTitle'
import FilterBar from '../../components/ui/FilterBar'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import TrackingSourceBadge from '../../components/ui/TrackingSourceBadge'
import RiskBadge from '../../components/ui/RiskBadge'
import { deliveries } from '../../data/mockData'
import { Delivery } from '../../data/types'

export default function EntregasList() {
  const navigate = useNavigate()
  const columns: Column<Delivery>[] = [
    { key: 'code', header: 'Código', render: (r) => (
      <button onClick={() => navigate(`/operacao/entregas/${r.id}`)} className="font-semibold text-brand-700 hover:underline">{r.trackingCode}</button>
    )},
    { key: 'docs', header: 'NF / CT-e', render: (r) => <span className="text-xs">{r.nf}<br/><span className="text-graphite-500">{r.cte}</span></span> },
    { key: 'client', header: 'Cliente', render: (r) => r.client },
    { key: 'route', header: 'Rota', render: (r) => <span className="text-xs">{r.origin}<br/><span className="text-graphite-500">→ {r.destination}</span></span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'driver', header: 'Veículo / Motorista', render: (r) => <span className="text-xs">{r.vehicle}<br/><span className="text-graphite-500">{r.driver}</span></span> },
    { key: 'eta', header: 'ETA', render: (r) => <span className="text-xs">{r.etaAi}</span> },
    { key: 'risk', header: 'Atraso', render: (r) => <span className="text-xs"><RiskBadge level={r.riskAi} /><br/><span className="text-graphite-500">{r.delayProb}% prob.</span></span> },
    { key: 'source', header: 'Fonte', render: (r) => <TrackingSourceBadge source={r.trackingSource} /> },
    { key: 'last', header: 'Última atualização', render: (r) => <span className="text-xs text-graphite-500">{r.lastUpdate}</span> },
    { key: 'actions', header: '', render: (r) => <button onClick={() => navigate(`/operacao/entregas/${r.id}`)} className="btn-ghost"><Eye size={14} /></button> },
  ]
  return (
    <div>
      <PageTitle
        title="Entregas"
        subtitle="Lista completa de entregas com filtros operacionais."
        breadcrumb={['Operação', 'Entregas']}
      />
      <FilterBar placeholder="Buscar código de rastreio, NF, CT-e ou cliente...">
        <select className="input md:w-36"><option>Todos status</option><option>Em trânsito</option><option>Saiu para entrega</option><option>Entregue</option><option>Atrasada</option></select>
        <select className="input md:w-36"><option>Todos clientes</option></select>
        <select className="input md:w-36"><option>Todas cidades</option></select>
        <select className="input md:w-44"><option>Toda rastreabilidade</option><option>GPS próprio</option><option>API terceiro</option><option>Device</option><option>App</option></select>
      </FilterBar>
      <DataTable columns={columns} data={deliveries} />
    </div>
  )
}
