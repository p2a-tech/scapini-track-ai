export type DeliveryStatus =
  | 'Aguardando coleta'
  | 'Coletada'
  | 'Em trânsito'
  | 'Na filial'
  | 'Saiu para entrega'
  | 'Entregue'
  | 'Atrasada'
  | 'Ocorrência'
  | 'Devolvida'
  | 'Cancelada'

export type CollectStatus =
  | 'Solicitado'
  | 'Aguardando programação'
  | 'Programado'
  | 'Motorista a caminho'
  | 'Coletado'
  | 'Cancelado'
  | 'Ocorrência'

export type OrderStatus =
  | 'Criada'
  | 'Aguardando expedição'
  | 'Em carregamento'
  | 'Em trânsito'
  | 'Na filial'
  | 'Saiu para entrega'
  | 'Entregue'
  | 'Ocorrência'
  | 'Devolvida'
  | 'Cancelada'

export type RiskLevel = 'baixo' | 'medio' | 'alto'

export type TrackingSource =
  | 'GPS próprio'
  | 'API rastreador terceiro'
  | 'App motorista'
  | 'Link temporário'
  | 'Device na carga'
  | 'Apenas eventos'
  | 'Atualização manual'
  | 'Exceção aprovada'

export type LegType =
  | 'Coleta'
  | 'Transferência'
  | 'Cross-docking'
  | 'Longo percurso'
  | 'Transferência entre filiais'
  | 'Distribuição local'
  | 'Última milha'
  | 'Reentrega'
  | 'Devolução'

export type LegStatus =
  | 'Planejada'
  | 'Aguardando saída'
  | 'Em andamento'
  | 'Concluída'
  | 'Atrasada'
  | 'Sem sinal'
  | 'Ocorrência'

export interface Client {
  id: string
  name: string
  fantasia?: string
  cnpj: string
  ie?: string
  contact: string
  phone: string
  email: string
  address: string
  city: string
  uf: string
  sla: string
  freightTable: string
  preferences: { whatsapp: boolean; email: boolean; sms: boolean }
}

export interface Driver {
  id: string
  name: string
  cpf: string
  cnh: string
  phone: string
  status: 'Ativo' | 'Em rota' | 'Inativo' | 'Folga'
  currentVehicle?: string
  rating: number
  jornada: string
  ocorrencias: number
}

export interface Vehicle {
  id: string
  plate: string
  type: string
  capacity: string
  capacityKg: number
  tracker: string
  status: 'Disponível' | 'Em rota' | 'Manutenção' | 'Carregando'
  driver?: string
  documents: string
  manutencao: string
}

export interface ThirdParty {
  id: string
  name: string
  cnpj: string
  contact: string
  phone: string
  email: string
  plates: string[]
  trackerVendor: string
  hasApi: boolean
  acceptsLink: boolean
  usesApp: boolean
  requiresDevice: boolean
  confidenceScore: number
  trips: number
  onTime: number
  late: number
  withoutSignal: number
  acceptanceRate: number
  policy: string
}

export interface Branch {
  id: string
  name: string
  type: 'Filial' | 'CD' | 'Hub' | 'Base'
  city: string
  uf: string
  address: string
  capacity: string
  status: string
}

export interface LogisticLeg {
  id: string
  orderId: string
  legNumber: number
  origin: string
  destination: string
  type: LegType
  carrier: string
  carrierType: 'Próprio' | 'Terceiro'
  vehiclePlate: string
  driverName: string
  trackingSource: TrackingSource
  status: LegStatus
  eta: string
  risk: RiskLevel
  startedAt?: string
  arrivedAt?: string
  trackingScore: number
  lastEvent?: string
  events: { time: string; label: string }[]
}

export interface Order {
  id: string
  number: string
  client: string
  origin: string
  destination: string
  nf: string
  cte: string
  mdfe: string
  vehicle: string
  driver: string
  status: OrderStatus
  expectedDeparture: string
  expectedArrival: string
  etaAi: string
  riskAi: RiskLevel
  trackingScore: number
  trackingSource: TrackingSource
  remetente: string
  destinatario: string
  weight: string
  volume: string
  value: string
  legs: LogisticLeg[]
  ocorrencias: number
  lastUpdate: string
}

