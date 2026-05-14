import { Truck, MapPin } from 'lucide-react'

interface Marker {
  id: string
  x: number // 0–100
  y: number // 0–100
  label: string
  status: 'normal' | 'atencao' | 'parado' | 'aguardando' | 'terceiro' | 'evento'
  detail?: string
}

const colorMap = {
  normal: 'bg-success-500 ring-success-200',
  atencao: 'bg-warning-500 ring-warning-200',
  parado: 'bg-danger-500 ring-danger-200',
  aguardando: 'bg-brand-500 ring-brand-200',
  terceiro: 'bg-accent-500 ring-accent-200',
  evento: 'bg-graphite-500 ring-graphite-200',
}

export default function MockMap({
  markers = [],
  height = 380,
  onClickMarker,
  showRoutes = true,
}: {
  markers?: Marker[]
  height?: number
  onClickMarker?: (m: Marker) => void
  showRoutes?: boolean
}) {
  return (
    <div
      className="relative rounded-xl overflow-hidden border border-graphite-200 bg-gradient-to-br from-brand-50 via-white to-graphite-100"
      style={{ height }}
    >
      {/* grid */}
      <svg className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4d8e0" strokeWidth="0.5" />
          </pattern>
          <pattern id="majorGrid" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#aeb5c4" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#majorGrid)" />
      </svg>

      {/* "rodovias" simuladas */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M 5 80 Q 30 60, 50 65 T 95 30" stroke="#88afdf" strokeWidth="0.6" fill="none" strokeDasharray="1.5,1" />
        <path d="M 10 20 Q 40 40, 70 30 T 95 70" stroke="#88afdf" strokeWidth="0.6" fill="none" strokeDasharray="1.5,1" />
        <path d="M 50 5 Q 55 30, 50 55 T 45 95" stroke="#88afdf" strokeWidth="0.6" fill="none" strokeDasharray="1.5,1" />
      </svg>

      {/* cidades label */}
      <div className="absolute top-4 left-4 text-[10px] uppercase tracking-wider text-graphite-500">São Paulo/SP</div>
      <div className="absolute top-12 right-4 text-[10px] uppercase tracking-wider text-graphite-500">Curitiba/PR</div>
      <div className="absolute bottom-6 left-1/3 text-[10px] uppercase tracking-wider text-graphite-500">Florianópolis/SC</div>
      <div className="absolute bottom-4 right-6 text-[10px] uppercase tracking-wider text-graphite-500">Porto Alegre/RS</div>
      <div className="absolute top-1/2 left-1/4 text-[10px] uppercase tracking-wider text-graphite-500">Joinville/SC</div>

      {/* rotas */}
      {showRoutes && (
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 12 18 Q 35 35, 55 45 T 75 75" stroke="#1f365c" strokeWidth="0.4" fill="none" strokeDasharray="2,1" opacity="0.6" />
          <path d="M 70 25 Q 55 50, 50 70 T 40 90" stroke="#ff7d2e" strokeWidth="0.4" fill="none" strokeDasharray="2,1" opacity="0.6" />
        </svg>
      )}

      {/* markers */}
      {markers.map((m) => (
        <button
          key={m.id}
          onClick={() => onClickMarker?.(m)}
          className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
        >
          <span className={`block rounded-full ring-4 ${colorMap[m.status]} p-1.5 text-white shadow-md`}>
            {m.status === 'evento' ? <MapPin size={12} /> : <Truck size={12} />}
          </span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap text-[10px] bg-navy-900 text-white px-2 py-1 rounded shadow-lg z-10">
            {m.label}{m.detail ? ` — ${m.detail}` : ''}
          </span>
        </button>
      ))}

      {/* legenda */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur rounded-lg shadow-card border border-graphite-200 px-3 py-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px]">
        <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success-500"></span>Em rota</span>
        <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning-500"></span>Risco</span>
        <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger-500"></span>Parado</span>
        <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-500"></span>Aguardando</span>
        <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-500"></span>Terceiro/API</span>
        <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-graphite-500"></span>Eventos</span>
      </div>
    </div>
  )
}
