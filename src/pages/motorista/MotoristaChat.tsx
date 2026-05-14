import { ArrowLeft, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../../components/mobile/MobileFrame'

const messages = [
  { from: 'ops', text: 'Bom dia, João. Tudo certo para iniciar a rota?', time: '07h12' },
  { from: 'me', text: 'Bom dia! Já estou no caminho da primeira parada.', time: '07h15' },
  { from: 'ops', text: 'Excelente. Atenção: cliente Mercado Exemplo confirmou recepção a partir das 14h.', time: '07h17' },
  { from: 'me', text: 'Anotado. Cheguei no destino 1.', time: '08h22' },
  { from: 'ops', text: 'Recebido. Pode descarregar.', time: '08h23' },
]

const quick = ['Estou parado', 'Cheguei ao cliente', 'Cliente fechado', 'Preciso de suporte', 'Entrega concluída']

export default function MotoristaChat() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-graphite-100 py-10">
      <MobileFrame label="App do Motorista — Chat">
        <div className="bg-graphite-50 min-h-full flex flex-col">
          <div className="bg-white px-4 py-3 flex items-center gap-2 border-b border-graphite-200">
            <button onClick={() => navigate('/motorista/inicio')} className="p-1.5"><ArrowLeft size={16} /></button>
            <div className="flex-1">
              <div className="font-semibold text-graphite-900">Operação Scapini</div>
              <div className="text-xs text-success-700">Online</div>
            </div>
          </div>
          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.from === 'me' ? 'bg-brand-700 text-white rounded-tr-sm' : 'bg-white text-graphite-900 shadow-card rounded-tl-sm'}`}>
                  <div>{m.text}</div>
                  <div className={`text-[10px] mt-1 ${m.from === 'me' ? 'text-brand-200' : 'text-graphite-500'}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white border-t border-graphite-200 p-2">
            <div className="flex flex-wrap gap-1 mb-2">
              {quick.map((q) => (
                <button key={q} className="text-[11px] px-2.5 py-1 rounded-full bg-graphite-100 text-graphite-700">{q}</button>
              ))}
            </div>
            <div className="flex gap-2">
              <input className="flex-1 rounded-lg bg-graphite-100 px-3 py-2 text-sm" placeholder="Digite sua mensagem..." />
              <button className="bg-brand-700 text-white rounded-lg px-3 py-2"><Send size={14} /></button>
            </div>
          </div>
        </div>
      </MobileFrame>
    </div>
  )
}
