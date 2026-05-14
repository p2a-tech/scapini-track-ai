import { Truck, LogIn, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { UserProfile } from '../../data/types'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setProfileKey, profiles } = useApp()

  function loginAs(key: UserProfile['key']) {
    setProfileKey(key)
    if (key === 'cliente') navigate('/cliente/dashboard')
    else if (key === 'motorista') navigate('/motorista/inicio')
    else navigate('/home')
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:block bg-gradient-to-br from-navy-900 via-navy-800 to-brand-700 text-white p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 2px), radial-gradient(circle at 80% 70%, white 1px, transparent 2px), radial-gradient(circle at 50% 50%, white 1px, transparent 2px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent-500 flex items-center justify-center">
              <Truck size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold">Scapini Track AI</div>
              <div className="text-sm text-navy-200">TMS Inteligente · Scapini Transportes</div>
            </div>
          </div>

          <div className="mt-16 max-w-md">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-3 py-1 text-xs uppercase tracking-wider">
              <Sparkles size={12} /> Operação + IA preditiva
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight">
              O novo TMS inteligente da Scapini Transportes.
            </h1>
            <p className="mt-4 text-navy-200 leading-relaxed">
              Criado para substituir o Rota Livre e centralizar operação, rastreamento por etapas,
              integração com rastreadores de terceiros, controle de última milha, portal do cliente,
              app do motorista e IA preditiva.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/10 backdrop-blur rounded-xl p-3">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-navy-200 text-xs">Visibilidade por etapa logística</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-3">
                <div className="text-2xl font-bold">6 fontes</div>
                <div className="text-navy-200 text-xs">de rastreamento normalizadas</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-3">
                <div className="text-2xl font-bold">IA</div>
                <div className="text-navy-200 text-xs">ETA, risco de atraso e atendimento</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-3">
                <div className="text-2xl font-bold">LGPD</div>
                <div className="text-navy-200 text-xs">Auditoria e controle de dados</div>
              </div>
            </div>
          </div>

          <div className="mt-auto text-xs text-navy-300">
            v1.0 — Substituindo o Rota Livre · © {new Date().getFullYear()} Scapini Transportes
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-10 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-navy-700 flex items-center justify-center text-white">
              <Truck size={20} />
            </div>
            <div>
              <div className="font-bold text-graphite-900">Scapini Track AI</div>
              <div className="text-xs text-graphite-500">TMS Inteligente</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-graphite-900">Entrar no sistema</h2>
          <p className="text-sm text-graphite-500 mt-1">Acesse o TMS da Scapini Transportes.</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); loginAs('operador') }}>
            <div>
              <label className="label">E-mail</label>
              <input type="email" defaultValue="marina@scapini.com.br" className="input" />
            </div>
            <div>
              <label className="label">Senha</label>
              <input type="password" defaultValue="••••••••" className="input" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-graphite-600">
                <input type="checkbox" className="rounded text-brand-600" defaultChecked /> Lembrar-me
              </label>
              <button type="button" onClick={() => navigate('/recover-password')} className="text-brand-700 font-medium hover:underline">
                Esqueci minha senha
              </button>
            </div>
            <button className="btn-primary w-full">
              <LogIn size={16} /> Entrar
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-graphite-500">
            <div className="h-px flex-1 bg-graphite-200"></div>
            <span>OU ENTRAR COMO PERFIL DE DEMONSTRAÇÃO</span>
            <div className="h-px flex-1 bg-graphite-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {profiles.map((p) => (
              <button
                key={p.id}
                onClick={() => loginAs(p.key)}
                className="text-left rounded-lg border border-graphite-200 hover:border-brand-400 hover:bg-brand-50 transition-colors px-3 py-2"
              >
                <div className="text-sm font-semibold text-graphite-900">{p.role}</div>
                <div className="text-xs text-graphite-500">{p.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
