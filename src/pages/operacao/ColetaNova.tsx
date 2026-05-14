import { Save, Send, ArrowLeft, Paperclip } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../components/layout/PageTitle'

export default function ColetaNova() {
  const navigate = useNavigate()
  return (
    <div className="max-w-5xl">
      <PageTitle
        title="Novo pedido de coleta"
        breadcrumb={['Operação', 'Pedidos de coleta', 'Novo']}
        actions={
          <>
            <button onClick={() => navigate(-1)} className="btn-outline"><ArrowLeft size={14} /> Cancelar</button>
            <button className="btn-outline"><Save size={14} /> Salvar</button>
            <button className="btn-primary"><Send size={14} /> Salvar e programar</button>
          </>
        }
      />

      <form className="space-y-5">
        <div className="card p-5">
          <div className="font-semibold text-graphite-900 mb-3">Identificação</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div><label className="label">Cliente solicitante</label><select className="input"><option>Mercado Exemplo Ltda.</option><option>Distribuidora Sul Brasil</option><option>FarmaLog Distribuição</option></select></div>
            <div><label className="label">Remetente</label><select className="input"><option>Distribuidora Exemplo SP</option><option>CD Curitiba</option><option>Agro Londrina</option></select></div>
            <div><label className="label">Destinatário</label><select className="input"><option>Mercado Exemplo Canoas</option><option>SulDistri Floripa</option></select></div>
          </div>
        </div>

        <div className="card p-5">
          <div className="font-semibold text-graphite-900 mb-3">Endereços</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className="label">Endereço de coleta</label><input className="input" defaultValue="Av. dos Bandeirantes, 3200 — São Paulo/SP" /></div>
            <div><label className="label">Endereço de entrega</label><input className="input" defaultValue="Av. Boqueirão, 1500 — Canoas/RS" /></div>
          </div>
        </div>

        <div className="card p-5">
          <div className="font-semibold text-graphite-900 mb-3">Programação</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div><label className="label">Data desejada</label><input type="date" className="input" /></div>
            <div><label className="label">Janela de coleta</label><select className="input"><option>08h00–12h00</option><option>13h00–17h00</option><option>17h00–21h00</option></select></div>
            <div><label className="label">Necessita agendamento?</label><select className="input"><option>Não</option><option>Sim</option></select></div>
            <div><label className="label">Veículo específico?</label><select className="input"><option>Não</option><option>Truck 14t</option><option>Carreta 27t</option><option>VUC 3,5t</option></select></div>
          </div>
        </div>

        <div className="card p-5">
          <div className="font-semibold text-graphite-900 mb-3">Mercadoria</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div><label className="label">Tipo de mercadoria</label><select className="input"><option>Geral</option><option>Refrigerado</option><option>Medicamentos</option><option>Defensivos</option><option>Auto peças</option></select></div>
            <div><label className="label">Peso</label><input className="input" placeholder="kg" defaultValue="1250" /></div>
            <div><label className="label">Volume</label><input className="input" placeholder="m³" defaultValue="3,4" /></div>
            <div><label className="label">Quantidade de volumes</label><input className="input" defaultValue="12" /></div>
            <div><label className="label">Valor da mercadoria</label><input className="input" defaultValue="R$ 84.500,00" /></div>
            <div><label className="label">NF-e referenciada</label><input className="input" defaultValue="123456" /></div>
          </div>
        </div>

        <div className="card p-5">
          <div className="font-semibold text-graphite-900 mb-3">Observações e documentos</div>
          <textarea className="input min-h-[100px]" placeholder="Instruções específicas, contatos no local de coleta, restrições..." defaultValue="Agendar com Cláudia até 11h. Acesso pela doca lateral." />
          <button type="button" className="btn-outline mt-3"><Paperclip size={14} /> Anexar documentos</button>
        </div>
      </form>
    </div>
  )
}
