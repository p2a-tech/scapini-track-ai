import { useNavigate } from 'react-router-dom'
import { Eye } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import FilterBar from '../../components/ui/FilterBar'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { occurrences } from '../../data/mockData'
import { Occurrence } from '../../data/types'

export default function OcorrenciasList() {
  const navigate = useNavigate()
  const columns: Column<Occurrence>[] = [
    { key: 'type', header: 'Tipo', render: (r) => <span className="font-semibold">{r.type}</span> },
    { key: 'delivery', header: 'Entrega / NF', render: (r) => <span className="text-xs">{r.deliveryId}<br/><span className="text-graphite-500">NF {r.nf}</span></span> },
    { key: 'client', header: 'Cliente', render: (r) => r.client },
    { key: 'driver', header: 'Motorista / Veículo', render: (r) => <span className="text-xs">{r.driver}<br/><span className="text-graphite-500">{r.vehicle}</span></span> },
    { key: 'severity', header: 'Gravidade', render: (r) => <StatusBadge status={r.severity} /> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'datetime', header: 'Data/hora', render: (r) => <span className="text-xs">{r.datetime}</span> },
    { key: 'resp', header: 'Responsável', render: (r) => <span className="text-xs">{r.responsible}</span> },
    { key: 'actions', header: '', render: (r) => <button onClick={() => navigate(`/operacao/ocorrencias/${r.id}`)} className="btn-ghost"><Eye size={14} /></button> },
  ]
  return (
    <div>
      <PageTitle
        title="Ocorrências"
        subtitle="Acompanhe, trate e encerre ocorrências operacionais."
        breadcrumb={['Operação', 'Ocorrências']}
      />
      <FilterBar placeholder="Buscar por tipo, cliente, NF ou motorista...">
        <select className="input md:w-40"><option>Todos tipos</option><option>Atraso</option><option>Avaria</option><option>Cliente ausente</option></select>
        <select className="input md:w-40"><option>Todas gravidades</option></select>
        <select className="input md:w-40"><option>Todos status</option></select>
      </FilterBar>
      <DataTable columns={columns} data={occurrences} />
    </div>
  )
}
