import {
  AIAlert,
  Branch,
  Client,
  Collect,
  Delivery,
  Device,
  Driver,
  FiscalDoc,
  FreightTable,
  Geofence,
  LogisticLeg,
  MigrationItem,
  Occurrence,
  Order,
  RastreadorIntegration,
  SystemUser,
  ThirdParty,
  UserProfile,
  Vehicle,
} from './types'

export const profiles: UserProfile[] = [
  { id: 'p1', key: 'operador', name: 'Marina Schneider', role: 'Operador Scapini', email: 'marina@scapini.com.br' },
  { id: 'p2', key: 'gestor', name: 'Lucas Scapini', role: 'Gestor Operacional', email: 'lucas@scapini.com.br' },
  { id: 'p3', key: 'cliente', name: 'Cláudia Tavares', role: 'Cliente — Mercado Exemplo', email: 'claudia@mercadoexemplo.com.br' },
  { id: 'p4', key: 'motorista', name: 'João Pereira', role: 'Motorista', email: 'joao.pereira@scapini.com.br' },
  { id: 'p5', key: 'admin', name: 'Henrique Costa', role: 'Administrador', email: 'henrique@scapini.com.br' },
  { id: 'p6', key: 'ti', name: 'Fernanda Lima', role: 'TI / Integrações', email: 'fernanda@scapini.com.br' },
]

export const clients: Client[] = [
  {
    id: 'cli-001',
    name: 'Mercado Exemplo Ltda.',
    fantasia: 'Mercado Exemplo',
    cnpj: '12.345.678/0001-90',
    ie: '110.042.490.114',
    contact: 'Cláudia Tavares',
    phone: '(49) 99876-1010',
    email: 'logistica@mercadoexemplo.com.br',
    address: 'Av. Brasil, 1500 — Centro',
    city: 'Chapecó',
    uf: 'SC',
    sla: '24h úteis',
    freightTable: 'TAB-MERC-2026-01',
    preferences: { whatsapp: true, email: true, sms: false },
  },
  {
    id: 'cli-002',
    name: 'Distribuidora Sul Brasil S/A',
    fantasia: 'SulDistri',
    cnpj: '98.765.432/0001-21',
    contact: 'Rodrigo Antunes',
    phone: '(41) 99555-3344',
    email: 'compras@suldistri.com.br',
    address: 'Rod. BR-277, km 112',
    city: 'Curitiba',
    uf: 'PR',
    sla: '48h corridas',
    freightTable: 'TAB-SUL-2026-02',
    preferences: { whatsapp: true, email: true, sms: true },
  },
  {
    id: 'cli-003',
    name: 'Agro Comercial Paraná Ltda.',
    cnpj: '45.221.987/0001-66',
    contact: 'Bruno Camargo',
    phone: '(43) 99221-8810',
    email: 'expedicao@agropr.com.br',
    address: 'Rod. PR-445, km 50',
    city: 'Londrina',
    uf: 'PR',
    sla: '72h',
    freightTable: 'TAB-AGR-2026-01',
    preferences: { whatsapp: true, email: true, sms: false },
  },
  {
    id: 'cli-004',
    name: 'Rede Max Atacado',
    cnpj: '11.337.221/0001-44',
    contact: 'Patrícia Alves',
    phone: '(11) 98741-2099',
    email: 'logistica@redemax.com.br',
    address: 'Av. dos Bandeirantes, 3200',
    city: 'São Paulo',
    uf: 'SP',
    sla: '24h úteis',
    freightTable: 'TAB-REDE-2026-03',
    preferences: { whatsapp: true, email: true, sms: false },
  },
  {
    id: 'cli-005',
    name: 'Frigorífico Modelo S/A',
    cnpj: '22.118.554/0001-22',
    contact: 'Eduardo Reis',
    phone: '(54) 99811-2200',
    email: 'transportes@frigorifimodelo.com.br',
    address: 'Rod. RS-122, km 20',
    city: 'Caxias do Sul',
    uf: 'RS',
    sla: '36h refrigerado',
    freightTable: 'TAB-FRIG-2026-01',
    preferences: { whatsapp: false, email: true, sms: true },
  },
  {
    id: 'cli-006',
    name: 'Auto Peças Continental',
    cnpj: '33.992.110/0001-90',
    contact: 'Marcos Vinícius',
    phone: '(47) 99332-1180',
    email: 'logistica@continentalap.com.br',
    address: 'R. Industrial, 220',
    city: 'Joinville',
    uf: 'SC',
    sla: '48h',
    freightTable: 'TAB-CONT-2026-02',
    preferences: { whatsapp: true, email: true, sms: false },
  },
  {
    id: 'cli-007',
    name: 'FarmaLog Distribuição',
    cnpj: '55.012.998/0001-77',
    contact: 'Renata Aragão',
    phone: '(51) 99887-3399',
    email: 'sac@farmalog.com.br',
    address: 'Av. Assis Brasil, 4011',
    city: 'Porto Alegre',
    uf: 'RS',
    sla: '24h crítico',
    freightTable: 'TAB-FARM-2026-04',
    preferences: { whatsapp: true, email: true, sms: true },
  },
  {
    id: 'cli-008',
    name: 'ConstruMais Atacado',
    cnpj: '77.665.331/0001-12',
    contact: 'Henrique Tonon',
    phone: '(48) 99771-8822',
    email: 'expedicao@construmais.com.br',
    address: 'Rod. BR-101, km 210',
    city: 'Itajaí',
    uf: 'SC',
    sla: '72h',
    freightTable: 'TAB-CONS-2026-01',
    preferences: { whatsapp: true, email: false, sms: false },
  },
]

export const cities = [
  'Chapecó/SC', 'Curitiba/PR', 'Londrina/PR', 'Maringá/PR',
  'São Paulo/SP', 'Guarulhos/SP', 'Joinville/SC', 'Porto Alegre/RS',
  'Cascavel/PR', 'Blumenau/SC', 'Itajaí/SC', 'Florianópolis/SC',
  'Caxias do Sul/RS', 'Canoas/RS',
]

export const branches: Branch[] = [
  { id: 'b1', name: 'CD Guarulhos', type: 'CD', city: 'Guarulhos', uf: 'SP', address: 'Rod. Hélio Smidt, s/n', capacity: '12.000 m²', status: 'Operacional' },
  { id: 'b2', name: 'Filial Curitiba', type: 'Filial', city: 'Curitiba', uf: 'PR', address: 'Av. das Torres, 1500', capacity: '4.500 m²', status: 'Operacional' },
  { id: 'b3', name: 'Filial Florianópolis', type: 'Filial', city: 'Florianópolis', uf: 'SC', address: 'Av. Beira-Mar Norte, 2200', capacity: '3.200 m²', status: 'Operacional' },
  { id: 'b4', name: 'CD Porto Alegre', type: 'CD', city: 'Porto Alegre', uf: 'RS', address: 'Av. Assis Brasil, 9000', capacity: '8.000 m²', status: 'Operacional' },
  { id: 'b5', name: 'Base Chapecó', type: 'Base', city: 'Chapecó', uf: 'SC', address: 'Rod. SC-480, km 15', capacity: '2.500 m²', status: 'Operacional' },
  { id: 'b6', name: 'Hub Joinville', type: 'Hub', city: 'Joinville', uf: 'SC', address: 'Rod. BR-101, km 50', capacity: '5.000 m²', status: 'Operacional' },
]

