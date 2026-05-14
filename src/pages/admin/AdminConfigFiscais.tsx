import PageTitle from '../../components/layout/PageTitle'
import { FileText, AlertCircle, ShieldCheck } from 'lucide-react'
import StatusBadge from '../../components/ui/StatusBadge'

export default function AdminConfigFiscais() {
  return (
    <div>
      <PageTitle title="Configurações fiscais" subtitle="CT-e, MDF-e, séries, certificado digital e regras fiscais." breadcrumb={['Administração', 'Configurações fiscais']} />

      <div className="card-elevated p-4 mb-4 border-l-4 border-warning-500 bg-warning-50">
        <div className="flex items-start gap-2 text-sm text-warning-700">
          <AlertCircle size={18} />
          <div>
            <div className="font-semibold">Ambiente de homologação</div>
            <p>A emissão fiscal está em homologação. A virada para produção ocorrerá com a virada oficial do Rota Livre.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2"><div className="font-semibold text-graphite-900 flex items-center gap-2"><FileText size={14} /> CT-e</div><StatusBadge status="Em homologação" /></div>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between"><span>Série</span><span className="font-medium">001</span></li>
            <li className="flex justify-between"><span>Próximo número</span><span className="font-medium">987.301</span></li>
            <li className="flex justify-between"><span>Ambiente</span><span className="font-medium">Homologação</span></li>
            <li className="flex justify-between"><span>Rejeições no dia</span><span className="font-medium text-warning-700">2</span></li>
          </ul>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2"><div className="font-semibold text-graphite-900 flex items-center gap-2"><FileText size={14} /> MDF-e</div><StatusBadge status="Em homologação" /></div>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between"><span>Série</span><span className="font-medium">001</span></li>
            <li className="flex justify-between"><span>Próximo número</span><span className="font-medium">550.102</span></li>
            <li className="flex justify-between"><span>MDF-es abertos</span><span className="font-medium">9</span></li>
            <li className="flex justify-between"><span>Encerramentos pendentes</span><span className="font-medium text-warning-700">2</span></li>
          </ul>
        </div>
      </div>

      <div className="card p-4 mb-4">
        <div className="flex items-center justify-between mb-2"><div className="font-semibold text-graphite-900 flex items-center gap-2"><ShieldCheck size={14} /> Certificado digital</div><StatusBadge status="Ativo" /></div>
        <ul className="text-sm space-y-1">
          <li className="flex justify-between"><span>Razão social</span><span className="font-medium">Scapini Transportes Ltda.</span></li>
          <li className="flex justify-between"><span>CNPJ</span><span className="font-medium">19.872.341/0001-44</span></li>
          <li className="flex justify-between"><span>Tipo</span><span className="font-medium">A1 (eCNPJ)</span></li>
          <li className="flex justify-between"><span>Vencimento</span><span className="font-medium">22/03/2027</span></li>
        </ul>
      </div>

      <div className="card p-4">
        <div className="font-semibold text-graphite-900 mb-3">Logs fiscais recentes</div>
        <div className="text-sm space-y-2">
          {[
            { time: '15h22', event: 'CT-e 987002 autorizado', status: 'success' },
            { time: '15h18', event: 'CT-e 987003 rejeitado: 999 — XML inválido', status: 'danger' },
            { time: '14h55', event: 'MDF-e 550003 emitido', status: 'success' },
            { time: '14h32', event: 'CT-e 987001 autorizado', status: 'success' },
          ].map((l, i) => (
            <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${l.status === 'danger' ? 'bg-danger-50 text-danger-700' : 'bg-success-50 text-success-700'}`}>
              <span>{l.event}</span>
              <span className="text-xs">{l.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
