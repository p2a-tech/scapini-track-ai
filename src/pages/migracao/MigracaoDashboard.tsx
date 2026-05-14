import PageTitle from '../../components/layout/PageTitle'
import KPIGrid from '../../components/ui/KPIGrid'
import MetricCard from '../../components/ui/MetricCard'
import ProgressBar from '../../components/ui/ProgressBar'
import { migrationItems } from '../../data/mockData'
import { Database, AlertTriangle, CheckCircle2, Users, Truck, FileText } from 'lucide-react'
import StatusBadge from '../../components/ui/StatusBadge'

export default function MigracaoDashboard() {
  const total = migrationItems.reduce((s, m) => s + m.total, 0)
  const migrated = migrationItems.reduce((s, m) => s + m.migrated, 0)
  const pending = migrationItems.reduce((s, m) => s + m.pending, 0)
  const overallPct = Math.round((migrated / total) * 100)
  return (
    <div>
      <PageTitle
        title="Migração Rota Livre → Scapini Track AI"
        subtitle="Acompanhe a importação histórica e o plano de virada operacional."
        breadcrumb={['Migração', 'Painel']}
      />
      <KPIGrid columns={4}>
        <MetricCard label="Clientes migrados" value="1.248" hint="de 1.280" icon={<Users size={18} />} tone="success" />
        <MetricCard label="Veículos migrados" value="86" hint="de 92" icon={<Truck size={18} />} />
        <MetricCard label="Motoristas migrados" value="112" hint="de 118" icon={<Users size={18} />} />
        <MetricCard label="Entregas históricas" value="58.430" hint="de 60.500" icon={<FileText size={18} />} tone="brand" />
        <MetricCard label="Documentos importados" value="62.312" hint="CT-e + MDF-e" icon={<FileText size={18} />} />
        <MetricCard label="Pendências" value={pending.toLocaleString('pt-BR')} icon={<AlertTriangle size={18} />} tone="warning" />
        <MetricCard label="Inconsistências" value="37" icon={<AlertTriangle size={18} />} tone="danger" />
        <MetricCard label="Progresso geral" value={`${overallPct}%`} icon={<CheckCircle2 size={18} />} tone="brand" />
      </KPIGrid>

      <div className="card p-5 mt-5">
        <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Database size={16} /> Status por categoria</div>
        <div className="space-y-4">
          {migrationItems.map((m) => (
            <div key={m.id}>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="text-sm font-medium text-graphite-900">{m.category}</div>
                  <div className="text-xs text-graphite-500">{m.migrated.toLocaleString('pt-BR')} de {m.total.toLocaleString('pt-BR')} migrados · {m.pending} pendentes · {m.errors} erros</div>
                </div>
                <StatusBadge status={m.status} />
              </div>
              <ProgressBar value={(m.migrated / m.total) * 100} color={m.status === 'Concluída' ? 'bg-success-500' : m.status === 'Com pendência' ? 'bg-warning-500' : 'bg-brand-600'} height={6} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
