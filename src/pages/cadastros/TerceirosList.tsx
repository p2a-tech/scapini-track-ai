import { useNavigate } from 'react-router-dom'
import { Plus, Eye } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import DataTable, { Column } from '../../components/ui/DataTable'
import FilterBar from '../../components/ui/FilterBar'
import TrackingScore from '../../components/ui/TrackingScore'
import { thirdParties } from '../../data/mockData'
import { ThirdParty } from '../../data/types'

export default function TerceirosList() {
  const navigate = useNavigate()
  const columns: Column<ThirdParty>[] = [
    { key: 'name', header: 'Terceiro', render: (r) => (
      <button onClick={() => navigate(`/cadastros/terceiros/${r.id}`)} className="font-semibold text-brand-700 hover:underline">{r.name}</button>
    )},
    { key: 'cnpj', header: 'CNPJ', render: (r) => <span className="text-xs font-mono">{r.cnpj}</span> },
    { key: 'contact', header: 'Contato', render: (r) => <span className="text-xs">{r.contact}<br/><span className="text-graphite-500">{r.phone}</span></span> },
    { key: 'tracker', header: 'Rastreador', render: (r) => <span className="text-xs">{r.trackerVendor}<br/><span className="text-graphite-500">{r.hasApi ? 'API integrada' : 'Sem API'}</span></span> },
    { key: 'trips', header: 'Viagens', render: (r) => <span className="text-xs">{r.trips}<br/><span className="text-graphite-500">{Math.round((r.onTime / r.trips) * 100)}% no prazo</span></span> },
    { key: 'accept', header: 'Aceite de link', render: (r) => <span className="text-xs">{r.acceptanceRate}%</span> },
    { key: 'score', header: 'Score', render: (r) => <TrackingScore score={r.confidenceScore} size="sm" /> },
    { key: 'actions', header: '', render: (r) => <button onClick={() => navigate(`/cadastros/terceiros/${r.id}`)} className="btn-ghost"><Eye size={14} /></button> },
  ]
  return (
    <div>
      <PageTitle title="Terceiros" subtitle="Transportadoras parceiras, política de rastreamento e indicadores." breadcrumb={['Cadastros', 'Terceiros']}
        actions={<button className="btn-primary"><Plus size={14} /> Novo terceiro</button>} />
      <FilterBar placeholder="Buscar terceiro..." />
      <DataTable columns={columns} data={thirdParties} />
    </div>
  )
}