export const drivers: Driver[] = [
  { id: 'd1', name: 'João Pereira', cpf: '111.222.333-44', cnh: 'PR-123456789', phone: '(41) 99999-1100', status: 'Em rota', currentVehicle: 'SCA-1A23', rating: 4.9, jornada: '07h12 — em rota', ocorrencias: 0 },
  { id: 'd2', name: 'Carlos Mendes', cpf: '222.333.444-55', cnh: 'SC-987654321', phone: '(47) 98888-2200', status: 'Em rota', currentVehicle: 'SCA-2B45', rating: 4.7, jornada: '08h05 — em rota', ocorrencias: 1 },
  { id: 'd3', name: 'Rafael Souza', cpf: '333.444.555-66', cnh: 'SP-456123789', phone: '(11) 97777-3300', status: 'Ativo', currentVehicle: 'SCA-3C67', rating: 4.8, jornada: 'Disponível', ocorrencias: 0 },
  { id: 'd4', name: 'Marcos Oliveira', cpf: '444.555.666-77', cnh: 'RS-654987321', phone: '(51) 96666-4400', status: 'Em rota', currentVehicle: 'SCA-4D89', rating: 4.6, jornada: '06h45 — em rota', ocorrencias: 2 },
  { id: 'd5', name: 'André Lima', cpf: '555.666.777-88', cnh: 'PR-321789456', phone: '(43) 95555-5500', status: 'Folga', rating: 4.9, jornada: 'Folga programada', ocorrencias: 0 },
  { id: 'd6', name: 'Diego Ramos', cpf: '666.777.888-99', cnh: 'SC-789123456', phone: '(48) 94444-6600', status: 'Ativo', currentVehicle: 'SCA-5E10', rating: 4.5, jornada: 'Disponível', ocorrencias: 1 },
  { id: 'd7', name: 'Paulo Nogueira', cpf: '777.888.999-00', cnh: 'RS-159753468', phone: '(51) 93333-7700', status: 'Em rota', currentVehicle: 'ABC-1234', rating: 4.4, jornada: '09h30 — em rota', ocorrencias: 3 },
]

export const vehicles: Vehicle[] = [
  { id: 'v1', plate: 'SCA-1A23', type: 'Truck 14t', capacity: '14 ton / 45 m³', capacityKg: 14000, tracker: 'Sascar (próprio)', status: 'Em rota', driver: 'João Pereira', documents: 'OK', manutencao: 'Próxima em 30 dias' },
  { id: 'v2', plate: 'SCA-2B45', type: 'Toco 6t', capacity: '6 ton / 24 m³', capacityKg: 6000, tracker: 'Sascar (próprio)', status: 'Em rota', driver: 'Carlos Mendes', documents: 'OK', manutencao: 'Próxima em 15 dias' },
  { id: 'v3', plate: 'SCA-3C67', type: 'Carreta 27t', capacity: '27 ton / 90 m³', capacityKg: 27000, tracker: 'Sascar (próprio)', status: 'Disponível', driver: 'Rafael Souza', documents: 'OK', manutencao: 'Em dia' },
  { id: 'v4', plate: 'SCA-4D89', type: 'Truck 14t', capacity: '14 ton / 45 m³', capacityKg: 14000, tracker: 'Sascar (próprio)', status: 'Em rota', driver: 'Marcos Oliveira', documents: 'OK', manutencao: 'Próxima em 7 dias' },
  { id: 'v5', plate: 'SCA-5E10', type: 'VUC 3,5t', capacity: '3,5 ton / 14 m³', capacityKg: 3500, tracker: 'Sascar (próprio)', status: 'Carregando', driver: 'Diego Ramos', documents: 'OK', manutencao: 'Em dia' },
  { id: 'v6', plate: 'ABC-1234', type: 'Carreta 27t (terceiro)', capacity: '27 ton / 90 m³', capacityKg: 27000, tracker: 'Onixsat (API integrada)', status: 'Em rota', driver: 'Paulo Nogueira', documents: 'OK', manutencao: 'Responsabilidade terceiro' },
  { id: 'v7', plate: 'TRC-9X88', type: 'Truck (terceiro)', capacity: '14 ton / 45 m³', capacityKg: 14000, tracker: 'Sem rastreador integrado', status: 'Disponível', documents: 'Vence em 12 dias', manutencao: 'Responsabilidade terceiro' },
]

export const thirdParties: ThirdParty[] = [
  {
    id: 't1', name: 'Transportes Modelo', cnpj: '01.234.567/0001-11', contact: 'Sérgio Modelo', phone: '(41) 99100-2233', email: 'op@transportesmodelo.com.br',
    plates: ['ABC-1234', 'XYZ-7788'], trackerVendor: 'Onixsat', hasApi: true, acceptsLink: true, usesApp: false, requiresDevice: false,
    confidenceScore: 78, trips: 142, onTime: 121, late: 18, withoutSignal: 3, acceptanceRate: 86, policy: 'API integrada obrigatória',
  },
  {
    id: 't2', name: 'Rodobras Terceirizações', cnpj: '02.345.678/0001-22', contact: 'Wagner Rodobras', phone: '(51) 99811-3344', email: 'wagner@rodobras.com.br',
    plates: ['RDB-2024', 'RDB-2025'], trackerVendor: 'Sascar', hasApi: true, acceptsLink: true, usesApp: true, requiresDevice: false,
    confidenceScore: 92, trips: 215, onTime: 198, late: 14, withoutSignal: 3, acceptanceRate: 95, policy: 'API + App motorista',
  },
  {
    id: 't3', name: 'SulLog Agregados', cnpj: '03.456.789/0001-33', contact: 'Mauro SulLog', phone: '(47) 99221-4455', email: 'mauro@sullog.com.br',
    plates: ['SUL-1010', 'SUL-2020'], trackerVendor: 'N/A', hasApi: false, acceptsLink: true, usesApp: false, requiresDevice: true,
    confidenceScore: 54, trips: 87, onTime: 60, late: 22, withoutSignal: 5, acceptanceRate: 62, policy: 'Device obrigatório em carga crítica',
  },
  {
    id: 't4', name: 'Frete Rápido Paraná', cnpj: '04.567.890/0001-44', contact: 'Rosane FR', phone: '(43) 98332-5566', email: 'rosane@freteraapidopr.com.br',
    plates: ['FRP-3030'], trackerVendor: 'N/A', hasApi: false, acceptsLink: false, usesApp: false, requiresDevice: true,
    confidenceScore: 31, trips: 34, onTime: 21, late: 11, withoutSignal: 2, acceptanceRate: 18, policy: 'Bloqueado para cargas críticas — apenas transferência',
  },
  {
    id: 't5', name: 'Expresso Terceiro Sul', cnpj: '05.678.901/0001-55', contact: 'Tiago Expresso', phone: '(48) 97443-6677', email: 'tiago@expressoterceirosul.com.br',
    plates: ['ETS-4040', 'ETS-4041'], trackerVendor: 'Autotrac', hasApi: true, acceptsLink: true, usesApp: true, requiresDevice: false,
    confidenceScore: 88, trips: 102, onTime: 95, late: 6, withoutSignal: 1, acceptanceRate: 91, policy: 'API + App motorista — liberado',
  },
]

