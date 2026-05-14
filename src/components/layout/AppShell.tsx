import { ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import PWAInstallPrompt from '../ui/PWAInstallPrompt'

export default function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // fecha o drawer mobile ao navegar
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // bloqueia scroll do body quando drawer aberto em mobile
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <div className="min-h-screen bg-graphite-50">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:pl-72">
        <Header onToggleSidebar={() => setMobileOpen((s) => !s)} />
        <main className="px-3 sm:px-4 lg:px-6 py-4 lg:py-5">{children}</main>
      </div>
      <PWAInstallPrompt />
    </div>
  )
}
