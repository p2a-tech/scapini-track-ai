import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Phone, IdCard, Truck } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import StatusBadge from '../../components/ui/StatusBadge'
import { drivers } from '../../data/mockData'

export default function MotoristaDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const d = drivers.find((x) => x.id === id) || drivers[0]
  return (
    <div>
      <PageTitle
        title={d.name}
        subtitle="Motorista Scapini"
        breadcrumb={['Cadastros', 'Motoristas', d.name]}
        actions={<button onClick={() => navigate(-1)} className="btn-outline"><ArrowLeft size={14} /> Voltar</button>}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-navy-700 text-white text-xl font-bold flex items-center justify-center">
              {d.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="text-xl font-bold text-graphite-900">{d.name}</div>
              <div className="text-xs text-graphite-500 flex items-center gap-1"><IdCard size={11} /> CPF {d.cpf} · CNH {d.cnh}</div>
              <div className="text-xs text-graphite-500 flex items-center gap-1 mt-0.5"><Phone size={11} /> {d.phone}</div>
            </div>
            <div className="ml-auto flex flex-col items-end gap-2">
              <StatusBadge status={d.status} />
              <span className="inline-flex items-center gap-1 text-sm font-semibold"><Star size={14} className="text-warning-500" />{d.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-sm border-t border-graphite-100 pt-4">
            <div><div className="text-xs text-graphite-500">Veículo atual</div><div className="font-medium flex items-center gap-1"><Truck size={12} />{d.currentVehicle || '—'}</div></div>
            <div><div className="text-xs text-graphite-500">Jornada</div><div className="font-medium">{d.jornada}</div></div>
            <div><div className="text-xs text-graphite-500">Ocorrências</div><div className="font-medium">{d.ocorrencias}</div></div>
          </div>
        </div>

        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-2">Histórico recente</div>
          <ul className="space-y-2 text-sm">
            <li className="border-b border-graphite-100 pb-2">Hoje · Em rota OT-2026-1001</li>
            <li className="border-b border-graphite-100 pb-2">Ontem · 6 entregas concluídas</li>
            <li className="border-b border-graphite-100 pb-2">Semana · 18 entregas no prazo</li>
            <li>Mês · SLA pessoal 97%</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
