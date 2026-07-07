import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Bell, ChevronDown, LogOut, Menu, Settings2, LayoutDashboard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useShellLayout } from '@/layout/ShellLayoutContext'
import type { User } from '@/types'

const getDisplayName = (user: User | null) => { if(!user) return 'User'; if(user.fullName?.trim()) return user.fullName; return user.email.split('@')[0] || 'User' }

export const TopBar: React.FC<{ user: User | null; title: string; subtitle?: string }> = ({ user, title, subtitle }) => {
  const navigate = useNavigate()
  const { openMobileSidebar, onLogout } = useShellLayout()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const displayName = getDisplayName(user)
  const initials = useMemo(() => displayName.split(' ').filter(Boolean).map(p => p[0]).join('').slice(0,2).toUpperCase(), [displayName])

  useEffect(() => { const h = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false) }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h) }, [])

  return (
    <header className="nd-topbar w-full">
      <div className="mx-auto flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 min-w-0">
          <button onClick={openMobileSidebar} className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 lg:hidden hover:border-zinc-700 transition-colors"><Menu className="h-5 w-5 text-zinc-400" /></button>
          <div className="min-w-0"><h2 className="truncate text-xl sm:text-2xl font-bold text-white">{title}</h2>{subtitle && <p className="text-xs sm:text-sm text-zinc-500 truncate">{subtitle}</p>}</div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="relative h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-center hover:border-zinc-700 transition-all"><Bell className="h-4 w-4 text-zinc-400" /><span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-zinc-950" /></button>
          <div ref={menuRef} className="relative">
            <button onClick={() => setMenuOpen(v => !v)} className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-1.5 pr-3 py-1.5 hover:border-zinc-700 transition-all">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-sm font-bold text-nd-bg shadow-md">{initials || 'U'}</div>
              <div className="hidden lg:block text-left"><p className="text-sm font-bold text-zinc-200 truncate max-w-[120px]">{displayName}</p><p className="text-[10px] uppercase tracking-widest text-zinc-500">{user?.role || 'USER'}</p></div>
              <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute right-0 top-full mt-3 w-60 origin-top-right rounded-3xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/40 transition-all ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="p-3 rounded-2xl bg-white/[0.03] mb-2"><p className="text-sm font-bold text-zinc-200 truncate">{displayName}</p><p className="text-xs text-zinc-500 truncate">{user?.email}</p><div className="mt-2"><span className="nd-badge text-[10px]">{user?.role || 'USER'}</span></div></div>
              <button onClick={() => { setMenuOpen(false); navigate('/dashboard') }} className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200 flex items-center gap-2.5 transition-all"><LayoutDashboard className="h-4 w-4" /> Dashboard</button>
              <button onClick={() => { setMenuOpen(false); navigate('/profile') }} className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200 flex items-center gap-2.5 transition-all"><Settings2 className="h-4 w-4" /> Settings</button>
              <div className="border-t border-zinc-800 my-1.5" />
              <button onClick={() => { setMenuOpen(false); onLogout() }} className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 flex items-center gap-2.5 transition-all"><LogOut className="h-4 w-4" /> Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
