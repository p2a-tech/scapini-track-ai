import { Plus } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import DataTable, { Column } from '../../components/ui/DataTable'
import FilterBar from '../../components/ui/FilterBar'

interface Row { id: string; name: string; cnpj: string; city: string; client: string }
const rows: Row[] = [
  { id: 'd1', name: 'Mercado Exemplo — Canoas', cnpj: '12.345.678/0007-90', city: 'Canoas/RS', client: 'Mercado Exemplo Ltda.' },
  { id: 'd2', name: 'SulDistri Florianópolis', cnpj: '98.765.432/0002-21', city: 'Florianópolis/SC', client: 'Distribuidora Sul Brasil' },
  { id: 'd3', name: 'FarmaLog Porto Alegre', cnpj: '55.012.998/0003-77', city: 'Porto Alegre/RS', client: 'FarmaLog Distribuição' },
  { id: 'd4', name: 'Cooperativa Maringá', cnpj: '11.554.221/0001-66', city: 'Maringá/PR', client: 'Agro Comercial Paraná' },
  { id: 'd5', name: 'Rede Max Joinville', cnpj: '11.337.221/0005-44', city: 'Joinville/SC', client: 'Rede Max Atacado' },
  { id: 'd6', name: 'CD Carnes Premium SP', cnpj: '22.118.554/0008-22', city: 'São Paulo/SP', client: 'Frigorífico Modelo' },
  { id: 'd7', name: 'Continental Blumenau', cnpj: '33.992.110/0007-90', city: 'Blumenau/SC', client: 'Auto Peças Continental' },
  { id: 'd8', name: 'ConstruMais Florianópolis', cnpj: '77.665.331/0006-12', city: 'Florianópolis/SC', client: 'ConstruMais Atacado' },
]

export default function DestinatariosList() {
  const columns: Column<Row>[] = [
    { key: 'name', header: 'Destinatário', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'cnpj', header: 'CNPJ', render: (r) => <span className="text-xs font-mono">{r.cnpj}</span> },
    { key: 'city', header: 'Cidade', render: (r) => r.city },
    { key: 'client', header: 'Cliente vinculado', render: (r) => r.client },
  ]
  return (
    <div>
      <PageTitle title="Destinatários" breadcrumb={['Cadastros', 'Destinatários']} actions={<button className="btn-primary"><Plus size={14} /> Novo destinatário</button>} />
      <FilterBar placeholder="Buscar destinatário..." />
      <DataTable columns={columns} data={rows} />
    </div>
  )
}
