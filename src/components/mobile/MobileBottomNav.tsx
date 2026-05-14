import { NavLink } from 'react-router-dom'
import { ReactNode } from 'react'

export interface BottomNavItem {
  to: string
  icon: ReactNode
  label: string
}

export default function MobileBottomNav({ items }: { items: BottomNavItem[] }) {
  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-graphite-200 shadow-elevated"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex items-stretch justify-around">
        {items.map((it) => (
          <li key={it.to} className="flex-1">
            <NavLink
              to={it.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
                  isActive ? 'text-brand-700' : 'text-graphite-500 hover:text-graphite-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`p-1.5 rounded-lg ${isActive ? 'bg-brand-50' : ''}`}>{it.icon}</span>
                  <span>{it.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
