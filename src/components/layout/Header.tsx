import { Bell, ChevronDown, Menu, Search, HelpCircle, Bot } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const { profile, setProfileKey, profiles } = useApp()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-graphite-200">
      <div className="flex items-center gap-3 px-4 lg:px-6 py-3">
        <button onClick={onToggleSidebar} className="p-2 hover:bg-graphite-100 rounded-lg lg:hidden">
          <Menu size={18} />
        </button>
        <div className="hidden md:flex items-center gap-2 max-w-md flex-1">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400" />
            <input
              placeholder="Buscar NF, CT-e, código de rastreio, cliente ou motorista..."
              className="input pl-9"
            />
          </div>
        </div>

        <div className="flex-1 md:hidden"></div>

        <div className="flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => navigate('/ia/operacao')}
            className="hidden md:inline-flex items-center gap-2 rounded-lg bg-accent-50 text-accent-700 px-3 py-2 text-sm font-medium hover:bg-accent-100"
          >
            <Bot size={16} />
            Pergunte à IA
          </button>

          <button onClick={() => navigate('/admin/configuracoes-operacionais')} className="hidden md:flex p-2 text-graphite-600 hover:bg-graphite-100 rounded-lg">
            <HelpCircle size={18} />
          </button>

          <div className="relative">
            <button onClick={() => { setNotifOpen((s) => !s); setProfileOpen(false) }} className="relative p-2 text-graphite-600 hover:bg-graphite-100 rounded-lg">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 card-elevated p-3 z-50">
                <div className="text-xs font-semibold text-graphite-500 uppercase tracking-wide px-1 mb-2">Alertas recentes</div>
                <div className="space-y-2 text-sm">
                  <div className="px-3 py-2 rounded-lg bg-danger-50 text-danger-700">
                    <div className="font-medium">Terceiro sem sinal há 42 min</div>
                    <div className="text-xs">OT-2026-1003 — FarmaLog</div>
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-warning-50 text-warning-700">
                    <div className="font-medium">Device DEV-1042 com bateria em 12%</div>
                    <div className="text-xs">NF 123456 — Mercado Exemplo</div>
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-brand-50 text-brand-700">
                    <div className="font-medium">ETA recalculado</div>
                    <div className="text-xs">SCP-2026-0002 — janela atualizada</div>
                  </div>
                </div>
                <button onClick={() => { navigate('/ia/alertas'); setNotifOpen(false) }} className="btn-ghost mt-3 w-full text-brand-700">Ver todos os alertas</button>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => { setProfileOpen((s) => !s); setNotifOpen(false) }} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-graphite-100">
              <div className="w-8 h-8 rounded-full bg-navy-700 text-white flex items-center justify-center text-xs font-semibold">
                {profile.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-graphite-900 leading-tight">{profile.name}</div>
                <div className="text-[11px] text-graphite-500 leading-tight">{profile.role}</div>
              </div>
              <ChevronDown size={14} className="text-graphite-500" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-72 card-elevated p-2 z-50">
                <div className="text-xs font-semibold text-graphite-500 uppercase tracking-wide px-3 py-2">Alternar perfil de demonstração</div>
                {profiles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setProfileKey(p.key); setProfileOpen(false) }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm ${
                      p.key === profile.key ? 'bg-brand-50 text-brand-700' : 'hover:bg-graphite-100'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-graphite-200 flex items-center justify-center text-[11px] font-semibold text-graphite-700">
                      {p.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-graphite-500">{p.role}</div>
                    </div>
                  </button>
                ))}
                <div className="border-t border-graphite-200 mt-2 pt-2">
                  <button onClick={() => { navigate('/login'); setProfileOpen(false) }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-graphite-100 text-sm">
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
