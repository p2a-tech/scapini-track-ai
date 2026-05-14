import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, CheckCircle2, MessageSquare, Download } from 'lucide-react'
import ClientShell from '../../components/layout/ClientShell'
import Timeline from '../../components/ui/Timeline'
import StatusBadge from '../../components/ui/StatusBadge'
import { deliveries } from '../../data/mockData'

export default function ClienteEntregaDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const d = deliveries.find((x) => x.id === id) || deliveries[0]
  return (
    <ClientShell>
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-graphite-500 hover:text-graphite-900 mb-3"><ArrowLeft size={14} /> Voltar</button>

      <div className="card-elevated p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs text-graphite-500">Código de rastreio</div>
            <div className="text-xl font-bold text-graphite-900">{d.trackingCode}</div>
            <div className="text-sm text-graphite-500">NF {d.nf} · Pedido SCP-26-{d.nf.slice(-3)}</div>
          </div>
          <StatusBadge status={d.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 text-sm">
          <div><div className="text-xs text-graphite-500">Origem</div><div className="font-medium">{d.origin}</div></div>
          <div><div className="text-xs text-graphite-500">Destino</div><div className="font-medium">{d.destination}</div></div>
          <div><div className="text-xs text-graphite-500">Previsão de chegada</div><div className="font-medium text-brand-700">{d.etaAi}</div></div>
        </div>

        <div className="mt-5 bg-brand-50 border border-brand-100 rounded-lg p-4 text-brand-900">
          <div className="font-semibold">Sua entrega está em transferência entre filiais.</div>
          <p className="text-sm mt-1">Saiu de {d.origin} e está a caminho do próximo CD. Última atualização: {d.lastUpdate}.</p>
        </div>

        <div className="mt-5">
          <div className="font-semibold text-graphite-900 mb-2">Linha do tempo</div>
          <Timeline
            steps={[
              { id: '1', title: 'Pedido recebido', state: 'done', time: '08/05 14h12' },
              { id: '2', title: 'Coletada', state: 'done', time: '09/05 09h22' },
              { id: '3', title: 'Em transferência', state: 'done', time: '09/05 10h00' },
              { id: '4', title: 'Chegou na filial Curitiba/PR', state: 'done', time: '09/05 17h45' },
              { id: '5', title: d.status, state: 'current', time: d.lastUpdate },
              { id: '6', title: 'Saiu para entrega', state: 'pending' },
              { id: '7', title: 'Entregue', state: 'pending' },
            ]}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button className="btn-primary"><Bell size={14} /> Receber atualizações no WhatsApp</button>
          <button className="btn-outline"><MessageSquare size={14} /> Falar com assistente</button>
          {d.status === 'Entregue' && <button className="btn-outline"><Download size={14} /> Baixar comprovante</button>}
          <button className="btn-outline" disabled><CheckCircle2 size={14} /> Comprovante (disponível após entrega)</button>
        </div>
      </div>
    </ClientShell>
  )
}
