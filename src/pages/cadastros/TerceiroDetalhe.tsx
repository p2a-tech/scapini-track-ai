import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, AlertTriangle, Phone, Mail, Truck } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import TrackingScore from '../../components/ui/TrackingScore'
import KPIGrid from '../../components/ui/KPIGrid'
import MetricCard from '../../components/ui/MetricCard'
import { thirdParties } from '../../data/mockData'

const policies = [
  'Terceiro sempre deve usar API integrada',
  'Terceiro pode usar link temporário',
  'Terceiro exige device obrigatório',
  'Terceiro bloqueado para cargas críticas',
  'Terceiro permitido apenas com aprovação de gestor',
  'Liberado apenas para transferência entre filiais',
  'Liberado para última milha',
]

export default function TerceiroDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const t = thirdParties.find((x) => x.id === id) || thirdParties[0]
  return (
    <div>
      <PageTitle
        title={t.name}
        subtitle={`CNPJ ${t.cnpj}`}
        breadcrumb={['Cadastros', 'Terceiros', t.name]}
        actions={<button onClick={() => navigate(-1)} className="btn-outline"><ArrowLeft size={14} /> Voltar</button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="card p-5 lg:col-span-2">
          <div className="font-semibold text-graphite-900 mb-3">Dados</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2"><Phone size={14} className="text-graphite-400" /><span className="font-medium">{t.phone}</span></div>
            <div className="flex items-center gap-2"><Mail size={14} className="text-graphite-400" /><span className="font-medium">{t.email}</span></div>
            <div><div className="text-xs text-graphite-500">Contato operacional</div><div className="font-medium">{t.contact}</div></div>
            <div><div className="text-xs text-graphite-500">Fornecedor de rastreador</div><div className="font-medium">{t.trackerVendor}</div></div>
            <div><div className="text-xs text-graphite-500">Placas utilizadas</div><div className="font-medium flex items-center gap-1 flex-wrap">{t.plates.map((p) => <span key={p} className="chip bg-graphite-100 text-graphite-700"><Truck size={11} />{p}</span>)}</div></div>
          </div>
        </div>

        <div className="card p-5 text-center">
          <TrackingScore score={t.confidenceScore} size="lg" />
          <div className="mt-3 text-xs text-graphite-500">Score operacional</div>
          <div className="mt-2 text-sm font-semibold">{t.policy}</div>
        </div>
      </div>

      <KPIGrid columns={4}>
        <MetricCard label="Viagens realizadas" value={t.trips} icon={<Truck size={18} />} />
        <MetricCard label="No prazo" value={`${Math.round((t.onTime / t.trips) * 100)}%`} icon={<ShieldCheck size={18} />} tone="success" />
        <MetricCard label="Com atraso" value={t.late} icon={<AlertTriangle size={18} />} tone="warning" />
        <MetricCard label="Sem sinal" value={t.withoutSignal} icon={<AlertTriangle size={18} />} tone="danger" />
        <MetricCard label="Aceite do link" value={`${t.acceptanceRate}%`} />
        <MetricCard label="Tempo médio sem rastreio" value="14 min" />
        <MetricCard label="Ocorrências / viagem" value="0,12" />
        <MetricCard label="Possui API" value={t.hasApi ? 'Sim' : 'Não'} tone={t.hasApi ? 'success' : 'warning'} />
      </KPIGrid>

      <div className="card p-5 mt-4">
        <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><ShieldCheck size={14} /> Política de rastreamento</div>
        <ul className="space-y-2 text-sm">
          {policies.map((p, i) => (
            <li key={i} className="flex items-center gap-2">
              <input type="checkbox" defaultChecked={i === 0 || (t.requiresDevice && i === 2)} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card-elevated p-4 mt-4 border-l-4 border-warning-500 bg-warning-50">
        <div className="text-sm text-warning-700"><strong>Histórico de falhas de rastreamento:</strong> {t.withoutSignal} viagens nas últimas {t.trips} — taxa {(t.withoutSignal / t.trips * 100).toFixed(1)}%.</div>
      </div>
    </div>
  )
}
