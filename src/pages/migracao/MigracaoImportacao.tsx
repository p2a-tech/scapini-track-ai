import PageTitle from '../../components/layout/PageTitle'
import { Upload, FileText, Database, Plug, RotateCw, CheckCircle2 } from 'lucide-react'
import StatusBadge from '../../components/ui/StatusBadge'

const history = [
  { id: 1, file: 'clientes_2026-05-01.csv', records: 1280, ok: 1248, errors: 32, status: 'Concluída', at: '01/05 09h12' },
  { id: 2, file: 'motoristas_2026-05-02.csv', records: 118, ok: 112, errors: 6, status: 'Concluída', at: '02/05 14h25' },
  { id: 3, file: 'veiculos_2026-05-02.csv', records: 92, ok: 86, errors: 6, status: 'Concluída', at: '02/05 15h00' },
  { id: 4, file: 'entregas_historicas_2024-2025.csv', records: 60500, ok: 58430, errors: 2070, status: 'Em andamento', at: '05/05 22h10' },
  { id: 5, file: 'ctes_xml.zip', records: 58200, ok: 57890, errors: 310, status: 'Em andamento', at: '06/05 03h45' },
]

const sources = [
  { icon: FileText, label: 'CSV', desc: 'Planilhas e exports do Rota Livre', accept: '.csv, .xlsx' },
  { icon: FileText, label: 'XML', desc: 'NF-e, CT-e e MDF-e em XML', accept: '.xml, .zip' },
  { icon: Database, label: 'Banco de dados', desc: 'Conexão direta (SQL Server / MySQL)', accept: 'JDBC string' },
  { icon: Plug, label: 'API', desc: 'API legada do Rota Livre se disponível', accept: 'REST endpoint' },
]

export default function MigracaoImportacao() {
  return (
    <div>
      <PageTitle title="Importação de dados" breadcrumb={['Migração', 'Importação']} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
        {sources.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="card p-4">
              <Icon className="text-brand-700" size={20} />
              <div className="font-semibold text-graphite-900 mt-2">{s.label}</div>
              <div className="text-xs text-graphite-500 mt-0.5">{s.desc}</div>
              <div className="text-xs text-graphite-500 mt-1">Aceita: <code>{s.accept}</code></div>
              <button className="btn-outline w-full mt-3"><Upload size={14} /> Carregar</button>
            </div>
          )
        })}
      </div>

      <div className="card p-5">
        <div className="font-semibold text-graphite-900 mb-3">Histórico de importações</div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Arquivo</th><th>Registros</th><th>OK</th><th>Erros</th><th>Status</th><th>Data</th><th></th></tr></thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id}>
                  <td className="font-medium">{h.file}</td>
                  <td>{h.records.toLocaleString('pt-BR')}</td>
                  <td className="text-success-700">{h.ok.toLocaleString('pt-BR')}</td>
                  <td className={h.errors > 0 ? 'text-danger-700' : ''}>{h.errors}</td>
                  <td><StatusBadge status={h.status} /></td>
                  <td className="text-xs text-graphite-500">{h.at}</td>
                  <td><button className="btn-ghost"><RotateCw size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-elevated p-4 mt-4 border-l-4 border-success-500 bg-success-50">
        <div className="flex items-start gap-2 text-success-700 text-sm">
          <CheckCircle2 size={18} />
          <div>
            <div className="font-semibold">Validação automática</div>
            <p>Cada importação passa por validação de CNPJ, CEP, placas e chaves fiscais. Registros inválidos são listados em <strong>Inconsistências</strong> para correção.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
