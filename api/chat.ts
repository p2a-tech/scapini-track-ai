// Vercel Serverless Function — proxy seguro para a Anthropic API.
// A chave fica em process.env.ANTHROPIC_API_KEY (configurada no painel da Vercel)
// e NUNCA é enviada para o navegador.

import Anthropic from '@anthropic-ai/sdk'

export const config = {
  runtime: 'nodejs',
  maxDuration: 30,
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface RequestBody {
  messages: ChatMessage[]
  context?: string // resumo opcional do estado da operação enviado pelo cliente
  model?: string
}

const SYSTEM_PROMPT = `Você é o assistente IA da Scapini Track AI — o TMS inteligente da Scapini Transportes.

CONTEXTO DA EMPRESA
- A Scapini Transportes está substituindo o sistema legado "Rota Livre" pelo Scapini Track AI.
- O TMS centraliza coletas, ordens, expedição, rastreamento por etapas logísticas, última milha,
  portal do cliente, app do motorista, devices físicos de carga, APIs de rastreadores de terceiros,
  documentos fiscais (NF-e, CT-e, MDF-e), faturamento e indicadores.

QUEM ESTÁ FALANDO COM VOCÊ
- Você está no Assistente IA — Operação. O interlocutor é um operador ou gestor da Scapini Transportes.
- Linguagem técnica, em português do Brasil, factual e objetiva. Use cabeçalhos curtos e listas com
  bullets quando ajudar a leitura. Evite emojis.

REGRAS CRÍTICAS
1. NUNCA invente dados. Se não houver informação suficiente no contexto fornecido, diga isso
   explicitamente e ofereça um próximo passo (ex.: "abra a tela X" ou "verifique a OT Y").
2. Sempre indique a última atualização conhecida quando citar status de entregas.
3. Se o usuário pedir algo que envolva ação destrutiva (cancelar, bloquear, encerrar), explique
   o que aconteceria e peça confirmação antes.
4. Nunca exponha localização exata de motoristas ao cliente. Para o operador, pode mostrar.
5. Não há backend real ainda — você está trabalhando sobre dados mockados realistas. Tudo bem
   simular respostas precisas baseadas nesses mocks, desde que coerentes com o contexto fornecido.

CAPACIDADES
- Explicar ETAs e riscos de atraso
- Listar entregas críticas, em risco ou atrasadas
- Detalhar a situação de uma ordem específica (OT-xxx) ou pedido (SCP-xxx)
- Avaliar terceiros (rastreabilidade, histórico de falhas, score de confiabilidade)
- Sugerir ações: vincular device, enviar link temporário, bloquear carga sem rastreio,
  notificar cliente, recalcular ETA, abrir ocorrência
- Resumir KPIs e tendências

FORMATO DE RESPOSTA PARA AÇÕES
Quando recomendar um conjunto de ações, liste como uma sequência numerada curta com o link/tela
sugerida do TMS entre parênteses, ex: "1. Vincular DEV-1044 ao OT-2026-1003 (/operacao/devices)".`

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(503).json({
      error: 'missing_api_key',
      message: 'ANTHROPIC_API_KEY não configurada. O assistente está em modo demo.',
    })
  }

  try {
    const body: RequestBody = req.body || (await readJSON(req))
    const { messages, context, model } = body
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'invalid_payload', message: 'messages é obrigatório.' })
    }

    const client = new Anthropic({ apiKey })

    const systemContent = context
      ? `${SYSTEM_PROMPT}\n\nESTADO ATUAL DO TMS (snapshot):\n${context}`
      : SYSTEM_PROMPT

    const response = await client.messages.create({
      model: model || 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: systemContent,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    })

    const textBlock = response.content.find((b) => b.type === 'text') as any
    const text = textBlock?.text || ''

    return res.status(200).json({
      text,
      stopReason: response.stop_reason,
      model: response.model,
      usage: response.usage,
    })
  } catch (err: any) {
    console.error('[api/chat] error:', err)
    const status = err?.status || 500
    return res.status(status).json({
      error: 'anthropic_error',
      message: err?.message || 'Falha ao chamar Claude.',
    })
  }
}

async function readJSON(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', (chunk: Buffer) => (raw += chunk.toString()))
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}) } catch (e) { reject(e) }
    })
    req.on('error', reject)
  })
}
