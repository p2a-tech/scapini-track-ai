import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Clock, CheckCircle2, AlertTriangle, CalendarClock, Activity, Timer } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import KPIGrid from '../../components/ui/KPIGrid'
import MetricCard from '../../components/ui/MetricCard'
import FilterBar from '../../components/ui/FilterBar'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { DeadlineRiskBadge, RemainingTimeBadge } from '../../components/ui/time/TimeBadges'
import { pedidosTime } from '../../data/timeMocks'
import type { PedidoTime } from '../../data/timeTypes'
import { formatDateTime, formatDeliveryWindow, formatDurationShort } from '../../utils/deliveryTimeCalculator'

export default function PrazosEntrega() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<'all' | 'hoje' | 'amanha' | 'atrasadas' | 'risco'>('all')

  const noPrazo = pedidosTime.filter((p) => p.promise.deliveryTimeStatus === 'No prazo' || p.promise.deliveryTimeStatus === 'Entregue no prazo').length
  const atencao = pedidosTime.filter((p) => p.promise.deliveryTimeStatus === 'Em atenção').length
  const risco = pedidosTime.filter((p) => p.promise.deliveryTimeStatus === 'Risco de atraso').length
  const atrasadas = pedidosTime.filter((p) => p.promise.deliveryTimeStatus === 'Atrasado' || p.promise.deliveryTimeStatus === 'Entregue com atraso').length
  const entregues = pedidosTime.filter((p) => !!p.promise.actualDeliveredAt).length

  let rowsBase = pedidosTime
  if (filter === 'atrasadas') rowsBase = pedidosTime.filter((p) => p.promise.isDelayed)
  if (filter === 'risco') rowsBase = pedidosTime.filter((p) => p.promise.deliveryTimeStatus === 'Risco de atraso')
  type PedidoRow = PedidoTime & { id: string }
  const rows: PedidoRow[] = rowsBase.map((p) => ({ ...p, id: p.pedidoId }))

  const columns: Column<PedidoRow>[] = [
    { key: 'pedido', header: 'Pedido', render: (r) => <button onClick={() => navigate(`/operacao/pedidos/${r.pedidoId}/visao-360`)} className="font-semibold text-brand-700 hover:underline">{r.trackingCode}</button> },
    { key: 'nf', header: 'NF', render: (r) => r.nf },
    { key: 'cliente', header: 'Cliente / Varejista', render: (r) => <span className="text-xs">{r.cliente}{r.varejista && <><br/><span className="text-graphite-500">{r.varejista}</span></>}</span> },
    { key: 'dest', header: 'Destinatário / Destino', render: (r) => <span className="text-xs">{r.destinatario}<br/><span className="text-graphite-500">{r.destino}</span></span> },
    { key: 'status', header: 'Status atual', render: (r) => <StatusBadge status={r.statusAtual} /> },
    { key: 'leg', header: 'Perna atual', render: (r) => {
      const leg = r.legs.find((l) => l.legId === r.currentLegId)
      return <span className="text-xs">Perna {leg?.legNumber}<br/><span className="text-graphite-500">{leg?.origin.split('/')[0]} → {leg?.destination.split('/')[0]}</span></span>
    }},
    { key: 'promised', header: 'Prazo prometido', render: (r) => <span className="text-xs">{formatDateTime(r.promise.promisedDeliveryAt)}</span> },
    { key: 'eta', header: 'ETA atual', render: (r) => <span className="text-xs text-brand-700">{formatDeliveryWindow(r.promise.estimatedArrivalWindowStart, r.promise.estimatedArrivalWindowEnd)}</span> },
    { key: 'remaining', header: 'Tempo restante', render: (r) => (
      <RemainingTimeBadge minutes={r.promise.remainingTimeMinutes} delivered={!!r.promise.actualDeliveredAt} lateMinutes={r.promise.isDelayed ? Math.abs(r.promise.delayMinutes) : 0} />
    )},
    { key: 'arrival', header: 'Quando chegou', render: (r) => r.promise.actualDeliveredAt ? <span className="text-xs text-success-700">{formatDateTime(r.promise.actualDeliveredAt)}</span> : <span className="text-xs text-graphite-400">—</span> },
    { key: 'diff', header: 'Diferença ETA × prazo', render: (r) => {
      const folga = -r.promise.delayMinutes
      return <span className={`text-xs font-medium ${folga >= 0 ? 'text-success-700' : 'text-danger-700'}`}>{folga >= 0 ? `+${formatDurationShort(folga)} folga` : `-${formatDurationShort(Math.abs(folga))} atraso`}</span>
    }},
    { key: 'risk', header: 'Risco', render: (r) => <DeadlineRiskBadge status={r.promise.deliveryTimeStatus} /> },
    { key: 'next', header: 'Próximo evento', render: (r) => {
      const leg = r.legs.find((l) => l.legId === r.currentLegId)
      return <span className="text-xs text-graphite-700">{leg?.nextExpectedEvent || r.cargo.nextStop}</span>
    }},
    { key: 'actions', header: '', render: (r) => <button onClick={() => navigate(`/operacao/pedidos/${r.pedidoId}/visao-360`)} className="btn-ghost"><Eye size={14} /></button> },
  ]

  return (
    <div>
      <PageTitle
        title="Painel de prazos de entrega"
        subtitle="Acompanhe todos os pedidos por prazo, ETA, tempo restante e diferença vs prazo prometido."
        breadcrumb={['Operação', 'Prazos de entrega']}
      />

      <KPIGrid columns={4}>
        <MetricCard label="No prazo" value={noPrazo} icon={<CheckCircle2 size={18} />} tone="success" />
        <MetricCard label="Em atenção" value={atencao} icon={<Timer size={18} />} tone="warning" />
        <MetricCard label="Risco de atraso" value={risco} icon={<AlertTriangle size={18} />} tone="accent" />
        <MetricCard label="Atrasadas" value={atrasadas} icon={<AlertTriangle size={18} />} tone="danger" />
        <MetricCard label="Chegam hoje" value="6" icon={<CalendarClock size={18} />} tone="brand" />
        <MetricCard label="Chegam amanhã" value="3" icon={<CalendarClock size={18} />} />
        <MetricCard label="Entregues" value={entregues} icon={<CheckCircle2 size={18} />} tone="success" />
        <MetricCard label="Sem ETA confiável" value="1" icon={<Activity size={18} />} />
      </KPIGrid>

      <div className="flex flex-wrap gap-2 mt-4">
        {[
          { k: 'all', label: 'Todos' },
          { k: 'hoje', label: 'Chegam hoje' },
          { k: 'amanha', label: 'Chegam amanhã' },
          { k: 'risco', label: 'Risco de atraso' },
          { k: 'atrasadas', label: 'Atrasadas' },
        ].map((f) => (
          <button key={f.k} onClick={() => setFilter(f.k as any)} className={`text-xs px-3 py-1.5 rounded-full font-medium ${filter === f.k ? 'bg-navy-700 text-white' : 'bg-white border border-graphite-200 text-graphite-700 hover:bg-graphite-50'}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <FilterBar placeholder="Buscar pedido, NF, cliente ou destinatário...">
          <select className="input md:w-40"><option>Todos clientes</option></select>
          <select className="input md:w-40"><option>Todos destinos</option></select>
          <select className="input md:w-44"><option>Todas pernas</option><option>Perna 1</option><option>Perna 2</option><option>Última milha</option></select>
        </FilterBar>
        <DataTable columns={columns} data={rows} />
      </div>

      <div className="card p-4 mt-4 bg-brand-50 border-brand-100">
        <div className="flex items-start gap-2 text-sm text-brand-900">
          <Clock size={16} className="text-brand-700 mt-0.5" />
          <div>
            <div className="font-semibold">Como interpretar este painel</div>
            <ul className="list-disc ml-4 mt-1 text-brand-900">
              <li><strong>ETA atual</strong> é a previsão calculada pela IA com base na perna em andamento e nas próximas.</li>
              <li><strong>Diferença ETA × prazo</strong> mostra a folga (em verde) ou o atraso previsto (em vermelho).</li>
              <li><strong>Tempo restante</strong> é o tempo até a entrega final ao destinatário.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
