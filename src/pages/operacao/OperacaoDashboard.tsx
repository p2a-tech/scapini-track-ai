import {
  Truck, PackageSearch, Clock, AlertTriangle, FileText, Receipt,
  Boxes, CheckCircle2, Users, MapPin, Plus, Sparkles, ChevronRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import PageTitle from '../../components/layout/PageTitle'
import MetricCard from '../../components/ui/MetricCard'
import KPIGrid from '../../components/ui/KPIGrid'
import MockMap from '../../components/ui/MockMap'
import StatusBadge from '../../components/ui/StatusBadge'
import RiskBadge from '../../components/ui/RiskBadge'
import AIAlertCard from '../../components/ui/AIAlertCard'
import { aiAlerts, collects, deliveries, slaByClientData, slaByDayData, statusDistribution } from '../../data/mockData'

export default function OperacaoDashboard() {
  const navigate = useNavigate()
  const critical = deliveries.filter((d) => d.riskAi !== 'baixo').slice(0, 5)
  const pendingCollects = collects.filter((c) => c.status === 'Solicitado' || c.status === 'Aguardando programação').slice(0, 4)

  return (
    <div>
      <PageTitle
        title="Dashboard TMS"
        subtitle="Visão geral em tempo real da operação Scapini Transportes."
        breadcrumb={['Operação', 'Dashboard']}
        actions={
          <>
            <button onClick={() => navigate('/operacao/coletas/nova')} className="btn-outline"><Plus size={14} /> Novo pedido de coleta</button>
            <button onClick={() => navigate('/operacao/ordens')} className="btn-outline"><FileText size={14} /> Nova ordem de transporte</button>
            <button onClick={() => navigate('/operacao/documentos')} className="btn-outline"><Receipt size={14} /> Emitir CT-e</button>
            <button onClick={() => navigate('/operacao/programacao-cargas')} className="btn-primary"><Boxes size={14} /> Programar rota</button>
          </>
        }
      />

      <KPIGrid columns={4}>
        <MetricCard label="Coletas pendentes" value="18" hint="6 aguardando programação" icon={<PackageSearch size={18} />} tone="brand" />
        <MetricCard label="Coletas programadas" value="42" hint="hoje" icon={<Clock size={18} />} />
        <MetricCard label="Coletas realizadas" value="36" hint="hoje" icon={<CheckCircle2 size={18} />} tone="success" />
        <MetricCard label="Entregas em andamento" value="68" hint="38 em trânsito · 22 em última milha" icon={<Truck size={18} />} />
        <MetricCard label="Entregas atrasadas" value="6" trend={{ value: '-22% vs ontem', positive: true }} icon={<AlertTriangle size={18} />} tone="danger" />
        <MetricCard label="Veículos disponíveis" value="14" hint="de 22 totais" icon={<Truck size={18} />} />
        <MetricCard label="Veículos em rota" value="8" hint="2 terceiros via API" icon={<MapPin size={18} />} tone="brand" />
        <MetricCard label="Motoristas ativos" value="22" hint="6 em folga programada" icon={<Users size={18} />} />
        <MetricCard label="CT-es emitidos" value="124" hint="hoje" icon={<FileText size={18} />} tone="success" />
        <MetricCard label="MDF-es abertos" value="9" hint="2 aguardando encerramento" icon={<FileText size={18} />} tone="warning" />
        <MetricCard label="Ocorrências abertas" value="4" hint="2 em tratamento" icon={<AlertTriangle size={18} />} tone="warning" />
        <MetricCard label="Faturamento previsto" value="R$ 412,8k" hint="próximas 72h" icon={<Receipt size={18} />} tone="accent" />
      </KPIGrid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
        <div className="card p-4 lg:col-span-2">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-semibold text-graphite-900">Mapa resumido da frota</div>
              <div className="text-xs text-graphite-500">Posições aproximadas, ordens em trânsito e veículos terceiros via API.</div>
            </div>
            <button onClick={() => navigate('/operacao/mapa')} className="text-sm text-brand-700 font-medium hover:underline inline-flex items-center gap-1">
              Abrir mapa <ChevronRight size={14} />
            </button>
          </div>
          <MockMap
            height={300}
            markers={[
              { id: 'm1', x: 22, y: 22, label: 'SCA-1A23', status: 'normal', detail: 'João Pereira' },
              { id: 'm2', x: 40, y: 35, label: 'SCA-2B45', status: 'normal', detail: 'Carlos Mendes' },
              { id: 'm3', x: 60, y: 52, label: 'ABC-1234', status: 'terceiro', detail: 'Terceiro Modelo · API' },
              { id: 'm4', x: 75, y: 70, label: 'SCA-3C67', status: 'aguardando', detail: 'Rafael Souza' },
              { id: 'm5', x: 32, y: 75, label: 'TRC-9X88', status: 'parado', detail: 'Frete Rápido PR · sem sinal' },
              { id: 'm6', x: 86, y: 30, label: 'RDB-2024', status: 'atencao', detail: 'Rodobras · risco médio' },
              { id: 'm7', x: 14, y: 60, label: 'CG-2026-502', status: 'evento', detail: 'CD Guarulhos · expedição' },
            ]}
          />
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold text-graphite-900">SLA geral do dia</div>
              <div className="text-xs text-graphite-500">No prazo vs atrasada</div>
            </div>
            <div className="text-3xl font-bold text-success-700">93%</div>
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer>
              <BarChart data={slaByDayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="noPrazo" stackId="a" fill="#10b981" name="No prazo (%)" />
                <Bar dataKey="atrasada" stackId="a" fill="#ef4444" name="Atrasada (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-3">Entregas por status</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusDistribution} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80}>
                  {statusDistribution.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-graphite-900">SLA por cliente</div>
            <div className="text-xs text-graphite-500">% no prazo · últimos 7 dias</div>
          </div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={slaByClientData} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" />
                <XAxis type="number" tickLine={false} axisLine={false} style={{ fontSize: 11 }} domain={[0, 100]} />
                <YAxis type="category" dataKey="client" tickLine={false} axisLine={false} style={{ fontSize: 11 }} width={90} />
                <Tooltip />
                <Bar dataKey="sla" fill="#356bb6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-graphite-900">Entregas críticas</div>
            <button onClick={() => navigate('/operacao/entregas?filter=criticas')} className="text-sm text-brand-700 hover:underline">Ver todas</button>
          </div>
          <ul className="divide-y divide-graphite-100">
            {critical.map((d) => (
              <li key={d.id} className="py-2 flex items-center justify-between gap-2 cursor-pointer hover:bg-graphite-50 rounded-lg px-2"
                  onClick={() => navigate(`/operacao/entregas/${d.id}`)}>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-graphite-900 truncate">{d.trackingCode} · NF {d.nf}</div>
                  <div className="text-xs text-graphite-500 truncate">{d.client} · {d.origin} → {d.destination}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <RiskBadge level={d.riskAi} />
                  <StatusBadge status={d.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-graphite-900">Coletas pendentes</div>
            <button onClick={() => navigate('/operacao/coletas')} className="text-sm text-brand-700 hover:underline">Ver todas</button>
          </div>
          <ul className="divide-y divide-graphite-100">
            {pendingCollects.map((c) => (
              <li key={c.id} className="py-2 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-graphite-900 truncate">{c.number} · {c.client}</div>
                  <div className="text-xs text-graphite-500 truncate">{c.cityOrigin} → {c.cityDest} · {c.window}</div>
                </div>
                <StatusBadge status={c.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-semibold text-graphite-900 flex items-center gap-2"><Sparkles size={16} className="text-accent-600" /> Alertas inteligentes da IA</div>
            <div className="text-xs text-graphite-500">Sugestões proativas baseadas em risco operacional, rastreamento e SLA.</div>
          </div>
          <button onClick={() => navigate('/ia/alertas')} className="text-sm text-brand-700 hover:underline">Ver todos os alertas</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiAlerts.slice(0, 4).map((a) => <AIAlertCard key={a.id} alert={a} />)}
        </div>
      </div>
    </div>
  )
}
