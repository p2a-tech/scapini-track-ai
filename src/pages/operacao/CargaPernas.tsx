import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Activity, Clock, RotateCw, MapPin } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import KPIGrid from '../../components/ui/KPIGrid'
import MetricCard from '../../components/ui/MetricCard'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import TrackingSourceBadge from '../../components/ui/TrackingSourceBadge'
import { findPedidoTime, pedidosTime } from '../../data/timeMocks'
import type { LegTime } from '../../data/timeTypes'
import { formatDateTime, formatDurationShort } from '../../utils/deliveryTimeCalculator'

export default function CargaPernas() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pedido = findPedidoTime(id || '') || pedidosTime[0]
  const currentLeg = pedido.legs.find((l) => l.legId === pedido.currentLegId) || pedido.legs[0]
  const pedidosImpactados = pedidosTime.filter((p) => p.cargaId === pedido.cargaId).length

  type LegRow = LegTime & { id: string }
  const legRows: LegRow[] = pedido.legs.map((l) => ({ ...l, id: l.legId }))
  const columns: Column<LegRow>[] = [
    { key: 'num', header: 'Nº', render: (r) => <span className="font-semibold">Perna {r.legNumber}</span> },
    { key: 'route', header: 'Origem → Destino', render: (r) => <span className="text-xs">{r.origin}<br/><span className="text-graphite-500">→ {r.destination}</span></span> },
    { key: 'type', header: 'Tipo', render: (r) => <span className="text-xs">{r.legType}</span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'saidaPlan', header: 'Saída planejada', render: (r) => <span className="text-xs">{formatDateTime(r.plannedDepartureAt)}</span> },
    { key: 'saidaReal', header: 'Saída real', render: (r) => <span className="text-xs">{r.actualDepartureAt ? formatDateTime(r.actualDepartureAt) : <span className="text-graphite-400">—</span>}</span> },
    { key: 'chegadaPlan', header: 'Chegada planejada', render: (r) => <span className="text-xs">{formatDateTime(r.plannedArrivalAt)}</span> },
    { key: 'eta', header: 'ETA atual', render: (r) => <span className="text-xs text-brand-700">{formatDateTime(r.estimatedArrivalAt)}</span> },
    { key: 'chegadaReal', header: 'Chegada real', render: (r) => <span className="text-xs">{r.actualArrivalAt ? formatDateTime(r.actualArrivalAt) : <span className="text-graphite-400">—</span>}</span> },
    { key: 'duracEst', header: 'Duração est.', render: (r) => formatDurationShort(r.estimatedDurationMinutes) },
    { key: 'duracReal', header: 'Duração real', render: (r) => r.actualDurationMinutes ? formatDurationShort(r.actualDurationMinutes) : <span className="text-graphite-400">—</span> },
    { key: 'restante', header: 'Tempo restante', render: (r) => r.status === 'Concluída' ? <span className="text-success-700 text-xs">Concluída</span> : r.delayMinutes > 0 ? <span className="text-danger-700 text-xs">Atrasada {formatDurationShort(r.delayMinutes)}</span> : <span className="text-brand-700 text-xs">{formatDurationShort(r.remainingTimeMinutes)}</span> },
    { key: 'driver', header: 'Veículo / Motorista', render: (r) => <span className="text-xs">{r.vehicle}<br/><span className="text-graphite-500">{r.driver}</span></span> },
    { key: 'source', header: 'Fonte', render: (r) => <TrackingSourceBadge source={r.trackingSource as any} /> },
    { key: 'cost', header: 'Custo est.', render: (r) => r.estimatedCost ? <span className="text-xs">R$ {r.estimatedCost.toLocaleString('pt-BR')}</span> : '—' },
  ]

  return (
    <div>
      <PageTitle
        title={`Pernas — ${pedido.cargaNumero}`}
        breadcrumb={['Operação', 'Cargas', pedido.cargaNumero, 'Pernas']}
        actions={<button onClick={() => navigate(-1)} className="btn-outline"><ArrowLeft size={14} /> Voltar</button>}
      />

      <KPIGrid columns={5}>
        <MetricCard label="Perna atual" value={`#${currentLeg.legNumber}`} hint={`${currentLeg.origin} → ${currentLeg.destination}`} icon={<MapPin size={18} />} tone="brand" />
        <MetricCard label="Tempo restante da perna" value={currentLeg.status === 'Concluída' ? 'Concluída' : formatDurationShort(currentLeg.remainingTimeMinutes)} icon={<Clock size={18} />} />
        <MetricCard label="ETA da perna" value={formatDateTime(currentLeg.estimatedArrivalAt)} icon={<Activity size={18} />} />
        <MetricCard label="Pedidos impactados" value={pedidosImpactados} icon={<Activity size={18} />} />
        <MetricCard label="Risco" value={currentLeg.riskLevel} icon={<Activity size={18} />} tone={currentLeg.riskLevel === 'alto' ? 'danger' : currentLeg.riskLevel === 'medio' ? 'warning' : 'success'} />
      </KPIGrid>

      <div className="mt-5">
        <DataTable columns={columns} data={legRows} />
      </div>

      <div className="card p-4 mt-5">
        <div className="font-semibold text-graphite-900 mb-3">Ações por perna</div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-outline"><RotateCw size={14} /> Atualizar ETA da perna atual</button>
          <button className="btn-outline">Registrar chegada</button>
          <button className="btn-outline">Registrar saída</button>
          <button className="btn-outline">Recalcular prazo</button>
          <button className="btn-outline">Ver pedidos impactados</button>
          <button className="btn-outline">Abrir roteirizador da perna</button>
        </div>
      </div>
    </div>
  )
}
