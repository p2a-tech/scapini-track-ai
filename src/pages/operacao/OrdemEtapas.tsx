import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import LogisticLegTimeline from '../../components/ui/LogisticLegTimeline'
import { orders } from '../../data/mockData'

export default function OrdemEtapas() {
  const { id } = useParams()
  const navigate = useNavigate()
  const order = orders.find((o) => o.id === id) || orders[0]
  return (
    <div>
      <PageTitle
        title={`Etapas logísticas — ${order.number}`}
        subtitle={`${order.client} · ${order.origin} → ${order.destination}`}
        breadcrumb={['Operação', 'Ordens', order.number, 'Etapas']}
        actions={<button onClick={() => navigate(-1)} className="btn-outline"><ArrowLeft size={14} /> Voltar</button>}
      />
      {order.legs.length > 0 ? (
        <LogisticLegTimeline legs={order.legs} />
      ) : (
        <div className="card p-8 text-center text-graphite-500">Ordem com perna única — sem transbordos.</div>
      )}
    </div>
  )
}
