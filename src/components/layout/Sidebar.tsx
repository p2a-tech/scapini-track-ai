import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, PackageSearch, Truck, Map, Boxes, Warehouse, ClipboardList, FileText,
  Cpu, Bot, Users, ChevronDown, ChevronRight, Receipt, BarChart3, Shield, Database,
  Smartphone, Activity, AlertTriangle, Workflow, MapPin, Banknote, BookOpen, Settings, Wifi, Building2, Route, Network, BadgeCheck,
} from 'lucide-react'
import { useState } from 'react'

interface NavGroup {
  label: string
  items: { to: string; label: string; icon: any; badge?: string }[]
  defaultOpen?: boolean
}

const groups: NavGroup[] = [
  {
    label: 'Operação',
    defaultOpen: true,
    items: [
      { to: '/operacao/dashboard', label: 'Dashboard TMS', icon: LayoutDashboard },
      { to: '/operacao/coletas', label: 'Pedidos de coleta', icon: PackageSearch },
      { to: '/operacao/ordens', label: 'Ordens de transporte', icon: ClipboardList },
      { to: '/operacao/etapas-logisticas', label: 'Etapas logísticas', icon: Workflow },
      { to: '/operacao/programacao-cargas', label: 'Programação de cargas', icon: Boxes },
      { to: '/operacao/expedicao', label: 'Expedição', icon: Warehouse },
      { to: '/operacao/liberacao-viagem', label: 'Liberação de viagem', icon: BadgeCheck, badge: 'Crítico' },
      { to: '/operacao/rastreabilidade', label: 'Rastreabilidade', icon: Wifi },
      { to: '/operacao/mapa', label: 'Mapa da frota', icon: Map },
      { to: '/operacao/eventos-filial', label: 'Eventos por filial/CD', icon: Building2 },
      { to: '/operacao/cargas-transferencia', label: 'Cargas em transferência', icon: Route },
      { to: '/operacao/ultima-milha', label: 'Última milha', icon: MapPin },
      { to: '/operacao/entregas', label: 'Entregas', icon: Truck },
      { to: '/operacao/ocorrencias', label: 'Ocorrências', icon: AlertTriangle },
      { to: '/operacao/documentos', label: 'Documentos fiscais', icon: FileText },
      { to: '/operacao/devices', label: 'Devices na carga', icon: Cpu },
      { to: '/operacao/comprovantes', label: 'Comprovantes', icon: Receipt },
    ],
  },
  {
    label: 'Comercial & Financeiro',
    items: [
      { to: '/comercial/tabelas-frete', label: 'Tabelas de frete', icon: BookOpen },
      { to: '/comercial/simulacao-frete', label: 'Simulação de frete', icon: Activity },
      { to: '/financeiro/faturamento', label: 'Faturamento', icon: Banknote },
    ],
  },
  {
    label: 'Cadastros',
    items: [
      { to: '/cadastros/clientes', label: 'Clientes', icon: Users },
      { to: '/cadastros/remetentes', label: 'Remetentes', icon: Users },
      { to: '/cadastros/destinatarios', label: 'Destinatários', icon: Users },
      { to: '/cadastros/veiculos', label: 'Veículos', icon: Truck },
      { to: '/cadastros/motoristas', label: 'Motoristas', icon: Users },
      { to: '/cadastros/filiais', label: 'Filiais e CDs', icon: Building2 },
      { to: '/cadastros/terceiros', label: 'Terceiros', icon: Network },
    ],
  },
  {
    label: 'IA & Relatórios',
    items: [
      { to: '/ia/alertas', label: 'Alertas inteligentes', icon: AlertTriangle, badge: '7' },
      { to: '/ia/operacao', label: 'Assistente IA — operação', icon: Bot },
      { to: '/ia/configuracoes', label: 'Configurações da IA', icon: Settings },
      { to: '/relatorios', label: 'Relatórios e indicadores', icon: BarChart3 },
    ],
  },
  {
    label: 'Integrações',
    items: [
      { to: '/integracoes/rastreadores-terceiros', label: 'Rastreadores de terceiros', icon: Wifi },
    ],
  },
  {
    label: 'Administração',
    items: [
      { to: '/admin/usuarios', label: 'Usuários e permissões', icon: Users },
      { to: '/admin/integracoes', label: 'Integrações', icon: Network },
      { to: '/admin/status-eventos', label: 'Status e eventos', icon: Activity },
      { to: '/admin/geofences', label: 'Geofences', icon: MapPin },
      { to: '/admin/templates', label: 'Templates de mensagem', icon: FileText },
      { to: '/admin/auditoria-lgpd', label: 'Auditoria e LGPD', icon: Shield },
      { to: '/admin/configuracoes-operacionais', label: 'Configurações operacionais', icon: Settings },
      { to: '/admin/configuracoes-fiscais', label: 'Configurações fiscais', icon: Receipt },
    ],
  },
  {
    label: 'Migração Rota Livre',
    items: [
      { to: '/migracao/dashboard', label: 'Painel de migração', icon: Database },
      { to: '/migracao/importacao', label: 'Importação', icon: Workflow },
      { to: '/migracao/de-para', label: 'De-para de campos', icon: BookOpen },
      { to: '/migracao/status', label: 'De-para de status', icon: Activity },
      { to: '/migracao/inconsistencias', label: 'Inconsistências', icon: AlertTriangle },
      { to: '/migracao/go-live', label: 'Plano de go-live', icon: BadgeCheck },
    ],
  },
  {
    label: 'Outros',
    items: [
      { to: '/cliente/dashboard', label: 'Portal do cliente', icon: Smartphone },
      { to: '/motorista/inicio', label: 'App do motorista', icon: Smartphone },
      { to: '/ia/cliente', label: 'Assistente IA — cliente', icon: Bot },
      { to: '/design-system', label: 'Design system', icon: Settings },
      { to: '/home', label: 'Home — Áreas', icon: ChevronRight },
    ],
  },
]

