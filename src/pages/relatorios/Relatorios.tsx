import PageTitle from '../../components/layout/PageTitle'
import { Filter, Download } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { slaByClientData, slaByDayData, statusDistribution, trackingSourcesUsage } from '../../data/mockData'

const motoristasOcc = [
  { name: 'Paulo Nogueira', oc: 3 },
  { name: 'Marcos Oliveira', oc: 2 },
  { name: 'Carlos Mendes', oc: 1 },
  { name: 'Diego Ramos', oc: 1 },
  { name: 'João Pereira', oc: 0 },
]
const tempoEntrega = [
  { day: 'Seg', tempo: 38 },
  { day: 'Ter', tempo: 41 },
  { day: 'Qua', tempo: 45 },
  { day: 'Qui', tempo: 39 },
  { day: 'Sex', tempo: 42 },
  { day: 'Sáb', tempo: 36 },
]
const volumeCity = [
  { city: 'São Paulo', vol: 142 },
  { city: 'Curitiba', vol: 88 },
  { city: 'Florianópolis', vol: 72 },
  { city: 'Porto Alegre', vol: 65 },
  { city: 'Joinville', vol: 54 },
  { city: 'Maringá', vol: 38 },
]
const failureByThird = [
  { name: 'Frete Rápido PR', falhas: 8 },
  { name: 'SulLog', falhas: 5 },
  { name: 'Transportes Modelo', falhas: 3 },
  { name: 'Rodobras', falhas: 2 },
  { name: 'Expresso Sul', falhas: 1 },
]

export default function Relatorios() {
  return (
    <div>
      <PageTitle
        title="Relatórios e indicadores"
        subtitle="SLA, tempo médio de entrega, falhas de rastreabilidade, terceiros e faturamento."
        breadcrumb={['Relatórios']}
        actions={
          <>
            <button className="btn-outline"><Filter size={14} /> Período: últimos 30 dias</button>
            <button className="btn-outline"><Download size={14} /> Exportar</button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-2">SLA por cliente</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={slaByClientData} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" />
                <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <YAxis dataKey="client" type="category" width={90} tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <Tooltip /><Bar dataKey="sla" fill="#356bb6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-2">No prazo x atrasada</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={slaByDayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <Tooltip /><Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="noPrazo" stackId="a" fill="#10b981" name="No prazo (%)" />
                <Bar dataKey="atrasada" stackId="a" fill="#ef4444" name="Atrasada (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-2">Tempo médio de entrega (horas)</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <LineChart data={tempoEntrega}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <Tooltip /><Line type="monotone" dataKey="tempo" stroke="#ff7d2e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-2">Distribuição por status</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusDistribution} dataKey="value" nameKey="name" outerRadius={80}>
                  {statusDistribution.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip /><Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-2">Volume por cidade/região</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={volumeCity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" />
                <XAxis dataKey="city" tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <Tooltip /><Bar dataKey="vol" fill="#1f365c" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-2">Falhas de rastreabilidade por terceiro</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={failureByThird} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" />
                <XAxis type="number" tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={120} tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <Tooltip /><Bar dataKey="falhas" fill="#ef4444" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-2">Fontes de rastreamento usadas</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={trackingSourcesUsage} dataKey="value" nameKey="source" outerRadius={80}>
                  {trackingSourcesUsage.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip /><Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-2">Motoristas com mais ocorrências</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={motoristasOcc}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceef2" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                <Tooltip /><Bar dataKey="oc" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
