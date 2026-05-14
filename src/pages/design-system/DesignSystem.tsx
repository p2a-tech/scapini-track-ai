import PageTitle from '../../components/layout/PageTitle'
import StatusBadge from '../../components/ui/StatusBadge'
import RiskBadge from '../../components/ui/RiskBadge'
import TrackingSourceBadge from '../../components/ui/TrackingSourceBadge'
import TrackingScore from '../../components/ui/TrackingScore'
import MetricCard from '../../components/ui/MetricCard'
import Timeline from '../../components/ui/Timeline'
import ProgressBar from '../../components/ui/ProgressBar'
import { Truck, Cpu, Send } from 'lucide-react'

const colors = [
  { name: 'Navy 900', cls: 'bg-navy-900', text: 'text-white' },
  { name: 'Navy 700', cls: 'bg-navy-700', text: 'text-white' },
  { name: 'Brand 700', cls: 'bg-brand-700', text: 'text-white' },
  { name: 'Brand 500', cls: 'bg-brand-500', text: 'text-white' },
  { name: 'Accent 500', cls: 'bg-accent-500', text: 'text-white' },
  { name: 'Accent 400', cls: 'bg-accent-400', text: 'text-white' },
  { name: 'Success 500', cls: 'bg-success-500', text: 'text-white' },
  { name: 'Warning 500', cls: 'bg-warning-500', text: 'text-white' },
  { name: 'Danger 500', cls: 'bg-danger-500', text: 'text-white' },
  { name: 'Graphite 100', cls: 'bg-graphite-100', text: 'text-graphite-900' },
  { name: 'Graphite 500', cls: 'bg-graphite-500', text: 'text-white' },
  { name: 'Graphite 900', cls: 'bg-graphite-900', text: 'text-white' },
]

export default function DesignSystem() {
  return (
    <div>
      <PageTitle title="Design System" subtitle="Componentes, cores, tipografia e badges usados pelo Scapini Track AI." breadcrumb={['Design system']} />

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-graphite-900 mb-3">Cores</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {colors.map((c) => (
            <div key={c.name} className={`${c.cls} ${c.text} rounded-xl p-4 text-xs font-semibold shadow-card`}>{c.name}</div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-graphite-900 mb-3">Tipografia</h2>
        <div className="card p-5 space-y-3">
          <div className="text-4xl font-bold">H1 — Bold 36</div>
          <div className="text-2xl font-bold">H2 — Bold 24</div>
          <div className="text-xl font-bold">H3 — Bold 20</div>
          <div className="text-base">Body — Regular 16</div>
          <div className="text-sm">Body small — Regular 14</div>
          <div className="text-xs text-graphite-500">Caption — Regular 12 · graphite 500</div>
          <code className="text-xs bg-graphite-900 text-graphite-100 px-2 py-1 rounded">Inline code</code>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-graphite-900 mb-3">Botões</h2>
        <div className="card p-5 flex flex-wrap gap-2">
          <button className="btn-primary"><Send size={14} /> Primário</button>
          <button className="btn-accent">Destaque (accent)</button>
          <button className="btn-outline">Outline</button>
          <button className="btn-ghost">Ghost</button>
          <button className="btn-danger">Perigo</button>
          <button className="btn-primary" disabled>Desabilitado</button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-graphite-900 mb-3">Inputs</h2>
        <div className="card p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="label">Texto</label><input className="input" placeholder="Digite..." /></div>
          <div><label className="label">Select</label><select className="input"><option>Opção 1</option><option>Opção 2</option></select></div>
          <div className="md:col-span-2"><label className="label">Textarea</label><textarea className="input min-h-[80px]" placeholder="Texto longo..." /></div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-graphite-900 mb-3">Badges de status</h2>
        <div className="card p-5 flex flex-wrap gap-2">
          {['Aguardando coleta', 'Coletada', 'Em trânsito', 'Na filial', 'Saiu para entrega', 'Entregue', 'Atrasada', 'Ocorrência', 'Devolvida', 'Cancelada', 'Rastreamento ativo', 'Sem sinal', 'API ativa', 'Device vinculado', 'Apenas eventos', 'Última milha'].map((s) => <StatusBadge key={s} status={s} />)}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-graphite-900 mb-3">Risco e fontes de rastreamento</h2>
        <div className="card p-5 flex flex-wrap gap-2">
          <RiskBadge level="baixo" />
          <RiskBadge level="medio" />
          <RiskBadge level="alto" />
          <TrackingSourceBadge source="GPS próprio" />
          <TrackingSourceBadge source="API rastreador terceiro" />
          <TrackingSourceBadge source="App motorista" />
          <TrackingSourceBadge source="Link temporário" />
          <TrackingSourceBadge source="Device na carga" />
          <TrackingSourceBadge source="Apenas eventos" />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-graphite-900 mb-3">Cards e Score</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <MetricCard label="Em rota" value="68" icon={<Truck size={18} />} tone="brand" />
          <MetricCard label="Entregue" value="124" icon={<Cpu size={18} />} tone="success" />
          <MetricCard label="Atrasadas" value="6" icon={<Truck size={18} />} tone="danger" />
          <div className="card p-4 flex items-center justify-center"><TrackingScore score={78} size="lg" /></div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-graphite-900 mb-3">Progress e Timeline</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-5 space-y-3">
            <ProgressBar value={86} label="Migração geral" hint="86%" />
            <ProgressBar value={32} color="bg-warning-500" label="Inconsistências" hint="32 / 100" />
            <ProgressBar value={94} color="bg-success-500" label="SLA do mês" hint="94%" />
          </div>
          <div className="card p-5">
            <Timeline
              steps={[
                { id: '1', title: 'Pedido criado', state: 'done', time: 'há 2 dias' },
                { id: '2', title: 'Coleta realizada', state: 'done', time: 'há 1 dia' },
                { id: '3', title: 'Em trânsito', state: 'current', time: 'agora' },
                { id: '4', title: 'Saiu para entrega', state: 'pending' },
                { id: '5', title: 'Entregue', state: 'pending' },
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