// Logistic legs example for NF 123456
const legs123456: LogisticLeg[] = [
  {
    id: 'leg-1', orderId: 'ord-001', legNumber: 1, origin: 'Guarulhos/SP', destination: 'Curitiba/PR',
    type: 'Transferência', carrier: 'Transportes Modelo', carrierType: 'Terceiro',
    vehiclePlate: 'ABC-1234', driverName: 'Paulo Nogueira', trackingSource: 'API rastreador terceiro',
    status: 'Concluída', eta: '17h45', risk: 'baixo', startedAt: '08:10', arrivedAt: '17:45', trackingScore: 85,
    lastEvent: 'Chegada na filial Curitiba',
    events: [
      { time: '08:10', label: 'Saída de Guarulhos/SP' },
      { time: '12:30', label: 'Posição: Itararé/SP' },
      { time: '15:10', label: 'Posição: São José dos Pinhais/PR' },
      { time: '17:45', label: 'Chegada na filial Curitiba/PR' },
    ],
  },
  {
    id: 'leg-2', orderId: 'ord-001', legNumber: 2, origin: 'Curitiba/PR', destination: 'Florianópolis/SC',
    type: 'Transferência entre filiais', carrier: 'Scapini Transportes', carrierType: 'Próprio',
    vehiclePlate: 'SCA-1A23', driverName: 'João Pereira', trackingSource: 'Apenas eventos',
    status: 'Em andamento', eta: '02h00', risk: 'medio', startedAt: '20:30', trackingScore: 60,
    lastEvent: 'Saída de Curitiba/PR às 20:30',
    events: [
      { time: '19:45', label: 'Conferência concluída — Filial Curitiba' },
      { time: '20:30', label: 'Saída de Curitiba/PR' },
    ],
  },
  {
    id: 'leg-3', orderId: 'ord-001', legNumber: 3, origin: 'Florianópolis/SC', destination: 'Porto Alegre/RS',
    type: 'Longo percurso', carrier: 'Scapini Transportes', carrierType: 'Próprio',
    vehiclePlate: 'SCA-3C67', driverName: 'Rafael Souza', trackingSource: 'GPS próprio',
    status: 'Planejada', eta: 'Amanhã 06h00', risk: 'baixo', trackingScore: 100,
    events: [],
  },
  {
    id: 'leg-4', orderId: 'ord-001', legNumber: 4, origin: 'CD Porto Alegre/RS', destination: 'Cliente final — Canoas/RS',
    type: 'Última milha', carrier: 'Scapini Transportes', carrierType: 'Próprio',
    vehiclePlate: 'SCA-5E10', driverName: 'Diego Ramos', trackingSource: 'App motorista',
    status: 'Planejada', eta: 'Amanhã 09h00–12h00', risk: 'baixo', trackingScore: 100,
    events: [],
  },
]

export const orders: Order[] = [
  {
    id: 'ord-001', number: 'OT-2026-1001', client: 'Mercado Exemplo Ltda.',
    origin: 'Guarulhos/SP', destination: 'Canoas/RS',
    nf: '123456', cte: '987001', mdfe: '550001',
    vehicle: 'ABC-1234 → SCA-1A23 → SCA-3C67 → SCA-5E10',
    driver: 'Multimodal (4 pernas)', status: 'Em trânsito',
    expectedDeparture: 'Hoje 08h10', expectedArrival: 'Amanhã 09h00–12h00',
    etaAi: 'Amanhã entre 09h00 e 11h30', riskAi: 'medio', trackingScore: 78,
    trackingSource: 'API rastreador terceiro', remetente: 'Distribuidora Exemplo SP',
    destinatario: 'Mercado Exemplo — Canoas',
    weight: '1.250 kg', volume: '3,4 m³', value: 'R$ 84.500,00', legs: legs123456,
    ocorrencias: 0, lastUpdate: 'há 12 min',
  },
  {
    id: 'ord-002', number: 'OT-2026-1002', client: 'Distribuidora Sul Brasil',
    origin: 'Curitiba/PR', destination: 'Florianópolis/SC',
    nf: '123457', cte: '987002', mdfe: '550002', vehicle: 'SCA-2B45', driver: 'Carlos Mendes',
    status: 'Saiu para entrega', expectedDeparture: 'Hoje 06h30', expectedArrival: 'Hoje 15h30–17h00',
    etaAi: 'Hoje entre 15h30 e 17h00', riskAi: 'baixo', trackingScore: 100,
    trackingSource: 'GPS próprio',
    remetente: 'CD Curitiba', destinatario: 'SulDistri Florianópolis',
    weight: '4.200 kg', volume: '12,5 m³', value: 'R$ 52.100,00', legs: [],
    ocorrencias: 0, lastUpdate: 'há 3 min',
  },
  {
    id: 'ord-003', number: 'OT-2026-1003', client: 'FarmaLog Distribuição',
    origin: 'São Paulo/SP', destination: 'Porto Alegre/RS',
    nf: '123458', cte: '987003', mdfe: '550003', vehicle: 'TRC-9X88', driver: 'Terceiro (Frete Rápido PR)',
    status: 'Em trânsito', expectedDeparture: 'Ontem 22h00', expectedArrival: 'Amanhã 14h00',
    etaAi: 'Amanhã entre 13h30 e 16h00', riskAi: 'alto', trackingScore: 30,
    trackingSource: 'Atualização manual',
    remetente: 'CD FarmaLog SP', destinatario: 'FarmaLog Porto Alegre',
    weight: '8.700 kg', volume: '22 m³', value: 'R$ 312.400,00', legs: [],
    ocorrencias: 1, lastUpdate: 'há 42 min',
  },
  {
    id: 'ord-004', number: 'OT-2026-1004', client: 'Rede Max Atacado',
    origin: 'Guarulhos/SP', destination: 'Joinville/SC',
    nf: '123459', cte: '987004', mdfe: '550004', vehicle: 'SCA-4D89', driver: 'Marcos Oliveira',
    status: 'Na filial', expectedDeparture: 'Hoje 19h00', expectedArrival: 'Amanhã 11h00',
    etaAi: 'Amanhã entre 10h30 e 12h00', riskAi: 'baixo', trackingScore: 100,
    trackingSource: 'GPS próprio',
    remetente: 'CD Guarulhos', destinatario: 'Rede Max Joinville',
    weight: '6.300 kg', volume: '18 m³', value: 'R$ 94.800,00', legs: [],
    ocorrencias: 0, lastUpdate: 'há 1 h',
  },
  {
    id: 'ord-005', number: 'OT-2026-1005', client: 'Agro Comercial Paraná',
    origin: 'Londrina/PR', destination: 'Maringá/PR',
    nf: '123460', cte: '987005', mdfe: '550005', vehicle: 'SCA-5E10', driver: 'Diego Ramos',
    status: 'Em carregamento', expectedDeparture: 'Hoje 14h00', expectedArrival: 'Hoje 18h30',
    etaAi: 'Hoje entre 18h00 e 19h30', riskAi: 'baixo', trackingScore: 100,
    trackingSource: 'GPS próprio',
    remetente: 'Agro Comercial Londrina', destinatario: 'Cooperativa Maringá',
    weight: '2.100 kg', volume: '8 m³', value: 'R$ 28.700,00', legs: [],
    ocorrencias: 0, lastUpdate: 'há 25 min',
  },
  {
    id: 'ord-006', number: 'OT-2026-1006', client: 'Frigorífico Modelo',
    origin: 'Caxias do Sul/RS', destination: 'São Paulo/SP',
    nf: '987654', cte: '987006', mdfe: '550006', vehicle: 'RDB-2024 (terceiro)', driver: 'Wagner Rodobras',
    status: 'Em trânsito', expectedDeparture: 'Ontem 18h00', expectedArrival: 'Hoje 22h00',
    etaAi: 'Hoje entre 21h30 e 23h30', riskAi: 'medio', trackingScore: 92,
    trackingSource: 'API rastreador terceiro',
    remetente: 'Frigorífico Modelo Caxias', destinatario: 'CD Carnes Premium SP',
    weight: '24.500 kg', volume: '78 m³', value: 'R$ 245.000,00', legs: [],
    ocorrencias: 0, lastUpdate: 'há 8 min',
  },
  {
    id: 'ord-007', number: 'OT-2026-1007', client: 'Auto Peças Continental',
    origin: 'Joinville/SC', destination: 'Blumenau/SC',
    nf: '456789', cte: '987007', mdfe: '550007', vehicle: 'SUL-1010 (terceiro)', driver: 'Mauro SulLog',
    status: 'Saiu para entrega', expectedDeparture: 'Hoje 09h00', expectedArrival: 'Hoje 13h30',
    etaAi: 'Hoje entre 13h00 e 14h30', riskAi: 'alto', trackingScore: 75,
    trackingSource: 'Device na carga',
    remetente: 'Continental Joinville', destinatario: 'Continental Blumenau',
    weight: '900 kg', volume: '2 m³', value: 'R$ 18.600,00', legs: [],
    ocorrencias: 0, lastUpdate: 'há 15 min',
  },
  {
    id: 'ord-008', number: 'OT-2026-1008', client: 'ConstruMais Atacado',
    origin: 'Itajaí/SC', destination: 'Florianópolis/SC',
    nf: '654321', cte: '987008', mdfe: '550008', vehicle: 'FRP-3030 (terceiro)', driver: 'Não vinculado',
    status: 'Aguardando expedição', expectedDeparture: 'Hoje 18h00', expectedArrival: 'Hoje 22h00',
    etaAi: 'Bloqueado — falta rastreabilidade', riskAi: 'alto', trackingScore: 0,
    trackingSource: 'Apenas eventos',
    remetente: 'ConstruMais Itajaí', destinatario: 'ConstruMais Florianópolis',
    weight: '12.000 kg', volume: '38 m³', value: 'R$ 65.300,00', legs: [],
    ocorrencias: 0, lastUpdate: 'há 5 min',
  },
]

