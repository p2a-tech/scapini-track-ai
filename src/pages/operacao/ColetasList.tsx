import { Plus, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../components/layout/PageTitle'
import FilterBar from '../../components/ui/FilterBar'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { collects } from '../../data/mockData'
import { Collect } from '../../data/types'

export default function ColetasList() {
  const navigate = useNavigate()
  const columns: Column<Collect>[] = [
    { key: 'number', header: 'Nº pedido', render: (r) => <span className="font-medium text-graphite-900">{r.number}</span> },
    { key: 'client', header: 'Cliente', render: (r) => r.client },
    { key: 'remetente', header: 'Remetente', render: (r) => r.remetente },
    { key: 'origin', header: 'Origem', render: (r) => r.cityOrigin },
    { key: 'destinatario', header: 'Destinatário', render: (r) => r.destinatario },
    { key: 'dest', header: 'Destino', render: (r) => r.cityDest },
    { key: 'date', header: 'Data', render: (r) => <span className="text-xs">{r.requestedDate}<br/><span className="text-graphite-500">{r.window}</span></span> },
    { key: 'cargo', header: 'Carga', render: (r) => <span className="text-xs">{r.cargoType}<br/><span className="text-graphite-500">{r.weight} · {r.volume}</span></span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'driver', header: 'Motorista', render: (r) => r.driver || <span className="text-graphite-400 text-xs">—</span> },
    { key: 'vehicle', header: 'Veículo', render: (r) => r.vehicle || <span className="text-graphite-400 text-xs">—</span> },
    { key: 'actions', header: '', render: () => <button className="btn-ghost"><Eye size={14} /></button> },
  ]

  return (
    <div>
      <PageTitle
        title="Pedidos de coleta"
        subtitle="Solicitações, programação e execução das coletas."
        breadcrumb={['Operação', 'Pedidos de coleta']}
        actions={<button onClick={() => navigate('/operacao/coletas/nova')} className="btn-primary"><Plus size={14} /> Novo pedido</button>}
      />

      <FilterBar placeholder="Buscar pedido, cliente, cidade ou motorista...">
        <select className="input md:w-40"><option>Todos status</option><option>Solicitado</option><option>Programado</option><option>Coletado</option></select>
        <select className="input md:w-40"><option>Todos clientes</option></select>
        <select className="input md:w-40"><option>Todas cidades</option></select>
      </FilterBar>

      <DataTable columns={columns} data={collects} />
    </div>
  )
}
