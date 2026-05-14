import { useState } from 'react'
import { Download, FileText, Receipt, Upload, AlertCircle, X, RotateCw } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import DataTable, { Column } from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import { fiscalDocs } from '../../data/mockData'
import { FiscalDoc } from '../../data/types'

const tabs = [
  { key: 'nfe', label: 'NF-e referenciadas' },
  { key: 'cte', label: 'CT-e' },
  { key: 'mdfe', label: 'MDF-e' },
  { key: 'pendente', label: 'Pendentes' },
  { key: 'erro', label: 'Com erro' },
  { key: 'cancelado', label: 'Cancelados' },
]

export default function DocumentosFiscais() {
  const [tab, setTab] = useState('cte')

  const filtered = fiscalDocs.filter((d) => {
    if (tab === 'nfe') return d.type === 'NF-e'
    if (tab === 'cte') return d.type === 'CT-e'
    if (tab === 'mdfe') return d.type === 'MDF-e'
    if (tab === 'pendente') return d.status === 'Pendente'
    if (tab === 'erro') return d.status === 'Rejeitado'
    if (tab === 'cancelado') return d.status === 'Cancelado'
    return true
  })

  const columns: Column<FiscalDoc>[] = [
    { key: 'type', header: 'Tipo', render: (r) => <span className="font-semibold">{r.type}</span> },
    { key: 'number', header: 'Número/Série', render: (r) => <span className="text-xs">{r.number}<br/><span className="text-graphite-500">Série {r.serie}</span></span> },
    { key: 'client', header: 'Cliente / Remetente', render: (r) => <span className="text-xs">{r.client}<br/><span className="text-graphite-500">{r.remetente}</span></span> },
    { key: 'destinatario', header: 'Destinatário', render: (r) => r.destinatario },
    { key: 'value', header: 'Valor', render: (r) => r.value },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'issued', header: 'Emissão', render: (r) => <span className="text-xs">{r.issuedAt}</span> },
    { key: 'key', header: 'Chave de acesso', render: (r) => <span className="text-[10px] font-mono">{r.accessKey}</span> },
    { key: 'actions', header: 'Ações', render: (r) => (
      <div className="flex gap-1">
        <button className="btn-ghost" title="Baixar XML"><Download size={14} /></button>
        <button className="btn-ghost" title="Baixar PDF"><FileText size={14} /></button>
        {r.status === 'Rejeitado' && <button className="btn-ghost" title="Reprocessar"><RotateCw size={14} /></button>}
        {r.status !== 'Cancelado' && <button className="btn-ghost" title="Cancelar"><X size={14} /></button>}
      </div>
    )},
  ]

  return (
    <div>
      <PageTitle
        title="Documentos fiscais"
        subtitle="NF-e referenciadas, CT-e e MDF-e. Visualização e fluxo simulado — integração SEFAZ não implementada nesta versão."
        breadcrumb={['Operação', 'Documentos fiscais']}
        actions={
          <>
            <button className="btn-outline"><Upload size={14} /> Importar NF-e</button>
            <button className="btn-outline"><FileText size={14} /> Emitir CT-e</button>
            <button className="btn-primary"><Receipt size={14} /> Gerar MDF-e</button>
          </>
        }
      />

      <div className="flex flex-wrap gap-1 border-b border-graphite-200 mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.key ? 'text-brand-700 border-brand-600' : 'text-graphite-500 border-transparent hover:text-graphite-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={filtered} empty="Nenhum documento nesta visão" />

      <div className="card p-4 mt-5 border-l-4 border-brand-500 bg-brand-50">
        <div className="flex items-start gap-2 text-sm text-brand-700">
          <AlertCircle size={16} />
          <div>
            <div className="font-semibold">Modo simulação</div>
            <p>A emissão real de CT-e/MDF-e ocorrerá na fase de go-live, com certificado digital configurado em Administração → Configurações fiscais.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
