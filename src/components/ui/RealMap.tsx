import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import { ReactNode, useEffect } from 'react'
import { defaultCenter, defaultZoom } from '../../data/coords'

export type MarkerStatus = 'normal' | 'atencao' | 'parado' | 'aguardando' | 'terceiro' | 'evento' | 'cliente' | 'cd'

export interface RealMarker {
  id: string
  position: [number, number]
  label: string
  detail?: string
  status: MarkerStatus
  popup?: ReactNode
}

export interface RealRoute {
  id: string
  positions: [number, number][]
  color?: string
  dashArray?: string
  weight?: number
}

export interface RealGeofence {
  id: string
  center: [number, number]
  radius: number // metros
  color?: string
  label?: string
}

const statusColors: Record<MarkerStatus, string> = {
  normal: '#10b981',     // verde — em rota normal
  atencao: '#f59e0b',    // amarelo — risco
  parado: '#ef4444',     // vermelho — parado
  aguardando: '#356bb6', // azul — aguardando
  terceiro: '#7c3aed',   // roxo — terceiro/API
  evento: '#646e87',     // cinza — evento de filial
  cliente: '#ff7d2e',    // laranja — cliente
  cd: '#1f365c',         // navy — CD/Filial
}

const truckSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M3 17V7a1 1 0 0 1 1-1h10v9H8a3 3 0 0 0-5 2zm12-4h3l3 4v0a3 3 0 0 0-5 0h-1v-4zM7 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>`
const pinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>`

function makeIcon(status: MarkerStatus): L.DivIcon {
  const color = statusColors[status]
  const inner = status === 'evento' || status === 'cd' || status === 'cliente' ? pinSvg : truckSvg
  const html = `
    <div style="
      width: 30px; height: 30px; border-radius: 50%;
      background:${color};
      box-shadow: 0 0 0 4px rgba(255,255,255,0.95), 0 2px 6px rgba(15,23,42,0.4);
      display:flex; align-items:center; justify-content:center;
      transform: translate(-50%, -50%);
    ">${inner}</div>`
  return L.divIcon({
    html,
    className: 'scapini-marker',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [0, -16],
  })
}

function FitBounds({ markers }: { markers: RealMarker[] }) {
  const map = useMap()
  useEffect(() => {
    if (!markers.length) return
    if (markers.length === 1) {
      map.setView(markers[0].position, 12)
      return
    }
    const bounds = L.latLngBounds(markers.map((m) => m.position))
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 11 })
  }, [markers, map])
  return null
}

export default function RealMap({
  markers = [],
  routes = [],
  geofences = [],
  height = 380,
  center,
  zoom,
  fitToMarkers = true,
  onMarkerClick,
  showLegend = true,
}: {
  markers?: RealMarker[]
  routes?: RealRoute[]
  geofences?: RealGeofence[]
  height?: number
  center?: [number, number]
  zoom?: number
  fitToMarkers?: boolean
  onMarkerClick?: (m: RealMarker) => void
  showLegend?: boolean
}) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-graphite-200" style={{ height }}>
      <MapContainer
        center={center || defaultCenter}
        zoom={zoom || defaultZoom}
        scrollWheelZoom
        style={{ width: '100%', height: '100%' }}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geofences.map((g) => (
          <Circle
            key={g.id}
            center={g.center}
            radius={g.radius}
            pathOptions={{ color: g.color || '#356bb6', fillOpacity: 0.12, weight: 2 }}
          >
            {g.label && <Popup>{g.label}</Popup>}
          </Circle>
        ))}

        {routes.map((r) => (
          <Polyline
            key={r.id}
            positions={r.positions}
            pathOptions={{
              color: r.color || '#1f365c',
              weight: r.weight ?? 3,
              opacity: 0.75,
              dashArray: r.dashArray,
            }}
          />
        ))}

        {markers.map((m) => (
          <Marker
            key={m.id}
            position={m.position}
            icon={makeIcon(m.status)}
            eventHandlers={{ click: () => onMarkerClick?.(m) }}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-semibold text-graphite-900">{m.label}</div>
                {m.detail && <div className="text-xs text-graphite-600 mt-0.5">{m.detail}</div>}
                {m.popup && <div className="mt-2">{m.popup}</div>}
              </div>
            </Popup>
          </Marker>
        ))}

        {fitToMarkers && markers.length > 0 && <FitBounds markers={markers} />}
      </MapContainer>

      {showLegend && (
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur rounded-lg shadow-card border border-graphite-200 px-3 py-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] z-[400]">
          <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: statusColors.normal }}></span>Em rota</span>
          <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: statusColors.atencao }}></span>Risco</span>
          <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: statusColors.parado }}></span>Parado</span>
          <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: statusColors.aguardando }}></span>Aguardando</span>
          <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: statusColors.terceiro }}></span>Terceiro/API</span>
          <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: statusColors.evento }}></span>Eventos</span>
        </div>
      )}
    </div>
  )
}
