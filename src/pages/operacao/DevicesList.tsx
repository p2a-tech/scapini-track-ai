import { useState } from 'react'
import { Cpu, Plus, Link2, MapPin, Wrench, AlertTriangle } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import KPIGrid from '../../components/ui/KPIGrid'
import MetricCard from '../../components/ui/MetricCard'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import Modal from '../../components/ui/Modal'
import { devices, orders } from '../../data/mockData'
import { Device } from '../../data/types'

export default function DevicesList() {
  const [openVinc, setOpenVinc] = useState(false)

  const columns: Column<Device>[] = [
    { key: 'code', header: 'Device', render: (r) => <span className="font-semibold">{r.code}</span> },
    { key: 'imei', header: 'IMEI/QR', render: (r) => <span className="text-xs font-mono">{r.imei}<br/><span className="text-graphite-500">{r.qr}</span></span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'battery', header: 'Bateria', render: (r) => (
      <div className="flex items-center gap-2">
        <div className="w-12 h-2 rounded-full bg-graphite-200 overflow-hidden">
          <div className={`h-full ${r.battery < 20 ? 'bg-danger-500' : r.battery < 50 ? 'bg-warning-500' : 'bg-success-500'}`} style={{ width: `${r.battery}%` }}></div>
        </div>
        <span className="text-xs">{r.battery}%</span>
      </div>
    )},
    { key: 'pos', header: 'Última posição', render: (r) => <span className="text-xs">{r.lastPosition}<br/><span className="text-graphite-500">{r.lastCommunication}</span></span> },
    { key: 'order', header: 'Ordem / Cliente', render: (r) => <span className="text-xs">{r.orderId || '—'}<br/><span className="text-graphite-500">{r.client || ''}</span></span> },
    { key: 'dates', header: 'Saída / Retorno', render: (r) => <span className="text-xs">{r.departure || '—'}<br/><span className="text-graphite-500">{r.expectedReturn || ''}</span></span> },
    { key: 'resp', header: 'Responsável', render: (r) => <span className="text-xs">{r.responsible || '—'}</span> },
    { key: 'actions', header: 'Ações', render: () => (
      <div className="flex gap-1">
        <button className="btn-ghost" title="Vincular" onClick={() => setOpenVinc(true)}><Link2 size={14} /></button>
        <button className="btn-ghost" title="Mapa"><MapPin size={14} /></button>
        <button className="btn-ghost" title="Manutenção"><Wrench size={14} /></button>
      </div>
    )},
  ]
  return (
    <div>
      <PageTitle
        title="Devices físicos de rastreamento"
        subtitle="Gestão de rastreadores físicos colocados na carga."
        breadcrumb={['Operação', 'Devices']}
        actions={<button className="btn-primary" onClick={() => setOpenVinc(true)}><Plus size={14} /> Vincular novo</button>}
      />
      <KPIGrid columns={4}>
        <MetricCard label="Disponíveis" value="4" icon={<Cpu size={18} />} tone="success" />
        <MetricCard label="Em viagem" value="3" icon={<MapPin size={18} />} tone="brand" />
        <MetricCard label="Bateria baixa" value="2" icon={<AlertTriangle size={18} />} tone="warning" />
        <MetricCard label="Sem sinal" value="1" icon={<AlertTriangle size={18} />} tone="danger" />
        <MetricCard label="Aguardando retorno" value="2" icon={<Cpu size={18} />} />
        <MetricCard label="Extraviados" value="1" icon={<AlertTriangle size={18} />} tone="danger" />
        <MetricCard label="Em manutenção" value="1" icon={<Wrench size={18} />} />
        <MetricCard label="Total" value="14" icon={<Cpu size={18} />} />
      </KPIGrid>

      <div className="mt-5">
        <DataTable columns={columns} data={devices} />
      </div>

      <Modal open={openVinc} onClose={() => setOpenVinc(false)} title="Vincular device à carga" size="lg"
        footer={<><button onClick={() => setOpenVinc(false)} className="btn-outline">Cancelar</button><button onClick={() => setOpenVinc(false)} className="btn-primary">Confirmar vínculo</button></>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="label">Código do device</label><select className="input">{devices.filter((d) => d.status === 'Disponível').map((d) => <option key={d.id}>{d.code}</option>)}</select></div>
          <div><label className="label">Ordem de transporte</label><select className="input">{orders.map((o) => <option key={o.id}>{o.number}</option>)}</select></div>
          <div><label className="label">Cliente</label><input className="input" defaultValue="Mercado Exemplo Ltda." disabled /></div>
          <div><label className="label">Motorista</label><input className="input" defaultValue="João Pereira" /></div>
          <div><label className="label">Veículo</label><input className="input" defaultValue="SCA-1A23" /></div>
          <div><label className="label">Tipo de carga</label><select className="input"><option>Geral</option><option>Eletrônicos</option><option>Medicamentos</option></select></div>
          <div className="md:col-span-2"><label className="label">Local onde será colocado</label><input className="input" defaultValue="Bag central / lacre 248" /></div>
          <div className="md:col-span-2"><label className="label">Responsável pela instalação</label><input className="input" defaultValue="Equipe Expedição Guarulhos" /></div>
          <div className="md:col-span-2"><label className="label">Foto (simulada)</label><div className="border-2 border-dashed border-graphite-300 rounded-lg p-6 text-center text-graphite-500 text-sm">Clique para anexar foto</div></div>
        </div>
      </Modal>
    </div>
  )
}
