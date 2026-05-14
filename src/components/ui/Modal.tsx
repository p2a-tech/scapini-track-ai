import { X } from 'lucide-react'
import { ReactNode } from 'react'

export default function Modal({ open, onClose, title, children, footer, size = 'md' }: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  if (!open) return null
  const widths = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60">
      <div className={`bg-white rounded-xl shadow-elevated w-full ${widths[size]} max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-graphite-200">
          <h3 className="font-semibold text-graphite-900">{title}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-graphite-100 rounded-lg">
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer && <div className="border-t border-graphite-200 px-5 py-3 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )
}
