import PageTitle from '../../components/layout/PageTitle'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { systemUsers } from '../../data/mockData'
import { SystemUser } from '../../data/types'
import { Plus, Edit2 } from 'lucide-react'

export default function AdminUsuarios() {
  const columns: Column<SystemUser>[] = [
    { key: 'name', header: 'Nome', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'email', header: 'E-mail', render: (r) => r.email },
    { key: 'profile', header: 'Perfil', render: (r) => <span className="chip bg-brand-50 text-brand-700">{r.profile}</span> },
    { key: 'company', header: 'Empresa', render: (r) => r.company },
    { key: 'last', header: 'Último acesso', render: (r) => <span className="text-xs text-graphite-500">{r.lastAccess}</span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', header: '', render: () => <button className="btn-ghost"><Edit2 size={14} /></button> },
  ]
  return (
    <div>
      <PageTitle
        title="Usuários e permissões"
        subtitle="Gestão de acessos por perfil. Admin · Gestor · Operador · Cliente · Motorista · TI."
        breadcrumb={['Administração', 'Usuários']}
        actions={<button className="btn-primary"><Plus size={14} /> Novo usuário</button>}
      />
      <DataTable columns={columns} data={systemUsers} />
    </div>
  )
}
