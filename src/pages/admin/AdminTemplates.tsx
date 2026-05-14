import PageTitle from '../../components/layout/PageTitle'
import { MessageSquare, Mail, Bell, Code2 } from 'lucide-react'

export default function AdminTemplates() {
  return (
    <div>
      <PageTitle title="Templates de mensagem" subtitle="Modelos para WhatsApp, e-mail e SMS com variáveis dinâmicas." breadcrumb={['Administração', 'Templates']} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="card p-5">
          <div className="flex items-center gap-2 font-semibold text-graphite-900"><MessageSquare size={14} /> WhatsApp</div>
          <textarea className="input mt-2 min-h-[150px]" defaultValue={`Olá {{nome_cliente}}! Sua entrega {{nf}} agora está {{status}}.\n\nPrevisão: {{eta}}.\nÚltima atualização: {{ultima_atualizacao}}.\n\nAcompanhe: {{link_rastreio}}`} />
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-2 font-semibold text-graphite-900"><Mail size={14} /> E-mail</div>
          <textarea className="input mt-2 min-h-[150px]" defaultValue={`Prezado(a) {{nome_cliente}},\n\nA entrega {{nf}} está {{status}}. A previsão de chegada é {{eta}}.\n\nPróximo evento: {{proximo_evento}}.\n\nAtenciosamente,\nScapini Transportes`} />
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-2 font-semibold text-graphite-900"><Bell size={14} /> SMS</div>
          <textarea className="input mt-2 min-h-[150px]" defaultValue={`Scapini: NF {{nf}} - {{status}}. Previsao {{eta}}. Acompanhe {{link_rastreio}}`} />
        </div>
      </div>

      <div className="card p-5">
        <div className="font-semibold text-graphite-900 mb-3 flex items-center gap-2"><Code2 size={14} /> Variáveis disponíveis</div>
        <div className="flex flex-wrap gap-2 text-xs">
          {['nome_cliente', 'nf', 'status', 'eta', 'link_rastreio', 'ultima_atualizacao', 'proximo_evento', 'codigo_rastreio', 'nome_motorista', 'placa_veiculo', 'cidade_atual'].map((v) => (
            <code key={v} className="px-2 py-1 rounded bg-graphite-100 text-graphite-700">&#123;&#123; {v} &#125;&#125;</code>
          ))}
        </div>
      </div>
    </div>
  )
}
