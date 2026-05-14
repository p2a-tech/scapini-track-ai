import { CheckCircle2, Circle, Clock } from 'lucide-react'
import { ReactNode } from 'react'

export interface TimelineStep {
  id: string
  title: string
  description?: string
  time?: string
  state: 'done' | 'current' | 'pending' | 'warning'
  badge?: ReactNode
}

const stateIcon = {
  done: <CheckCircle2 size={14} className="text-success-600" />,
  current: <Clock size={14} className="text-brand-600" />,
  pending: <Circle size={14} className="text-graphite-400" />,
  warning: <Clock size={14} className="text-warning-600" />,
}

const stateLine = {
  done: 'bg-success-300',
  current: 'bg-brand-300',
  pending: 'bg-graphite-200',
  warning: 'bg-warning-300',
}

export default function Timeline({ steps, compact = false }: { steps: TimelineStep[]; compact?: boolean }) {
  return (
    <ol className="relative">
      {steps.map((s, idx) => (
        <li key={s.id} className="relative pl-7 pb-5 last:pb-0">
          {idx < steps.length - 1 && (
            <span className={`absolute left-[7px] top-5 w-0.5 h-[calc(100%-12px)] ${stateLine[s.state]}`} />
          )}
          <span className="absolute left-0 top-0.5 w-3.5 h-3.5 rounded-full bg-white ring-2 ring-white flex items-center justify-center">
            {stateIcon[s.state]}
          </span>
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <span className={`text-sm font-medium ${s.state === 'pending' ? 'text-graphite-500' : 'text-graphite-900'}`}>{s.title}</span>
              {s.time && <span className="text-xs text-graphite-500 whitespace-nowrap">{s.time}</span>}
            </div>
            {!compact && s.description && <div className="text-xs text-graphite-500 mt-0.5">{s.description}</div>}
            {s.badge && <div className="mt-1">{s.badge}</div>}
          </div>
        </li>
      ))}
    </ol>
  )
}
