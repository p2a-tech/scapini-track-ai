import PageTitle from '../../components/layout/PageTitle'
import KPIGrid from '../../components/ui/KPIGrid'
import MetricCard from '../../components/ui/MetricCard'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { Boxes, Truck, FileText, Receipt, CheckCircle2, Send, AlertTriangle, Printer } from 'lucide-react'

interface Carga {
  id: string
  number: string
  vehicle: string
  driver: string
  origin: string
  destinations: string
  qtd: number
  weight: string
  volume: string
  docStatus: string
  loadStatus: string
  departure: string
}

const cargas: Carga[] = [
  { id: 'cg1', number: 'CG-2026-501', vehicle: 'SCA-1A23', driver: 'João Pereira', origin: 'CD Guarulhos/SP', destinations: 'CWB · FLN · POA', qtd: 28, weight: '12.420 kg', volume: '40 m³', docStatus: 'Documentos OK', loadStatus: 'Carregando', departure: 'Hoje 18h00' },
  { id: 'cg2', number: 'CG-2026-502', vehicle: 'SCA-2B45', driver: 'Carlos Mendes', origin: 'Filial Curitiba/PR', destinations: 'FLN', qtd: 14, weight: '4.200 kg', volume: '12,5 m³', docStatus: 'Documentos OK', loadStatus: 'Pronta para saída', departure: 'Hoje 19h30' },
  { id: 'cg3', number: 'CG-2026-503', vehicle: 'SCA-3C67', driver: 'Rafael Souza', origin: 'CD Porto Alegre/RS', destinations: 'POA · Canoas', qtd: 22, weight: '8.700 kg', volume: '26 m³', docStatus: 'Aguardando MDF-e', loadStatus: 'Em montagem', departure: 'Hoje 20h00' },
  { id: 'cg4', number: 'CG-2026-504', vehicle: 'SCA-4D89', driver: 'Marcos Oliveira', origin: 'CD Guarulhos/SP', destinations: 'JOI · Blumenau', qtd: 18, weight: '6.300 kg', volume: '18 m³', docStatus: 'Documentos OK', loadStatus: 'Liberada', departure: 'Hoje 17h00' },
  { id: 'cg5', number: 'CG-2026-505', vehicle: 'SCA-5E10', driver: 'Diego Ramos', origin: 'Filial Londrina/PR', destinations: 'Maringá', qtd: 8, weight: '2.100 kg', volume: '8 m³', docStatus: 'CT-e pendente', loadStatus: 'Aguardando motorista', departure: 'Hoje 14h00' },
  { id: 'cg6', number: 'CG-2026-506', vehicle: 'FRP-3030 (terceiro)', driver: 'Não vinculado', origin: 'Filial Itajaí/SC', destinations: 'FLN', qtd: 6, weight: '12.000 kg', volume: '38 m³', docStatus: 'Pendente — sem rastreio', loadStatus: 'Bloqueada — falta rastreabilidade', departure: '—' },
]

export default function Expedicao() {
  const columns: Column<Carga>[] = [
    { key: 'number', header: 'Carga', render: (r) => <span className="font-semibold">{r.number}</span> },
    { key: 'vehicle', header: 'Veículo', render: (r) => <span className="text-xs">{r.vehicle}<br/><span className="text-graphite-500">{r.driver}</span></span> },
    { key: 'origin', header: 'Origem', render: (r) => r.origin },
    { key: 'destinations', header: 'Destinos', render: (r) => r.destinations },
    { key: 'qtd', header: 'Entregas', render: (r) => r.qtd },
    { key: 'weight', header: 'Peso', render: (r) => <span className="text-xs">{r.weight}<br/><span className="text-graphite-500">{r.volume}</span></span> },
    { key: 'docs', header: 'Documentação', render: (r) => <StatusBadge status={r.docStatus} /> },
    { key: 'load', header: 'Carregamento', render: (r) => <StatusBadge status={r.loadStatus} /> },
    { key: 'departure', header: 'Saída prevista', render: (r) => <span className="text-xs">{r.departure}</span> },
    { key: 'actions', header: '', render: () => (
      <div className="flex gap-1">
        <button className="btn-ghost" title="Liberar"><CheckCircle2 size={14} /></button>
        <button className="btn-ghost" title="Imprimir romaneio"><Printer size={14} /></button>
        <button className="btn-ghost" title="Enviar rota ao motorista"><Send size={14} /></button>
      </div>
    )},
  ]
  return (
    <div>
      <PageTitle
        title="Expedição"
        subtitle="Painel de cargas em montagem, conferência e liberação para viagem."
        breadcrumb={['Operação', 'Expedição']}
      />
      <KPIGrid columns={4}>
        <MetricCard label="Em montagem" value="6" icon={<Boxes size={18} />} tone="brand" />
        <MetricCard label="Prontas para saída" value="4" icon={<Truck size={18} />} tone="success" />
        <MetricCard label="Aguardando documentação" value="3" icon={<FileText size={18} />} tone="warning" />
        <MetricCard label="Liberadas" value="9" icon={<CheckCircle2 size={18} />} tone="success" />
        <MetricCard label="Veículos no pátio" value="11" icon={<Truck size={18} />} />
        <MetricCard label="Veículos carregando" value="5" icon={<Boxes size={18} />} tone="brand" />
        <MetricCard label="Aguardando motorista" value="2" icon={<Truck size={18} />} tone="warning" />
        <MetricCard label="Bloqueadas por rastreio" value="1" icon={<AlertTriangle size={18} />} tone="danger" />
      </KPIGrid>

      <div className="mt-5">
        <DataTable columns={columns} data={cargas} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2 justify-end">
        <button className="btn-outline"><Receipt size={14} /> Gerar MDF-e em lote</button>
        <button className="btn-outline"><Printer size={14} /> Imprimir romaneios</button>
        <button className="btn-primary"><Send size={14} /> Enviar rotas aos motoristas</button>
      </div>
    </div>
  )
}
