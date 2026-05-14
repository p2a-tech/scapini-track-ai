import { useState } from 'react'
import { Boxes, Plus, Sparkles, Truck, Users, ArrowRight, AlertTriangle, FileText, Receipt } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import StatusBadge from '../../components/ui/StatusBadge'
import { collects, drivers, vehicles } from '../../data/mockData'

export default function ProgramacaoCargas() {
  const [carga, setCarga] = useState<typeof collects>(collects.slice(2, 5))

  const pesoTotal = carga.reduce((s, c) => s + parseInt(c.weight.replace(/[^\d]/g, '') || '0'), 0)
  const cidadesDest = Array.from(new Set(carga.map((c) => c.cityDest)))

  return (
    <div>
      <PageTitle
        title="Programação de cargas"
        subtitle="Monte cargas, vincule veículo, motorista, otimize a rota e gere documentos."
        breadcrumb={['Operação', 'Programação de cargas']}
        actions={
          <>
            <button className="btn-outline"><Sparkles size={14} /> Otimizar carga com IA</button>
            <button className="btn-primary"><Plus size={14} /> Criar carga</button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="font-semibold text-graphite-900 mb-3">Pedidos disponíveis</div>
          <ul className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {collects.map((c) => (
              <li key={c.id} className="flex items-start justify-between gap-2 border border-graphite-200 rounded-lg p-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-graphite-900">{c.number}</div>
                  <div className="text-xs text-graphite-500 truncate">{c.client}</div>
                  <div className="text-xs text-graphite-500 truncate">{c.cityOrigin} → {c.cityDest} · {c.weight}</div>
                </div>
                <button onClick={() => setCarga((s) => s.find((x) => x.id === c.id) ? s : [...s, c])} className="btn-outline text-xs">+ Add</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-4 lg:col-span-2">
          <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Boxes size={16} className="text-brand-700" /> Carga em montagem · CG-2026-510</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="label">Veículo</label>
              <select className="input">{vehicles.map((v) => <option key={v.id}>{v.plate} — {v.type}</option>)}</select>
            </div>
            <div>
              <label className="label">Motorista</label>
              <select className="input">{drivers.map((d) => <option key={d.id}>{d.name}</option>)}</select>
            </div>
            <div>
              <label className="label">Tipo de etapa</label>
              <select className="input"><option>Transferência</option><option>Distribuição local</option><option>Cross-docking</option><option>Longo percurso</option><option>Última milha</option></select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
            <div className="card p-3"><div className="text-xs text-graphite-500">Capacidade veículo</div><div className="font-semibold">14.000 kg</div></div>
            <div className="card p-3"><div className="text-xs text-graphite-500">Peso total</div><div className="font-semibold">{pesoTotal.toLocaleString('pt-BR')} kg</div></div>
            <div className="card p-3"><div className="text-xs text-graphite-500">Volume total</div><div className="font-semibold">42 m³</div></div>
            <div className="card p-3"><div className="text-xs text-graphite-500">Cidades destino</div><div className="font-semibold">{cidadesDest.length}</div></div>
          </div>

          <div className="border border-graphite-200 rounded-lg overflow-hidden">
            <table className="table">
              <thead>
                <tr><th>Pedido</th><th>Cliente</th><th>Origem → Destino</th><th>Peso</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {carga.map((c) => (
                  <tr key={c.id}>
                    <td className="font-medium">{c.number}</td>
                    <td>{c.client}</td>
                    <td className="text-xs">{c.cityOrigin} → {c.cityDest}</td>
                    <td>{c.weight}</td>
                    <td><StatusBadge status={c.status} /></td>
                    <td><button onClick={() => setCarga((s) => s.filter((x) => x.id !== c.id))} className="text-danger-700 text-xs">Remover</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 border border-warning-100 bg-warning-50 rounded-lg p-3 text-sm text-warning-700 flex items-start gap-2">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">Alertas de incompatibilidade</div>
              <ul className="list-disc ml-4 mt-1 text-warning-700">
                <li>Veículo SCA-4D89 tem manutenção em 7 dias — recomendado escalonar.</li>
                <li>Motorista André Lima está em folga programada.</li>
                <li>Entrega para FarmaLog tem prazo crítico (24h) — priorizar próximo CD.</li>
                <li>Terceiro Frete Rápido PR não possui rastreamento confiável para esta carga.</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 border border-brand-100 bg-brand-50 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2 text-brand-700 font-semibold"><Sparkles size={14} /> Sugestão da IA</div>
            <p className="text-brand-700 mt-1">Sequência recomendada: <strong>Maringá/PR → Cascavel/PR → Curitiba/PR → Joinville/SC</strong>. Tempo total estimado: 14h45. Economia de 78 km e R$ 320 em pedágio vs rota original.</p>
            <button className="btn-primary mt-2"><ArrowRight size={14} /> Aplicar sugestão</button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn-outline"><Truck size={14} /> Vincular veículo</button>
            <button className="btn-outline"><Users size={14} /> Vincular motorista</button>
            <button className="btn-outline"><FileText size={14} /> Gerar romaneio</button>
            <button className="btn-outline"><Receipt size={14} /> Gerar MDF-e</button>
            <button className="btn-primary"><Boxes size={14} /> Liberar expedição</button>
          </div>
        </div>
      </div>
    </div>
  )
}
