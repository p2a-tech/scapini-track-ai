import { X } from 'lucide-react'
import { ReactNode } from 'react'

export default function Drawer({ open, onClose, title, children, footer, width = 480 }: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  width?: number
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-navy-950/60">
      <div className="bg-white shadow-elevated h-full flex flex-col" style={{ width }}>
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
