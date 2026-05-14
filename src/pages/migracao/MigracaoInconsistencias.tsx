import PageTitle from '../../components/layout/PageTitle'
import { migrationInconsistencias } from '../../data/mockData'
import StatusBadge from '../../components/ui/StatusBadge'
import { CheckCircle2, X, RotateCw } from 'lucide-react'

export default function MigracaoInconsistencias() {
  return (
    <div>
      <PageTitle title="Inconsistências de migração" subtitle="Registros que requerem atenção manual antes do go-live." breadcrumb={['Migração', 'Inconsistências']} />
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Tipo</th><th>Registro afetado</th><th>Gravidade</th><th>Sugestão</th><th>Ações</th></tr></thead>
          <tbody>
            {migrationInconsistencias.map((i, ix) => (
              <tr key={ix}>
                <td className="font-medium">{i.type}</td>
                <td className="text-xs">{i.record}</td>
                <td><StatusBadge status={i.severity} /></td>
                <td className="text-xs text-graphite-600">{i.suggestion}</td>
                <td>
                  <div className="flex gap-1">
                    <button className="btn-ghost" title="Corrigir"><CheckCircle2 size={14} /></button>
                    <button className="btn-ghost" title="Reprocessar"><RotateCw size={14} /></button>
                    <button className="btn-ghost" title="Ignorar"><X size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
