import { useNavigate } from 'react-router-dom'
import { Plus, Eye } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import DataTable, { Column } from '../../components/ui/DataTable'
import FilterBar from '../../components/ui/FilterBar'
import StatusBadge from '../../components/ui/StatusBadge'
import { vehicles } from '../../data/mockData'
import { Vehicle } from '../../data/types'

export default function VeiculosList() {
  const navigate = useNavigate()
  const columns: Column<Vehicle>[] = [
    { key: 'plate', header: 'Placa', render: (r) => (
      <button onClick={() => navigate(`/cadastros/veiculos/${r.id}`)} className="font-semibold text-brand-700 hover:underline">{r.plate}</button>
    )},
    { key: 'type', header: 'Tipo', render: (r) => r.type },
    { key: 'capacity', header: 'Capacidade', render: (r) => r.capacity },
    { key: 'tracker', header: 'Rastreador', render: (r) => <span className="text-xs">{r.tracker}</span> },
    { key: 'driver', header: 'Motorista atual', render: (r) => r.driver || <span className="text-graphite-400">—</span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'manutencao', header: 'Manutenção', render: (r) => <span className="text-xs">{r.manutencao}</span> },
    { key: 'actions', header: '', render: (r) => <button onClick={() => navigate(`/cadastros/veiculos/${r.id}`)} className="btn-ghost"><Eye size={14} /></button> },
  ]
  return (
    <div>
      <PageTitle title="Veículos" breadcrumb={['Cadastros', 'Veículos']} actions={<button className="btn-primary"><Plus size={14} /> Novo veículo</button>} />
      <FilterBar placeholder="Buscar placa, tipo ou motorista..." />
      <DataTable columns={columns} data={vehicles} />
    </div>
  )
}
