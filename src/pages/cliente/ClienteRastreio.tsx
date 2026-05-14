import { useState } from 'react'
import { Search, Truck, MapPin, CheckCircle2, Bell, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Timeline from '../../components/ui/Timeline'
import StatusBadge from '../../components/ui/StatusBadge'

export default function ClienteRastreio() {
  const [code, setCode] = useState('SCP-2026-0001')
  const [found, setFound] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-graphite-50">
      <header className="bg-white border-b border-graphite-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-navy-900 text-white flex items-center justify-center"><Truck size={18} /></div>
          <div>
            <div className="font-bold text-graphite-900">Scapini Track AI</div>
            <div className="text-xs text-graphite-500">Portal do Cliente</div>
          </div>
        </div>
        <button onClick={() => navigate('/cliente/login')} className="btn-outline">Entrar</button>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-graphite-900">Rastrear sua entrega</h1>
        <p className="text-graphite-500 mt-1">Informe o código de rastreio, NF ou número de pedido.</p>

        <div className="mt-6 card p-4 flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400" />
            <input value={code} onChange={(e) => setCode(e.target.value)} className="input pl-9" placeholder="SCP-2026-0001, NF 123456..." />
          </div>
          <button onClick={() => setFound(true)} className="btn-primary">Rastrear</button>
        </div>

        {found && (
          <div className="mt-6 card-elevated p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs text-graphite-500">Código de rastreio</div>
                <div className="text-xl font-bold text-graphite-900">{code}</div>
              </div>
              <StatusBadge status="Em trânsito" />
            </div>

            <div className="mt-6 bg-brand-50 border border-brand-100 rounded-xl p-4 flex items-start gap-3">
              <MapPin size={20} className="text-brand-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-brand-900">Sua entrega saiu de Curitiba/PR e está em transferência para Florianópolis/SC.</div>
                <div className="text-sm text-brand-700 mt-1">Próxima atualização esperada: hoje 02h00. Previsão de entrega: amanhã entre 09h00 e 12h00.</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="font-semibold text-graphite-900 mb-2 flex items-center gap-2"><Clock size={14} /> Linha do tempo</div>
              <Timeline
                steps={[
                  { id: '1', title: 'Pedido recebido', time: '08/05 14h12', state: 'done' },
                  { id: '2', title: 'Coletado', description: 'Coletado em São Paulo/SP', time: '09/05 09h22', state: 'done' },
                  { id: '3', title: 'Em transferência', description: 'Saiu de Guarulhos/SP', time: '09/05 10h00', state: 'done' },
                  { id: '4', title: 'Chegou na filial Curitiba/PR', time: '09/05 17h45', state: 'done' },
                  { id: '5', title: 'Em transferência', description: 'Saiu de Curitiba/PR', time: '09/05 20h30', state: 'current' },
                  { id: '6', title: 'Chegará na filial Florianópolis/SC', time: 'Previsto 02h00', state: 'pending' },
                  { id: '7', title: 'Saiu para entrega', state: 'pending' },
                  { id: '8', title: 'Entregue', state: 'pending' },
                ]}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button className="btn-primary"><Bell size={14} /> Receber atualizações por WhatsApp</button>
              <button className="btn-outline"><CheckCircle2 size={14} /> Ver comprovante (quando disponível)</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
