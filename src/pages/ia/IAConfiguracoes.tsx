import PageTitle from '../../components/layout/PageTitle'
import { Sparkles, Lock } from 'lucide-react'

export default function IAConfiguracoes() {
  return (
    <div>
      <PageTitle
        title="Configurações da IA"
        subtitle="Parâmetros, regras e limites para o assistente preditivo."
        breadcrumb={['IA', 'Configurações']}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Sparkles size={14} /> Parâmetros do ETA</div>
          <div className="space-y-3 text-sm">
            <div><label className="label">Janela padrão de previsão</label><select className="input"><option>± 30 min</option><option>± 1 h</option><option>± 2 h</option></select></div>
            <div><label className="label">Limite para considerar risco de atraso</label><select className="input"><option>30%</option><option>40%</option><option>50%</option></select></div>
            <div><label className="label">Score mínimo de rastreabilidade</label><select className="input"><option>60</option><option>50</option><option>70</option><option>80</option></select></div>
            <div><label className="label">Regras por tipo de carga</label><select className="input"><option>Geral · score 60+</option><option>Medicamentos · score 80+</option><option>Refrigerado · score 75+</option></select></div>
          </div>
        </div>

        <div className="card p-5">
          <div className="font-semibold text-graphite-900 mb-3">Templates de resposta</div>
          <div className="space-y-3 text-sm">
            <div><label className="label">Status genérico</label><textarea className="input min-h-[60px]" defaultValue="Sua entrega {{codigo}} está {{status}}. Previsão: {{eta}}." /></div>
            <div><label className="label">Atraso</label><textarea className="input min-h-[60px]" defaultValue="Houve um pequeno atraso em sua entrega {{codigo}}. Nova previsão: {{eta}}." /></div>
            <div><label className="label">Saiu para entrega</label><textarea className="input min-h-[60px]" defaultValue="Sua entrega {{codigo}} saiu do {{cd}} e está em rota de entrega. Previsão: {{eta}}." /></div>
          </div>
        </div>

        <div className="card p-5">
          <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Lock size={14} /> Limites e LGPD</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between"><span>IA pode responder ao cliente sem aprovação manual</span><input type="checkbox" defaultChecked /></li>
            <li className="flex items-center justify-between"><span>IA pode disparar notificações em massa</span><input type="checkbox" /></li>
            <li className="flex items-center justify-between"><span>IA expõe localização exata ao cliente</span><input type="checkbox" disabled /></li>
            <li className="flex items-center justify-between"><span>Logs de conversas habilitados (LGPD)</span><input type="checkbox" defaultChecked /></li>
            <li className="flex items-center justify-between"><span>Aprovação manual para mensagens sensíveis</span><input type="checkbox" defaultChecked /></li>
          </ul>
        </div>

        <div className="card p-5">
          <div className="font-semibold text-graphite-900 mb-3">Regras básicas</div>
          <ul className="space-y-2 text-sm text-graphite-700 list-disc ml-5">
            <li>A IA nunca inventa dados — só responde com base no que tem na operação.</li>
            <li>Sempre mostra a última atualização conhecida.</li>
            <li>Avisa quando não tem informação suficiente para responder.</li>
            <li>Não expõe localização exata ao cliente — apenas eventos amigáveis.</li>
            <li>Pode escalar conversas sensíveis para a operação humana.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
