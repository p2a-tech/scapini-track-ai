import { Sparkles, AlertTriangle, ChevronRight, Cpu, Link2, Bell } from 'lucide-react'
import { AIAlert } from '../../data/types'

const sevTone: Record<string, string> = {
  baixa: 'border-l-success-500 bg-success-50',
  media: 'border-l-warning-500 bg-warning-50',
  alta: 'border-l-accent-500 bg-accent-50',
  critica: 'border-l-danger-500 bg-danger-50',
}

const sevText: Record<string, string> = {
  baixa: 'text-success-700',
  media: 'text-warning-700',
  alta: 'text-accent-700',
  critica: 'text-danger-700',
}

export default function AIAlertCard({ alert }: { alert: AIAlert }) {
  return (
    <div className={`border-l-4 ${sevTone[alert.severity]} rounded-r-xl border border-graphite-200 p-4 shadow-card`}>
      <div className="flex items-start gap-3">
        <Sparkles size={18} className={`${sevText[alert.severity]} shrink-0 mt-0.5`} />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold text-graphite-900">{alert.title}</div>
              <div className="text-xs text-graphite-500 mt-0.5">
                {alert.client && <>Cliente: {alert.client} • </>}
                {alert.thirdParty && <>Terceiro: {alert.thirdParty} • </>}
                {alert.createdAt}
              </div>
            </div>
            <span className={`chip ${sevTone[alert.severity]} ${sevText[alert.severity]}`}>
              <AlertTriangle size={11} />
              {alert.severity.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-graphite-700 mt-2">{alert.explanation}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-graphite-500">Ação sugerida:</span>
            <span className="text-xs font-medium text-graphite-900">{alert.suggestedAction}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="btn-primary text-xs">
              <ChevronRight size={12} /> Abrir viagem
            </button>
            <button className="btn-outline text-xs">
              <Link2 size={12} /> Enviar link
            </button>
            <button className="btn-outline text-xs">
              <Cpu size={12} /> Vincular device
            </button>
            <button className="btn-outline text-xs">
              <Bell size={12} /> Notificar gestor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
