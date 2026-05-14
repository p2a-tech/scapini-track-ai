import { useNavigate } from 'react-router-dom'
import { CheckCircle2, AlertTriangle, Truck, Activity, ChevronRight, MessageSquare } from 'lucide-react'
import ClientShell from '../../components/layout/ClientShell'
import KPIGrid from '../../components/ui/KPIGrid'
import MetricCard from '../../components/ui/MetricCard'
import StatusBadge from '../../components/ui/StatusBadge'
import { deliveries } from '../../data/mockData'

export default function ClienteDashboard() {
  const navigate = useNavigate()
  const recent = deliveries.slice(0, 6)
  return (
    <ClientShell>
      <div className="rounded-2xl bg-gradient-to-r from-navy-800 to-brand-700 text-white p-6 mb-5">
        <div className="text-sm text-navy-200">Olá, Cláudia 👋</div>
        <h1 className="text-2xl font-bold mt-1">Acompanhe suas entregas em tempo real</h1>
        <p className="text-sm text-navy-200 mt-1">Você tem 4 entregas em andamento e 1 ocorrência aguardando notificação.</p>
        <div className="mt-3 flex gap-2">
          <button onClick={() => navigate('/cliente/rastreio')} className="bg-accent-500 hover:bg-accent-600 rounded-lg px-4 py-2 text-sm font-semibold">Rastrear entrega</button>
          <button onClick={() => navigate('/ia/cliente')} className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg px-4 py-2 text-sm font-semibold"><MessageSquare className="inline mr-1" size={14} />Falar com assistente</button>
        </div>
      </div>

      <KPIGrid columns={4}>
        <MetricCard label="Em andamento" value="4" icon={<Truck size={18} />} tone="brand" />
        <MetricCard label="Entregues no mês" value="58" icon={<CheckCircle2 size={18} />} tone="success" />
        <MetricCard label="Atrasadas" value="1" icon={<AlertTriangle size={18} />} tone="danger" />
        <MetricCard label="SLA do mês" value="94%" icon={<Activity size={18} />} tone="success" />
      </KPIGrid>

      <div className="card mt-5 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold text-graphite-900">Entregas recentes</div>
          <button onClick={() => navigate('/cliente/rastreio')} className="text-sm text-brand-700 hover:underline">Ver todas</button>
        </div>
        <div className="space-y-2">
          {recent.map((d) => (
            <button key={d.id} onClick={() => navigate(`/cliente/entregas/${d.id}`)} className="w-full text-left flex items-center justify-between gap-3 border border-graphite-200 hover:border-brand-400 hover:bg-brand-50/30 rounded-lg p-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-semibold text-graphite-900"><Truck size={14} className="text-brand-700" />{d.trackingCode}</div>
                <div className="text-xs text-graphite-500 truncate">NF {d.nf} · {d.origin} → {d.destination}</div>
                <div className="text-xs text-graphite-700 mt-1">{d.etaAi}</div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={d.status} />
                <ChevronRight size={14} className="text-graphite-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </ClientShell>
  )
}
