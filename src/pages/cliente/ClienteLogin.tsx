import { LogIn, Search, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ClienteLogin() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-graphite-50 flex flex-col">
      <header className="bg-white border-b border-graphite-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-navy-900 text-white flex items-center justify-center"><Truck size={18} /></div>
          <div>
            <div className="font-bold text-graphite-900">Scapini Track AI</div>
            <div className="text-xs text-graphite-500">Portal do Cliente</div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md card-elevated p-8">
          <h1 className="text-2xl font-bold text-graphite-900">Acessar Portal do Cliente</h1>
          <p className="text-sm text-graphite-500 mt-1">Acompanhe suas entregas, ETA e ocorrências em tempo real.</p>

          <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); navigate('/cliente/dashboard') }}>
            <div><label className="label">E-mail</label><input type="email" className="input" defaultValue="claudia@mercadoexemplo.com.br" /></div>
            <div><label className="label">Senha</label><input type="password" className="input" defaultValue="••••••••" /></div>
            <button className="btn-primary w-full"><LogIn size={14} /> Entrar</button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-graphite-500">
            <div className="h-px flex-1 bg-graphite-200"></div>
            <span>OU RASTREAR SEM LOGIN</span>
            <div className="h-px flex-1 bg-graphite-200"></div>
          </div>

          <button onClick={() => navigate('/cliente/rastreio')} className="btn-outline w-full">
            <Search size={14} /> Rastrear por código, NF ou pedido
          </button>
        </div>
      </main>
    </div>
  )
}