export const collects: Collect[] = [
  { id: 'col-001', number: 'PC-2026-2001', client: 'Mercado Exemplo Ltda.', remetente: 'Distribuidora SP', cityOrigin: 'Guarulhos/SP', destinatario: 'Mercado Exemplo Canoas', cityDest: 'Canoas/RS', requestedDate: 'Hoje', window: '08h00–12h00', cargoType: 'Mercadoria geral', weight: '1.250 kg', volume: '3,4 m³', status: 'Programado', driver: 'João Pereira', vehicle: 'SCA-1A23' },
  { id: 'col-002', number: 'PC-2026-2002', client: 'Distribuidora Sul Brasil', remetente: 'Indústria Paranaense', cityOrigin: 'Curitiba/PR', destinatario: 'SulDistri Floripa', cityDest: 'Florianópolis/SC', requestedDate: 'Hoje', window: '13h00–17h00', cargoType: 'Eletrodomésticos', weight: '4.200 kg', volume: '12,5 m³', status: 'Coletado', driver: 'Carlos Mendes', vehicle: 'SCA-2B45' },
  { id: 'col-003', number: 'PC-2026-2003', client: 'FarmaLog Distribuição', remetente: 'CD FarmaLog SP', cityOrigin: 'São Paulo/SP', destinatario: 'FarmaLog POA', cityDest: 'Porto Alegre/RS', requestedDate: 'Ontem', window: '18h00–22h00', cargoType: 'Medicamentos', weight: '8.700 kg', volume: '22 m³', status: 'Coletado' },
  { id: 'col-004', number: 'PC-2026-2004', client: 'Agro Comercial Paraná', remetente: 'Agro Londrina', cityOrigin: 'Londrina/PR', destinatario: 'Cooperativa Maringá', cityDest: 'Maringá/PR', requestedDate: 'Hoje', window: '10h00–14h00', cargoType: 'Defensivos agrícolas', weight: '2.100 kg', volume: '8 m³', status: 'Motorista a caminho', driver: 'Diego Ramos', vehicle: 'SCA-5E10' },
  { id: 'col-005', number: 'PC-2026-2005', client: 'Rede Max Atacado', remetente: 'CD Guarulhos', cityOrigin: 'Guarulhos/SP', destinatario: 'Rede Max Joinville', cityDest: 'Joinville/SC', requestedDate: 'Hoje', window: '16h00–20h00', cargoType: 'Alimentos não perecíveis', weight: '6.300 kg', volume: '18 m³', status: 'Aguardando programação' },
  { id: 'col-006', number: 'PC-2026-2006', client: 'Frigorífico Modelo', remetente: 'Frigorífico Caxias', cityOrigin: 'Caxias do Sul/RS', destinatario: 'CD Carnes SP', cityDest: 'São Paulo/SP', requestedDate: 'Hoje', window: '15h00–18h00', cargoType: 'Carnes refrigeradas', weight: '24.500 kg', volume: '78 m³', status: 'Coletado' },
  { id: 'col-007', number: 'PC-2026-2007', client: 'Auto Peças Continental', remetente: 'Continental Joinville', cityOrigin: 'Joinville/SC', destinatario: 'Continental Blumenau', cityDest: 'Blumenau/SC', requestedDate: 'Amanhã', window: '07h00–10h00', cargoType: 'Auto peças', weight: '900 kg', volume: '2 m³', status: 'Solicitado' },
  { id: 'col-008', number: 'PC-2026-2008', client: 'ConstruMais Atacado', remetente: 'ConstruMais Itajaí', cityOrigin: 'Itajaí/SC', destinatario: 'ConstruMais Floripa', cityDest: 'Florianópolis/SC', requestedDate: 'Hoje', window: '14h00–18h00', cargoType: 'Material construção', weight: '12.000 kg', volume: '38 m³', status: 'Solicitado' },
]

export const deliveries: Delivery[] = orders.map((o) => ({
  id: `del-${o.id}`,
  trackingCode: `SCP-2026-${o.number.split('-').pop()?.slice(-4)}`,
  nf: o.nf,
  cte: o.cte,
  client: o.client,
  origin: o.origin,
  destination: o.destination,
  status: o.status === 'Em carregamento' || o.status === 'Aguardando expedição' ? 'Aguardando coleta'
    : o.status === 'Em trânsito' ? 'Em trânsito'
    : o.status === 'Na filial' ? 'Na filial'
    : o.status === 'Saiu para entrega' ? 'Saiu para entrega'
    : o.status === 'Entregue' ? 'Entregue'
    : o.status === 'Ocorrência' ? 'Ocorrência'
    : 'Em trânsito',
  vehicle: o.vehicle,
  driver: o.driver,
  etaAi: o.etaAi,
  delayProb: o.riskAi === 'alto' ? 72 : o.riskAi === 'medio' ? 38 : 8,
  lastUpdate: o.lastUpdate,
  trackingSource: o.trackingSource,
  trackingScore: o.trackingScore,
  riskAi: o.riskAi,
  recipient: o.status === 'Entregue' ? 'Recebido por funcionário responsável' : undefined,
}))

