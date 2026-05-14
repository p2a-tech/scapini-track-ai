import { useParams, useNavigate } from 'react-router-dom'
import {
  Bell, RotateCw, MessageSquare, AlertTriangle, FileText, ArrowLeft, Edit, Truck, MapPin,
} from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import StatusBadge from '../../components/ui/StatusBadge'
import RiskBadge from '../../components/ui/RiskBadge'
import TrackingSourceBadge from '../../components/ui/TrackingSourceBadge'
import TrackingScore from '../../components/ui/TrackingScore'
import Timeline from '../../components/ui/Timeline'
import RealMap from '../../components/ui/RealMap'
import LogisticLegTimeline from '../../components/ui/LogisticLegTimeline'
import { deliveries, orders } from '../../data/mockData'
import { coordsFor } from '../../data/coords'

export default function EntregaDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const d = deliveries.find((x) => x.id === id) || deliveries[0]
  const o = orders.find((x) => `del-${x.id}` === d.id)

  return (
    <div>
      <PageTitle
        title={`Entrega ${d.trackingCode}`}
        subtitle={`${d.client} · ${d.origin} → ${d.destination}`}
        breadcrumb={['Operação', 'Entregas', d.trackingCode]}
        actions={
          <>
            <button onClick={() => navigate(-1)} className="btn-outline"><ArrowLeft size={14} /> Voltar</button>
            <button className="btn-outline"><Edit size={14} /> Atualizar status</button>
            <button className="btn-outline"><AlertTriangle size={14} /> Registrar ocorrência</button>
            <button className="btn-outline"><Bell size={14} /> Mensagem ao cliente</button>
            <button className="btn-outline"><RotateCw size={14} /> Recalcular ETA</button>
            <button className="btn-primary"><MessageSquare size={14} /> Falar com IA</button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={d.status} />
                <RiskBadge level={d.riskAi} />
                <TrackingSourceBadge source={d.trackingSource} />
              </div>
              <TrackingScore score={d.trackingScore} />
            </div>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div><div className="text-xs text-graphite-500">NF</div><div className="font-medium">{d.nf}</div></div>
              <div><div className="text-xs text-graphite-500">CT-e</div><div className="font-medium">{d.cte}</div></div>
              <div><div className="text-xs text-graphite-500">ETA da IA</div><div className="font-medium text-brand-700">{d.etaAi}</div></div>
              <div><div className="text-xs text-graphite-500">Prob. de atraso</div><div className="font-medium">{d.delayProb}%</div></div>
            </div>
          </div>

          <div className="card p-4">
            <div className="font-semibold text-graphite-900 mb-3">Rota — OpenStreetMap</div>
            {(() => {
              const o = coordsFor(d.origin) || [-23.5505, -46.6333]
              const cwb = coordsFor('Curitiba/PR')!
              const fln = coordsFor('Florianópolis/SC')!
              const dest = coordsFor(d.destination) || [-30.0346, -51.2177]
              return (
                <RealMap
                  height={300}
                  showLegend={false}
                  markers={[
                    { id: 'o', position: o, label: d.origin, status: 'cd' },
                    { id: 'c', position: cwb, label: 'Filial Curitiba/PR', status: 'evento' },
                    { id: 'f', position: fln, label: 'Florianópolis/SC', status: 'normal' },
                    { id: 'dst', position: dest, label: d.destination, status: 'cliente' },
                  ]}
                  routes={[{ id: 'r', positions: [o, cwb, fln, dest], color: '#1f365c', weight: 3, dashArray: '6 6' }]}
                />
              )
            })()}
          </div>

          {o && o.legs.length > 0 && (
            <div className="card p-4">
              <div className="font-semibold text-graphite-900 mb-3">Etapas logísticas</div>
              <LogisticLegTimeline legs={o.legs} />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <div className="font-semibold text-graphite-900 mb-2 flex items-center gap-2"><Truck size={14} /> Transporte</div>
            <div className="text-sm space-y-1">
              <div className="text-graphite-700">{d.vehicle}</div>
              <div className="text-graphite-500">{d.driver}</div>
            </div>
          </div>
          <div className="card p-4">
            <div className="font-semibold text-graphite-900 mb-2">Documentos</div>
            <button className="btn-outline w-full mb-2"><FileText size={14} /> Ver CT-e</button>
            <button className="btn-outline w-full mb-2"><FileText size={14} /> Ver MDF-e</button>
            <button className="btn-outline w-full"><FileText size={14} /> Ver comprovante</button>
          </div>

          <div className="card p-4">
            <div className="font-semibold text-graphite-900 mb-3">Timeline</div>
            <Timeline
              compact
              steps={[
                { id: '1', title: 'Pedido criado', time: '08/05', state: 'done' },
                { id: '2', title: 'Coleta realizada', time: '09/05 09h22', state: 'done' },
                { id: '3', title: 'Em trânsito', time: '09/05 10h00', state: 'done' },
                { id: '4', title: 'Na filial Curitiba', time: '09/05 17h45', state: 'done' },
                { id: '5', title: d.status, time: d.lastUpdate, state: 'current' },
                { id: '6', title: 'Saiu para entrega', state: 'pending' },
                { id: '7', title: 'Entregue', state: 'pending' },
              ]}
            />
          </div>

          <div className="card p-4 bg-brand-50">
            <div className="text-xs font-semibold text-brand-700 uppercase tracking-wide mb-1 flex items-center gap-1"><MapPin size={12} /> Cliente vê</div>
            <p className="text-sm text-brand-900">
              "Sua entrega saiu de Curitiba/PR e está em transferência para Florianópolis/SC. Próxima atualização esperada: hoje 02h00."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
