import { Plus, Copy, Edit2, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../components/layout/PageTitle'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { freightTables } from '../../data/mockData'
import { FreightTable } from '../../data/types'
import { formatCurrency } from '../../utils/formatters'

export default function TabelasFrete() {
  const navigate = useNavigate()
  const columns: Column<FreightTable>[] = [
    { key: 'name', header: 'Tabela', render: (r) => <span className="font-semibold">{r.name}</span> },
    { key: 'client', header: 'Cliente', render: (r) => r.client },
    { key: 'route', header: 'Origem → Destino', render: (r) => <span className="text-xs">{r.regionOrigin} → {r.regionDest}</span> },
    { key: 'cargo', header: 'Carga / Modalidade', render: (r) => <span className="text-xs">{r.cargoType}<br/><span className="text-graphite-500">{r.modality}</span></span> },
    { key: 'min', header: 'Mínimo', render: (r) => formatCurrency(r.minValue) },
    { key: 'kg', header: 'R$/kg', render: (r) => formatCurrency(r.perKg) },
    { key: 'km', header: 'R$/km', render: (r) => formatCurrency(r.perKm) },
    { key: 'fees', header: 'Ad.Valorem · GRIS', render: (r) => <span className="text-xs">{r.adValorem}% · {r.gris}%</span> },
    { key: 'pedagio', header: 'Pedágio', render: (r) => formatCurrency(r.pedagio) },
    { key: 'validity', header: 'Vigência', render: (r) => <span className="text-xs">{r.validity}</span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', header: 'Ações', render: () => (
      <div className="flex gap-1">
        <button className="btn-ghost"><Edit2 size={14} /></button>
        <button className="btn-ghost"><Copy size={14} /></button>
      </div>
    )},
  ]
  return (
    <div>
      <PageTitle
        title="Tabelas de frete"
        subtitle="Tabelas comerciais por cliente, região, carga e modalidade."
        breadcrumb={['Comercial', 'Tabelas de frete']}
        actions={
          <>
            <button onClick={() => navigate('/comercial/simulacao-frete')} className="btn-outline">Simular frete</button>
            <button className="btn-outline"><Download size={14} /> Exportar</button>
            <button className="btn-primary"><Plus size={14} /> Nova tabela</button>
          </>
        }
      />
      <DataTable columns={columns} data={freightTables} />
    </div>
  )
}
