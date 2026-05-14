import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Truck, Wrench, FileText, MapPin } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import StatusBadge from '../../components/ui/StatusBadge'
import { vehicles } from '../../data/mockData'

export default function VeiculoDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const v = vehicles.find((x) => x.id === id) || vehicles[0]
  return (
    <div>
      <PageTitle
        title={`Veículo ${v.plate}`}
        subtitle={v.type}
        breadcrumb={['Cadastros', 'Veículos', v.plate]}
        actions={<button onClick={() => navigate(-1)} className="btn-outline"><ArrowLeft size={14} /> Voltar</button>}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center"><Truck size={28} /></div>
            <div>
              <div className="text-xl font-bold text-graphite-900">{v.plate}</div>
              <div className="text-xs text-graphite-500">{v.type} · {v.capacity}</div>
            </div>
            <div className="ml-auto"><StatusBadge status={v.status} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm border-t border-graphite-100 pt-4">
            <div><div className="text-xs text-graphite-500">Capacidade total</div><div className="font-medium">{v.capacity}</div></div>
            <div><div className="text-xs text-graphite-500">Rastreador</div><div className="font-medium">{v.tracker}</div></div>
            <div><div className="text-xs text-graphite-500">Motorista atual</div><div className="font-medium">{v.driver || '—'}</div></div>
            <div><div className="text-xs text-graphite-500">Documentos</div><div className="font-medium">{v.documents}</div></div>
            <div><div className="text-xs text-graphite-500">Manutenção</div><div className="font-medium flex items-center gap-1"><Wrench size={12} />{v.manutencao}</div></div>
            <div><div className="text-xs text-graphite-500">Última localização</div><div className="font-medium flex items-center gap-1"><MapPin size={12} />Lapa/PR — BR-376</div></div>
          </div>
        </div>
        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-2 flex items-center gap-2"><FileText size={14} /> Histórico</div>
          <ul className="text-sm space-y-2">
            <li className="border-b border-graphite-100 pb-2">
              <div className="text-xs text-graphite-500">Hoje</div>
              <div>Iniciou rota OT-2026-1001</div>
            </li>
            <li className="border-b border-graphite-100 pb-2">
              <div className="text-xs text-graphite-500">Ontem</div>
              <div>Manutenção preventiva concluída — troca de óleo</div>
            </li>
            <li>
              <div className="text-xs text-graphite-500">Há 3 dias</div>
              <div>Atribuído a João Pereira</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
