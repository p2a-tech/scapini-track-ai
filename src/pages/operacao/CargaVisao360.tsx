import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, RotateCw } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import Cargo360Header from '../../components/ui/time/Cargo360Header'
import { LegTimelineDetailed } from '../../components/ui/time/LegTimeCard'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { RemainingTimeBadge, DeadlineRiskBadge } from '../../components/ui/time/TimeBadges'
import { findPedidoTime, pedidosTime } from '../../data/timeMocks'
import { formatDateTime, formatDeliveryWindow, formatDurationShort } from '../../utils/deliveryTimeCalculator'
import KPIGrid from '../../components/ui/KPIGrid'
import MetricCard from '../../components/ui/MetricCard'
import { Package, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'

interface RowPedido {
  id: string
  pedido: string
  nf: string
  cliente: string
  varejista?: string
  destinatario: string
  destino: string
  status: string
  promised: string
  eta: string
  remaining: string
  delivered?: string
  risk: any
  lastEvent: string
}

export default function CargaVisao360() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pedidoBase = findPedidoTime(id || '') || pedidosTime[0]

  // Para a carga, considere todos os pedidos com o mesmo cargaId (no protótipo, normalmente 1)
  const pedidosNaCarga = pedidosTime.filter((p) => p.cargaId === pedidoBase.cargaId)

  const rows: RowPedido[] = pedidosNaCarga.map((p) => ({
    id: p.pedidoId,
    pedido: p.trackingCode,
    nf: p.nf,
    cliente: p.cliente,
    varejista: p.varejista,
    destinatario: p.destinatario,
    destino: p.destino,
    status: p.statusAtual,
    promised: formatDateTime(p.promise.promisedDeliveryAt),
    eta: formatDeliveryWindow(p.promise.estimatedArrivalWindowStart, p.promise.estimatedArrivalWindowEnd),
    remaining: p.promise.actualDeliveredAt ? 'Chegou' : formatDurationShort(p.promise.remainingTimeMinutes),
    delivered: p.promise.actualDeliveredAt ? formatDateTime(p.promise.actualDeliveredAt) : undefined,
    risk: p.promise.deliveryTimeStatus,
    lastEvent: p.cargo.lastEventDescription,
  }))

  const columns: Column<RowPedido>[] = [
    { key: 'pedido', header: 'Pedido', render: (r) => <button onClick={() => navigate(`/operacao/pedidos/${r.id}/visao-360`)} className="font-semibold text-brand-700 hover:underline">{r.pedido}</button> },
    { key: 'nf', header: 'NF', render: (r) => r.nf },
    { key: 'cliente', header: 'Cliente / Varejista', render: (r) => <span className="text-xs">{r.cliente}{r.varejista && <><br/><span className="text-graphite-500">{r.varejista}</span></>}</span> },
    { key: 'destino', header: 'Destinatário', render: (r) => <span className="text-xs">{r.destinatario}<br/><span className="text-graphite-500">{r.destino}</span></span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'promised', header: 'Prazo prometido', render: (r) => <span className="text-xs">{r.promised}</span> },
    { key: 'eta', header: 'ETA final', render: (r) => <span className="text-xs text-brand-700">{r.eta}</span> },
    { key: 'remaining', header: 'Tempo restante', render: (r) => <RemainingTimeBadge minutes={0} delivered={r.remaining === 'Chegou'} lateMinutes={0} /> },
    { key: 'risk', header: 'Status do prazo', render: (r) => <DeadlineRiskBadge status={r.risk} /> },
    { key: 'lastEvent', header: 'Último evento', render: (r) => <span className="text-xs text-graphite-500">{r.lastEvent}</span> },
  ]

  const noPrazo = pedidosNaCarga.filter((p) => p.promise.deliveryTimeStatus === 'No prazo' || p.promise.deliveryTimeStatus === 'Entregue no prazo').length
  const risco = pedidosNaCarga.filter((p) => p.promise.deliveryTimeStatus === 'Risco de atraso' || p.promise.deliveryTimeStatus === 'Em atenção').length
  const atrasados = pedidosNaCarga.filter((p) => p.promise.deliveryTimeStatus === 'Atrasado' || p.promise.deliveryTimeStatus === 'Entregue com atraso').length

  return (
    <div>
      <PageTitle
        title={`Visão 360 — ${pedidoBase.cargaNumero}`}
        breadcrumb={['Operação', 'Cargas', pedidoBase.cargaNumero, 'Visão 360']}
        actions={
          <>
            <button onClick={() => navigate(-1)} className="btn-outline"><ArrowLeft size={14} /> Voltar</button>
            <button className="btn-outline"><RotateCw size={14} /> Recalcular ETAs</button>
            <button onClick={() => navigate(`/operacao/cargas/${pedidoBase.cargaId}/pernas`)} className="btn-primary"><MapPin size={14} /> Ver pernas detalhadas</button>
          </>
        }
      />

      <Cargo360Header pedido={pedidoBase} qtdPedidos={pedidosNaCarga.length} />

      <KPIGrid columns={4}>
        <MetricCard label="Pedidos na carga" value={pedidosNaCarga.length} icon={<Package size={18} />} />
        <MetricCard label="No prazo" value={noPrazo} icon={<CheckCircle2 size={18} />} tone="success" />
        <MetricCard label="Em risco" value={risco} icon={<Clock size={18} />} tone="warning" />
        <MetricCard label="Atrasados" value={atrasados} icon={<AlertTriangle size={18} />} tone="danger" />
      </KPIGrid>

      <div className="mt-5">
        <div className="font-semibold text-graphite-900 mb-3">Pedidos dentro da carga</div>
        <DataTable columns={columns} data={rows} />
      </div>

      <div className="mt-5">
        <div className="font-semibold text-graphite-900 mb-3">Pernas da carga</div>
        <LegTimelineDetailed legs={pedidoBase.legs} />
      </div>
    </div>
  )
}
