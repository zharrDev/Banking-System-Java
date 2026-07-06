import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type BgMode = 'webgl' | 'sketch' | 'hybrid'

interface BackgroundModeContextValue {
  bgMode: BgMode
  setBgMode: (m: BgMode) => void
  cycleBgMode: () => void
}

const STORAGE_KEY = 'vaultbank_bg_mode'
const BackgroundModeContext = createContext<BackgroundModeContextValue | undefined>(undefined)

const getInitial = (): BgMode => {
  if (typeof window === 'undefined') return 'sketch'
  const s = localStorage.getItem(STORAGE_KEY) as BgMode | null
  if (s === 'webgl' || s === 'sketch' || s === 'hybrid') return s
  // default aman: sketch – menghindari WebGL Context Lost di device low-end
  return 'sketch'
}

export const BackgroundModeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [bgMode, setBgModeState] = useState<BgMode>(getInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, bgMode)
    // expose ke <html> untuk CSS opsional
    document.documentElement.setAttribute('data-bg-mode', bgMode)
  }, [bgMode])

  const setBgMode = (m: BgMode) => setBgModeState(m)
  const cycleBgMode = () => setBgModeState(c =>
    c === 'sketch' ? 'webgl' : c === 'webgl' ? 'hybrid' : 'sketch'
  )

  const value = useMemo(() => ({ bgMode, setBgMode, cycleBgMode }), [bgMode])

  return <BackgroundModeContext.Provider value={value}>{children}</BackgroundModeContext.Provider>
}

export const useBackgroundMode = () => {
  const ctx = useContext(BackgroundModeContext)
  if (!ctx) throw new Error('useBackgroundMode must be used within BackgroundModeProvider')
  return ctx
}
