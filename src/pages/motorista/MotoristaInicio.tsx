import { Play, MapPin, AlertTriangle, MessageSquare, Truck, Clock, Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../../components/mobile/MobileFrame'

export default function MotoristaInicio() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-graphite-100 py-10">
      <MobileFrame label="App do Motorista — Início">
        <div className="bg-graphite-50 min-h-full">
          <div className="bg-navy-900 text-white px-5 py-4">
            <div className="text-xs text-navy-200">Bom dia,</div>
            <div className="font-bold text-lg">João Pereira</div>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="bg-success-500 w-2 h-2 rounded-full inline-block"></span>
              <span>Em jornada · 07h12</span>
            </div>
          </div>

          <div className="px-4 py-4 space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-card">
              <div className="text-xs text-graphite-500">Veículo atribuído</div>
              <div className="font-bold text-graphite-900 flex items-center gap-2"><Truck size={16} className="text-brand-700" />SCA-1A23 — Truck 14t</div>
              <div className="text-xs text-graphite-500 mt-1">14 ton · 45 m³ · Sascar GPS</div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded-xl p-3 text-center shadow-card">
                <Package size={18} className="mx-auto text-brand-700" />
                <div className="font-bold mt-1">14</div>
                <div className="text-[10px] text-graphite-500">Paradas</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-card">
                <MapPin size={18} className="mx-auto text-accent-700" />
                <div className="font-bold mt-1">238 km</div>
                <div className="text-[10px] text-graphite-500">Distância</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-card">
                <Clock size={18} className="mx-auto text-success-700" />
                <div className="font-bold mt-1">5h40</div>
                <div className="text-[10px] text-graphite-500">Previsão</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-card">
              <div className="text-xs text-graphite-500">Próxima parada</div>
              <div className="font-semibold text-graphite-900 mt-1">Mercado Exemplo — Loja 7</div>
              <div className="text-xs text-graphite-500">Av. Boqueirão, 1500 — Canoas/RS · 12 km</div>
              <div className="mt-2 text-xs bg-brand-50 text-brand-700 rounded-lg px-2 py-1 inline-block">Janela 14h00–17h00</div>
            </div>

            <button onClick={() => navigate('/motorista/rota')} className="w-full bg-success-600 hover:bg-success-700 text-white rounded-xl py-4 text-base font-bold flex items-center justify-center gap-2 shadow-card">
              <Play size={18} /> Iniciar rota
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button className="bg-white rounded-xl py-3 text-sm font-semibold text-graphite-900 shadow-card flex items-center justify-center gap-2">
                <MapPin size={16} className="text-brand-700" /> Enviar localização
              </button>
              <button onClick={() => navigate('/motorista/ocorrencia')} className="bg-white rounded-xl py-3 text-sm font-semibold text-graphite-900 shadow-card flex items-center justify-center gap-2">
                <AlertTriangle size={16} className="text-warning-600" /> Ocorrência
              </button>
            </div>

            <button onClick={() => navigate('/motorista/chat')} className="w-full bg-navy-900 text-white rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 shadow-card">
              <MessageSquare size={16} /> Falar com operação
            </button>
          </div>
        </div>
      </MobileFrame>
    </div>
  )
}
