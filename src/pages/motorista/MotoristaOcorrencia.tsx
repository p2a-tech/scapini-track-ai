import { ArrowLeft, Camera, Send, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../../components/mobile/MobileFrame'

const types = ['Cliente ausente', 'Cliente fechado', 'Endereço incorreto', 'Avaria', 'Recusa', 'Atraso por trânsito', 'Problema mecânico', 'Outro']

export default function MotoristaOcorrencia() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-graphite-100 py-10">
      <MobileFrame label="App do Motorista — Ocorrência">
        <div className="bg-graphite-50 min-h-full">
          <div className="bg-white px-4 py-3 flex items-center gap-2 border-b border-graphite-200">
            <button onClick={() => navigate(-1)} className="p-1.5"><ArrowLeft size={16} /></button>
            <div className="font-semibold text-graphite-900">Registrar ocorrência</div>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <label className="block text-xs text-graphite-700 mb-1 font-medium">Tipo de ocorrência</label>
              <div className="grid grid-cols-2 gap-2">
                {types.map((t, i) => (
                  <button key={t} className={`px-3 py-2.5 rounded-lg text-xs font-medium text-left ${i === 0 ? 'bg-brand-700 text-white' : 'bg-white text-graphite-900 shadow-card'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-graphite-700 mb-1 font-medium">Comentário</label>
              <textarea className="w-full rounded-lg bg-white border border-graphite-200 px-3 py-2 text-sm min-h-[100px]" placeholder="Descreva o que aconteceu..." defaultValue="Cliente solicitou reagendamento para amanhã pela manhã. Local fechado às 12h45." />
            </div>

            <div className="bg-white rounded-xl p-4 shadow-card">
              <div className="text-xs text-graphite-700 font-medium mb-2">Foto (até 3)</div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <button key={i} className="aspect-square rounded-lg border-2 border-dashed border-graphite-300 flex flex-col items-center justify-center text-graphite-400">
                    <Camera size={20} />
                    <span className="text-[10px] mt-1">Foto {i}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-card text-xs flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-graphite-700"><MapPin size={12} className="text-brand-700" /> Localização atual</span>
              <span className="text-graphite-500">-23.5505, -46.6333</span>
            </div>

            <button className="w-full bg-brand-700 text-white rounded-xl py-4 text-base font-bold flex items-center justify-center gap-2 shadow-card">
              <Send size={18} /> Enviar para a operação
            </button>
          </div>
        </div>
      </MobileFrame>
    </div>
  )
}
