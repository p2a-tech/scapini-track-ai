export default function ProgressBar({ value, color = 'bg-brand-600', label, hint, height = 8 }: { value: number; color?: string; label?: string; hint?: string; height?: number }) {
  return (
    <div className="w-full">
      {(label || hint) && (
        <div className="flex justify-between text-xs mb-1">
          {label && <span className="font-medium text-graphite-700">{label}</span>}
          {hint && <span className="text-graphite-500">{hint}</span>}
        </div>
      )}
      <div className="w-full rounded-full bg-graphite-200 overflow-hidden" style={{ height }}>
        <div className={`h-full ${color} transition-all`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }}></div>
      </div>
    </div>
  )
}
