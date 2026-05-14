import { Bell, Home, LogOut, MessageSquare, Package, Truck, Webhook } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'
import MobileBottomNav from '../mobile/MobileBottomNav'
import PWAInstallPrompt from '../ui/PWAInstallPrompt'

export default function ClientShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-graphite-50 pb-20 lg:pb-0">
      <header className="bg-white border-b border-graphite-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2">
          <Link to="/cliente/dashboard" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-navy-900 text-white flex items-center justify-center shrink-0"><Truck size={16} /></div>
            <div className="min-w-0">
              <div className="font-bold text-graphite-900 text-sm sm:text-base leading-tight truncate">Scapini Track AI</div>
              <div className="text-[11px] text-graphite-500 truncate hidden sm:block">Portal do Cliente · Mercado Exemplo Ltda.</div>
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
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">{children}</main>

      {/* Bottom nav apenas em mobile */}
      <MobileBottomNav
        items={[
          { to: '/cliente/dashboard', icon: <Home size={18} />, label: 'Início' },
          { to: '/cliente/rastreio', icon: <Package size={18} />, label: 'Rastreio' },
          { to: '/ia/cliente', icon: <MessageSquare size={18} />, label: 'Assistente' },
          { to: '/cliente/notificacoes', icon: <Bell size={18} />, label: 'Avisos' },
        ]}
      />
      <PWAInstallPrompt />
    </div>
  )
}
