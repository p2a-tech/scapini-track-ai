import PageTitle from '../../components/layout/PageTitle'
import { dataParaStatus } from '../../data/mockData'
import StatusBadge from '../../components/ui/StatusBadge'

export default function MigracaoStatus() {
  return (
    <div>
      <PageTitle title="De-para de status" subtitle="Mapeamento entre status antigos do Rota Livre e o novo modelo do Scapini Track AI." breadcrumb={['Migração', 'De-para de status']} />
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Status antigo (Rota Livre)</th><th></th><th>Novo status (Scapini Track AI)</th><th>Validação</th></tr></thead>
          <tbody>
            {dataParaStatus.map((d, i) => (
              <tr key={i}>
                <td><code className="text-xs">{d.from}</code></td>
                <td className="text-graphite-400">→</td>
                <td><StatusBadge status={d.to} /></td>
                <td><StatusBadge status={i === dataParaStatus.length - 1 ? 'Requer validação' : 'OK'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
