import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Truck, MapPin, FileText, Edit, Sparkles, Bell, MessageSquare, CheckCircle2,
  Receipt, AlertTriangle, RotateCw, Building2,
} from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import StatusBadge from '../../components/ui/StatusBadge'
import RiskBadge from '../../components/ui/RiskBadge'
import TrackingSourceBadge from '../../components/ui/TrackingSourceBadge'
import TrackingScore from '../../components/ui/TrackingScore'
import Timeline from '../../components/ui/Timeline'
import LogisticLegTimeline from '../../components/ui/LogisticLegTimeline'
import RealMap from '../../components/ui/RealMap'
import { orders } from '../../data/mockData'
import { coordsFor } from '../../data/coords'

export default function OrdemDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const order = orders.find((o) => o.id === id) || orders[0]

  return (
    <div>
      <PageTitle
        title={`Ordem ${order.number}`}
        subtitle={`${order.client} · ${order.origin} → ${order.destination}`}
        breadcrumb={['Operação', 'Ordens de transporte', order.number]}
        actions={
          <>
            <button className="btn-outline"><Edit size={14} /> Editar</button>
            <button className="btn-outline"><MapPin size={14} /> Programar rota</button>
            <button className="btn-outline"><FileText size={14} /> Emitir CT-e</button>
            <button className="btn-outline"><Receipt size={14} /> Gerar MDF-e</button>
            <button className="btn-outline"><AlertTriangle size={14} /> Registrar ocorrência</button>
            <button className="btn-outline"><Bell size={14} /> Enviar atualização ao cliente</button>
            <button className="btn-outline"><RotateCw size={14} /> Recalcular ETA</button>
            <button className="btn-primary"><CheckCircle2 size={14} /> Finalizar entrega</button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <div className="card p-4 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <StatusBadge status={order.status} />
              <RiskBadge level={order.riskAi} />
              <TrackingSourceBadge source={order.trackingSource} />
            </div>
            <TrackingScore score={order.trackingScore} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
            <div><div className="text-xs text-graphite-500">Saída prevista</div><div className="font-medium">{order.expectedDeparture}</div></div>
            <div><div className="text-xs text-graphite-500">Entrega prevista</div><div className="font-medium">{order.expectedArrival}</div></div>
            <div><div className="text-xs text-graphite-500">ETA da IA</div><div className="font-medium text-brand-700">{order.etaAi}</div></div>
            <div><div className="text-xs text-graphite-500">Última atualização</div><div className="font-medium">{order.lastUpdate}</div></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-sm border-t border-graphite-100 pt-4">
            <div><div className="text-xs text-graphite-500">Remetente</div><div className="font-medium">{order.remetente}</div></div>
            <div><div className="text-xs text-graphite-500">Destinatário</div><div className="font-medium">{order.destinatario}</div></div>
            <div><div className="text-xs text-graphite-500">Valor da mercadoria</div><div className="font-medium">{order.value}</div></div>
            <div><div className="text-xs text-graphite-500">Peso</div><div className="font-medium">{order.weight}</div></div>
            <div><div className="text-xs text-graphite-500">Volume</div><div className="font-medium">{order.volume}</div></div>
            <div><div className="text-xs text-graphite-500">Ocorrências</div><div className="font-medium">{order.ocorrencias === 0 ? 'Nenhuma' : `${order.ocorrencias} aberta(s)`}</div></div>
          </div>

          <div className="mt-4 border-t border-graphite-100 pt-4">
            <div className="font-semibold text-graphite-900 mb-2">Rota — OpenStreetMap</div>
            {(() => {
              const a = coordsFor(order.origin) || [-23.5505, -46.6333]
              const cwb = coordsFor('Curitiba/PR')!
              const fln = coordsFor('Florianópolis/SC')!
              const d = coordsFor(order.destination) || [-30.0346, -51.2177]
              return (
                <RealMap
                  height={300}
                  showLegend={false}
                  markers={[
                    { id: 'o', position: a, label: order.origin, status: 'cd' },
                    { id: 'cwb', position: cwb, label: 'Filial Curitiba', status: 'evento' },
                    { id: 'fln', position: fln, label: 'Florianópolis', status: 'normal', detail: 'Em trânsito' },
                    { id: 'd', position: d, label: order.destination, status: 'cliente' },
                  ]}
                  routes={[
                    { id: 'r', positions: [a, cwb, fln, d], color: '#1f365c', weight: 3, dashArray: '6 6' },
                  ]}
                />
              )
            })()}
          </div>
        </div>

        <div className="card p-4">
          <div className="text-xs text-graphite-500 uppercase tracking-wide mb-2">Documentos fiscais</div>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>NF-e</span><span className="font-medium">{order.nf}</span></li>
            <li className="flex justify-between"><span>CT-e</span><span className="font-medium">{order.cte}</span></li>
            <li className="flex justify-between"><span>MDF-e</span><span className="font-medium">{order.mdfe}</span></li>
          </ul>
          <button className="btn-outline w-full mt-3"><FileText size={14} /> Ver documentos</button>

          <div className="border-t border-graphite-100 mt-4 pt-4">
            <div className="text-xs text-graphite-500 uppercase tracking-wide mb-2">Veículo & motorista</div>
            <div className="text-sm space-y-1">
              <div className="flex items-start gap-2"><Truck size={14} className="mt-0.5 text-brand-700" /><div>{order.vehicle}</div></div>
              <div className="text-graphite-500">{order.driver}</div>
            </div>
          </div>

          <div className="border-t border-graphite-100 mt-4 pt-4">
            <div className="text-xs text-graphite-500 uppercase tracking-wide mb-2 flex items-center gap-1"><Sparkles size={12} /> Explicação da IA</div>
            <p className="text-sm text-graphite-700">
              A previsão de chegada é {order.etaAi}, com risco {order.riskAi} de atraso. Confiança 78% — baseada em histórico
              do terceiro, tráfego nas BR-376/101 e janela de carregamento em Florianópolis.
            </p>
            <button className="btn-ghost mt-2 w-full text-brand-700"><MessageSquare size={14} /> Abrir conversa com IA</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-graphite-900 flex items-center gap-2"><Building2 size={16} className="text-brand-700" /> Etapas logísticas</div>
            <Link to={`/operacao/ordens/${order.id}/etapas`} className="text-sm text-brand-700 hover:underline">Ver detalhes das etapas</Link>
          </div>
          {order.legs.length > 0 ? (
            <LogisticLegTimeline legs={order.legs} />
          ) : (
            <div className="text-sm text-graphite-500 py-6 text-center">Ordem com perna única (sem transbordo).</div>
          )}
        </div>

        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-3">Timeline operacional</div>
          <Timeline
            steps={[
              { id: 't1', title: 'Pedido de coleta criado', time: '08/05 14h12', state: 'done', description: 'PC-2026-2001 — solicitado por Cláudia Tavares' },
              { id: 't2', title: 'Coleta realizada', time: '09/05 09h22', state: 'done', description: 'Coletado em Distribuidora Exemplo SP' },
              { id: 't3', title: 'NF-e e CT-e emitidos', time: '09/05 09h45', state: 'done' },
              { id: 't4', title: 'Em trânsito GRU → CWB', time: '09/05 10h00', state: 'done' },
              { id: 't5', title: 'Chegada filial Curitiba', time: '09/05 17h45', state: 'done' },
              { id: 't6', title: 'Em trânsito CWB → FLN', time: '09/05 20h30', state: 'current', description: 'Saída registrada' },
              { id: 't7', title: 'Chegada Florianópolis', time: 'Prev. 02h00', state: 'pending' },
              { id: 't8', title: 'Transferência para CD POA', time: 'Prev. amanhã 06h00', state: 'pending' },
              { id: 't9', title: 'Saiu para entrega', state: 'pending' },
              { id: 't10', title: 'Entregue', state: 'pending' },
            ]}
          />
        </div>
      </div>

      <div className="mt-5 card p-4">
        <div className="font-semibold text-graphite-900 mb-3">Histórico de alterações</div>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-between text-graphite-700"><span>ETA recalculado pela IA (Curitiba → Florianópolis +12 min)</span><span className="text-xs text-graphite-500">há 8 min</span></li>
          <li className="flex items-center justify-between text-graphite-700"><span>Saída registrada de Curitiba (Filial)</span><span className="text-xs text-graphite-500">há 1 h</span></li>
          <li className="flex items-center justify-between text-graphite-700"><span>Conferência concluída em Curitiba — 28 volumes</span><span className="text-xs text-graphite-500">há 1 h 30 min</span></li>
          <li className="flex items-center justify-between text-graphite-700"><span>Chegada em Curitiba registrada</span><span className="text-xs text-graphite-500">há 3 h</span></li>
        </ul>
      </div>
    </div>
  )
}
