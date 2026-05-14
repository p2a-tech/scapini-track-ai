import { useState } from 'react'
import { ArrowLeft, Camera, CheckCircle2, FileSignature } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../../components/mobile/MobileFrame'

export default function MotoristaConfirmarEntrega() {
  const navigate = useNavigate()
  const [done, setDone] = useState(false)
  return (
    <div className="min-h-screen flex items-center justify-center bg-graphite-100 py-10">
      <MobileFrame label="App do Motorista — Confirmar entrega">
        <div className="bg-graphite-50 min-h-full">
          <div className="bg-white px-4 py-3 flex items-center gap-2 border-b border-graphite-200">
            <button onClick={() => navigate(-1)} className="p-1.5"><ArrowLeft size={16} /></button>
            <div className="font-semibold text-graphite-900">Confirmar entrega</div>
          </div>

          {!done ? (
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-xs text-graphite-700 mb-1 font-medium">Nome do recebedor</label>
                <input className="w-full rounded-lg bg-white border border-graphite-200 px-3 py-2 text-sm" defaultValue="Cláudia Tavares" />
              </div>
              <div>
                <label className="block text-xs text-graphite-700 mb-1 font-medium">CPF / RG do recebedor</label>
                <input className="w-full rounded-lg bg-white border border-graphite-200 px-3 py-2 text-sm" defaultValue="012.345.678-90" />
              </div>

              <div className="bg-white rounded-xl p-4 shadow-card">
                <div className="text-xs text-graphite-700 font-medium mb-2">Foto do recebimento</div>
                <button className="w-full aspect-video rounded-lg border-2 border-dashed border-graphite-300 flex flex-col items-center justify-center text-graphite-400">
                  <Camera size={28} />
                  <span className="text-xs mt-1">Tirar foto</span>
                </button>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-card">
                <div className="text-xs text-graphite-700 font-medium mb-2">Assinatura</div>
                <div className="rounded-lg border-2 border-dashed border-graphite-300 h-32 flex items-center justify-center text-graphite-400 text-xs">
                  <FileSignature size={20} className="mr-2" /> Assinar aqui
                </div>
              </div>

              <div>
                <label className="block text-xs text-graphite-700 mb-1 font-medium">Observações</label>
                <textarea className="w-full rounded-lg bg-white border border-graphite-200 px-3 py-2 text-sm min-h-[60px]" placeholder="Ex: 12 volumes recebidos, conferidos pelo recebedor." />
              </div>

              <button onClick={() => setDone(true)} className="w-full bg-success-600 text-white rounded-xl py-4 text-base font-bold flex items-center justify-center gap-2 shadow-card">
                <CheckCircle2 size={18} /> Finalizar entrega
              </button>
            </div>
          ) : (
            <div className="p-4 flex flex-col items-center justify-center text-center" style={{ minHeight: '70vh' }}>
              <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center text-success-700 mb-4">
                <CheckCircle2 size={40} />
              </div>
              <div className="text-xl font-bold text-graphite-900">Entrega registrada com sucesso!</div>
              <p className="text-sm text-graphite-500 mt-2">A operação foi notificada e o cliente receberá uma confirmação automática.</p>
              <button onClick={() => navigate('/motorista/rota')} className="btn-primary mt-6">Voltar à rota</button>
            </div>
          )}
        </div>
      </MobileFrame>
    </div>
  )
}
