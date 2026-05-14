import PageTitle from '../../components/layout/PageTitle'
import KPIGrid from '../../components/ui/KPIGrid'
import MetricCard from '../../components/ui/MetricCard'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { Receipt, Activity, Banknote, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { orders } from '../../data/mockData'
import { formatCurrency } from '../../utils/formatters'

interface Row {
  id: string
  client: string
  ot: string
  nf: string
  cte: string
  freight: number
  taxes: number
  deliveryStatus: string
  invoiceStatus: string
  due: string
}

const rows: Row[] = orders.map((o, i) => ({
  id: o.id,
  client: o.client,
  ot: o.number,
  nf: o.nf,
  cte: o.cte,
  freight: 1842 + i * 320,
  taxes: 220 + i * 40,
  deliveryStatus: o.status,
  invoiceStatus: i === 0 ? 'Faturado' : i === 1 ? 'Faturado' : i === 2 ? 'Com divergência' : i === 3 ? 'Liberado para faturamento' : 'Aguardando entrega',
  due: i % 2 === 0 ? '20/05/2026' : '25/05/2026',
}))

export default function Faturamento() {
  const columns: Column<Row>[] = [
    { key: 'client', header: 'Cliente', render: (r) => <span className="font-medium">{r.client}</span> },
    { key: 'ot', header: 'OT / NF / CT-e', render: (r) => <span className="text-xs">{r.ot}<br/><span className="text-graphite-500">NF {r.nf} · CT-e {r.cte}</span></span> },
    { key: 'freight', header: 'Frete', render: (r) => <span className="font-medium">{formatCurrency(r.freight)}</span> },
    { key: 'taxes', header: 'Taxas', render: (r) => formatCurrency(r.taxes) },
    { key: 'total', header: 'Total', render: (r) => <span className="font-semibold">{formatCurrency(r.freight + r.taxes)}</span> },
    { key: 'delivery', header: 'Entrega', render: (r) => <StatusBadge status={r.deliveryStatus} /> },
    { key: 'invoice', header: 'Faturamento', render: (r) => <StatusBadge status={r.invoiceStatus} /> },
    { key: 'due', header: 'Vencimento', render: (r) => <span className="text-xs">{r.due}</span> },
  ]
  return (
    <div>
      <PageTitle title="Faturamento" subtitle="Painel financeiro operacional — entregas faturáveis, divergências e previsão de faturamento." breadcrumb={['Financeiro', 'Faturamento']} />
      <KPIGrid columns={4}>
        <MetricCard label="Entregas faturáveis" value="84" icon={<Receipt size={18} />} tone="brand" />
        <MetricCard label="Pendentes de faturamento" value="22" icon={<Activity size={18} />} tone="warning" />
        <MetricCard label="Faturados (mês)" value="312" icon={<CheckCircle2 size={18} />} tone="success" />
        <MetricCard label="Com divergência" value="3" icon={<AlertTriangle size={18} />} tone="danger" />
        <MetricCard label="Previsto (próx. 30 dias)" value={formatCurrency(485000)} icon={<Banknote size={18} />} tone="accent" />
        <MetricCard label="Realizado no mês" value={formatCurrency(312800)} icon={<Banknote size={18} />} tone="success" />
        <MetricCard label="Bloqueados" value="2" icon={<AlertTriangle size={18} />} tone="warning" />
        <MetricCard label="Ticket médio" value={formatCurrency(2380)} icon={<Receipt size={18} />} />
      </KPIGrid>
      <div className="mt-5">
        <DataTable columns={columns} data={rows} />
      </div>
    </div>
  )
}