export const occurrences: Occurrence[] = [
  {
    id: 'oc-001', type: 'Atraso por trânsito', deliveryId: 'del-ord-003', nf: '123458',
    client: 'FarmaLog Distribuição', driver: 'Terceiro (Frete Rápido PR)', vehicle: 'TRC-9X88',
    severity: 'alta', status: 'Em tratamento', datetime: 'Hoje 09h45',
    responsible: 'Marina Schneider',
    description: 'Veículo retido em fiscalização — relato manual via WhatsApp. Sem sinal de GPS confirmado.',
    photos: 0,
    comments: [
      { author: 'Marina (Operação)', text: 'Tentativa de contato via WhatsApp — sem resposta há 30 min.', time: 'há 35 min' },
      { author: 'Sistema IA', text: 'Sugestão: ativar link temporário para a placa TRC-9X88.', time: 'há 30 min' },
    ],
  },
  {
    id: 'oc-002', type: 'Cliente ausente', deliveryId: 'del-ord-002', nf: '123457',
    client: 'Distribuidora Sul Brasil', driver: 'Carlos Mendes', vehicle: 'SCA-2B45',
    severity: 'media', status: 'Aberta', datetime: 'Hoje 14h22',
    responsible: 'Marina Schneider',
    description: 'Recebedor não estava no local. Solicitado reagendamento para amanhã pela manhã.',
    photos: 2,
  },
  {
    id: 'oc-003', type: 'Avaria', deliveryId: 'del-ord-007', nf: '456789',
    client: 'Auto Peças Continental', driver: 'Mauro SulLog', vehicle: 'SUL-1010',
    severity: 'critica', status: 'Em tratamento', datetime: 'Hoje 11h05',
    responsible: 'Lucas Scapini',
    description: 'Carga apresentou avaria leve em 3 volumes. Fotos enviadas pelo motorista via app. Em análise do seguro.',
    photos: 4,
  },
  {
    id: 'oc-004', type: 'Perda de sinal GPS', deliveryId: 'del-ord-008', nf: '654321',
    client: 'ConstruMais Atacado', driver: 'Não vinculado', vehicle: 'FRP-3030',
    severity: 'critica', status: 'Aberta', datetime: 'Hoje 08h15',
    responsible: 'Marina Schneider',
    description: 'Terceiro sem rastreamento confiável. Bloqueio operacional aplicado. Necessário device físico ou aprovação de exceção.',
    photos: 0,
  },
  {
    id: 'oc-005', type: 'Endereço incorreto', deliveryId: 'del-ord-005', nf: '123460',
    client: 'Agro Comercial Paraná', driver: 'Diego Ramos', vehicle: 'SCA-5E10',
    severity: 'baixa', status: 'Resolvida', datetime: 'Hoje 10h30',
    responsible: 'Operação',
    description: 'CEP de entrega divergente do cadastro. Correção realizada pelo cliente. Entrega seguiu normalmente.',
    photos: 1,
  },
]

export const fiscalDocs: FiscalDoc[] = [
  { id: 'doc-001', type: 'CT-e', number: '987001', serie: '001', client: 'Mercado Exemplo Ltda.', remetente: 'Distribuidora SP', destinatario: 'Mercado Exemplo Canoas', value: 'R$ 1.842,00', status: 'Autorizado', issuedAt: 'Hoje 06h55', accessKey: '4126 0512 3456 7890 1234 5678 9012 3456 7890 1234 5601' },
  { id: 'doc-002', type: 'CT-e', number: '987002', serie: '001', client: 'Distribuidora Sul Brasil', remetente: 'CD Curitiba', destinatario: 'SulDistri Floripa', value: 'R$ 2.310,00', status: 'Autorizado', issuedAt: 'Hoje 06h20', accessKey: '4126 0512 3456 7890 1234 5678 9012 3456 7890 1234 5602' },
  { id: 'doc-003', type: 'MDF-e', number: '550001', serie: '001', client: 'Multi', remetente: 'CD Guarulhos', destinatario: 'Filial Curitiba', value: '—', status: 'Autorizado', issuedAt: 'Hoje 07h10', accessKey: '4126 0512 3456 7890 1234 5678 9012 3456 7890 1234 5603' },
  { id: 'doc-004', type: 'NF-e', number: '123456', serie: '001', client: 'Mercado Exemplo Ltda.', remetente: 'Distribuidora SP', destinatario: 'Mercado Exemplo Canoas', value: 'R$ 84.500,00', status: 'Autorizado', issuedAt: 'Ontem 18h22', accessKey: '4126 0512 3456 7890 1234 5678 9012 3456 7890 1234 5604' },
  { id: 'doc-005', type: 'CT-e', number: '987003', serie: '001', client: 'FarmaLog Distribuição', remetente: 'CD FarmaLog SP', destinatario: 'FarmaLog POA', value: 'R$ 5.480,00', status: 'Rejeitado', issuedAt: 'Ontem 21h50', accessKey: '—' },
  { id: 'doc-006', type: 'MDF-e', number: '550003', serie: '001', client: 'Multi', remetente: 'CD FarmaLog SP', destinatario: 'POA', value: '—', status: 'Pendente', issuedAt: 'Hoje 09h05', accessKey: '—' },
  { id: 'doc-007', type: 'CT-e', number: '987006', serie: '001', client: 'Frigorífico Modelo', remetente: 'Frigorífico Caxias', destinatario: 'CD Carnes SP', value: 'R$ 4.820,00', status: 'Autorizado', issuedAt: 'Ontem 17h40', accessKey: '4126 0512 3456 7890 1234 5678 9012 3456 7890 1234 5605' },
  { id: 'doc-008', type: 'CT-e', number: '987008', serie: '001', client: 'ConstruMais Atacado', remetente: 'ConstruMais Itajaí', destinatario: 'ConstruMais Floripa', value: 'R$ 1.320,00', status: 'Pendente', issuedAt: 'Hoje 15h20', accessKey: '—' },
]

export const devices: Device[] = [
  { id: 'dv-1', code: 'DEV-1042', imei: '356789123456701', qr: 'QR-1042', status: 'Em viagem', battery: 12, lastPosition: 'Lapa/PR — BR-376 km 624', lastCommunication: 'há 3 min', orderId: 'ord-001', client: 'Mercado Exemplo Ltda.', departure: 'Hoje 08h10', expectedReturn: 'Amanhã 18h00', responsible: 'João Pereira' },
  { id: 'dv-2', code: 'DEV-1043', imei: '356789123456702', qr: 'QR-1043', status: 'Em viagem', battery: 78, lastPosition: 'Joinville/SC', lastCommunication: 'há 1 min', orderId: 'ord-007', client: 'Auto Peças Continental', departure: 'Hoje 09h00', expectedReturn: 'Hoje 22h00', responsible: 'Mauro SulLog' },
  { id: 'dv-3', code: 'DEV-1044', imei: '356789123456703', qr: 'QR-1044', status: 'Disponível', battery: 100, lastPosition: 'Base Chapecó/SC', lastCommunication: 'há 1 h' },
  { id: 'dv-4', code: 'DEV-1050', imei: '356789123456704', qr: 'QR-1050', status: 'Sem sinal', battery: 45, lastPosition: 'Cascavel/PR — última 11h22', lastCommunication: 'há 2 h 18 min', orderId: 'ord-003', client: 'FarmaLog Distribuição', departure: 'Ontem 22h00', expectedReturn: 'Amanhã 18h00', responsible: 'Terceiro Frete Rápido PR' },
  { id: 'dv-5', code: 'DEV-1061', imei: '356789123456705', qr: 'QR-1061', status: 'Entregue aguardando retorno', battery: 92, lastPosition: 'CD Porto Alegre/RS', lastCommunication: 'há 8 h', responsible: 'Equipe CD POA' },
  { id: 'dv-6', code: 'DEV-1075', imei: '356789123456706', qr: 'QR-1075', status: 'Bateria baixa', battery: 8, lastPosition: 'Maringá/PR', lastCommunication: 'há 12 min', orderId: 'ord-005', client: 'Agro Comercial Paraná', responsible: 'Diego Ramos' },
  { id: 'dv-7', code: 'DEV-1080', imei: '356789123456707', qr: 'QR-1080', status: 'Em manutenção', battery: 0, lastPosition: 'Oficina interna', lastCommunication: 'há 3 dias' },
  { id: 'dv-8', code: 'DEV-1085', imei: '356789123456708', qr: 'QR-1085', status: 'Disponível', battery: 100, lastPosition: 'CD Guarulhos/SP', lastCommunication: 'há 30 min' },
  { id: 'dv-9', code: 'DEV-1090', imei: '356789123456709', qr: 'QR-1090', status: 'Extraviado', battery: 22, lastPosition: 'Última: Santos/SP', lastCommunication: 'há 8 dias', responsible: 'Investigação aberta' },
]

