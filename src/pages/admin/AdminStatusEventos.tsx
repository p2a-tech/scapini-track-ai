import PageTitle from '../../components/layout/PageTitle'
import StatusBadge from '../../components/ui/StatusBadge'
import { Edit2, Plus } from 'lucide-react'

const deliveryStatus = ['Aguardando coleta', 'Coletada', 'Em trânsito', 'Na filial', 'Saiu para entrega', 'Entregue', 'Atrasada', 'Ocorrência', 'Devolvida', 'Cancelada']
const collectStatus = ['Solicitado', 'Aguardando programação', 'Programado', 'Motorista a caminho', 'Coletado', 'Cancelado', 'Ocorrência']

const automacoes = [
  { evento: 'Saída do CD', regra: 'Geofence de saída CD Guarulhos', notifica: 'Cliente · WhatsApp' },
  { evento: 'Chegada na filial', regra: 'Geofence Filial Curitiba', notifica: 'Operação · in-app' },
  { evento: 'Saiu para entrega', regra: 'Início rota última milha', notifica: 'Cliente · WhatsApp + Webhook' },
  { evento: 'Entregue', regra: 'Confirmação no app do motorista', notifica: 'Cliente · WhatsApp + e-mail' },
  { evento: 'Perda de sinal', regra: 'Sem sinal por > 30 min', notifica: 'Operação · alerta IA' },
]

export default function AdminStatusEventos() {
  return (
    <div>
      <PageTitle title="Status e eventos" subtitle="Configure status, eventos, regras automáticas, geofences e disparos." breadcrumb={['Administração', 'Status e eventos']} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-3 flex items-center justify-between">
            Status da entrega <button className="btn-ghost"><Plus size={14} /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            {deliveryStatus.map((s) => <StatusBadge key={s} status={s} />)}
          </div>
        </div>
        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-3 flex items-center justify-between">
            Status da coleta <button className="btn-ghost"><Plus size={14} /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            {collectStatus.map((s) => <StatusBadge key={s} status={s} />)}
          </div>
        </div>
      </div>

      <div className="card p-4">
        <div className="font-semibold text-graphite-900 mb-3">Regras automáticas</div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Evento</th><th>Regra</th><th>Notifica</th><th></th></tr></thead>
            <tbody>
              {automacoes.map((a, i) => (
                <tr key={i}>
                  <td className="font-medium">{a.evento}</td>
                  <td className="text-xs">{a.regra}</td>
                  <td className="text-xs">{a.notifica}</td>
                  <td><button className="btn-ghost"><Edit2 size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
