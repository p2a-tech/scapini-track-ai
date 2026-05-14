import PageTitle from '../../components/layout/PageTitle'

const sections: { title: string; items: { label: string; value: string }[] }[] = [
  { title: 'Status de entrega', items: [{ label: 'Status configurados', value: '10' }, { label: 'Notificar cliente em', value: '5 status' }] },
  { title: 'Status de coleta', items: [{ label: 'Status configurados', value: '7' }, { label: 'Janela padrão', value: '4h' }] },
  { title: 'Regras de SLA', items: [{ label: 'SLA padrão', value: '48h' }, { label: 'SLA crítico', value: '24h' }] },
  { title: 'Regras de ETA', items: [{ label: 'Modelo', value: 'IA · Confiança 90%+' }, { label: 'Atualização', value: 'A cada 5 min' }] },
  { title: 'Regras de atraso', items: [{ label: 'Limite', value: '30% prob.' }, { label: 'Notificação automática', value: 'Sim' }] },
  { title: 'Tipos de ocorrência', items: [{ label: 'Tipos cadastrados', value: '13' }, { label: 'Críticas', value: '4' }] },
  { title: 'Tipos de veículo', items: [{ label: 'Tipos cadastrados', value: '8' }, { label: 'Em uso', value: '6' }] },
  { title: 'Tipos de carga', items: [{ label: 'Tipos cadastrados', value: '12' }, { label: 'Mais comum', value: 'Geral' }] },
  { title: 'Filiais', items: [{ label: 'Ativas', value: '6' }, { label: 'CDs', value: '3' }] },
  { title: 'Regiões atendidas', items: [{ label: 'UFs', value: 'SP, PR, SC, RS' }, { label: 'Cidades', value: '180+' }] },
  { title: 'Janelas de coleta', items: [{ label: 'Padrão', value: '08–12, 13–17, 17–21' }, { label: 'Personalizado por cliente', value: 'Sim' }] },
  { title: 'Janelas de entrega', items: [{ label: 'Padrão', value: '08–12, 13–17, 17–21' }, { label: 'Sábado', value: '08–12' }] },
  { title: 'Permissões por perfil', items: [{ label: 'Perfis configurados', value: '6' }, { label: 'Última revisão', value: '01/05' }] },
]

export default function AdminConfigOperacionais() {
  return (
    <div>
      <PageTitle title="Configurações operacionais" subtitle="Parâmetros de funcionamento da operação." breadcrumb={['Administração', 'Configurações operacionais']} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sections.map((s, i) => (
          <div key={i} className="card p-4">
            <div className="font-semibold text-graphite-900">{s.title}</div>
            <ul className="mt-2 space-y-1 text-sm">
              {s.items.map((it, ix) => (
                <li key={ix} className="flex items-center justify-between text-graphite-700">
                  <span className="text-graphite-500">{it.label}</span>
                  <span className="font-medium text-graphite-900">{it.value}</span>
                </li>
              ))}
            </ul>
            <button className="btn-outline w-full mt-3">Editar</button>
          </div>
        ))}
      </div>
    </div>
  )
}
