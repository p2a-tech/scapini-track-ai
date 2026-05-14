import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, MapPin, FileText, MessageSquare, Bell, Users } from 'lucide-react'
import PageTitle from '../../components/layout/PageTitle'
import { clients } from '../../data/mockData'

export default function ClienteDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const c = clients.find((x) => x.id === id) || clients[0]
  return (
    <div>
      <PageTitle
        title={c.name}
        subtitle={`${c.fantasia || ''} · CNPJ ${c.cnpj}`}
        breadcrumb={['Cadastros', 'Clientes', c.name]}
        actions={<button onClick={() => navigate(-1)} className="btn-outline"><ArrowLeft size={14} /> Voltar</button>}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 lg:col-span-2">
          <div className="font-semibold text-graphite-900 mb-3">Dados gerais</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div><div className="text-xs text-graphite-500">Razão social</div><div className="font-medium">{c.name}</div></div>
            <div><div className="text-xs text-graphite-500">Nome fantasia</div><div className="font-medium">{c.fantasia || '—'}</div></div>
            <div><div className="text-xs text-graphite-500">CNPJ</div><div className="font-medium font-mono">{c.cnpj}</div></div>
            <div><div className="text-xs text-graphite-500">Inscrição estadual</div><div className="font-medium">{c.ie || '—'}</div></div>
            <div className="flex items-center gap-2"><Mail size={14} className="text-graphite-400" /><span className="font-medium">{c.email}</span></div>
            <div className="flex items-center gap-2"><Phone size={14} className="text-graphite-400" /><span className="font-medium">{c.phone}</span></div>
            <div className="md:col-span-2 flex items-center gap-2"><MapPin size={14} className="text-graphite-400" /><span className="font-medium">{c.address}, {c.city}/{c.uf}</span></div>
          </div>

          <div className="border-t border-graphite-100 mt-4 pt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div><div className="text-xs text-graphite-500">SLA contratado</div><div className="font-medium">{c.sla}</div></div>
            <div><div className="text-xs text-graphite-500">Tabela de frete</div><div className="font-medium"><FileText className="inline mr-1" size={12} />{c.freightTable}</div></div>
            <div><div className="text-xs text-graphite-500">Contato</div><div className="font-medium">{c.contact}</div></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <div className="font-semibold text-graphite-900 mb-2 flex items-center gap-2"><Bell size={14} /> Preferências de notificação</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><MessageSquare size={12} className="text-brand-700" /> WhatsApp</span><span>{c.preferences.whatsapp ? '✅' : '—'}</span></li>
              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><Mail size={12} className="text-brand-700" /> E-mail</span><span>{c.preferences.email ? '✅' : '—'}</span></li>
              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><Bell size={12} className="text-brand-700" /> SMS</span><span>{c.preferences.sms ? '✅' : '—'}</span></li>
            </ul>
          </div>

          <div className="card p-4">
            <div className="font-semibold text-graphite-900 mb-2 flex items-center gap-2"><Users size={14} /> Usuários do portal</div>
            <ul className="text-sm space-y-2">
              <li className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.contact}</div>
                  <div className="text-xs text-graphite-500">{c.email}</div>
                </div>
                <span className="chip bg-success-50 text-success-700">Ativo</span>
              </li>
            </ul>
            <button className="btn-outline w-full mt-3">Novo usuário</button>
          </div>
        </div>
      </div>
    </div>
  )
}
