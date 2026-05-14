import { ReactNode } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'

interface Props {
  label: string
  value: ReactNode
  hint?: string
  icon?: ReactNode
  trend?: { value: string; positive?: boolean }
  tone?: 'default' | 'success' | 'warning' | 'danger' | 'brand' | 'accent'
}

const toneStyles: Record<string, string> = {
  default: 'bg-white border-graphite-200',
  success: 'bg-success-50 border-success-100',
  warning: 'bg-warning-50 border-warning-100',
  danger: 'bg-danger-50 border-danger-100',
  brand: 'bg-brand-50 border-brand-100',
  accent: 'bg-accent-50 border-accent-100',
}

const iconBg: Record<string, string> = {
  default: 'bg-brand-50 text-brand-700',
  success: 'bg-success-100 text-success-700',
  warning: 'bg-warning-100 text-warning-700',
  danger: 'bg-danger-100 text-danger-700',
  brand: 'bg-brand-100 text-brand-700',
  accent: 'bg-accent-100 text-accent-700',
}

export default function MetricCard({ label, value, hint, icon, trend, tone = 'default' }: Props) {
  return (
    <div className={`rounded-xl border shadow-card p-4 ${toneStyles[tone]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-graphite-500 uppercase tracking-wide">{label}</div>
          <div className="mt-1 text-2xl font-bold text-graphite-900">{value}</div>
          {hint && <div className="mt-1 text-xs text-graphite-500">{hint}</div>}
          {trend && (
            <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${trend.positive ? 'text-success-700' : 'text-danger-700'}`}>
              {trend.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trend.value}
            </div>
          )}
        </div>
        {icon && <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg[tone]}`}>{icon}</div>}
      </div>
    </div>
  )
}
