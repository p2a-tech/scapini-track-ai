import { ArrowLeft, CheckCircle2, Camera, AlertTriangle, MapPin, FileText, FileSignature } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import MobileFrame from '../../components/mobile/MobileFrame'

export default function MotoristaEntregaDetalhe() {
  const navigate = useNavigate()
  const { id } = useParams()
  return (
    <div className="min-h-screen flex items-center justify-center bg-graphite-100 py-10">
      <MobileFrame label={`App do Motorista — Parada #${id}`}>
        <div className="bg-graphite-50 min-h-full">
          <div className="bg-white px-4 py-3 flex items-center gap-2 border-b border-graphite-200">
            <button onClick={() => navigate(-1)} className="p-1.5"><ArrowLeft size={16} /></button>
            <div className="flex-1">
              <div className="font-semibold text-graphite-900">Parada #{id}</div>
              <div className="text-xs text-graphite-500">Mercado Exemplo — Loja 7</div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-card">
              <div className="text-xs text-graphite-500">Endereço</div>
              <div className="font-semibold text-graphite-900">Av. Boqueirão, 1500</div>
              <div className="text-xs text-graphite-500">Canoas/RS · CEP 92020-000</div>
              <div className="mt-2 text-xs text-graphite-700"><span className="font-medium">NF:</span> 123456 · 12 volumes · 1.250 kg</div>
              <div className="text-xs bg-brand-50 text-brand-700 rounded-lg px-2 py-1 inline-block mt-2">Janela 14h00–17h00</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-card">
              <div className="text-xs text-graphite-500">Instruções</div>
              <p className="text-sm text-graphite-700 mt-1">
                Entrega na doca lateral. Procurar Cláudia. Não aceitar reentrega — solicitar agendamento se ausente.
              </p>
            </div>

            <button className="w-full bg-brand-700 text-white rounded-xl py-4 text-base font-bold flex items-center justify-center gap-2 shadow-card">
              <MapPin size={18} /> Cheguei ao cliente
            </button>
            <button className="w-full bg-warning-500 text-white rounded-xl py-4 text-base font-bold flex items-center justify-center gap-2 shadow-card">
              <FileText size={18} /> Iniciar descarga
            </button>
            <button onClick={() => navigate('/motorista/confirmar-entrega')} className="w-full bg-success-600 text-white rounded-xl py-4 text-base font-bold flex items-center justify-center gap-2 shadow-card">
              <CheckCircle2 size={18} /> Confirmar entrega
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button className="bg-white rounded-xl py-3 text-sm font-semibold text-graphite-900 shadow-card flex items-center justify-center gap-2">
                <Camera size={14} /> Tirar foto
              </button>
              <button className="bg-white rounded-xl py-3 text-sm font-semibold text-graphite-900 shadow-card flex items-center justify-center gap-2">
                <FileSignature size={14} /> Assinatura
              </button>
            </div>

            <button onClick={() => navigate('/motorista/ocorrencia')} className="w-full bg-danger-50 text-danger-700 rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2">
              <AlertTriangle size={16} /> Registrar ocorrência
            </button>
          </div>
        </div>
      </MobileFrame>
    </div>
  )
}
