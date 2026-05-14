import { Plus } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import DataTable, { Column } from '../../components/ui/DataTable'
import FilterBar from '../../components/ui/FilterBar'

interface Row { id: string; name: string; cnpj: string; city: string; client: string }
const rows: Row[] = [
  { id: 'r1', name: 'Distribuidora Exemplo SP', cnpj: '15.221.987/0001-11', city: 'São Paulo/SP', client: 'Mercado Exemplo Ltda.' },
  { id: 'r2', name: 'CD Curitiba', cnpj: '22.554.331/0001-21', city: 'Curitiba/PR', client: 'Distribuidora Sul Brasil' },
  { id: 'r3', name: 'CD FarmaLog SP', cnpj: '33.992.554/0001-33', city: 'São Paulo/SP', client: 'FarmaLog Distribuição' },
  { id: 'r4', name: 'Agro Comercial Londrina', cnpj: '44.117.882/0001-44', city: 'Londrina/PR', client: 'Agro Comercial Paraná' },
  { id: 'r5', name: 'CD Guarulhos', cnpj: '55.443.110/0001-55', city: 'Guarulhos/SP', client: 'Rede Max Atacado' },
  { id: 'r6', name: 'Frigorífico Caxias', cnpj: '66.778.991/0001-66', city: 'Caxias do Sul/RS', client: 'Frigorífico Modelo' },
  { id: 'r7', name: 'Continental Joinville', cnpj: '77.223.554/0001-77', city: 'Joinville/SC', client: 'Auto Peças Continental' },
  { id: 'r8', name: 'ConstruMais Itajaí', cnpj: '88.001.332/0001-88', city: 'Itajaí/SC', client: 'ConstruMais Atacado' },
]

export default function RemetentesList() {
  const columns: Column<Row>[] = [
    { key: 'name', header: 'Remetente', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'cnpj', header: 'CNPJ', render: (r) => <span className="text-xs font-mono">{r.cnpj}</span> },
    { key: 'city', header: 'Cidade', render: (r) => r.city },
    { key: 'client', header: 'Cliente vinculado', render: (r) => r.client },
  ]
  return (
    <div>
      <PageTitle title="Remetentes" breadcrumb={['Cadastros', 'Remetentes']} actions={<button className="btn-primary"><Plus size={14} /> Novo remetente</button>} />
      <FilterBar placeholder="Buscar remetente..." />
      <DataTable columns={columns} data={rows} />
    </div>
  )
}
