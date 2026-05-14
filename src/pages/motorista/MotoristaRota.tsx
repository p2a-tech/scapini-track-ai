import { ChevronRight, MapPin, ArrowLeft, Navigation } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../../components/mobile/MobileFrame'

const stops = [
  { id: 1, status: 'Concluído', client: 'Mercado Exemplo — Loja 3', nf: '123450', address: 'R. das Flores, 200 — Canoas/RS', window: '08h00–10h00' },
  { id: 2, status: 'Concluído', client: 'Distribuidora SulBras', nf: '123451', address: 'Av. Brasil, 1500 — Canoas/RS', window: '10h00–12h00' },
  { id: 3, status: 'Em rota', client: 'Mercado Exemplo — Loja 7', nf: '123456', address: 'Av. Boqueirão, 1500 — Canoas/RS', window: '14h00–17h00' },
  { id: 4, status: 'Aguardando', client: 'FarmaLog POA', nf: '123458', address: 'Av. Assis Brasil, 4011 — Porto Alegre/RS', window: '15h00–18h00' },
  { id: 5, status: 'Aguardando', client: 'ConstruMais Filial 4', nf: '654321', address: 'Av. Beira Rio, 220 — Porto Alegre/RS', window: '16h00–19h00' },
]

const statusColors: Record<string, string> = {
  'Concluído': 'bg-success-100 text-success-700',
  'Em rota': 'bg-brand-100 text-brand-700',
  'Aguardando': 'bg-graphite-100 text-graphite-700',
}

export default function MotoristaRota() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-graphite-100 py-10">
      <MobileFrame label="App do Motorista — Rota">
        <div className="bg-graphite-50 min-h-full">
          <div className="bg-white px-4 py-3 flex items-center gap-2 border-b border-graphite-200">
            <button onClick={() => navigate('/motorista/inicio')} className="p-1.5"><ArrowLeft size={16} /></button>
            <div className="flex-1">
              <div className="font-semibold text-graphite-900">Sua rota</div>
              <div className="text-xs text-graphite-500">5 paradas · 238 km · 5h40</div>
            </div>
          </div>

          <div className="p-4 space-y-2">
            {stops.map((s) => (
              <button key={s.id} onClick={() => navigate(`/motorista/entrega/${s.id}`)} className="w-full bg-white rounded-xl p-4 shadow-card text-left flex items-start gap-3">
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${statusColors[s.status]}`}>{s.id}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-graphite-900">{s.client}</div>
                    <ChevronRight size={14} className="text-graphite-400" />
                  </div>
                  <div className="text-xs text-graphite-500 flex items-center gap-1 mt-0.5"><MapPin size={11} /> {s.address}</div>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-graphite-500">NF {s.nf} · {s.window}</span>
                    <span className={`chip ${statusColors[s.status]}`}>{s.status}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-4">
            <button className="w-full bg-navy-900 text-white rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 shadow-card">
              <Navigation size={16} /> Abrir navegação visual
            </button>
          </div>
        </div>
      </MobileFrame>
    </div>
  )
}
