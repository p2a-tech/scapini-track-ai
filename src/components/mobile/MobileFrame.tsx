import { ReactNode } from 'react'
import { Wifi, Battery, Signal } from 'lucide-react'
import { useIsMobile } from '../../hooks/useIsMobile'

export default function MobileFrame({ children, label }: { children: ReactNode; label?: string }) {
  const isMobile = useIsMobile()

  // Em dispositivos mobile (telas pequenas) renderiza fullscreen, sem o frame de celular
  if (isMobile) {
    return (
      <div className="min-h-screen bg-graphite-50">
        {children}
      </div>
    )
  }

  // Desktop: renderiza dentro do frame de iPhone para demonstração
  return (
    <div className="flex flex-col items-center">
      {label && <div className="text-xs text-graphite-500 uppercase tracking-wide mb-3">{label}</div>}
      <div className="relative" style={{ width: 380 }}>
        <div className="rounded-[44px] bg-navy-950 p-3 shadow-elevated">
          <div className="rounded-[36px] overflow-hidden bg-graphite-50 relative" style={{ height: 760 }}>
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-7 py-2 text-[11px] font-medium text-graphite-900 bg-graphite-50/95 backdrop-blur">
              <span>09:42</span>
              <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-24 h-5 rounded-full bg-navy-950"></div>
              <div className="flex items-center gap-1.5">
                <Signal size={12} />
                <Wifi size={12} />
                <Battery size={14} />
              </div>
            </div>
            <div className="h-full pt-7 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
