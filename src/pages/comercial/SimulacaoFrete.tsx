import PageTitle from '../../components/layout/PageTitle'
import { Calculator, Sparkles, ArrowRight, Trophy, AlertTriangle, Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StatusBadge from '../../components/ui/StatusBadge'

interface RouteOption {
  id: string
  name: string
  durationHours: string
  arrival: string
  folga: string
  risco: 'baixo' | 'medio' | 'alto'
  cumprePrazo: boolean
  cost: number
  margin: number
  score: number
  recommended?: boolean
  notes: string
}

const routes: RouteOption[] = [
  { id: 'A', name: 'Rota A — BR-101 (rodovia litorânea)', durationHours: '22h40', arrival: '15/05 10h30', folga: '+1h30', risco: 'baixo', cumprePrazo: true, cost: 1842, margin: 22, score: 88, notes: 'Rota equilibrada, sem trechos críticos.' },
  { id: 'B', name: 'Rota B — BR-376/BR-101 (mais barata)', durationHours: '23h45', arrival: '15/05 12h45', folga: '-45min', risco: 'medio', cumprePrazo: false, cost: 1696, margin: 26, score: 62, notes: 'Mais barata em pedágios, mas estoura o SLA em 45 min.' },
  { id: 'C', name: 'Rota C — BR-116 (mais rápida)', durationHours: '20h50', arrival: '15/05 08h20', folga: '+3h40', risco: 'medio', cumprePrazo: true, cost: 2120, margin: 14, score: 72, notes: 'Chega adiantada mas custo de pedágio elevado.' },
  { id: 'D', name: 'Rota D — Mista BR-101 + BR-116 (recomendada)', durationHours: '22h10', arrival: '15/05 10h00', folga: '+2h00', risco: 'baixo', cumprePrazo: true, cost: 1696, margin: 18, score: 92, recommended: true, notes: 'Mantém margem de 18,4%, chega com folga de 1h20 ao SLA, reduz R$ 146 em pedágios.' },
]

export default function SimulacaoFrete() {
  const navigate = useNavigate()
  return (
    <div className="max-w-6xl">
      <PageTitle title="Simulação de frete" subtitle="Calcule o frete, compare rotas considerando custo e prazo, e gere um pedido de coleta." breadcrumb={['Comercial', 'Simulação de frete']} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 lg:col-span-2">
          <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Calculator size={14} /> Dados</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className="label">Cliente</label><select className="input"><option>Mercado Exemplo Ltda.</option><option>Distribuidora Sul Brasil</option><option>FarmaLog Distribuição</option></select></div>
            <div><label className="label">Tipo de carga</label><select className="input"><option>Geral</option><option>Refrigerado</option><option>Medicamentos</option></select></div>
            <div><label className="label">Origem</label><input className="input" defaultValue="São Paulo/SP" /></div>
            <div><label className="label">Destino</label><input className="input" defaultValue="Porto Alegre/RS" /></div>
            <div><label className="label">Peso (kg)</label><input className="input" defaultValue="1250" /></div>
            <div><label className="label">Volume (m³)</label><input className="input" defaultValue="3,4" /></div>
            <div><label className="label">Valor da mercadoria</label><input className="input" defaultValue="84500" /></div>
            <div><label className="label">Prazo desejado (SLA)</label><select className="input"><option>48h corridas (15/05 até 12h00)</option><option>72h corridas</option><option>Expresso 24h</option></select></div>
          </div>
          <button className="btn-primary mt-4"><Calculator size={14} /> Calcular e comparar rotas</button>
        </div>

        <div className="space-y-4">
          <div className="card-elevated p-5 bg-gradient-to-br from-brand-50 to-white">
            <div className="text-xs text-brand-700 font-semibold uppercase tracking-wide">Resultado base (Rota D)</div>
            <div className="text-3xl font-bold text-graphite-900 mt-1">R$ 1.696,00</div>
            <div className="text-xs text-graphite-500">Duração estimada: 22h10 · margem 18,4%</div>
            <button onClick={() => navigate('/operacao/coletas/nova')} className="btn-accent w-full mt-4">
              Gerar pedido de coleta <ArrowRight size={14} />
            </button>
          </div>
          <div className="card p-4 bg-graphite-100/50">
            <div className="text-xs uppercase tracking-wide text-graphite-500 mb-1 flex items-center gap-1"><Sparkles size={11} /> Sugestão da IA</div>
            <p className="text-xs text-graphite-700">A Rota D é recomendada porque mantém margem de 18,4%, chega dentro do prazo com folga de 1h20 e reduz R$ 146 em pedágios. A rota mais barata foi descartada porque chegaria 45 min após o SLA.</p>
          </div>
        </div>
      </div>

      {/* Comparativo de rotas */}
      <div className="mt-5">
        <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Trophy size={14} className="text-accent-600" /> Comparativo de rotas — custo + prazo</div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr>
              <th>Rota</th>
              <th>Duração</th>
              <th>Chegada prevista</th>
              <th>Folga no prazo</th>
              <th>Risco</th>
              <th>Cumpre prazo?</th>
              <th>Custo total</th>
              <th>Margem</th>
              <th>Score</th>
              <th></th>
            </tr></thead>
            <tbody>
              {routes.map((r) => (
                <tr key={r.id} className={r.recommended ? 'bg-success-50/40' : ''}>
                  <td>
                    <div className="font-semibold text-graphite-900 flex items-center gap-2">
                      {r.name}
                      {r.recommended && <span className="chip bg-success-100 text-success-700"><Award size={11} /> Recomendada</span>}
                    </div>
                    <div className="text-[11px] text-graphite-500 mt-0.5">{r.notes}</div>
                  </td>
                  <td className="font-medium">{r.durationHours}</td>
                  <td className="text-xs">{r.arrival}</td>
                  <td className={`text-xs font-medium ${r.folga.startsWith('-') ? 'text-danger-700' : 'text-success-700'}`}>{r.folga}</td>
                  <td><StatusBadge status={r.risco === 'baixo' ? 'baixo' : r.risco === 'medio' ? 'media' : 'alto'} /></td>
                  <td>{r.cumprePrazo ? <span className="text-success-700 font-medium text-xs">Sim</span> : <span className="text-danger-700 font-medium text-xs flex items-center gap-1"><AlertTriangle size={11} />Não</span>}</td>
                  <td className="font-semibold">R$ {r.cost.toLocaleString('pt-BR')},00</td>
                  <td>{r.margin}%</td>
                  <td><span className={`font-bold ${r.score >= 85 ? 'text-success-700' : r.score >= 65 ? 'text-warning-700' : 'text-danger-700'}`}>{r.score}</span></td>
                  <td><button className="btn-ghost text-xs">Aplicar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-4 mt-4 bg-brand-50 border-brand-100">
        <div className="text-sm text-brand-900">
          <strong>Regra:</strong> a melhor rota não é necessariamente a mais barata. O score considera custo, prazo, margem, risco, pedágios, combustível e SLA prometido. Rotas que estouram o SLA são automaticamente descartadas para clientes críticos.
        </div>
      </div>
    </div>
  )
}
