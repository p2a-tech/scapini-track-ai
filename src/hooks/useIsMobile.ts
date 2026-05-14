import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 1024 // Tailwind lg

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < MOBILE_BREAKPOINT
  })

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return isMobile
}

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  return isTouch
}

// User-agent based detection (apenas para casos onde precisa diferenciar device, não viewport)
export function useIsMobileDevice(): boolean {
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || ''
    setIsMobileDevice(/android|iphone|ipad|ipod|opera mini|iemobile|mobile/i.test(ua))
  }, [])
  return isMobileDevice
}
