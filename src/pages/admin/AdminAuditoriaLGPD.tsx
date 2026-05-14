import PageTitle from '../../components/layout/PageTitle'
import { Shield, Eye, Download, Lock, AlertTriangle } from 'lucide-react'
import StatusBadge from '../../components/ui/StatusBadge'
import { maskDocument } from '../../utils/formatters'

const logs = [
  { who: 'Marina Schneider', what: 'Consulta entrega SCP-2026-0001', when: 'há 5 min', tipo: 'consulta' },
  { who: 'Lucas Scapini', what: 'Exportou relatório SLA cliente FarmaLog', when: 'há 1 h', tipo: 'export' },
  { who: 'Cláudia Tavares', what: 'Consultou histórico de entregas (Mercado Exemplo)', when: 'há 3 h', tipo: 'consulta' },
  { who: 'Anônimo', what: 'Rastreio sem login: NF 123456', when: 'há 4 h', tipo: 'consulta' },
  { who: 'Henrique Costa', what: 'Anonimizou dados antigos (cliente CL-09872)', when: 'ontem', tipo: 'anonimizacao' },
  { who: 'Tentativa não autorizada', what: 'IP 187.x.x.43 tentou acessar API sem token', when: 'ontem', tipo: 'suspeito' },
]

const consentimentos = [
  { cliente: 'Mercado Exemplo Ltda.', whatsapp: true, email: true, sms: false, atualizado: '01/05/2026' },
  { cliente: 'Distribuidora Sul Brasil', whatsapp: true, email: true, sms: true, atualizado: '02/05/2026' },
  { cliente: 'FarmaLog Distribuição', whatsapp: true, email: true, sms: true, atualizado: '01/05/2026' },
]

export default function AdminAuditoriaLGPD() {
  return (
    <div>
      <PageTitle title="Auditoria e LGPD" subtitle="Logs de acesso, anonimização, retenção e consentimentos." breadcrumb={['Administração', 'Auditoria · LGPD']} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="card p-4">
          <Shield className="text-success-700" size={20} />
          <div className="font-semibold text-graphite-900 mt-2">Retenção de dados</div>
          <div className="text-xs text-graphite-500">12 meses para entregas operacionais · 5 anos para documentos fiscais.</div>
        </div>
        <div className="card p-4">
          <Lock className="text-brand-700" size={20} />
          <div className="font-semibold text-graphite-900 mt-2">Máscara de dados sensíveis</div>
          <div className="text-xs text-graphite-500">CPF e RG são exibidos mascarados ({maskDocument('01234567890')}) — exposição plena exige perfil Admin.</div>
        </div>
        <div className="card p-4">
          <AlertTriangle className="text-warning-700" size={20} />
          <div className="font-semibold text-graphite-900 mt-2">Acessos suspeitos</div>
          <div className="text-xs text-graphite-500">1 evento nas últimas 24h — revisão pendente.</div>
        </div>
      </div>

      <div className="card p-4 mb-4">
        <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Eye size={14} /> Logs de acesso</div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Usuário</th><th>Ação</th><th>Quando</th><th>Tipo</th></tr></thead>
            <tbody>
              {logs.map((l, i) => (
                <tr key={i}>
                  <td className="font-medium">{l.who}</td>
                  <td>{l.what}</td>
                  <td className="text-xs text-graphite-500">{l.when}</td>
                  <td><StatusBadge status={l.tipo === 'suspeito' ? 'Atenção' : l.tipo} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-4">
        <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Download size={14} /> Consentimentos de notificação</div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Cliente</th><th>WhatsApp</th><th>E-mail</th><th>SMS</th><th>Atualizado em</th></tr></thead>
            <tbody>
              {consentimentos.map((c, i) => (
                <tr key={i}>
                  <td className="font-medium">{c.cliente}</td>
                  <td>{c.whatsapp ? '✅' : '—'}</td>
                  <td>{c.email ? '✅' : '—'}</td>
                  <td>{c.sms ? '✅' : '—'}</td>
                  <td className="text-xs text-graphite-500">{c.atualizado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