export const aiAlerts: AIAlert[] = [
  {
    id: 'al-1', type: 'sinal', severity: 'alta',
    title: 'Terceiro sem sinal há 42 min',
    explanation: 'Viagem OT-2026-1003 (FarmaLog) está sem atualização há 42 min. O motorista terceiro não aceitou o link temporário e não há device vinculado.',
    suggestedAction: 'Vincular device físico ou solicitar aprovação de exceção do gestor.',
    orderId: 'ord-003', client: 'FarmaLog Distribuição', thirdParty: 'Frete Rápido Paraná',
    createdAt: 'há 12 min',
  },
  {
    id: 'al-2', type: 'device', severity: 'media',
    title: 'Device DEV-1042 com bateria em 12%',
    explanation: 'DEV-1042 vinculado à NF 123456 (Mercado Exemplo) está com 12% de bateria. Previsão de entrega em 9h.',
    suggestedAction: 'Solicitar troca de device em Curitiba ou planejar recarga em filial.',
    orderId: 'ord-001', client: 'Mercado Exemplo Ltda.',
    createdAt: 'há 18 min',
  },
  {
    id: 'al-3', type: 'divergencia', severity: 'alta',
    title: 'Divergência de localização GPS x Device',
    explanation: 'GPS do veículo ABC-1234 indica Londrina/PR, mas DEV-1044 indica Maringá/PR. Possível transbordo, troca de veículo ou falha de rastreamento.',
    suggestedAction: 'Confirmar com motorista e auditar evento de transbordo.',
    orderId: 'ord-001', thirdParty: 'Transportes Modelo',
    createdAt: 'há 32 min',
  },
  {
    id: 'al-4', type: 'terceiro', severity: 'critica',
    title: 'Terceiro reincidente em falha de rastreamento',
    explanation: 'O terceiro Frete Rápido Paraná teve falha de rastreamento em 4 das últimas 7 viagens (57% de incidência).',
    suggestedAction: 'Exigir device físico obrigatório ou restringir terceiro para apenas transferências entre filiais.',
    thirdParty: 'Frete Rápido Paraná',
    createdAt: 'há 1 h',
  },
  {
    id: 'al-5', type: 'eta', severity: 'media',
    title: 'ETA instável — OT-2026-1003',
    explanation: 'A previsão de chegada oscilou 3 vezes nas últimas 2 horas. Provável congestionamento em Cascavel/PR.',
    suggestedAction: 'Notificar cliente FarmaLog Distribuição com nova janela: amanhã 13h30–16h00.',
    orderId: 'ord-003', client: 'FarmaLog Distribuição',
    createdAt: 'há 22 min',
  },
  {
    id: 'al-6', type: 'rota', severity: 'baixa',
    title: 'Rota fora do padrão — SCA-2B45',
    explanation: 'Veículo seguiu rota alternativa por BR-376 em vez da BR-101 prevista. Tempo estimado adicional: 22 min.',
    suggestedAction: 'Confirmar com motorista o motivo do desvio.',
    orderId: 'ord-002',
    createdAt: 'há 8 min',
  },
  {
    id: 'al-7', type: 'cliente', severity: 'media',
    title: 'Clientes que devem ser avisados',
    explanation: '3 clientes têm entregas com risco de atraso superior a 30%. Recomenda-se enviar comunicação proativa.',
    suggestedAction: 'Disparar notificações automáticas via WhatsApp.',
    createdAt: 'há 5 min',
  },
]

export const freightTables: FreightTable[] = [
  { id: 'ft-1', name: 'TAB-MERC-2026-01', client: 'Mercado Exemplo Ltda.', regionOrigin: 'SP', regionDest: 'RS', cargoType: 'Geral', modality: 'Fracionado', minValue: 180, perKg: 0.42, perKm: 2.8, adValorem: 0.18, gris: 0.12, pedagio: 320, taxas: 45, validity: '01/01 – 31/12/2026', status: 'Ativa' },
  { id: 'ft-2', name: 'TAB-SUL-2026-02', client: 'Distribuidora Sul Brasil', regionOrigin: 'PR', regionDest: 'SC', cargoType: 'Geral', modality: 'Lotação', minValue: 320, perKg: 0.36, perKm: 3.1, adValorem: 0.15, gris: 0.10, pedagio: 180, taxas: 60, validity: '01/02 – 31/12/2026', status: 'Ativa' },
  { id: 'ft-3', name: 'TAB-AGR-2026-01', client: 'Agro Comercial Paraná', regionOrigin: 'PR', regionDest: 'PR', cargoType: 'Defensivos', modality: 'Lotação', minValue: 240, perKg: 0.38, perKm: 2.6, adValorem: 0.22, gris: 0.14, pedagio: 90, taxas: 40, validity: '01/01 – 31/12/2026', status: 'Ativa' },
  { id: 'ft-4', name: 'TAB-FRIG-2026-01', client: 'Frigorífico Modelo', regionOrigin: 'RS', regionDest: 'SP', cargoType: 'Refrigerado', modality: 'Lotação', minValue: 600, perKg: 0.55, perKm: 4.2, adValorem: 0.25, gris: 0.18, pedagio: 480, taxas: 120, validity: '01/01 – 31/12/2026', status: 'Ativa' },
  { id: 'ft-5', name: 'TAB-FARM-2026-04', client: 'FarmaLog Distribuição', regionOrigin: 'SP', regionDest: 'RS', cargoType: 'Medicamentos', modality: 'Crítico', minValue: 480, perKg: 0.62, perKm: 3.8, adValorem: 0.32, gris: 0.22, pedagio: 380, taxas: 95, validity: '01/03 – 30/11/2026', status: 'Ativa' },
  { id: 'ft-6', name: 'TAB-REDE-2026-03', client: 'Rede Max Atacado', regionOrigin: 'SP', regionDest: 'SC', cargoType: 'Geral', modality: 'Lotação', minValue: 380, perKg: 0.34, perKm: 2.9, adValorem: 0.16, gris: 0.10, pedagio: 220, taxas: 55, validity: '01/01 – 31/12/2026', status: 'Em homologação' },
]

export const geofences: Geofence[] = [
  { id: 'gf-1', name: 'CD Guarulhos', type: 'CD', address: 'Rod. Hélio Smidt, Guarulhos/SP', radius: 500, status: 'Ativa' },
  { id: 'gf-2', name: 'Filial Curitiba', type: 'Filial', address: 'Av. das Torres, Curitiba/PR', radius: 300, status: 'Ativa' },
  { id: 'gf-3', name: 'Filial Florianópolis', type: 'Filial', address: 'Av. Beira-Mar Norte, Florianópolis/SC', radius: 250, status: 'Ativa' },
  { id: 'gf-4', name: 'CD Porto Alegre', type: 'CD', address: 'Av. Assis Brasil, Porto Alegre/RS', radius: 400, status: 'Ativa' },
  { id: 'gf-5', name: 'Cliente Mercado Exemplo Canoas', type: 'Cliente', address: 'Av. Boqueirão, Canoas/RS', radius: 200, status: 'Ativa' },
  { id: 'gf-6', name: 'Região Metropolitana SP', type: 'Região', address: 'Grande São Paulo', radius: 60000, status: 'Ativa' },
  { id: 'gf-7', name: 'Hub Joinville', type: 'CD', address: 'BR-101 km 50, Joinville/SC', radius: 350, status: 'Ativa' },
]

