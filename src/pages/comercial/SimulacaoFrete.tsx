import PageTitle from '../../components/layout/PageTitle'
import { Calculator, Sparkles, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SimulacaoFrete() {
  const navigate = useNavigate()
  return (
    <div className="max-w-5xl">
      <PageTitle title="Simulação de frete" subtitle="Calcule o frete em segundos e gere um pedido de coleta a partir do resultado." breadcrumb={['Comercial', 'Simulação de frete']} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 lg:col-span-2">
          <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Calculator size={14} /> Dados</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className="label">Cliente</label><select className="input"><option>Mercado Exemplo Ltda.</option><option>Distribuidora Sul Brasil</option><option>FarmaLog Distribuição</option></select></div>
            <div><label className="label">Tipo de carga</label><select className="input"><option>Geral</option><option>Refrigerado</option><option>Medicamentos</option><option>Defensivos</option></select></div>
            <div><label className="label">Origem</label><input className="input" defaultValue="São Paulo/SP" /></div>
            <div><label className="label">Destino</label><input className="input" defaultValue="Porto Alegre/RS" /></div>
            <div><label className="label">Peso (kg)</label><input className="input" defaultValue="1250" /></div>
            <div><label className="label">Volume (m³)</label><input className="input" defaultValue="3,4" /></div>
            <div><label className="label">Valor da mercadoria</label><input className="input" defaultValue="84500" /></div>
            <div><label className="label">Prazo desejado</label><select className="input"><option>Standard (48h)</option><option>Expresso (24h)</option><option>Econômico (72h)</option></select></div>
            <div className="md:col-span-2"><label className="label">Serviços adicionais</label>
              <div className="flex flex-wrap gap-2 mt-1">
                <label className="chip bg-graphite-100 text-graphite-700"><input type="checkbox" className="mr-1" /> Agendamento</label>
                <label className="chip bg-graphite-100 text-graphite-700"><input type="checkbox" className="mr-1" /> Coleta noturna</label>
                <label className="chip bg-graphite-100 text-graphite-700"><input type="checkbox" className="mr-1" defaultChecked /> Device na carga</label>
                <label className="chip bg-graphite-100 text-graphite-700"><input type="checkbox" className="mr-1" /> Seguro estendido</label>
              </div>
            </div>
          </div>
          <button className="btn-primary mt-4"><Calculator size={14} /> Calcular frete</button>
        </div>

        <div className="space-y-4">
          <div className="card-elevated p-5 bg-gradient-to-br from-brand-50 to-white">
            <div className="text-xs text-brand-700 font-semibold uppercase tracking-wide">Resultado</div>
            <div className="text-3xl font-bold text-graphite-900 mt-1">R$ 1.842,00</div>
            <div className="text-xs text-graphite-500">Prazo estimado: 48h corridas · 1.420 km</div>

            <ul className="mt-4 space-y-1 text-sm">
              <li className="flex justify-between"><span className="text-graphite-500">Frete-peso</span><span>R$ 525,00</span></li>
              <li className="flex justify-between"><span className="text-graphite-500">Frete-valor</span><span>R$ 152,10</span></li>
              <li className="flex justify-between"><span className="text-graphite-500">Ad.Valorem (0,18%)</span><span>R$ 152,10</span></li>
              <li className="flex justify-between"><span className="text-graphite-500">GRIS (0,12%)</span><span>R$ 101,40</span></li>
              <li className="flex justify-between"><span className="text-graphite-500">Pedágio</span><span>R$ 320,00</span></li>
              <li className="flex justify-between"><span className="text-graphite-500">Taxas adicionais</span><span>R$ 45,00</span></li>
              <li className="flex justify-between"><span className="text-graphite-500">Device na carga</span><span>R$ 80,00</span></li>
              <li className="flex justify-between font-semibold pt-2 border-t border-graphite-200"><span>Total</span><span>R$ 1.842,00</span></li>
            </ul>

            <div className="mt-4 bg-graphite-50 rounded-lg p-3 text-xs text-graphite-700">
              <div className="font-semibold text-graphite-900 flex items-center gap-1"><Sparkles size={11} /> Margem estimada</div>
              <div className="mt-1">Margem operacional: <strong>22%</strong> · Risco: baixo</div>
            </div>

            <button onClick={() => navigate('/operacao/coletas/nova')} className="btn-accent w-full mt-4">
              Gerar pedido de coleta <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