export default function Sidebar({ collapsed, onClose }: { collapsed?: boolean; onClose?: () => void }) {
  const location = useLocation()
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const r: Record<string, boolean> = {}
    groups.forEach((g) => (r[g.label] = !!g.defaultOpen || g.items.some((i) => location.pathname.startsWith(i.to))))
    return r
  })

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-72'} fixed inset-y-0 left-0 z-30 bg-navy-900 text-navy-100 flex flex-col transition-all duration-200`}>
      <div className="flex items-center gap-3 px-4 py-4 border-b border-navy-800">
        <div className="w-9 h-9 rounded-lg bg-accent-500 flex items-center justify-center shrink-0">
          <Truck size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="font-bold text-white text-sm leading-tight truncate">Scapini Track AI</div>
            <div className="text-[11px] text-navy-300 truncate">TMS Inteligente</div>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {groups.map((group) => (
          <div key={group.label} className="mb-1">
            {!collapsed && (
              <button
                onClick={() => setOpen((s) => ({ ...s, [group.label]: !s[group.label] }))}
                className="w-full flex items-center justify-between px-3 py-2 text-[11px] uppercase tracking-wider text-navy-400 hover:text-navy-200"
              >
                <span>{group.label}</span>
                {open[group.label] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            )}
            {(open[group.label] || collapsed) && (
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive ? 'bg-navy-700 text-white' : 'text-navy-200 hover:bg-navy-800 hover:text-white'
                        }`
                      }
                    >
                      <Icon size={16} className="shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className="text-[10px] font-semibold bg-accent-500 text-white rounded-full px-1.5 py-0.5">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="border-t border-navy-800 px-4 py-3 text-[11px] text-navy-400">
          v1.0 — Substituindo o Rota Livre
        </div>
      )}
    </aside>
  )
}
