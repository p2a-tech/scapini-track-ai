import { Download, Send, FileSignature, Camera } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import DataTable, { Column } from '../../components/ui/DataTable'
import { maskDocument } from '../../utils/formatters'

interface Row {
  id: string
  nf: string
  code: string
  client: string
  deliveredAt: string
  recipient: string
  doc: string
}

const rows: Row[] = [
  { id: 'cp1', nf: '123456', code: 'SCP-2026-0001', client: 'Mercado Exemplo Ltda.', deliveredAt: 'Hoje 11h20', recipient: 'Cláudia Tavares', doc: '012.345.678-90' },
  { id: 'cp2', nf: '123457', code: 'SCP-2026-0002', client: 'Distribuidora Sul Brasil', deliveredAt: 'Hoje 09h55', recipient: 'Rodrigo Antunes', doc: '111.222.333-44' },
  { id: 'cp3', nf: '987654', code: 'SCP-2026-0006', client: 'Frigorífico Modelo', deliveredAt: 'Ontem 22h15', recipient: 'Eduardo Reis', doc: '222.333.444-55' },
  { id: 'cp4', nf: '456789', code: 'SCP-2026-0007', client: 'Auto Peças Continental', deliveredAt: 'Ontem 14h40', recipient: 'Marcos Vinícius', doc: '333.444.555-66' },
  { id: 'cp5', nf: '654321', code: 'SCP-2026-0008', client: 'ConstruMais Atacado', deliveredAt: 'Hoje 16h00', recipient: 'Henrique Tonon', doc: '444.555.666-77' },
]

export default function Comprovantes() {
  const columns: Column<Row>[] = [
    { key: 'nf', header: 'NF', render: (r) => <span className="font-semibold">{r.nf}</span> },
    { key: 'code', header: 'Código de rastreio', render: (r) => r.code },
    { key: 'client', header: 'Cliente', render: (r) => r.client },
    { key: 'when', header: 'Entregue em', render: (r) => <span className="text-xs">{r.deliveredAt}</span> },
    { key: 'recipient', header: 'Recebedor', render: (r) => r.recipient },
    { key: 'doc', header: 'Documento', render: (r) => <span className="text-xs font-mono">{maskDocument(r.doc)}</span> },
    { key: 'photo', header: 'Foto', render: () => <span className="inline-flex items-center gap-1 text-xs"><Camera size={12} /> Sim</span> },
    { key: 'signature', header: 'Assinatura', render: () => <span className="inline-flex items-center gap-1 text-xs"><FileSignature size={12} /> Sim</span> },
    { key: 'actions', header: 'Ações', render: () => (
      <div className="flex gap-1">
        <button className="btn-ghost" title="Baixar"><Download size={14} /></button>
        <button className="btn-ghost" title="Reenviar"><Send size={14} /></button>
      </div>
    )},
  ]
  return (
    <div>
      <PageTitle
        title="Comprovantes de entrega"
        subtitle="POD (proof of delivery) com foto, assinatura e documento mascarado conforme LGPD."
        breadcrumb={['Operação', 'Comprovantes']}
      />
      <DataTable columns={columns} data={rows} />
    </div>
  )
}
