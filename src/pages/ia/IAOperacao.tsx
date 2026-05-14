import { useState } from 'react'
import PageTitle from '../../components/layout/PageTitle'
import ChatPanel, { ChatMessage } from '../../components/ui/ChatPanel'
import { Sparkles, Truck, AlertTriangle, Bell, ChevronRight, Cpu } from 'lucide-react'

const initial: ChatMessage[] = [
  {
    id: '1',
    role: 'ai',
    text: 'Bom dia, Marina. Quer começar com um resumo das entregas em risco hoje?',
    meta: 'Análise baseada em 68 entregas em andamento · Confiança 96%',
  },
]

const suggestions = [
  'Quais entregas têm risco de atraso hoje?',
  'Mostre caminhões parados há mais de 30 minutos',
  'Quais clientes precisam ser avisados?',
  'Por que a NF 123456 está com risco de atraso?',
  'Quais viagens de terceiros estão sem rastreamento?',
  'Quais cargas críticas estão sem device?',
]

export default function IAOperacao() {
  const [messages, setMessages] = useState<ChatMessage[]>(initial)

  function send(text: string) {
    setMessages((m) => [...m, { id: String(Date.now()), role: 'user', text }])
    setTimeout(() => {
      let reply: ChatMessage
      const t = text.toLowerCase()
      if (t.includes('risco')) {
        reply = {
          id: String(Date.now() + 1),
          role: 'ai',
          text: (
            <div className="space-y-2">
              <p>Identifiquei <strong>3 entregas com risco de atraso superior a 30%</strong>:</p>
              <ul className="list-disc ml-4">
                <li><strong>OT-2026-1003</strong> (FarmaLog) — 72% · terceiro sem sinal há 42 min.</li>
                <li><strong>OT-2026-1007</strong> (Auto Peças Continental) — 38% · device DEV-1043 ok.</li>
                <li><strong>OT-2026-1008</strong> (ConstruMais) — 90% · bloqueada por falta de rastreio.</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-3">
                <button className="btn-primary text-xs"><ChevronRight size={12} /> Abrir OT-2026-1003</button>
                <button className="btn-outline text-xs"><Bell size={12} /> Notificar clientes</button>
                <button className="btn-outline text-xs"><Cpu size={12} /> Vincular devices</button>
              </div>
            </div>
          ),
          meta: 'Cálculo via histórico de terceiros, trânsito BR-101/376 e desvios. Confiança 94%.',
        }
      } else if (t.includes('parado')) {
        reply = {
          id: String(Date.now() + 1),
          role: 'ai',
          text: (
            <div>
              <p>2 veículos estão parados há mais de 30 min:</p>
              <ul className="list-disc ml-4 mt-1">
                <li><strong>TRC-9X88</strong> (Frete Rápido PR) — Cascavel/PR · 1h12 sem sinal.</li>
                <li><strong>SCA-4D89</strong> (Marcos Oliveira) — Filial Curitiba · aguardando MDF-e.</li>
              </ul>
            </div>
          ),
          meta: 'Análise com base em GPS próprio + APIs ativas.',
        }
      } else if (t.includes('cliente')) {
        reply = {
          id: String(Date.now() + 1),
          role: 'ai',
          text: '3 clientes têm entregas com risco > 30% e devem ser notificados proativamente: FarmaLog Distribuição, Auto Peças Continental e ConstruMais Atacado. Posso disparar templates de WhatsApp em lote.',
        }
      } else if (t.includes('123456')) {
        reply = {
          id: String(Date.now() + 1),
          role: 'ai',
          text: 'A OT-2026-1001 (NF 123456) tem risco médio porque a perna 1 está com terceiro (Transportes Modelo) — histórico mostra 21% de atraso em transferências noturnas. O GPS via API está ok e o device DEV-1042 está com bateria em 12%. Recomendo programar troca de device na Filial Curitiba.',
          meta: 'Confiança 86%. Sugestão IA: trocar device.',
        }
      } else if (t.includes('terceiro') && t.includes('sem')) {
        reply = {
          id: String(Date.now() + 1),
          role: 'ai',
          text: '2 viagens de terceiros estão sem rastreamento confiável: Frete Rápido PR (OT-2026-1003) e SulLog Agregados (OT-2026-1007 com device). Sugestão: bloquear Frete Rápido para cargas críticas e revisar política de aceite de link com SulLog.',
        }
      } else if (t.includes('device')) {
        reply = {
          id: String(Date.now() + 1),
          role: 'ai',
          text: 'Apenas 1 carga crítica está sem device: OT-2026-1008 (ConstruMais Itajaí → Floripa). Devices disponíveis: DEV-1044, DEV-1085. Posso vincular automaticamente?',
        }
      } else {
        reply = {
          id: String(Date.now() + 1),
          role: 'ai',
          text: 'Estou analisando sua pergunta. Pode reformular? Tenho dados de entregas, ordens, ocorrências, devices e terceiros.',
        }
      }
      setMessages((m) => [...m, reply])
    }, 700)
  }

  return (
    <div>
      <PageTitle
        title="Assistente IA — Operação"
        subtitle="Pergunte sobre entregas, riscos, terceiros, devices e clientes."
        breadcrumb={['IA', 'Operação']}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChatPanel messages={messages} suggestions={suggestions} onSend={send} placeholder="Ex: 'Quais entregas têm risco de atraso?'" />
        </div>
        <div className="card p-4 space-y-3">
          <div className="text-xs text-graphite-500 uppercase tracking-wide flex items-center gap-1"><Sparkles size={12} /> Atalhos rápidos</div>
          <button onClick={() => send('Quais entregas têm risco de atraso hoje?')} className="btn-outline w-full justify-start"><AlertTriangle size={14} /> Entregas em risco</button>
          <button onClick={() => send('Mostre caminhões parados há mais de 30 minutos')} className="btn-outline w-full justify-start"><Truck size={14} /> Caminhões parados</button>
          <button onClick={() => send('Quais cargas críticas estão sem device?')} className="btn-outline w-full justify-start"><Cpu size={14} /> Cargas sem device</button>
          <div className="border-t border-graphite-100 pt-3 text-xs text-graphite-500">
            A IA Scapini nunca inventa dados. Quando não tem informação suficiente, avisa explicitamente.
          </div>
        </div>
      </div>
    </div>
  )
}
