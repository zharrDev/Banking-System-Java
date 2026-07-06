import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Bell, ChevronDown, LayoutDashboard, LogOut, Menu, MoonStar, Settings2, SunMedium } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useShellLayout } from '@/layout/ShellLayoutContext'
import { useTheme } from '@/theme/ThemeProvider'
import { BackgroundModeToggle } from '@/components/ui/BackgroundModeToggle'
import type { User } from '@/types'

const getDisplayName = (user: User | null) => { if(!user) return 'User'; if(user.fullName?.trim()) return user.fullName; return user.email.split('@')[0] || 'User' }

export const TopBar: React.FC<{user:User|null; title:string; subtitle?:string}> = ({ user, title, subtitle }) => {
  const navigate=useNavigate(); const { theme, toggleTheme } = useTheme(); const { openMobileSidebar, onLogout } = useShellLayout()
  const [menuOpen,setMenuOpen]=useState(false); const menuRef=useRef<HTMLDivElement>(null)
  const displayName=getDisplayName(user)
  const initials = useMemo(()=> displayName.split(' ').filter(Boolean).map(p=>p[0]).join('').slice(0,2).toUpperCase(), [displayName])
  useEffect(()=>{ const h=(e:MouseEvent)=>{ if(menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)}; document.addEventListener('mousedown',h); return()=>document.removeEventListener('mousedown',h)},[])
  return <header className="app-topbar sticky top-0 z-40 w-full">
    <div className="mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 min-w-0">
        <button onClick={openMobileSidebar} className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-soft bg-white/70 lg:hidden"><Menu className="h-5 w-5"/></button>
        <div className="min-w-0"><h2 className="truncate text-xl sm:text-2xl font-bold">{title}</h2>{subtitle && <p className="text-xs sm:text-sm text-ink-muted truncate">{subtitle}</p>}</div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden xl:block"><BackgroundModeToggle compact /></div>
        <button onClick={toggleTheme} className="hidden sm:flex h-10 items-center gap-2 rounded-xl border border-line-soft px-3 bg-white/60 backdrop-blur" title={theme==='dark'?'Light mode':'Dark mode'}>
          {theme==='dark'? <SunMedium className="h-4 w-4 text-gold-500"/> : <MoonStar className="h-4 w-4"/>}
          <span className="hidden lg:inline text-xs font-bold uppercase">{theme==='dark'?'Light':'Dark'}</span>
        </button>
        <button className="relative h-10 w-10 rounded-xl border border-line-soft bg-white/60"><Bell className="h-5 w-5 mx-auto"/><span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-gold-500"/></button>
        <div ref={menuRef} className="relative">
          <button onClick={()=>setMenuOpen(v=>!v)} className="flex items-center gap-3 rounded-2xl border border-line-soft bg-white/70 px-1 pr-3 py-1 backdrop-blur">
            <div className="h-9 w-9 rounded-xl bg-navy-100 flex items-center justify-center text-sm font-bold text-navy-800">{initials||'U'}</div>
            <div className="hidden lg:block text-left"><p className="text-sm font-bold truncate max-w-[120px]">{displayName}</p><p className="text-[10px] uppercase tracking-widest text-ink-muted">{user?.role||'USER'}</p></div>
            <ChevronDown className={`h-4 w-4 text-ink-muted transition-transform ${menuOpen?'rotate-180':''}`}/>
          </button>
          <div className={`absolute right-0 top-full mt-3 w-60 origin-top-right rounded-3xl border border-line-soft glass-panel p-2 shadow-2xl transition-all ${menuOpen?'opacity-100 scale-100':'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="p-3 rounded-2xl bg-black/[0.03] mb-2">
              <p className="text-sm font-bold truncate">{displayName}</p>
              <p className="text-xs text-ink-muted truncate">{user?.email}</p>
              <div className="mt-3 lg:hidden"><BackgroundModeToggle compact/></div>
            </div>
            <button onClick={()=>{setMenuOpen(false);navigate('/dashboard')}} className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-black/5 flex items-center gap-2"><LayoutDashboard className="h-4 w-4"/> Dashboard</button>
            <button onClick={()=>{setMenuOpen(false);navigate('/profile')}} className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-black/5 flex items-center gap-2"><Settings2 className="h-4 w-4"/> Settings</button>
            <div className="border-t border-line-soft my-1"/>
            <button onClick={()=>{setMenuOpen(false);onLogout()}} className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/5 flex items-center gap-2"><LogOut className="h-4 w-4"/> Logout</button>
          </div>
        </div>
      </div>
    </div>
  </header>
}
