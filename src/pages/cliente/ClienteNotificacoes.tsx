import ClientShell from '../../components/layout/ClientShell'
import { Bell, Mail, MessageSquare, Webhook, CheckCircle2 } from 'lucide-react'

const items = [
  { title: 'Entrega coletada', desc: 'NF 123456 foi coletada em São Paulo/SP.', time: 'há 2h' },
  { title: 'Saiu para entrega', desc: 'NF 123457 está em rota final em Florianópolis/SC.', time: 'há 25 min' },
  { title: 'ETA atualizado', desc: 'NF 123456 — nova previsão: amanhã 09h–11h30.', time: 'há 12 min' },
  { title: 'Ocorrência registrada', desc: 'Cliente ausente — reentrega amanhã 09h00.', time: 'ontem' },
  { title: 'Entrega concluída', desc: 'NF 987654 entregue para Eduardo Reis às 22h15.', time: 'ontem' },
]

export default function ClienteNotificacoes() {
  return (
    <ClientShell>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-4 lg:col-span-2">
          <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Bell size={14} /> Notificações recentes</div>
          <ul className="divide-y divide-graphite-100">
            {items.map((i, ix) => (
              <li key={ix} className="py-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-success-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-graphite-900">{i.title}</div>
                    <div className="text-xs text-graphite-500">{i.desc}</div>
                  </div>
                </div>
                <div className="text-xs text-graphite-400 whitespace-nowrap">{i.time}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-3">Preferências</div>
          <ul className="space-y-3">
            {[
              { Icon: MessageSquare, label: 'WhatsApp', on: true },
              { Icon: Mail, label: 'E-mail', on: true },
              { Icon: Bell, label: 'SMS', on: false },
              { Icon: Webhook, label: 'Webhook (API)', on: true },
            ].map((p, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm"><p.Icon size={14} className="text-brand-700" />{p.label}</span>
                <label className="relative inline-block w-10 h-5">
                  <input type="checkbox" defaultChecked={p.on} className="peer sr-only" />
                  <span className="block w-10 h-5 rounded-full bg-graphite-200 peer-checked:bg-brand-600 transition-colors"></span>
                  <span className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow peer-checked:translate-x-5 transition-transform"></span>
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-xs text-graphite-500">As alterações são aplicadas imediatamente.</div>
        </div>
      </div>
    </ClientShell>
  )
}
