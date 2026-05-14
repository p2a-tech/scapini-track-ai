import PageTitle from '../../components/layout/PageTitle'
import KPIGrid from '../../components/ui/KPIGrid'
import MetricCard from '../../components/ui/MetricCard'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { Building2, Truck, Boxes, Clock, AlertTriangle, ArrowRight, Bell } from 'lucide-react'
import { eventTypesFilial } from '../../data/mockData'

export default function EventosFilial() {
  const columns: Column<any>[] = [
    { key: 'cargo', header: 'Carga', render: (r) => <span className="font-semibold">{r.cargoId}</span> },
    { key: 'branch', header: 'Filial/CD', render: (r) => r.branch },
    { key: 'prev', header: 'Origem anterior', render: (r) => r.previous },
    { key: 'next', header: 'Próximo destino', render: (r) => r.next },
    { key: 'qtd', header: 'Entregas', render: (r) => r.deliveries },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'arrival', header: 'Chegada', render: (r) => <span className="text-xs">{r.arrival}</span> },
    { key: 'departure', header: 'Saída prevista', render: (r) => <span className="text-xs">{r.departure}</span> },
    { key: 'resp', header: 'Responsável', render: (r) => <span className="text-xs">{r.responsible}</span> },
    { key: 'actions', header: 'Ações', render: () => (
      <div className="flex gap-1">
        <button className="btn-ghost" title="Registrar chegada"><Building2 size={14} /></button>
        <button className="btn-ghost" title="Registrar conferência"><Boxes size={14} /></button>
        <button className="btn-ghost" title="Registrar saída"><ArrowRight size={14} /></button>
        <button className="btn-ghost" title="Notificar clientes"><Bell size={14} /></button>
      </div>
    )},
  ]

  return (
    <div>
      <PageTitle
        title="Monitor de eventos por filial/CD"
        subtitle="Modelo Mercado Livre — entrada e saída de cargas em filiais, CDs e hubs."
        breadcrumb={['Operação', 'Eventos por filial']}
      />
      <KPIGrid columns={6}>
        <MetricCard label="Recebidas hoje" value="42" icon={<Building2 size={18} />} tone="brand" />
        <MetricCard label="Expedidas hoje" value="38" icon={<Truck size={18} />} tone="success" />
        <MetricCard label="Aguardando conferência" value="6" icon={<Boxes size={18} />} tone="warning" />
        <MetricCard label="Em cross-docking" value="4" icon={<ArrowRight size={18} />} />
        <MetricCard label="Atraso de saída" value="2" icon={<Clock size={18} />} tone="danger" />
        <MetricCard label="Sem próximo destino" value="1" icon={<AlertTriangle size={18} />} tone="warning" />
      </KPIGrid>

      <div className="mt-5">
        <DataTable columns={columns} data={eventTypesFilial.map((e, i) => ({ ...e, id: `${e.id}-${i}` }))} />
      </div>
    </div>
  )
}
