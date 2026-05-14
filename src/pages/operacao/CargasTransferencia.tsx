import PageTitle from '../../components/layout/PageTitle'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import TrackingSourceBadge from '../../components/ui/TrackingSourceBadge'
import RiskBadge from '../../components/ui/RiskBadge'

interface Row {
  id: string
  cargo: string
  origin: string
  dest: string
  carrier: string
  vehicle: string
  driver: string
  source: string
  lastEvent: string
  lastSignal: string
  eta: string
  deliveries: number
  risk: string
  status: string
}

const rows: Row[] = [
  { id: 'tr1', cargo: 'CG-2026-501', origin: 'Guarulhos/SP', dest: 'Curitiba/PR', carrier: 'Transportes Modelo', vehicle: 'ABC-1234', driver: 'Paulo Nogueira', source: 'API rastreador terceiro', lastEvent: 'Chegada Curitiba 17h45', lastSignal: 'há 1 min', eta: '17h45 (concluída)', deliveries: 28, risk: 'baixo', status: 'Chegou no destino' },
  { id: 'tr2', cargo: 'CG-2026-502', origin: 'Curitiba/PR', dest: 'Florianópolis/SC', carrier: 'Scapini Transportes', vehicle: 'SCA-1A23', driver: 'João Pereira', source: 'Apenas eventos', lastEvent: 'Saída Curitiba 20h30', lastSignal: '—', eta: '02h00', deliveries: 22, risk: 'medio', status: 'Em transferência' },
  { id: 'tr3', cargo: 'CG-2026-503', origin: 'Florianópolis/SC', dest: 'CD Porto Alegre/RS', carrier: 'Scapini Transportes', vehicle: 'SCA-3C67', driver: 'Rafael Souza', source: 'GPS próprio', lastEvent: 'Cross-docking concluído', lastSignal: 'há 5 s', eta: 'Amanhã 06h00', deliveries: 32, risk: 'baixo', status: 'Aguardando saída' },
  { id: 'tr4', cargo: 'CG-2026-504', origin: 'CD Porto Alegre/RS', dest: 'Distribuição RS', carrier: 'Scapini Transportes', vehicle: 'SCA-5E10', driver: 'Diego Ramos', source: 'App motorista', lastEvent: 'Separação última milha', lastSignal: 'há 2 min', eta: 'Amanhã 09h00–12h00', deliveries: 24, risk: 'baixo', status: 'Aguardando saída' },
  { id: 'tr5', cargo: 'CG-2026-507', origin: 'Caxias do Sul/RS', dest: 'São Paulo/SP', carrier: 'Rodobras', vehicle: 'RDB-2024', driver: 'Wagner Rodobras', source: 'API rastreador terceiro', lastEvent: 'Posição: Registro/SP', lastSignal: 'há 8 s', eta: 'Hoje 22h00', deliveries: 1, risk: 'medio', status: 'Em transferência' },
  { id: 'tr6', cargo: 'CG-2026-508', origin: 'Maringá/PR', dest: 'São Paulo/SP', carrier: 'Frete Rápido Paraná', vehicle: 'FRP-3030', driver: 'Não vinculado', source: 'Atualização manual', lastEvent: 'Última manual: Cascavel/PR', lastSignal: 'há 1 h 12 min', eta: '—', deliveries: 6, risk: 'alto', status: 'Sem sinal' },
  { id: 'tr7', cargo: 'CG-2026-509', origin: 'Joinville/SC', dest: 'Curitiba/PR', carrier: 'Expresso Terceiro Sul', vehicle: 'ETS-4040', driver: 'Tiago Expresso', source: 'API rastreador terceiro', lastEvent: 'Posição: Garuva/SC', lastSignal: 'há 25 s', eta: 'Hoje 16h45', deliveries: 9, risk: 'baixo', status: 'Em transferência' },
]

export default function CargasTransferencia() {
  const columns: Column<Row>[] = [
    { key: 'cargo', header: 'Carga', render: (r) => <span className="font-semibold">{r.cargo}</span> },
    { key: 'route', header: 'Origem → Destino', render: (r) => <span className="text-xs">{r.origin}<br/><span className="text-graphite-500">→ {r.dest}</span></span> },
    { key: 'carrier', header: 'Transportador', render: (r) => <span className="text-xs">{r.carrier}<br/><span className="text-graphite-500">{r.vehicle} · {r.driver}</span></span> },
    { key: 'source', header: 'Fonte', render: (r) => <TrackingSourceBadge source={r.source} /> },
    { key: 'event', header: 'Último evento', render: (r) => <span className="text-xs">{r.lastEvent}<br/><span className="text-graphite-500">{r.lastSignal}</span></span> },
    { key: 'eta', header: 'ETA chegada', render: (r) => <span className="text-xs">{r.eta}</span> },
    { key: 'deliveries', header: 'Entregas', render: (r) => r.deliveries },
    { key: 'risk', header: 'Risco', render: (r) => <RiskBadge level={r.risk} /> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ]
  return (
    <div>
      <PageTitle
        title="Cargas em transferência"
        subtitle="Acompanhe transferências entre filiais, CDs, hubs e longos percursos."
        breadcrumb={['Operação', 'Cargas em transferência']}
      />
      <DataTable columns={columns} data={rows} />
    </div>
  )
}
