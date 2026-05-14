// Coordenadas reais (lat, lng) das cidades atendidas pela Scapini Transportes
export const cityCoords: Record<string, [number, number]> = {
  'Chapecó/SC': [-27.0964, -52.6184],
  'Curitiba/PR': [-25.4284, -49.2733],
  'Londrina/PR': [-23.3045, -51.1696],
  'Maringá/PR': [-23.4205, -51.9331],
  'São Paulo/SP': [-23.5505, -46.6333],
  'Guarulhos/SP': [-23.4543, -46.5337],
  'Joinville/SC': [-26.3045, -48.8487],
  'Porto Alegre/RS': [-30.0346, -51.2177],
  'Cascavel/PR': [-24.9558, -53.4552],
  'Blumenau/SC': [-26.9194, -49.0661],
  'Itajaí/SC': [-26.9077, -48.6618],
  'Florianópolis/SC': [-27.5949, -48.5482],
  'Caxias do Sul/RS': [-29.1678, -51.1791],
  'Canoas/RS': [-29.9177, -51.1839],
  // adicionais comuns no protótipo
  'Filial Curitiba': [-25.4500, -49.2500],
  'Filial Florianópolis': [-27.5900, -48.5400],
  'CD Porto Alegre/RS': [-30.0100, -51.2000],
  'CD Porto Alegre': [-30.0100, -51.2000],
  'CD Guarulhos/SP': [-23.4350, -46.5350],
  'CD Guarulhos': [-23.4350, -46.5350],
  'Base Chapecó/SC': [-27.1000, -52.6200],
  'Hub Joinville/SC': [-26.3100, -48.8500],
  'Hub Joinville': [-26.3100, -48.8500],
  // destinos
  'Cliente final — Canoas/RS': [-29.9170, -51.1830],
}

export function coordsFor(name: string): [number, number] | null {
  if (!name) return null
  if (cityCoords[name]) return cityCoords[name]
  // tenta achar pela última parte (ex: "X — Curitiba/PR")
  const parts = name.split(/[—\-]+/).map((s) => s.trim())
  for (const p of parts.reverse()) {
    if (cityCoords[p]) return cityCoords[p]
  }
  return null
}

// Brasil sul-sudeste — bounds e centro padrão
export const defaultCenter: [number, number] = [-26.5, -49.5]
export const defaultZoom = 6
