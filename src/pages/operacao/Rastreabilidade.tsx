import PageTitle from '../../components/layout/PageTitle'
import KPIGrid from '../../components/ui/KPIGrid'
import MetricCard from '../../components/ui/MetricCard'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import TrackingSourceBadge from '../../components/ui/TrackingSourceBadge'
import TrackingScore from '../../components/ui/TrackingScore'
import { Wifi, WifiOff, Cpu, Plug, Ban, Activity, Link2, Map } from 'lucide-react'
import { orders } from '../../data/mockData'

interface Row {
  id: string
  ordem: string
  cliente: string
  terceiro: string
  placa: string
  motorista: string
  fonte: string
  ultima: string
  ultimoSinal: string
  score: number
  statusSinal: string
  risco: string
}

const rows: Row[] = orders.map((o) => ({
  id: o.id,
  ordem: o.number,
  cliente: o.client,
  terceiro: o.driver.includes('Terceiro') || o.driver.includes('Wagner') || o.driver.includes('Mauro') ? o.driver : '—',
  placa: o.vehicle.split('→')[0].trim(),
  motorista: o.driver,
  fonte: o.trackingSource,
  ultima: 'Lapa/PR — BR-376',
  ultimoSinal: o.trackingScore === 0 ? 'Sem sinal há 1h 12min' : o.trackingScore < 60 ? 'Sem sinal há 32 min' : 'há ' + Math.floor(Math.random() * 30) + ' s',
  score: o.trackingScore,
  statusSinal: o.trackingScore === 0 ? 'Viagem sem fonte confiável' : o.trackingScore < 60 ? 'Sem sinal há 30 minutos' : 'Rastreamento ativo',
  risco: o.riskAi,
}))

export default function Rastreabilidade() {
  const columns: Column<Row>[] = [
    { key: 'order', header: 'Ordem', render: (r) => <span className="font-semibold">{r.ordem}</span> },
    { key: 'client', header: 'Cliente', render: (r) => r.cliente },
    { key: 'third', header: 'Terceiro', render: (r) => <span className="text-xs">{r.terceiro}</span> },
    { key: 'plate', header: 'Placa', render: (r) => r.placa },
    { key: 'driver', header: 'Motorista', render: (r) => <span className="text-xs">{r.motorista}</span> },
    { key: 'source', header: 'Fonte', render: (r) => <TrackingSourceBadge source={r.fonte} /> },
    { key: 'last', header: 'Última posição', render: (r) => <span className="text-xs">{r.ultima}<br/><span className="text-graphite-500">{r.ultimoSinal}</span></span> },
    { key: 'score', header: 'Score', render: (r) => <TrackingScore score={r.score} size="sm" /> },
    { key: 'signal', header: 'Status do sinal', render: (r) => <StatusBadge status={r.statusSinal} /> },
    { key: 'actions', header: 'Ações', render: () => (
      <div className="flex gap-1">
        <button className="btn-ghost" title="Enviar link"><Link2 size={14} /></button>
        <button className="btn-ghost" title="Vincular device"><Cpu size={14} /></button>
        <button className="btn-ghost" title="Testar API"><Plug size={14} /></button>
        <button className="btn-ghost" title="Mapa"><Map size={14} /></button>
      </div>
    )},
  ]

  return (
    <div>
      <PageTitle
        title="Controle de rastreabilidade"
        subtitle="Visibilidade híbrida — frota própria, terceiros, app, link, device físico e eventos de filial."
        breadcrumb={['Operação', 'Rastreabilidade']}
      />
      <KPIGrid columns={4}>
        <MetricCard label="Viagens rastreadas" value="34" icon={<Wifi size={18} />} tone="success" />
        <MetricCard label="Viagens sem sinal" value="3" icon={<WifiOff size={18} />} tone="danger" />
        <MetricCard label="Terceiros sem rastreamento" value="2" icon={<Ban size={18} />} tone="warning" />
        <MetricCard label="Devices em uso" value="5" icon={<Cpu size={18} />} tone="accent" />
        <MetricCard label="APIs ativas" value="4" icon={<Plug size={18} />} tone="brand" />
        <MetricCard label="Bloqueadas por rastreio" value="1" icon={<Ban size={18} />} tone="danger" />
        <MetricCard label="Score médio" value="78" hint="acima do mínimo (60)" icon={<Activity size={18} />} tone="success" />
        <MetricCard label="Sinal médio" value="58 s" hint="frequência observada" icon={<Wifi size={18} />} />
      </KPIGrid>

      <div className="mt-5">
        <DataTable columns={columns} data={rows} />
      </div>
    </div>
  )
}