export const systemUsers: SystemUser[] = [
  { id: 'u1', name: 'Marina Schneider', email: 'marina@scapini.com.br', profile: 'Operador', company: 'Scapini Transportes', lastAccess: 'há 5 min', status: 'Ativo' },
  { id: 'u2', name: 'Lucas Scapini', email: 'lucas@scapini.com.br', profile: 'Gestor', company: 'Scapini Transportes', lastAccess: 'há 2 h', status: 'Ativo' },
  { id: 'u3', name: 'Henrique Costa', email: 'henrique@scapini.com.br', profile: 'Admin', company: 'Scapini Transportes', lastAccess: 'há 1 dia', status: 'Ativo' },
  { id: 'u4', name: 'Cláudia Tavares', email: 'claudia@mercadoexemplo.com.br', profile: 'Cliente', company: 'Mercado Exemplo Ltda.', lastAccess: 'há 30 min', status: 'Ativo' },
  { id: 'u5', name: 'João Pereira', email: 'joao.pereira@scapini.com.br', profile: 'Motorista', company: 'Scapini Transportes', lastAccess: 'há 12 min', status: 'Ativo' },
  { id: 'u6', name: 'Fernanda Lima', email: 'fernanda@scapini.com.br', profile: 'TI', company: 'Scapini Transportes', lastAccess: 'há 3 h', status: 'Ativo' },
  { id: 'u7', name: 'Rodrigo Antunes', email: 'rodrigo@suldistri.com.br', profile: 'Cliente', company: 'Distribuidora Sul Brasil', lastAccess: 'há 4 dias', status: 'Ativo' },
  { id: 'u8', name: 'Carlos Mendes', email: 'carlos.mendes@scapini.com.br', profile: 'Motorista', company: 'Scapini Transportes', lastAccess: 'há 1 h', status: 'Ativo' },
]

export const rastreadorIntegrations: RastreadorIntegration[] = [
  { id: 'ri-1', carrier: 'Transportes Modelo', vendor: 'Onixsat', type: 'REST API v2', endpoint: 'https://api.onixsat.com.br/v2/positions', token: 'ony_*****************a83f', vehicleId: 'ONX-77231', plate: 'ABC-1234', frequency: '60 s', status: 'Conectado', lastSignal: 'há 1 min', authorizedTrips: 142 },
  { id: 'ri-2', carrier: 'Rodobras Terceirizações', vendor: 'Sascar', type: 'REST API', endpoint: 'https://api.sascar.com.br/positions', token: 'ssc_*****************b92e', vehicleId: 'SSC-44551', plate: 'RDB-2024', frequency: '30 s', status: 'Conectado', lastSignal: 'há 8 s', authorizedTrips: 215 },
  { id: 'ri-3', carrier: 'Expresso Terceiro Sul', vendor: 'Autotrac', type: 'SOAP', endpoint: 'https://ws.autotrac.com.br/Tracking.asmx', token: 'atr_*****************c12d', vehicleId: 'ATR-99102', plate: 'ETS-4040', frequency: '120 s', status: 'Conectado', lastSignal: 'há 25 s', authorizedTrips: 102 },
  { id: 'ri-4', carrier: 'SulLog Agregados', vendor: 'Maxtrack', type: 'REST API', endpoint: 'https://api.maxtrack.com.br/v1/feed', token: 'mxt_*****************d44a', vehicleId: 'MXT-12089', plate: 'SUL-1010', frequency: '60 s', status: 'Erro', lastSignal: 'há 3 h', authorizedTrips: 47 },
  { id: 'ri-5', carrier: 'Frete Rápido Paraná', vendor: '—', type: '—', endpoint: '—', token: '—', vehicleId: '—', plate: 'FRP-3030', frequency: '—', status: 'Aguardando teste', lastSignal: '—', authorizedTrips: 0 },
]

export const migrationItems: MigrationItem[] = [
  { id: 'm1', category: 'Clientes', total: 1280, migrated: 1248, pending: 32, errors: 0, status: 'Em andamento' },
  { id: 'm2', category: 'Remetentes', total: 1845, migrated: 1810, pending: 35, errors: 0, status: 'Em andamento' },
  { id: 'm3', category: 'Destinatários', total: 4920, migrated: 4892, pending: 28, errors: 0, status: 'Em andamento' },
  { id: 'm4', category: 'Motoristas', total: 118, migrated: 112, pending: 6, errors: 0, status: 'Em andamento' },
  { id: 'm5', category: 'Veículos', total: 92, migrated: 86, pending: 6, errors: 0, status: 'Em andamento' },
  { id: 'm6', category: 'Entregas históricas', total: 60500, migrated: 58430, pending: 2050, errors: 20, status: 'Em andamento' },
  { id: 'm7', category: 'CT-e (histórico)', total: 58200, migrated: 57890, pending: 310, errors: 0, status: 'Em andamento' },
  { id: 'm8', category: 'MDF-e (histórico)', total: 4480, migrated: 4422, pending: 58, errors: 0, status: 'Em andamento' },
  { id: 'm9', category: 'Ocorrências', total: 2210, migrated: 2192, pending: 18, errors: 0, status: 'Em andamento' },
  { id: 'm10', category: 'Tabelas de frete', total: 84, migrated: 84, pending: 0, errors: 0, status: 'Concluída' },
  { id: 'm11', category: 'Usuários', total: 32, migrated: 32, pending: 0, errors: 0, status: 'Concluída' },
  { id: 'm12', category: 'Status (de-para)', total: 14, migrated: 12, pending: 2, errors: 0, status: 'Com pendência' },
]

export const dePara = [
  { from: 'Cliente', to: 'customer_name', status: 'Mapeado' },
  { from: 'CNPJ', to: 'tax_id', status: 'Mapeado' },
  { from: 'Razão Social', to: 'legal_name', status: 'Mapeado' },
  { from: 'Endereço', to: 'address', status: 'Mapeado' },
  { from: 'Placa', to: 'vehicle_plate', status: 'Mapeado' },
  { from: 'Motorista', to: 'driver_name', status: 'Mapeado' },
  { from: 'CNH', to: 'driver_license', status: 'Mapeado' },
  { from: 'Número NF', to: 'invoice_number', status: 'Mapeado' },
  { from: 'CT-e', to: 'cte_number', status: 'Mapeado' },
  { from: 'MDF-e', to: 'mdfe_number', status: 'Mapeado' },
  { from: 'Status antigo', to: 'shipment_status', status: 'Requer validação' },
  { from: 'Tipo de veículo (texto livre)', to: 'vehicle_type (enum)', status: 'Requer validação' },
]

export const dataParaStatus = [
  { from: 'Pedido criado', to: 'Aguardando coleta' },
  { from: 'Coleta realizada', to: 'Coletada' },
  { from: 'Em viagem', to: 'Em trânsito' },
  { from: 'Chegada filial', to: 'Na filial' },
  { from: 'Saiu entrega', to: 'Saiu para entrega' },
  { from: 'Finalizado', to: 'Entregue' },
  { from: 'Ocorrência', to: 'Ocorrência' },
  { from: 'Devolução', to: 'Devolvida' },
]

