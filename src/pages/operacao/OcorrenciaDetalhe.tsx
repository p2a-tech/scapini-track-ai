import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, CheckCircle2, Camera, MessageSquare } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import StatusBadge from '../../components/ui/StatusBadge'
import { occurrences } from '../../data/mockData'

export default function OcorrenciaDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const oc = occurrences.find((o) => o.id === id) || occurrences[0]
  return (
    <div>
      <PageTitle
        title={`Ocorrência — ${oc.type}`}
        subtitle={`${oc.client} · NF ${oc.nf} · ${oc.datetime}`}
        breadcrumb={['Operação', 'Ocorrências', oc.type]}
        actions={
          <>
            <button onClick={() => navigate(-1)} className="btn-outline"><ArrowLeft size={14} /> Voltar</button>
            <button className="btn-outline"><Bell size={14} /> Notificar cliente</button>
            <button className="btn-primary"><CheckCircle2 size={14} /> Encerrar ocorrência</button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-5">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <StatusBadge status={oc.status} />
              <StatusBadge status={oc.severity} />
            </div>
            <p className="text-sm text-graphite-700">{oc.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
              <div><div className="text-xs text-graphite-500">Motorista</div><div className="font-medium">{oc.driver}</div></div>
              <div><div className="text-xs text-graphite-500">Veículo</div><div className="font-medium">{oc.vehicle}</div></div>
              <div><div className="text-xs text-graphite-500">SLA resolução</div><div className="font-medium">8h restantes</div></div>
              <div><div className="text-xs text-graphite-500">Responsável</div><div className="font-medium">{oc.responsible}</div></div>
            </div>
          </div>

          <div className="card p-5">
            <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Camera size={14} /> Fotos anexadas ({oc.photos || 0})</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: oc.photos || 0 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg border-2 border-dashed border-graphite-200 bg-graphite-50 flex flex-col items-center justify-center text-graphite-400">
                  <Camera size={20} />
                  <span className="text-[10px] mt-1">Foto {i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><MessageSquare size={14} /> Comentários e histórico</div>
            <ul className="space-y-3">
              {oc.comments?.map((c, i) => (
                <li key={i} className="bg-graphite-50 rounded-lg p-3 text-sm">
                  <div className="flex items-center justify-between text-xs text-graphite-500 mb-1">
                    <span>{c.author}</span>
                    <span>{c.time}</span>
                  </div>
                  <div className="text-graphite-700">{c.text}</div>
                </li>
              )) || <li className="text-sm text-graphite-500">Nenhum comentário ainda.</li>}
            </ul>
            <div className="mt-3">
              <textarea className="input min-h-[80px]" placeholder="Adicionar observação interna..." />
              <div className="flex justify-end mt-2">
                <button className="btn-primary">Adicionar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <div className="text-xs text-graphite-500 uppercase tracking-wide mb-2">Tratativa</div>
            <select className="input mb-2"><option>Em tratamento</option><option>Aguardando cliente</option><option>Aguardando motorista</option><option>Resolvida</option></select>
            <button className="btn-primary w-full">Atualizar status</button>
          </div>
          <div className="card p-5">
            <div className="text-xs text-graphite-500 uppercase tracking-wide mb-2">Notificação ao cliente</div>
            <select className="input mb-2"><option>Modelo: cliente ausente</option><option>Modelo: reentrega agendada</option><option>Modelo: avaria parcial</option></select>
            <button className="btn-outline w-full"><Bell size={14} /> Enviar via WhatsApp</button>
          </div>
        </div>
      </div>
    </div>
  )
}
