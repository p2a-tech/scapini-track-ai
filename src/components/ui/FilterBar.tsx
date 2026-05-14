import { Filter, Search } from 'lucide-react'
import { ReactNode } from 'react'

export default function FilterBar({ children, onSearch, placeholder, extra }: {
  children?: ReactNode
  onSearch?: (v: string) => void
  placeholder?: string
  extra?: ReactNode
}) {
  return (
    <div className="card p-3 mb-4 flex flex-col md:flex-row md:items-center gap-3">
      <div className="relative flex-1 min-w-0">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400" />
        <input className="input pl-9" placeholder={placeholder || 'Buscar...'} onChange={(e) => onSearch?.(e.target.value)} />
      </div>
      {children}
      {extra}
      <button className="btn-outline">
        <Filter size={14} />
        Filtros avançados
      </button>
    </div>
  )
}
