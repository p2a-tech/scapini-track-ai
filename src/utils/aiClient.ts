// Wrapper que chama a Vercel Function /api/chat (proxy seguro para Claude).
// Se a função responder 503 (missing_api_key), retorna { degraded: true } para
// o componente decidir mostrar o modo demo.

import { aiAlerts, deliveries, devices, orders, thirdParties } from '../data/mockData'
import { pedidosTime } from '../data/timeMocks'

export interface ChatMessageWire {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResponse {
  text: string
  degraded?: boolean       // true quando API key não está configurada (modo demo)
  reason?: string          // mensagem de erro ou explicação
  model?: string
  usage?: { input_tokens?: number; output_tokens?: number }
}

/** Monta um resumo do estado atual da operação para enviar como contexto ao Claude. */
export function buildOperationContext(): string {
  const totalOrders = orders.length
  const inTransit = orders.filter((o) => o.status === 'Em trânsito' || o.status === 'Saiu para entrega').length
  const atRisk = orders.filter((o) => o.riskAi !== 'baixo').length
  const blocked = orders.filter((o) => o.trackingScore === 0).length
  const lowBatteryDevices = devices.filter((d) => d.battery < 20 && d.status !== 'Em manutenção').length

  const lines = [
    `Ordens em circulação: ${totalOrders}. Em trânsito/última milha: ${inTransit}. Em risco (médio/alto): ${atRisk}. Bloqueadas por rastreabilidade: ${blocked}.`,
    `Devices com bateria baixa: ${lowBatteryDevices}.`,
    '',
    'ORDENS DE TRANSPORTE (resumo):',
    ...orders.map(
      (o) => `- ${o.number} | NF ${o.nf} | ${o.client} | ${o.origin} → ${o.destination} | status: ${o.status} | risco IA: ${o.riskAi} | score rastreio: ${o.trackingScore} | fonte: ${o.trackingSource} | ETA IA: ${o.etaAi} | veículo/motorista: ${o.vehicle} / ${o.driver} | última atualização: ${o.lastUpdate}`,
    ),
    '',
    'PEDIDOS COM CONTROLE DE TEMPO (módulo ETA):',
    ...pedidosTime.map(
      (p) => `- ${p.trackingCode} (${p.cliente}) | ${p.origem} → ${p.destino} | status: ${p.statusAtual} | prazo prometido: ${p.promise.promisedDeliveryAt} | ETA: ${p.promise.estimatedArrivalAt} | tempo restante (min): ${p.promise.remainingTimeMinutes} | status do prazo: ${p.promise.deliveryTimeStatus}${p.promise.actualDeliveredAt ? ' | entregue em: ' + p.promise.actualDeliveredAt : ''}`,
    ),
    '',
    'ENTREGAS (top 6):',
    ...deliveries.slice(0, 6).map(
      (d) => `- ${d.trackingCode} | NF ${d.nf} | ${d.client} | status: ${d.status} | prob. atraso: ${d.delayProb}% | fonte: ${d.trackingSource}`,
    ),
    '',
    'DEVICES (top 5):',
    ...devices.slice(0, 5).map(
      (d) => `- ${d.code} | status: ${d.status} | bateria: ${d.battery}% | última posição: ${d.lastPosition} | última comunicação: ${d.lastCommunication}${d.orderId ? ' | ordem: ' + d.orderId : ''}`,
    ),
    '',
    'TERCEIROS:',
    ...thirdParties.map(
      (t) => `- ${t.name} | score: ${t.confidenceScore} | viagens: ${t.trips} | no prazo: ${t.onTime} | sem sinal: ${t.withoutSignal} | tem API: ${t.hasApi ? 'sim' : 'não'} | política: ${t.policy}`,
    ),
    '',
    'ALERTAS IA ATIVOS:',
    ...aiAlerts.map((a) => `- [${a.severity}] ${a.title} — ${a.explanation} (ação sugerida: ${a.suggestedAction})`),
  ]
  return lines.join('\n')
}

export async function askClaude(messages: ChatMessageWire[]): Promise<ChatResponse> {
  try {
    const context = buildOperationContext()
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, context }),
    })

    if (resp.status === 503) {
      const body = await resp.json().catch(() => ({}))
      return {
        text: '',
        degraded: true,
        reason: body?.message || 'A chave da API Claude não foi configurada (ANTHROPIC_API_KEY).',
      }
    }

    if (!resp.ok) {
      const body = await resp.json().catch(() => ({}))
      return {
        text: '',
        degraded: true,
        reason: body?.message || `Erro ${resp.status} ao chamar a IA.`,
      }
    }

    const data = await resp.json()
    return {
      text: data.text || '',
      model: data.model,
      usage: data.usage,
    }
  } catch (err: any) {
    return {
      text: '',
      degraded: true,
      reason: err?.message || 'Erro de rede ao chamar /api/chat.',
    }
  }
}
