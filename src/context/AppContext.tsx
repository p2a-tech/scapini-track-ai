import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { UserProfile } from '../data/types'
import { profiles } from '../data/mockData'

type ProfileKey = UserProfile['key']

interface AppContextValue {
  profile: UserProfile
  setProfileKey: (k: ProfileKey) => void
  profiles: UserProfile[]
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [profileKey, setProfileKey] = useState<ProfileKey>('operador')
  const value = useMemo<AppContextValue>(() => {
    const profile = profiles.find((p) => p.key === profileKey) || profiles[0]
    return { profile, setProfileKey, profiles }
  }, [profileKey])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
