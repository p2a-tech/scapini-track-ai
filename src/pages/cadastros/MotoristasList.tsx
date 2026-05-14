import { useNavigate } from 'react-router-dom'
import { Plus, Eye, Star } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import DataTable, { Column } from '../../components/ui/DataTable'
import FilterBar from '../../components/ui/FilterBar'
import StatusBadge from '../../components/ui/StatusBadge'
import { drivers } from '../../data/mockData'
import { Driver } from '../../data/types'

export default function MotoristasList() {
  const navigate = useNavigate()
  const columns: Column<Driver>[] = [
    { key: 'name', header: 'Nome', render: (r) => (
      <button onClick={() => navigate(`/cadastros/motoristas/${r.id}`)} className="font-semibold text-brand-700 hover:underline">{r.name}</button>
    )},
    { key: 'cpf', header: 'CPF / CNH', render: (r) => <span className="text-xs">{r.cpf}<br/><span className="text-graphite-500">{r.cnh}</span></span> },
    { key: 'phone', header: 'Telefone', render: (r) => r.phone },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'vehicle', header: 'Veículo atual', render: (r) => r.currentVehicle || <span className="text-graphite-400">—</span> },
    { key: 'jornada', header: 'Jornada', render: (r) => <span className="text-xs">{r.jornada}</span> },
    { key: 'rating', header: 'Avaliação', render: (r) => <span className="inline-flex items-center gap-1 text-xs font-semibold"><Star size={12} className="text-warning-500" />{r.rating.toFixed(1)}</span> },
    { key: 'oc', header: 'Ocorrências', render: (r) => r.ocorrencias },
    { key: 'actions', header: '', render: (r) => <button onClick={() => navigate(`/cadastros/motoristas/${r.id}`)} className="btn-ghost"><Eye size={14} /></button> },
  ]
  return (
    <div>
      <PageTitle title="Motoristas" breadcrumb={['Cadastros', 'Motoristas']} actions={<button className="btn-primary"><Plus size={14} /> Novo motorista</button>} />
      <FilterBar placeholder="Buscar motorista, CPF ou veículo..." />
      <DataTable columns={columns} data={drivers} />
    </div>
  )
}
