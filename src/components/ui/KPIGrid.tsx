import { ReactNode } from 'react'

export default function KPIGrid({ children, columns = 4 }: { children: ReactNode; columns?: 2 | 3 | 4 | 5 | 6 }) {
  const cols: Record<number, string> = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }
  return <div className={`grid gap-3 ${cols[columns]}`}>{children}</div>
}
