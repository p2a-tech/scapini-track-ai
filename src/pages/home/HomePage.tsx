import {
  Truck, Bot, Smartphone, Shield, Database, ArrowRight, LayoutDashboard, Sparkles, MapPin, Users, FileText, Wifi
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const areas = [
  { key: 'op', title: 'Operação Scapini', desc: 'Dashboard TMS, ordens, coletas, expedição, rastreabilidade, ocorrências, devices.', icon: LayoutDashboard, to: '/operacao/dashboard', tone: 'navy' },
  { key: 'cli', title: 'Portal do Cliente', desc: 'Rastreio, dashboard do cliente, notificações, API e webhooks.', icon: Smartphone, to: '/cliente/dashboard', tone: 'brand' },
  { key: 'mot', title: 'App do Motorista', desc: 'Rota do dia, entregas, ocorrências, comprovante e chat com a operação.', icon: Truck, to: '/motorista/inicio', tone: 'accent' },
  { key: 'admin', title: 'Administração', desc: 'Usuários, permissões, integrações, templates, geofences, LGPD.', icon: Shield, to: '/admin/usuarios', tone: 'graphite' },
  { key: 'ia', title: 'Assistente IA', desc: 'ETA, risco de atraso, alertas inteligentes e atendimento ao cliente.', icon: Bot, to: '/ia/operacao', tone: 'accent' },
  { key: 'mig', title: 'Migração Rota Livre', desc: 'Importação, de-para, inconsistências e plano de go-live.', icon: Database, to: '/migracao/dashboard', tone: 'brand' },
]

const toneBg: Record<string, string> = {
  navy: 'bg-navy-900 text-white',
  brand: 'bg-brand-700 text-white',
  accent: 'bg-accent-500 text-white',
  graphite: 'bg-graphite-800 text-white',
}

export default function HomePage() {
  const navigate = useNavigate()
  const { profile } = useApp()
  return (
    <div className="min-h-screen bg-graphite-50">
      <header className="bg-white border-b border-graphite-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center text-white">
              <Truck size={20} />
            </div>
            <div>
              <div className="font-bold text-graphite-900">Scapini Track AI</div>
              <div className="text-xs text-graphite-500">TMS Inteligente</div>
            </div>
          </div>
          <div className="text-sm">
            <span className="text-graphite-500">Logado como </span>
            <span className="font-semibold text-graphite-900">{profile.name}</span>
            <span className="text-graphite-500"> · {profile.role}</span>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="rounded-2xl bg-gradient-to-br from-navy-900 via-navy-800 to-brand-700 text-white p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-72 h-72 bg-accent-500/30 rounded-full blur-3xl"></div>
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-3 py-1 text-xs uppercase tracking-wider">
              <Sparkles size={12} /> Novo TMS · Substitui o Rota Livre
            </div>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold leading-tight">
              Bem-vindo ao Scapini Track AI
            </h1>
            <p className="mt-3 text-navy-200 leading-relaxed">
              O novo TMS inteligente da Scapini Transportes, criado para garantir operação completa,
              rastreamento por etapas, integração com rastreadores de terceiros, controle de última milha,
              portal do cliente, app do motorista e IA preditiva.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button onClick={() => navigate('/operacao/dashboard')} className="bg-accent-500 hover:bg-accent-600 rounded-lg px-4 py-2 text-sm font-semibold">Abrir operação</button>
              <button onClick={() => navigate('/ia/operacao')} className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg px-4 py-2 text-sm font-semibold">Pergunte à IA</button>
              <button onClick={() => navigate('/migracao/dashboard')} className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg px-4 py-2 text-sm font-semibold">Acompanhar migração</button>
            </div>
          </div>
        </div>

        <h2 className="mt-10 text-xl font-bold text-graphite-900">Áreas do sistema</h2>
        <p className="text-sm text-graphite-500 mt-1">Selecione uma área para começar.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((a) => {
            const Icon = a.icon
            return (
              <button
                key={a.key}
                onClick={() => navigate(a.to)}
                className="card hover:shadow-elevated transition-shadow text-left overflow-hidden group"
              >
                <div className={`${toneBg[a.tone]} px-5 py-4 flex items-center justify-between`}>
                  <Icon size={22} />
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5">
                  <div className="font-semibold text-graphite-900">{a.title}</div>
                  <p className="text-sm text-graphite-600 mt-1">{a.desc}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="card p-5">
            <Wifi className="text-brand-700" size={20} />
            <div className="font-semibold text-graphite-900 mt-2">Rastreabilidade híbrida</div>
            <p className="text-sm text-graphite-600 mt-1">6 fontes: GPS próprio, API terceiro, app, link, device e eventos de filial.</p>
          </div>
          <div className="card p-5">
            <MapPin className="text-accent-700" size={20} />
            <div className="font-semibold text-graphite-900 mt-2">Última milha</div>
            <p className="text-sm text-graphite-600 mt-1">Foco em entrega final com app, sequência de paradas e ETA preciso.</p>
          </div>
          <div className="card p-5">
            <FileText className="text-navy-700" size={20} />
            <div className="font-semibold text-graphite-900 mt-2">Documentos fiscais</div>
            <p className="text-sm text-graphite-600 mt-1">NF-e referenciada, CT-e e MDF-e com painel unificado.</p>
          </div>
          <div className="card p-5">
            <Users className="text-success-700" size={20} />
            <div className="font-semibold text-graphite-900 mt-2">Terceiros sob controle</div>
            <p className="text-sm text-graphite-600 mt-1">Score de confiabilidade, política por terceiro e bloqueio automático.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
