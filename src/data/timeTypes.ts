// Tipos do módulo de Tempo, Prazo, ETA e Chegada

export type DeliveryTimeStatus =
  | 'No prazo'
  | 'Em atenção'
  | 'Risco de atraso'
  | 'Atrasado'
  | 'Entregue no prazo'
  | 'Entregue com atraso'
  | 'Entregue adiantado'
  | 'Sem previsão suficiente'

export type CargoTimeStatus =
  | 'Aguardando saída'
  | 'Saiu no horário'
  | 'Em trânsito no prazo'
  | 'Em trânsito com risco'
  | 'Atrasada'
  | 'Chegou no destino'
  | 'Chegou com atraso'
  | 'Chegou adiantada'

export interface OrderTimePromise {
  promisedDeliveryAt: string                  // ISO
  promisedDeliveryWindowStart: string
  promisedDeliveryWindowEnd: string
  estimatedArrivalAt: string
  estimatedArrivalWindowStart: string
  estimatedArrivalWindowEnd: string
  actualDeliveredAt?: string
  lastUpdatedAt: string
  estimatedTotalDurationMinutes: number
  elapsedTimeMinutes: number
  remainingTimeMinutes: number
  delayMinutes: number
  isDelayed: boolean
  isAtRisk: boolean
  deliveryTimeStatus: DeliveryTimeStatus
  recipientName?: string
  deliveredBranch?: string
}

export interface CargoTime {
  cargaId: string
  plannedDepartureAt: string
  actualDepartureAt?: string
  plannedArrivalAt: string
  estimatedArrivalAt: string
  actualArrivalAt?: string
  estimatedDurationMinutes: number
  actualDurationMinutes?: number
  remainingTimeMinutes: number
  delayMinutes: number
  currentLegId?: string
  nextStop?: string
  lastEventAt: string
  lastEventDescription: string
  timeStatus: CargoTimeStatus
}

export type LegTimeStatus =
  | 'Aguardando saída'
  | 'Saiu no horário'
  | 'Em andamento no prazo'
  | 'Em andamento com risco'
  | 'Atrasada'
  | 'Concluída no prazo'
  | 'Concluída com atraso'
  | 'Concluída adiantada'

export interface LegTime {
  legId: string
  legNumber: number
  origin: string
  destination: string
  legType: string
  trackingMode: string
  plannedDepartureAt: string
  actualDepartureAt?: string
  plannedArrivalAt: string
  estimatedArrivalAt: string
  estimatedArrivalWindowStart: string
  estimatedArrivalWindowEnd: string
  actualArrivalAt?: string
  estimatedDurationMinutes: number
  actualDurationMinutes?: number
  elapsedTimeMinutes: number
  remainingTimeMinutes: number
  delayMinutes: number
  nextExpectedEvent: string
  lastEventAt: string
  lastEventDescription: string
  status: 'Planejada' | 'Aguardando saída' | 'Em andamento' | 'Concluída' | 'Atrasada' | 'Cancelada'
  timeStatus: LegTimeStatus
  riskLevel: 'baixo' | 'medio' | 'alto'
  carrier: string
  vehicle: string
  driver: string
  trackingSource: string
  estimatedCost?: number
  pedagioCost?: number
  fuelEstimate?: number
}

export interface PedidoTime {
  pedidoId: string
  trackingCode: string
  nf: string
  cte?: string
  ordemId: string
  ordemNumero: string
  cargaId: string
  cargaNumero: string
  cliente: string
  varejista?: string
  destinatario: string
  origem: string
  destino: string
  statusAtual: string
  currentLegNumber: number
  currentLegId: string
  legs: LegTime[]
  cargo: CargoTime
  promise: OrderTimePromise
  events: Array<{
    id: string
    label: string
    plannedAt?: string
    actualAt?: string
    status: 'done' | 'current' | 'pending' | 'late'
    description?: string
  }>
}
