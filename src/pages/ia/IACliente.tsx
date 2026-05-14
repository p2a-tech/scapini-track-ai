import { useState } from 'react'
import { Sparkles, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ChatPanel, { ChatMessage } from '../../components/ui/ChatPanel'

const initial: ChatMessage[] = [
  {
    id: '1',
    role: 'ai',
    text: 'Olá! Sou a assistente da Scapini. Como posso ajudar com sua entrega hoje?',
    meta: 'Resposta gerada com base em dados em tempo real · Confiança 100%',
  },
]

const suggestions = [
  'Onde está minha entrega?',
  'Qual a previsão de chegada?',
  'Houve atraso?',
  'Quero o comprovante',
  'Quero receber notificações',
]

export default function IACliente() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ChatMessage[]>(initial)

  function handleSend(text: string) {
    setMessages((m) => [...m, { id: String(Date.now()), role: 'user', text }])
    setTimeout(() => {
      const t = text.toLowerCase()
      let reply = ''
      if (t.includes('onde') || t.includes('rastre')) {
        reply = 'Encontrei sua entrega vinculada à NF 123456. Ela saiu de Curitiba/PR e está em transferência para Florianópolis/SC. A próxima atualização esperada é a chegada na filial de Florianópolis até 02h00. A previsão de entrega final é amanhã entre 09h00 e 12h00.'
      } else if (t.includes('previsão') || t.includes('eta') || t.includes('chegada')) {
        reply = 'A previsão atual é amanhã entre 09h00 e 12h00. Houve um pequeno desvio na rota (BR-376) que pode adiar em até 30 min. Vou te avisar quando houver mais informações.'
      } else if (t.includes('atraso')) {
        reply = 'Sua entrega está dentro do prazo, com risco baixo de atraso (8%). A última atualização foi há 12 minutos.'
      } else if (t.includes('comprovante')) {
        reply = 'O comprovante de entrega estará disponível assim que a entrega for finalizada. Você receberá uma notificação por WhatsApp com o link de download.'
      } else if (t.includes('notifica')) {
        reply = 'Você já está recebendo notificações por WhatsApp e e-mail. Quer também receber por SMS?'
      } else {
        reply = 'Não tenho dados suficientes para responder com precisão. Posso te conectar com a operação Scapini?'
      }
      setMessages((m) => [...m, { id: String(Date.now() + 1), role: 'ai', text: reply, meta: 'Última atualização: há 12 min · Não exponho localização exata por segurança.' }])
    }, 700)
  }

  return (
    <div className="min-h-screen bg-graphite-50">
      <header className="bg-white border-b border-graphite-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-navy-900 text-white flex items-center justify-center"><Truck size={18} /></div>
            <div className="text-left">
              <div className="font-bold text-graphite-900">Assistente IA — Cliente</div>
              <div className="text-xs text-graphite-500 flex items-center gap-1"><Sparkles size={11} className="text-accent-600" />Scapini Track AI</div>
            </div>
          </button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-5">
        <ChatPanel messages={messages} suggestions={suggestions} onSend={handleSend} placeholder="Digite sua dúvida (ex: 'Onde está minha entrega?')" />
        <div className="text-xs text-graphite-500 mt-3 text-center max-w-xl mx-auto">
          A IA Scapini nunca inventa dados. Sempre mostra a última atualização conhecida. Para sua segurança, não expomos localização exata.
        </div>
      </main>
    </div>
  )
}
