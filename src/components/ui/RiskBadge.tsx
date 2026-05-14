import { AlertTriangle } from 'lucide-react'
import { riskColor } from '../../utils/status'

export default function RiskBadge({ level }: { level: string }) {
  const c = riskColor(level)
  return (
    <span className={`chip ${c.bg} ${c.text}`}>
      <AlertTriangle size={11} />
      {c.label}
    </span>
  )
}
