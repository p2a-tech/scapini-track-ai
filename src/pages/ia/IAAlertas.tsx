import PageTitle from '../../components/layout/PageTitle'
import AIAlertCard from '../../components/ui/AIAlertCard'
import { aiAlerts } from '../../data/mockData'
import { Sparkles } from 'lucide-react'

export default function IAAlertas() {
  return (
    <div>
      <PageTitle
        title="Alertas inteligentes da IA"
        subtitle="Recomendações proativas com base em rastreamento, terceiros, devices e SLA."
        breadcrumb={['IA', 'Alertas']}
        actions={<span className="chip bg-accent-50 text-accent-700"><Sparkles size={12} /> {aiAlerts.length} alertas ativos</span>}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {aiAlerts.map((a) => <AIAlertCard key={a.id} alert={a} />)}
      </div>
    </div>
  )
}
