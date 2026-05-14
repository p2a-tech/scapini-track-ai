import PageTitle from '../../components/layout/PageTitle'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { rastreadorIntegrations } from '../../data/mockData'
import { RastreadorIntegration } from '../../data/types'
import { Plus, Plug, Link2, RotateCw, Pause, FileText, Play } from 'lucide-react'

const logs = [
  { time: '15h22:08', plate: 'ABC-1234', lat: '-25.4284', lng: '-49.2733', status: 'OK', error: '—' },
  { time: '15h21:08', plate: 'RDB-2024', lat: '-29.1678', lng: '-51.1791', status: 'OK', error: '—' },
  { time: '15h20:08', plate: 'ABC-1234', lat: '-25.4231', lng: '-49.2810', status: 'OK', error: '—' },
  { time: '15h19:00', plate: 'SUL-1010', lat: '—', lng: '—', status: 'Erro 504', error: 'Gateway timeout' },
  { time: '15h18:08', plate: 'ETS-4040', lat: '-26.2842', lng: '-48.8480', status: 'OK', error: '—' },
]

export default function RastreadoresTerceiros() {
  const columns: Column<RastreadorIntegration>[] = [
    { key: 'carrier', header: 'Transportador / Fornecedor', render: (r) => <span className="text-xs"><span className="font-semibold text-graphite-900 block">{r.carrier}</span>{r.vendor}</span> },
    { key: 'type', header: 'Tipo', render: (r) => r.type },
    { key: 'endpoint', header: 'Endpoint', render: (r) => <code className="text-[10px] block max-w-xs truncate">{r.endpoint}</code> },
    { key: 'token', header: 'Token', render: (r) => <span className="text-[10px] font-mono">{r.token}</span> },
    { key: 'plate', header: 'Placa', render: (r) => r.plate },
    { key: 'freq', header: 'Frequência', render: (r) => <span className="text-xs">{r.frequency}</span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'signal', header: 'Último sinal', render: (r) => <span className="text-xs">{r.lastSignal}</span> },
    { key: 'trips', header: 'Viagens', render: (r) => r.authorizedTrips },
    { key: 'actions', header: 'Ações', render: () => (
      <div className="flex gap-1">
        <button className="btn-ghost" title="Testar conexão"><Play size={14} /></button>
        <button className="btn-ghost" title="Vincular viagem"><Link2 size={14} /></button>
        <button className="btn-ghost" title="Pausar"><Pause size={14} /></button>
        <button className="btn-ghost" title="Reprocessar"><RotateCw size={14} /></button>
        <button className="btn-ghost" title="Ver logs"><FileText size={14} /></button>
      </div>
    )},
  ]
  return (
    <div>
      <PageTitle
        title="Integrações com rastreadores de terceiros"
        subtitle="Configure APIs para receber posições em tempo real de terceiros."
        breadcrumb={['Integrações', 'Rastreadores de terceiros']}
        actions={<button className="btn-primary"><Plus size={14} /> Nova integração</button>}
      />

      <DataTable columns={columns} data={rastreadorIntegrations} />

      <div className="card p-4 mt-5">
        <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Plug size={14} /> Logs recentes (Onixsat · Transportes Modelo)</div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Data/hora</th><th>Placa</th><th>Latitude</th><th>Longitude</th><th>Status</th><th>Erro</th></tr></thead>
            <tbody>
              {logs.map((l, i) => (
                <tr key={i}>
                  <td className="text-xs">{l.time}</td>
                  <td>{l.plate}</td>
                  <td className="text-xs font-mono">{l.lat}</td>
                  <td className="text-xs font-mono">{l.lng}</td>
                  <td><StatusBadge status={l.status === 'OK' ? 'Ativo' : 'Erro'} /></td>
                  <td className="text-xs text-graphite-500">{l.error}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