export interface Collect {
  id: string
  number: string
  client: string
  remetente: string
  cityOrigin: string
  destinatario: string
  cityDest: string
  requestedDate: string
  window: string
  cargoType: string
  weight: string
  volume: string
  status: CollectStatus
  driver?: string
  vehicle?: string
}

export interface Delivery {
  id: string
  trackingCode: string
  nf: string
  cte: string
  client: string
  origin: string
  destination: string
  status: DeliveryStatus
  vehicle: string
  driver: string
  etaAi: string
  delayProb: number
  lastUpdate: string
  trackingSource: TrackingSource
  trackingScore: number
  riskAi: RiskLevel
  recipient?: string
  signedAt?: string
}

export interface Occurrence {
  id: string
  type: string
  deliveryId: string
  nf: string
  client: string
  driver: string
  vehicle: string
  severity: 'baixa' | 'media' | 'alta' | 'critica'
  status: 'Aberta' | 'Em tratamento' | 'Resolvida' | 'Notificada'
  datetime: string
  responsible: string
  description: string
  photos?: number
  comments?: { author: string; text: string; time: string }[]
}

export interface FiscalDoc {
  id: string
  type: 'NF-e' | 'CT-e' | 'MDF-e'
  number: string
  serie: string
  client: string
  remetente: string
  destinatario: string
  value: string
  status: 'Pendente' | 'Emitido' | 'Autorizado' | 'Rejeitado' | 'Cancelado' | 'Encerrado'
  issuedAt: string
  accessKey: string
}

export interface Device {
  id: string
  code: string
  imei: string
  qr: string
  status:
    | 'Disponível'
    | 'Vinculado à carga'
    | 'Em viagem'
    | 'Entregue aguardando retorno'
    | 'Retornado'
    | 'Sem sinal'
    | 'Bateria baixa'
    | 'Extraviado'
    | 'Em manutenção'
  battery: number
  lastPosition: string
  lastCommunication: string
  orderId?: string
  client?: string
  departure?: string
  expectedReturn?: string
  responsible?: string
}

export interface AIAlert {
  id: string
  type: 'eta' | 'sinal' | 'device' | 'divergencia' | 'terceiro' | 'rota' | 'cliente'
  severity: 'baixa' | 'media' | 'alta' | 'critica'
  title: string
  explanation: string
  suggestedAction: string
  orderId?: string
  client?: string
  thirdParty?: string
  createdAt: string
}

export interface FreightTable {
  id: string
  name: string
  client: string
  regionOrigin: string
  regionDest: string
  cargoType: string
  modality: string
  minValue: number
  perKg: number
  perKm: number
  adValorem: number
  gris: number
  pedagio: number
  taxas: number
  validity: string
  status: 'Ativa' | 'Inativa' | 'Em homologação'
}

export interface Geofence {
  id: string
  name: string
  type: 'Filial' | 'Cliente' | 'CD' | 'Pátio' | 'Região'
  address: string
  radius: number
  status: 'Ativa' | 'Inativa'
}

export interface SystemUser {
  id: string
  name: string
  email: string
  profile: 'Admin' | 'Gestor' | 'Operador' | 'Cliente' | 'Motorista' | 'TI'
  company: string
  lastAccess: string
  status: 'Ativo' | 'Inativo'
}

export interface RastreadorIntegration {
  id: string
  carrier: string
  vendor: string
  type: string
  endpoint: string
  token: string
  vehicleId: string
  plate: string
  frequency: string
  status: 'Conectado' | 'Erro' | 'Pausado' | 'Aguardando teste'
  lastSignal: string
  authorizedTrips: number
}

export interface MigrationItem {
  id: string
  category: string
  total: number
  migrated: number
  pending: number
  errors: number
  status: 'Concluída' | 'Em andamento' | 'Com pendência' | 'Não iniciada'
}

export interface UserProfile {
  id: string
  key: 'operador' | 'gestor' | 'cliente' | 'motorista' | 'admin' | 'ti'
  name: string
  role: string
  email: string
  avatar?: string
}
