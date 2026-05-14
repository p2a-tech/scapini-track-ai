import { Bell, Home, LogOut, MessageSquare, Package, Settings, Truck, Webhook } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'

export default function ClientShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-graphite-50">
      <header className="bg-white border-b border-graphite-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/cliente/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-navy-900 text-white flex items-center justify-center"><Truck size={18} /></div>
            <div>
              <div className="font-bold text-graphite-900">Scapini Track AI</div>
              <div className="text-xs text-graphite-500">Portal do Cliente · Mercado Exemplo Ltda.</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/cliente/dashboard" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-brand-50 text-brand-700' : 'text-graphite-700 hover:bg-graphite-100'}`}><Home className="inline mr-1" size={14} />Dashboard</NavLink>
            <NavLink to="/cliente/rastreio" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-brand-50 text-brand-700' : 'text-graphite-700 hover:bg-graphite-100'}`}><Package className="inline mr-1" size={14} />Rastreio</NavLink>
            <NavLink to="/cliente/notificacoes" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-brand-50 text-brand-700' : 'text-graphite-700 hover:bg-graphite-100'}`}><Bell className="inline mr-1" size={14} />Notificações</NavLink>
            <NavLink to="/cliente/api" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-brand-50 text-brand-700' : 'text-graphite-700 hover:bg-graphite-100'}`}><Webhook className="inline mr-1" size={14} />API</NavLink>
            <NavLink to="/ia/cliente" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-brand-50 text-brand-700' : 'text-graphite-700 hover:bg-graphite-100'}`}><MessageSquare className="inline mr-1" size={14} />Assistente</NavLink>
            <button onClick={() => navigate('/login')} className="px-3 py-2 rounded-lg text-sm text-graphite-700 hover:bg-graphite-100"><LogOut className="inline mr-1" size={14} />Sair</button>
          </nav>
          <button className="md:hidden btn-ghost"><Settings size={16} /></button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
