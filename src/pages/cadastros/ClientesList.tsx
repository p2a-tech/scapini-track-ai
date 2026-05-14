import { useNavigate } from 'react-router-dom'
import { Plus, Eye } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import DataTable, { Column } from '../../components/ui/DataTable'
import FilterBar from '../../components/ui/FilterBar'
import { clients } from '../../data/mockData'
import { Client } from '../../data/types'

export default function ClientesList() {
  const navigate = useNavigate()
  const columns: Column<Client>[] = [
    { key: 'name', header: 'Razão social', render: (r) => (
      <button onClick={() => navigate(`/cadastros/clientes/${r.id}`)} className="font-semibold text-brand-700 hover:underline">{r.name}</button>
    )},
    { key: 'cnpj', header: 'CNPJ', render: (r) => <span className="text-xs font-mono">{r.cnpj}</span> },
    { key: 'contact', header: 'Contato', render: (r) => <span className="text-xs">{r.contact}<br/><span className="text-graphite-500">{r.phone}</span></span> },
    { key: 'city', header: 'Cidade', render: (r) => `${r.city}/${r.uf}` },
    { key: 'sla', header: 'SLA', render: (r) => r.sla },
    { key: 'table', header: 'Tabela de frete', render: (r) => <code className="text-xs">{r.freightTable}</code> },
    { key: 'actions', header: '', render: (r) => <button onClick={() => navigate(`/cadastros/clientes/${r.id}`)} className="btn-ghost"><Eye size={14} /></button> },
  ]
  return (
    <div>
      <PageTitle title="Clientes" breadcrumb={['Cadastros', 'Clientes']} actions={<button className="btn-primary"><Plus size={14} /> Novo cliente</button>} />
      <FilterBar placeholder="Buscar cliente, CNPJ ou cidade..." />
      <DataTable columns={columns} data={clients} />
    </div>
  )
}
