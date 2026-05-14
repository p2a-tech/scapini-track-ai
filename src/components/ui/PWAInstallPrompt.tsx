import { Download, X, Smartphone } from 'lucide-react'
import { useInstallPrompt } from '../../hooks/useInstallPrompt'

export default function PWAInstallPrompt() {
  const { canInstall, install, dismiss } = useInstallPrompt()
  if (!canInstall) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[calc(100%-2rem)] bg-navy-900 text-white rounded-2xl shadow-elevated p-4 flex items-start gap-3 animate-in fade-in slide-in-from-bottom">
      <div className="w-10 h-10 rounded-lg bg-accent-500 flex items-center justify-center shrink-0">
        <Smartphone size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold">Instalar Scapini Track AI</div>
        <div className="text-xs text-navy-200 mt-0.5">Acesse offline, ícone na tela inicial e experiência igual a um app nativo.</div>
        <div className="flex gap-2 mt-3">
          <button onClick={install} className="bg-accent-500 hover:bg-accent-600 text-white rounded-lg px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1">
            <Download size={12} /> Instalar agora
          </button>
          <button onClick={dismiss} className="text-navy-200 hover:text-white text-xs px-3 py-1.5">Depois</button>
        </div>
      </div>
      <button onClick={dismiss} className="text-navy-200 hover:text-white p-1 -mt-1 -mr-1 shrink-0">
        <X size={14} />
      </button>
    </div>
  )
}
