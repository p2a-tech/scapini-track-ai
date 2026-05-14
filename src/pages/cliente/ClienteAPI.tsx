import ClientShell from '../../components/layout/ClientShell'
import { Copy, Plus, Webhook, Code2 } from 'lucide-react'

const events = [
  { name: 'shipment.created', desc: 'Disparado quando a entrega é criada.' },
  { name: 'shipment.in_transit', desc: 'Quando a carga sai do CD de origem.' },
  { name: 'shipment.delayed', desc: 'Quando a IA detecta risco de atraso.' },
  { name: 'shipment.delivered', desc: 'Quando a entrega é confirmada.' },
  { name: 'shipment.exception', desc: 'Quando uma ocorrência é registrada.' },
]

const logs = [
  { time: '15h12', event: 'shipment.in_transit', status: '200 OK' },
  { time: '15h08', event: 'shipment.delayed', status: '200 OK' },
  { time: '14h55', event: 'shipment.created', status: '200 OK' },
  { time: '14h44', event: 'shipment.delivered', status: '500 Erro' },
  { time: '14h22', event: 'shipment.exception', status: '200 OK' },
]

export default function ClienteAPI() {
  return (
    <ClientShell>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-4 lg:col-span-2">
          <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Webhook size={14} /> Webhooks configurados</div>
          <ul className="space-y-2">
            <li className="border border-graphite-200 rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-graphite-900">https://api.mercadoexemplo.com.br/webhook/scapini</div>
                <div className="text-xs text-graphite-500">5 eventos · ativo</div>
              </div>
              <button className="btn-outline text-xs">Testar webhook</button>
            </li>
            <li className="border border-graphite-200 rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-graphite-900">https://erp-cliente.mercadoexemplo.com/api/v1/scapini</div>
                <div className="text-xs text-graphite-500">3 eventos · ativo</div>
              </div>
              <button className="btn-outline text-xs">Testar webhook</button>
            </li>
          </ul>
          <button className="btn-primary mt-3"><Plus size={14} /> Adicionar webhook</button>

          <div className="mt-5">
            <div className="font-semibold text-graphite-900 mb-2 flex items-center gap-2"><Code2 size={14} /> Eventos disponíveis</div>
            <ul className="space-y-1">
              {events.map((e) => (
                <li key={e.name} className="text-sm flex items-center justify-between gap-2 border border-graphite-100 rounded-lg p-2">
                  <code className="text-brand-700 text-xs">{e.name}</code>
                  <span className="text-xs text-graphite-500">{e.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <div className="font-semibold text-graphite-900 mb-2">Logs de chamadas</div>
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Horário</th><th>Evento</th><th>Status</th></tr></thead>
                <tbody>
                  {logs.map((l, i) => (
                    <tr key={i}><td>{l.time}</td><td><code className="text-xs">{l.event}</code></td><td>{l.status}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-3">Sua chave de API</div>
          <div className="rounded-lg bg-graphite-900 text-graphite-100 px-3 py-2 text-xs font-mono flex items-center justify-between gap-2">
            <span className="truncate">sk_scapini_2026_*****************a83f</span>
            <button className="text-graphite-300 hover:text-white"><Copy size={12} /></button>
          </div>
          <button className="btn-outline w-full mt-3">Gerar nova chave</button>
          <div className="text-xs text-graphite-500 mt-3">
            Use sua chave como header <code>Authorization: Bearer ...</code> nas requisições para
            <code className="ml-1">api.scapini.com.br/v1</code>.
          </div>
        </div>
      </div>
    </ClientShell>
  )
}
