import PageTitle from '../../components/layout/PageTitle'
import { Wifi, MessageSquare, Mail, Bell, FileText, Webhook, Database, Plug } from 'lucide-react'
import StatusBadge from '../../components/ui/StatusBadge'

const items = [
  { Icon: Wifi, name: 'Rastreador GPS próprio (Sascar)', status: 'Conectado', desc: 'Frota Scapini · 22 veículos sincronizados.' },
  { Icon: Plug, name: 'Rastreadores de terceiros', status: 'Conectado', desc: 'Onixsat, Sascar, Autotrac e Maxtrack.' },
  { Icon: MessageSquare, name: 'WhatsApp Business API', status: 'Conectado', desc: 'Notificações ao cliente e ao motorista.' },
  { Icon: Mail, name: 'E-mail (SES)', status: 'Conectado', desc: 'Templates transacionais.' },
  { Icon: Bell, name: 'SMS (TotalVoice)', status: 'Pendente', desc: 'Aguardando ativação comercial.' },
  { Icon: FileText, name: 'NF-e / CT-e / MDF-e (SEFAZ)', status: 'Em homologação', desc: 'Certificado digital configurado em homologação.' },
  { Icon: Webhook, name: 'Webhooks para clientes', status: 'Conectado', desc: '8 webhooks ativos.' },
  { Icon: Database, name: 'ERP / Financeiro (futuro)', status: 'Não iniciada', desc: 'Integração planejada para Q3.' },
]

export default function AdminIntegracoes() {
  return (
    <div>
      <PageTitle title="Integrações" subtitle="Conexões com sistemas externos da Scapini Transportes." breadcrumb={['Administração', 'Integrações']} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((i, ix) => {
          const Icon = i.Icon
          return (
            <div key={ix} className="card p-4">
              <div className="flex items-start justify-between mb-2">
                <Icon size={20} className="text-brand-700" />
                <StatusBadge status={i.status} />
              </div>
              <div className="font-semibold text-graphite-900">{i.name}</div>
              <div className="text-xs text-graphite-500 mt-1">{i.desc}</div>
              <button className="btn-outline w-full mt-3">Configurar</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
