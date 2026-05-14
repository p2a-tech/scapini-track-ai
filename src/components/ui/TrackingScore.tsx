import { Wifi, WifiOff } from 'lucide-react'
import { scoreColor } from '../../utils/status'

export default function TrackingScore({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'sm' ? 36 : size === 'lg' ? 88 : 56
  const stroke = size === 'sm' ? 3 : size === 'lg' ? 8 : 5
  const radius = (dim - stroke) / 2
  const circ = 2 * Math.PI * radius
  const offset = circ - (score / 100) * circ
  const color =
    score >= 85 ? '#10b981' : score >= 60 ? '#f59e0b' : score >= 30 ? '#f15e0c' : '#ef4444'
  return (
    <div className="inline-flex items-center gap-2">
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim}>
          <circle cx={dim / 2} cy={dim / 2} r={radius} stroke="#eceef2" strokeWidth={stroke} fill="none" />
          <circle
            cx={dim / 2} cy={dim / 2} r={radius} stroke={color} strokeWidth={stroke} fill="none"
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
            transform={`rotate(-90 ${dim / 2} ${dim / 2})`}
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center font-bold ${scoreColor(score)} ${size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-lg' : 'text-xs'}`}>
          {score}
        </div>
      </div>
      {size !== 'sm' && (
        <div className="text-xs">
          <div className="font-medium text-graphite-900 flex items-center gap-1">
            {score >= 30 ? <Wifi size={11} /> : <WifiOff size={11} />}
            Score de rastreabilidade
          </div>
          <div className="text-graphite-500">
            {score >= 85 ? 'Excelente' : score >= 60 ? 'Bom' : score >= 30 ? 'Limitado' : 'Insuficiente'}
          </div>
        </div>
      )}
    </div>
  )
}
