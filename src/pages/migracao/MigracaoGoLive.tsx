import PageTitle from '../../components/layout/PageTitle'
import { goLivePlan } from '../../data/mockData'
import StatusBadge from '../../components/ui/StatusBadge'
import { CheckCircle2, Clock, Circle, AlertTriangle } from 'lucide-react'

const icon: Record<string, any> = {
  'Concluído': <CheckCircle2 size={14} className="text-success-600" />,
  'Em andamento': <Clock size={14} className="text-brand-600" />,
  'Não iniciado': <Circle size={14} className="text-graphite-400" />,
  'Com pendência': <AlertTriangle size={14} className="text-warning-600" />,
}

export default function MigracaoGoLive() {
  return (
    <div>
      <PageTitle
        title="Plano de go-live"
        subtitle="Etapas para virada oficial do Rota Livre para o Scapini Track AI."
        breadcrumb={['Migração', 'Go-Live']}
      />
      <div className="card p-5">
        <ol className="relative">
          {goLivePlan.map((g, i) => (
            <li key={i} className="relative pl-7 pb-5 last:pb-0">
              {i < goLivePlan.length - 1 && <span className="absolute left-[7px] top-5 w-0.5 h-[calc(100%-12px)] bg-graphite-200" />}
              <span className="absolute left-0 top-0.5 w-3.5 h-3.5 rounded-full bg-white ring-2 ring-white flex items-center justify-center">
                {icon[g.status]}
              </span>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className={`text-sm font-medium ${g.status === 'Não iniciado' ? 'text-graphite-500' : 'text-graphite-900'}`}>{g.step}</div>
                </div>
                <StatusBadge status={g.status} />
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="card-elevated p-4 mt-4 border-l-4 border-accent-500 bg-accent-50">
        <div className="font-semibold text-accent-700">Virada planejada</div>
        <p className="text-sm text-graphite-700">Data prevista: <strong>22/05/2026</strong> · Janela: 22h00–06h00 · Operação assistida por 15 dias após a virada.</p>
      </div>
    </div>
  )
}
