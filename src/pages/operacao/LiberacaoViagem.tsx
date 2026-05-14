import { useState } from 'react'
import { ShieldCheck, AlertTriangle, Cpu, Link2, Plug, Satellite, Smartphone, Building2, CheckCircle2, X, Ban, Sparkles } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import StatusBadge from '../../components/ui/StatusBadge'
import TrackingScore from '../../components/ui/TrackingScore'
import Modal from '../../components/ui/Modal'

const sources = [
  { key: 'eventos', label: 'Eventos de filial/CD', icon: Building2, score: 30 },
  { key: 'api', label: 'API rastreador terceiro', icon: Plug, score: 85 },
  { key: 'gps', label: 'GPS do veículo próprio', icon: Satellite, score: 100 },
  { key: 'app', label: 'App do motorista', icon: Smartphone, score: 70 },
  { key: 'link', label: 'Link temporário', icon: Link2, score: 55 },
  { key: 'device', label: 'Device na carga', icon: Cpu, score: 75 },
  { key: 'excecao', label: 'Exceção aprovada por gestor', icon: ShieldCheck, score: 40 },
]

export default function LiberacaoViagem() {
  const [source, setSource] = useState('api')
  const [modal, setModal] = useState<null | 'device' | 'link' | 'api' | 'excecao'>(null)
  const selected = sources.find((s) => s.key === source)!
  const minScore = 60
  const canRelease = selected.score >= minScore

  return (
    <div>
      <PageTitle
        title="Liberação de viagem"
        subtitle="Etapa crítica para garantir rastreabilidade mínima antes da carga sair."
        breadcrumb={['Operação', 'Liberação de viagem']}
        actions={
          <>
            <button className="btn-outline" disabled={canRelease}><Ban size={14} /> Bloquear saída</button>
            <button className={canRelease ? 'btn-primary' : 'btn-outline'} disabled={!canRelease}><CheckCircle2 size={14} /> Liberar viagem</button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-5">
            <div className="font-semibold text-graphite-900 mb-3">Resumo da viagem</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div><div className="text-xs text-graphite-500">Carga</div><div className="font-medium">CG-2026-506</div></div>
              <div><div className="text-xs text-graphite-500">Cliente</div><div className="font-medium">ConstruMais Atacado</div></div>
              <div><div className="text-xs text-graphite-500">Tipo de etapa</div><div className="font-medium">Transferência</div></div>
              <div><div className="text-xs text-graphite-500">Transportador</div><div className="font-medium">Frete Rápido Paraná (terceiro)</div></div>
              <div><div className="text-xs text-graphite-500">Veículo</div><div className="font-medium">FRP-3030</div></div>
              <div><div className="text-xs text-graphite-500">Motorista</div><div className="font-medium">Não vinculado</div></div>
              <div><div className="text-xs text-graphite-500">Valor da mercadoria</div><div className="font-medium">R$ 65.300,00</div></div>
              <div><div className="text-xs text-graphite-500">SLA contratado</div><div className="font-medium">72h</div></div>
            </div>
          </div>

          <div className="card p-5">
            <div className="font-semibold text-graphite-900 mb-3">Checklist de pré-liberação</div>
            <ul className="space-y-2 text-sm">
              {[
                ['Carga conferida', true],
                ['Motorista validado', false],
                ['Veículo validado', true],
                ['Documentos fiscais emitidos', true],
                ['CT-e autorizado', true],
                ['MDF-e gerado', false],
                ['Rota definida', true],
                ['Cliente notificado', false],
                ['Fonte de rastreamento ativa', selected.score >= 30],
                [`Score mínimo de rastreabilidade atingido (≥ ${minScore})`, canRelease],
              ].map(([label, ok], i) => (
                <li key={i} className="flex items-center gap-2">
                  {ok ? <CheckCircle2 size={16} className="text-success-600" /> : <X size={16} className="text-danger-600" />}
                  <span className={ok ? 'text-graphite-900' : 'text-danger-700'}>{label as string}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5">
            <div className="font-semibold text-graphite-900 mb-3">Como esta etapa será rastreada?</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sources.map((s) => {
                const Icon = s.icon
                const active = s.key === source
                return (
                  <button
                    key={s.key}
                    onClick={() => setSource(s.key)}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-colors ${
                      active ? 'bg-brand-50 border-brand-400' : 'border-graphite-200 hover:bg-graphite-50'
                    }`}
                  >
                    <Icon size={18} className={active ? 'text-brand-700' : 'text-graphite-500'} />
                    <div className="flex-1">
                      <div className={`text-sm font-semibold ${active ? 'text-brand-700' : 'text-graphite-900'}`}>{s.label}</div>
                      <div className="text-xs text-graphite-500">Score base: {s.score}</div>
                    </div>
                    {active && <CheckCircle2 size={16} className="text-brand-600" />}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <button onClick={() => setModal('device')} className="btn-outline"><Cpu size={14} /> Vincular device de carga</button>
              <button onClick={() => setModal('link')} className="btn-outline"><Link2 size={14} /> Enviar link temporário</button>
              <button onClick={() => setModal('api')} className="btn-outline"><Plug size={14} /> Cadastrar API do rastreador</button>
              <button onClick={() => setModal('excecao')} className="btn-outline"><ShieldCheck size={14} /> Solicitar aprovação de exceção</button>
            </div>
          </div>

          {!canRelease && (
            <div className="card-elevated p-5 border-l-4 border-danger-500">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-danger-600 shrink-0" size={20} />
                <div>
                  <div className="font-semibold text-danger-700">Rastreabilidade insuficiente</div>
                  <p className="text-sm text-graphite-700 mt-1">
                    Esta viagem está sendo realizada por terceiro e não possui rastreamento confiável.
                    Para liberar a carga, vincule um device, integre o rastreador do terceiro ou solicite aprovação de exceção.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="card p-5 text-center">
            <TrackingScore score={selected.score} size="lg" />
            <div className="mt-3 text-xs text-graphite-500">Score mínimo exigido para liberação: <strong>{minScore}</strong></div>
            <div className="mt-2">
              <StatusBadge status={canRelease ? 'Liberada' : 'Aguardando rastreabilidade'} />
            </div>
          </div>

          <div className="card p-5">
            <div className="text-xs font-semibold text-graphite-500 uppercase tracking-wide mb-2 flex items-center gap-1"><Sparkles size={12} /> Recomendação IA</div>
            <p className="text-sm text-graphite-700">
              Carga de valor médio (R$ 65k) com terceiro reincidente em falhas. Recomenda-se device + link temporário
              para atingir score 75+ ou solicitar aprovação de exceção do gestor.
            </p>
          </div>
        </div>
      </div>

      <Modal open={modal === 'device'} onClose={() => setModal(null)} title="Vincular device de carga"
        footer={<><button onClick={() => setModal(null)} className="btn-outline">Cancelar</button><button onClick={() => setModal(null)} className="btn-primary">Confirmar vínculo</button></>}>
        <div className="space-y-3">
          <div><label className="label">Código do device</label><select className="input"><option>DEV-1044 (disponível, 100% bateria)</option><option>DEV-1085 (disponível, 100% bateria)</option></select></div>
          <div><label className="label">Local de instalação</label><input className="input" defaultValue="Bag central da carga" /></div>
          <div><label className="label">Responsável pela instalação</label><input className="input" defaultValue="Equipe expedição Itajaí" /></div>
        </div>
      </Modal>

      <Modal open={modal === 'link'} onClose={() => setModal(null)} title="Enviar link temporário ao motorista"
        footer={<><button onClick={() => setModal(null)} className="btn-outline">Cancelar</button><button onClick={() => setModal(null)} className="btn-primary">Enviar via WhatsApp</button></>}>
        <p className="text-sm text-graphite-700">Um link temporário válido por 24h será enviado ao WhatsApp do motorista.
        Ele precisa abrir o link e permitir a localização para que o sistema receba a posição.</p>
        <div className="mt-3"><label className="label">Telefone</label><input className="input" defaultValue="(43) 98332-5566" /></div>
      </Modal>

      <Modal open={modal === 'api'} onClose={() => setModal(null)} title="Cadastrar API do rastreador" size="lg"
        footer={<><button onClick={() => setModal(null)} className="btn-outline">Cancelar</button><button onClick={() => setModal(null)} className="btn-primary">Testar conexão</button></>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="label">Fornecedor</label><select className="input"><option>Onixsat</option><option>Sascar</option><option>Maxtrack</option><option>Autotrac</option></select></div>
          <div><label className="label">Endpoint</label><input className="input" defaultValue="https://api.onixsat.com.br/v2/positions" /></div>
          <div><label className="label">Token / API key</label><input className="input" defaultValue="ony_*****************a83f" /></div>
          <div><label className="label">Placa</label><input className="input" defaultValue="FRP-3030" /></div>
        </div>
      </Modal>

      <Modal open={modal === 'excecao'} onClose={() => setModal(null)} title="Solicitar aprovação de exceção"
        footer={<><button onClick={() => setModal(null)} className="btn-outline">Cancelar</button><button onClick={() => setModal(null)} className="btn-primary">Enviar para o gestor</button></>}>
        <div><label className="label">Justificativa</label><textarea className="input min-h-[120px]" defaultValue="Carga de baixo valor, terceiro frequente, prazo apertado. Score 30 — solicitando exceção." /></div>
      </Modal>
    </div>
  )
}
