import { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

interface Props {
  title: string
  subtitle?: string
  breadcrumb?: string[]
  actions?: ReactNode
}

export default function PageTitle({ title, subtitle, breadcrumb, actions }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
      <div>
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-graphite-500 mb-1.5">
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} />}
                <span>{b}</span>
              </span>
            ))}
          </div>
        )}
        <h1 className="text-2xl font-bold text-graphite-900 leading-tight">{title}</h1>
        {subtitle && <p className="text-sm text-graphite-600 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