export const migrationInconsistencias = [
  { type: 'Cliente sem CNPJ', record: 'CL-44521 — Distribuidora Antiga', severity: 'alta', suggestion: 'Solicitar CNPJ ao comercial' },
  { type: 'Endereço incompleto', record: 'CL-44889 — Mercado XPTO', severity: 'media', suggestion: 'Geocodificar com Google Maps' },
  { type: 'Motorista duplicado', record: 'MOT-128 e MOT-129', severity: 'media', suggestion: 'Fundir cadastros' },
  { type: 'Placa inválida', record: 'VE-2201 — A11B22', severity: 'alta', suggestion: 'Corrigir placa Mercosul' },
  { type: 'Entrega sem destinatário', record: 'ENT-58721', severity: 'alta', suggestion: 'Vincular destinatário pelo CNPJ' },
  { type: 'CT-e sem NF vinculada', record: 'CTE-128945', severity: 'critica', suggestion: 'Recuperar NF na SEFAZ' },
  { type: 'Status antigo não reconhecido', record: '14 registros com status "Em rota agora"', severity: 'media', suggestion: 'Mapear para Em trânsito' },
  { type: 'Documento fiscal duplicado', record: 'NF 12345 / CT-e 98765 duplicados', severity: 'alta', suggestion: 'Auditoria fiscal' },
  { type: 'Cidade não localizada', record: 'Vila São José (sem município)', severity: 'baixa', suggestion: 'Padronizar IBGE' },
  { type: 'Data inválida', record: '04 registros com data 31/02/2023', severity: 'media', suggestion: 'Corrigir manualmente' },
]

export const goLivePlan = [
  { step: 'Levantamento de dados', status: 'Concluído' },
  { step: 'Importação inicial', status: 'Concluído' },
  { step: 'Validação de cadastros', status: 'Em andamento' },
  { step: 'Validação de entregas históricas', status: 'Em andamento' },
  { step: 'Configuração fiscal', status: 'Em andamento' },
  { step: 'Configuração de tabelas de frete', status: 'Concluído' },
  { step: 'Configuração de usuários', status: 'Concluído' },
  { step: 'Treinamento da operação', status: 'Em andamento' },
  { step: 'Operação assistida', status: 'Não iniciado' },
  { step: 'Virada oficial para Scapini Track AI', status: 'Não iniciado' },
  { step: 'Desativação operacional do Rota Livre', status: 'Não iniciado' },
]

// Chart data
export const slaByDayData = [
  { day: 'Seg', noPrazo: 92, atrasada: 8 },
  { day: 'Ter', noPrazo: 95, atrasada: 5 },
  { day: 'Qua', noPrazo: 89, atrasada: 11 },
  { day: 'Qui', noPrazo: 94, atrasada: 6 },
  { day: 'Sex', noPrazo: 91, atrasada: 9 },
  { day: 'Sáb', noPrazo: 97, atrasada: 3 },
]

export const slaByClientData = [
  { client: 'Mercado Exemplo', sla: 96 },
  { client: 'SulDistri', sla: 92 },
  { client: 'Agro PR', sla: 89 },
  { client: 'Rede Max', sla: 94 },
  { client: 'Frig. Modelo', sla: 91 },
  { client: 'Continental', sla: 87 },
  { client: 'FarmaLog', sla: 85 },
  { client: 'ConstruMais', sla: 90 },
]

export const statusDistribution = [
  { name: 'Em trânsito', value: 38, color: '#356bb6' },
  { name: 'Saiu para entrega', value: 22, color: '#ff7d2e' },
  { name: 'Entregue', value: 124, color: '#10b981' },
  { name: 'Na filial', value: 14, color: '#88afdf' },
  { name: 'Atrasada', value: 6, color: '#ef4444' },
  { name: 'Ocorrência', value: 3, color: '#f59e0b' },
]

export const trackingSourcesUsage = [
  { source: 'GPS próprio', value: 42, color: '#1f365c' },
  { source: 'API terceiro', value: 24, color: '#356bb6' },
  { source: 'App motorista', value: 18, color: '#5689cd' },
  { source: 'Link temporário', value: 7, color: '#88afdf' },
  { source: 'Device na carga', value: 6, color: '#ff7d2e' },
  { source: 'Apenas eventos', value: 3, color: '#828ca3' },
]

export const eventTypesFilial = [
  { id: 'ev-1', cargoId: 'CG-2026-501', branch: 'Filial Curitiba/PR', previous: 'Guarulhos/SP', next: 'Florianópolis/SC', deliveries: 28, status: 'Recebida', arrival: 'Hoje 17h45', departure: 'Hoje 20h30', responsible: 'Equipe noturna Curitiba' },
  { id: 'ev-2', cargoId: 'CG-2026-502', branch: 'CD Guarulhos/SP', previous: '—', next: 'Curitiba/PR', deliveries: 41, status: 'Em conferência', arrival: '—', departure: 'Hoje 18h00', responsible: 'Equipe expedição GRU' },
  { id: 'ev-3', cargoId: 'CG-2026-503', branch: 'Filial Florianópolis/SC', previous: 'Curitiba/PR', next: 'CD Porto Alegre/RS', deliveries: 32, status: 'Cross-docking', arrival: 'Hoje 03h15', departure: 'Hoje 06h45', responsible: 'Carlos Mendes' },
  { id: 'ev-4', cargoId: 'CG-2026-504', branch: 'CD Porto Alegre/RS', previous: 'Florianópolis/SC', next: 'Cliente final', deliveries: 24, status: 'Separação última milha', arrival: 'Hoje 09h20', departure: 'Hoje 13h00', responsible: 'Equipe RS' },
  { id: 'ev-5', cargoId: 'CG-2026-505', branch: 'Hub Joinville/SC', previous: 'Curitiba/PR', next: 'Blumenau/SC', deliveries: 12, status: 'Atraso de saída', arrival: 'Hoje 08h00', departure: 'Atrasada — previsto 14h30', responsible: 'André Lima' },
]

export const ultimaMilhaList = [
  { id: 'um-1', delivery: 'SCP-2026-0002', client: 'Distribuidora Sul Brasil', recipient: 'SulDistri Floripa', driver: 'Carlos Mendes', vehicle: 'SCA-2B45', status: 'Em rota', eta: 'Hoje 15h30–17h00', lastUpdate: 'há 3 min', trackingSource: 'GPS próprio', risk: 'baixo' },
  { id: 'um-2', delivery: 'SCP-2026-0005', client: 'Agro Comercial Paraná', recipient: 'Cooperativa Maringá', driver: 'Diego Ramos', vehicle: 'SCA-5E10', status: 'Saiu para entrega', eta: 'Hoje 18h00–19h30', lastUpdate: 'há 25 min', trackingSource: 'GPS próprio', risk: 'baixo' },
  { id: 'um-3', delivery: 'SCP-2026-0007', client: 'Auto Peças Continental', recipient: 'Continental Blumenau', driver: 'Mauro SulLog', vehicle: 'SUL-1010', status: 'Em rota', eta: 'Hoje 13h00–14h30', lastUpdate: 'há 15 min', trackingSource: 'Device na carga', risk: 'alto' },
  { id: 'um-4', delivery: 'SCP-2026-0011', client: 'Mercado Exemplo Ltda.', recipient: 'Mercado Exemplo Loja 7', driver: 'André Lima', vehicle: 'SCA-1A23', status: 'Chegando ao destino', eta: 'Hoje 14h45', lastUpdate: 'há 2 min', trackingSource: 'App motorista', risk: 'baixo' },
  { id: 'um-5', delivery: 'SCP-2026-0012', client: 'Rede Max Atacado', recipient: 'Rede Max Filial 3', driver: 'Diego Ramos', vehicle: 'SCA-5E10', status: 'Reentrega', eta: 'Amanhã 09h00–11h00', lastUpdate: 'há 1 h', trackingSource: 'App motorista', risk: 'medio' },
  { id: 'um-6', delivery: 'SCP-2026-0014', client: 'Distribuidora Sul Brasil', recipient: 'SulDistri Joinville', driver: 'Carlos Mendes', vehicle: 'SCA-2B45', status: 'Cliente ausente', eta: 'Reagendado amanhã', lastUpdate: 'há 35 min', trackingSource: 'App motorista', risk: 'medio' },
]
