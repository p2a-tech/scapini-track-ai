import { LogIn, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MobileFrame from '../../components/mobile/MobileFrame'

export default function MotoristaLogin() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-graphite-100 py-10">
      <MobileFrame label="App do Motorista — Login">
        <div className="p-6 h-full flex flex-col bg-gradient-to-b from-navy-800 to-navy-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent-500 flex items-center justify-center"><Truck size={20} /></div>
            <div>
              <div className="font-bold">Scapini Track</div>
              <div className="text-xs text-navy-200">App do Motorista</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-2xl font-bold">Bem-vindo, motorista</h1>
            <p className="text-sm text-navy-200 mt-1">Faça login para iniciar sua jornada.</p>

            <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); navigate('/motorista/inicio') }}>
              <div>
                <label className="block text-xs text-navy-200 mb-1">CPF ou telefone</label>
                <input className="w-full rounded-lg bg-white/10 text-white border border-white/20 px-3 py-2.5 placeholder:text-navy-300" defaultValue="111.222.333-44" />
              </div>
              <div>
                <label className="block text-xs text-navy-200 mb-1">Senha</label>
                <input type="password" className="w-full rounded-lg bg-white/10 text-white border border-white/20 px-3 py-2.5 placeholder:text-navy-300" defaultValue="••••••" />
              </div>
              <button className="w-full rounded-lg bg-accent-500 hover:bg-accent-600 px-3 py-3 font-semibold mt-2 flex items-center justify-center gap-2">
                <LogIn size={16} /> Entrar
              </button>
            </form>
          </div>
          <div className="text-xs text-navy-300 text-center">v1.0 · Scapini Transportes</div>
        </div>
      </MobileFrame>
    </div>
  )
}
