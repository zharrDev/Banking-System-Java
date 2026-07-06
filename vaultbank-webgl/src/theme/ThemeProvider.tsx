import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
export type ThemeMode='light'|'dark'
const ThemeContext=createContext<{theme:ThemeMode;setTheme:(t:ThemeMode)=>void;toggleTheme:()=>void}|undefined>(undefined)
export const ThemeProvider:React.FC<{children:React.ReactNode}>=({children})=>{
  const [theme,setTheme]=useState<ThemeMode>(()=>{const s=localStorage.getItem('vaultbank_theme');return s==='dark'||s==='light'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')})
  useEffect(()=>{document.documentElement.classList.remove('theme-light','theme-dark');document.documentElement.classList.add(theme==='dark'?'theme-dark':'theme-light');document.body.classList.remove('theme-light','theme-dark');document.body.classList.add(theme==='dark'?'theme-dark':'theme-light');localStorage.setItem('vaultbank_theme',theme)},[theme])
  const v=useMemo(()=>({theme,setTheme,toggleTheme:()=>setTheme(c=>c==='dark'?'light':'dark')}),[theme])
  return <ThemeContext.Provider value={v}>{children}</ThemeContext.Provider>
}
export const useTheme=()=>{const c=useContext(ThemeContext); if(!c) throw new Error('useTheme must be used within ThemeProvider'); return c}
