import PageTitle from '../../components/layout/PageTitle'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { dePara } from '../../data/mockData'

interface Row { id: string; from: string; to: string; status: string }

export default function MigracaoDePara() {
  const rows: Row[] = dePara.map((d, i) => ({ id: `dp-${i}`, ...d }))
  const columns: Column<Row>[] = [
    { key: 'from', header: 'Campo Rota Livre', render: (r) => <code className="text-xs">{r.from}</code> },
    { key: 'arrow', header: '', render: () => <span className="text-graphite-400">→</span> },
    { key: 'to', header: 'Campo Scapini Track AI', render: (r) => <code className="text-xs text-brand-700">{r.to}</code> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ]
  return (
    <div>
      <PageTitle title="De-para de campos" subtitle="Mapeamento dos campos do Rota Livre para o Scapini Track AI." breadcrumb={['Migração', 'De-para']} />
      <DataTable columns={columns} data={rows} />
    </div>
  )
}
