import { Plus, Building2, MapPin } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import { branches } from '../../data/mockData'
import StatusBadge from '../../components/ui/StatusBadge'

export default function FiliaisList() {
  return (
    <div>
      <PageTitle title="Filiais e CDs" breadcrumb={['Cadastros', 'Filiais']} actions={<button className="btn-primary"><Plus size={14} /> Nova filial</button>} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {branches.map((b) => (
          <div key={b.id} className="card p-5">
            <div className="flex items-start justify-between">
              <Building2 className="text-brand-700" size={20} />
              <span className="chip bg-graphite-100 text-graphite-700">{b.type}</span>
            </div>
            <div className="font-semibold text-graphite-900 mt-2">{b.name}</div>
            <div className="text-xs text-graphite-500 mt-1 flex items-center gap-1"><MapPin size={11} />{b.address} · {b.city}/{b.uf}</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div><div className="text-xs text-graphite-500">Capacidade</div><div className="font-medium">{b.capacity}</div></div>
              <div><div className="text-xs text-graphite-500">Status</div><StatusBadge status={b.status} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
