import { Wifi } from 'lucide-react'
import { ReactNode } from 'react'
import ProgressBar from './ProgressBar'

export default function SourceReliabilityCard({ name, score, sources }: { name: string; score: number; sources: { label: string; status: ReactNode; level: number }[] }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-graphite-500 uppercase tracking-wide">Fonte de rastreamento</div>
          <div className="font-semibold text-graphite-900">{name}</div>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-graphite-900">
          <Wifi size={14} className="text-brand-600" />
          {score}% confiável
        </div>
      </div>
      <div className="space-y-2">
        {sources.map((s, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="font-medium text-graphite-700">{s.label}</span>
              <span>{s.status}</span>
            </div>
            <ProgressBar value={s.level} color={s.level >= 70 ? 'bg-success-500' : s.level >= 40 ? 'bg-warning-500' : 'bg-danger-500'} height={5} />
          </div>
        ))}
      </div>
    </div>
  )
}
