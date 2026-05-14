import { statusColor } from '../../utils/status'

export default function StatusBadge({ status, withDot = true }: { status: string; withDot?: boolean }) {
  const c = statusColor(status)
  return (
    <span className={`chip ${c.bg} ${c.text} border border-current/10`}>
      {withDot && <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>}
      {status}
    </span>
  )
}
