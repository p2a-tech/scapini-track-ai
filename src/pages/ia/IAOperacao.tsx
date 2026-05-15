import { useState } from 'react'
import PageTitle from '../../components/layout/PageTitle'
import ChatPanel, { ChatMessage } from '../../components/ui/ChatPanel'
import { Sparkles, Truck, AlertTriangle, Cpu, Zap, ShieldOff, CheckCircle2 } from 'lucide-react'
import { askClaude, ChatMessageWire } from '../../utils/aiClient'

const initial: ChatMessage[] = [
  {
    id: '1',
    role: 'ai',
    text: 'Bom dia, Marina. Posso te dar um resumo das entregas em risco, explicar uma ordem específica ou recomendar ações sobre os terceiros. Como posso ajudar?',
    meta: 'Conectado à API real do Claude · contexto sincronizado com a operação',
  },
]

const suggestions = [
  'Quais entregas têm risco de atraso hoje?',
  'Por que a OT-2026-1003 está em risco?',
  'Resumo das viagens de terceiros sem rastreamento',
  'Quais cargas críticas estão sem device físico?',
  'Quais clientes devo notificar agora?',
  'Quanto tempo falta para a SCP-2026-0001 chegar?',
]

export default function IAOperacao() {
  const [messages, setMessages] = useState<ChatMessage[]>(initial)
  const [loading, setLoading] = useState(false)
  const [degraded, setDegraded] = useState<string | null>(null)

  async function send(text: string) {
    if (!text.trim() || loading) return
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text }
    setMessages((m) => [...m, userMsg])
    setLoading(true)

    // converte histórico para wire format (apenas role + content texto)
    const history: ChatMessageWire[] = [...messages, userMsg]
      .filter((m) => typeof m.text === 'string')
      .map((m) => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.text as string }))

    // remove a primeira mensagem do AI (greeting) se existir, para não influenciar
    const wireMessages = history[0]?.role === 'assistant' ? history.slice(1) : history

    const placeholderId = `a-${Date.now()}`
    setMessages((m) => [...m, { id: placeholderId, role: 'ai', text: 'Pensando…', meta: 'Consultando Claude…' }])

    try {
      const resp = await askClaude(wireMessages)
      if (resp.degraded) {
        setDegraded(resp.reason || 'API key não configurada')
        // resposta em modo demo (fallback heurístico simples)
        const demoText = demoAnswer(text)
        setMessages((m) =>
          m.map((msg) =>
            msg.id === placeholderId
              ? { id: msg.id, role: 'ai', text: demoText, meta: 'Modo demo · resposta heurística (sem chamada real à IA)' }
              : msg,
          ),
        )
      } else {
        setDegraded(null)
        setMessages((m) =>
          m.map((msg) =>
            msg.id === placeholderId
              ? {
                  id: msg.id,
                  role: 'ai',
                  text: resp.text,
                  meta: `Claude · ${resp.model || 'sonnet'} · ${resp.usage?.input_tokens ?? '—'} in / ${resp.usage?.output_tokens ?? '—'} out tokens`,
                }
              : msg,
          ),
        )
      }
    } catch (err: any) {
      setMessages((m) =>
        m.map((msg) =>
          msg.id === placeholderId
            ? { id: msg.id, role: 'ai', text: `Erro ao consultar a IA: ${err?.message || err}`, meta: 'falha' }
            : msg,
        ),
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageTitle
        title="Assistente IA — Operação"
        subtitle="Conectado ao Claude (Anthropic). Pergunte sobre entregas, riscos, terceiros, devices e clientes — a IA tem contexto da operação."
        breadcrumb={['IA', 'Operação']}
        actions={
          degraded ? (
            <span className="chip bg-warning-50 text-warning-700"><ShieldOff size={11} /> Modo demo</span>
          ) : (
            <span className="chip bg-success-50 text-success-700"><CheckCircle2 size={11} /> IA conectada</span>
          )
        }
      />

      {degraded && (
        <div className="card-elevated p-4 mb-4 border-l-4 border-warning-500 bg-warning-50">
          <div className="flex items-start gap-2 text-sm text-warning-800">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">Modo demo ativo</div>
              <p className="mt-0.5">
                A variável <code className="px-1 rounded bg-warning-100">ANTHROPIC_API_KEY</code> não está configurada
                neste ambiente. As respostas abaixo são geradas por uma heurística local sobre os dados mockados.
                Para habilitar respostas reais do Claude, configure a chave em <strong>Vercel → Project Settings → Environment Variables</strong>.
              </p>
              <div className="mt-1 text-xs text-warning-700">Detalhe técnico: {degraded}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChatPanel messages={messages} suggestions={suggestions} onSend={send} placeholder="Ex: 'Quais entregas têm risco de atraso?'" />
        </div>
        <div className="card p-4 space-y-3 h-fit">
          <div className="text-xs text-graphite-500 uppercase tracking-wide flex items-center gap-1"><Sparkles size={12} /> Atalhos rápidos</div>
          <button onClick={() => send('Quais entregas têm risco de atraso hoje?')} className="btn-outline w-full justify-start"><AlertTriangle size={14} /> Entregas em risco</button>
          <button onClick={() => send('Mostre caminhões parados há mais de 30 minutos')} className="btn-outline w-full justify-start"><Truck size={14} /> Caminhões parados</button>
          <button onClick={() => send('Quais cargas críticas estão sem device físico?')} className="btn-outline w-full justify-start"><Cpu size={14} /> Cargas sem device</button>
          <button onClick={() => send('Compare a confiabilidade dos terceiros e me diga em qual eu não devo confiar')} className="btn-outline w-full justify-start"><Zap size={14} /> Avaliar terceiros</button>

          <div className="border-t border-graphite-100 pt-3 text-xs text-graphite-500">
            <strong className="text-graphite-700">Contexto enviado à IA:</strong> resumo das ordens, entregas, devices, terceiros e alertas (a partir dos mocks). A IA é instruída a nunca inventar dados.
          </div>
        </div>
      </div>
    </div>
  )
}

/** Fallback heurístico quando a API key não está configurada — para o protótipo funcionar mesmo sem chave real. */
function demoAnswer(text: string): string {
  const t = text.toLowerCase()
  if (t.includes('risco') || t.includes('atras')) {
    return [
      'Identifiquei 3 entregas com risco de atraso superior a 30% (modo demo):',
      '',
      '- OT-2026-1003 (FarmaLog) — 72% · terceiro sem sinal há 42 min.',
      '- OT-2026-1004 (Rede Max) — 90% · perna 2 com 1h30 de atraso acumulado.',
      '- OT-2026-1008 (ConstruMais) — bloqueada por falta de rastreabilidade.',
      '',
      'Próximos passos sugeridos:',
      '1. Notificar FarmaLog (/cliente/notificacoes)',
      '2. Vincular device DEV-1044 à OT-2026-1003 (/operacao/devices)',
      '3. Aprovar exceção ou solicitar device para OT-2026-1008 (/operacao/liberacao-viagem)',
    ].join('\n')
  }
  if (t.includes('parado') || t.includes('sem sinal')) {
    return '2 veículos estão sem sinal há mais de 30 min: TRC-9X88 (Frete Rápido PR — Cascavel/PR) e RDB-2024 (Rodobras — Caxias). Sugestão: ativar link temporário ou vincular device físico.'
  }
  if (t.includes('device')) {
    return 'Apenas 1 carga crítica está sem device: OT-2026-1008 (ConstruMais). Devices disponíveis: DEV-1044 (100% bateria), DEV-1085 (100%). Posso vincular automaticamente?'
  }
  if (t.includes('terceiro')) {
    return [
      'Avaliação dos terceiros (modo demo, baseado nos mocks):',
      '',
      '- Rodobras Terceirizações — score 92 · confiável, API + App ativos.',
      '- Transportes Modelo — score 78 · API integrada, monitorar.',
      '- Expresso Terceiro Sul — score 88 · confiável.',
      '- SulLog Agregados — score 54 · device obrigatório para cargas críticas.',
      '- Frete Rápido Paraná — score 31 · NÃO confiável. Bloquear cargas críticas.',
    ].join('\n')
  }
  if (t.includes('scp-2026-0001') || t.includes('1001') || t.includes('123456')) {
    return 'SCP-2026-0001 (Mercado Exemplo, NF 123456) está em transferência Curitiba → Florianópolis. Tempo restante aproximado: 3h20 até FLN e 18h40 até a entrega final em Canoas/RS. Status do prazo: no prazo, com folga estimada de 1h30.'
  }
  if (t.includes('notific') || t.includes('cliente')) {
    return '3 clientes devem ser notificados proativamente: FarmaLog Distribuição, Rede Max Atacado e ConstruMais Atacado. Posso disparar os templates de WhatsApp em lote.'
  }
  return 'Resposta em modo demo. Configure ANTHROPIC_API_KEY na Vercel para respostas reais do Claude.'
}
