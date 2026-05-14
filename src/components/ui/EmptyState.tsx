import { Inbox } from 'lucide-react'
import { ReactNode } from 'react'

export default function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-12 h-12 rounded-full bg-graphite-100 flex items-center justify-center text-graphite-500 mb-3">
        {icon || <Inbox size={20} />}
      </div>
      <div className="font-semibold text-graphite-900">{title}</div>
      {description && <p className="text-sm text-graphite-500 mt-1 max-w-md">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
