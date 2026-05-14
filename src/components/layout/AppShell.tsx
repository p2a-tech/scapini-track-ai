import { ReactNode, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AppShell({ children }: { children: ReactNode }) {
  const [collapsed] = useState(false)
  return (
    <div className="min-h-screen bg-graphite-50">
      <Sidebar collapsed={collapsed} />
      <div className="lg:pl-72">
        <Header />
        <main className="px-4 lg:px-6 py-5">{children}</main>
      </div>
    </div>
  )
}
