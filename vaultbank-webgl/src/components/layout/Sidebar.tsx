import React, { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftRight, ChevronLeft, ChevronRight, CreditCard, Landmark, LayoutDashboard, LogOut, SendHorizontal, Settings2, X } from 'lucide-react'
import { useShellLayout } from '@/layout/ShellLayoutContext'
import type { User } from '@/types'

export const Sidebar: React.FC<{ user: User | null }> = ({ user }) => {
  const navigate = useNavigate(); const location = useLocation()
  const { sidebarCollapsed, toggleSidebarCollapsed, mobileSidebarOpen, closeMobileSidebar, onLogout } = useShellLayout()
  const isAdmin = String(user?.role).toUpperCase() === 'ADMIN'
  const navItems = useMemo(() => [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CreditCard, label: isAdmin ? 'Admin Accounts' : 'My Accounts', path: '/accounts' },
    ...(!isAdmin ? [
      { icon: ArrowLeftRight, label: 'Transactions', path: '/transactions' },
      { icon: SendHorizontal, label: 'Transfer', path: '/transfer' },
    ] : []),
    { icon: Settings2, label: 'Settings', path: '/profile' },
  ], [isAdmin])
  useEffect(() => { closeMobileSidebar() }, [location.pathname, closeMobileSidebar])

  return (<>
    <div onClick={closeMobileSidebar} className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
    <aside className={`nd-sidebar fixed left-0 top-0 z-50 flex h-screen flex-col transition-all duration-300 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'lg:w-[88px]' : 'lg:w-[272px]'} w-[272px] lg:translate-x-0`}>
      <div className="flex items-center justify-between px-5 py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/25">
            <Landmark className="h-5 w-5 text-nd-bg" />
          </div>
          {!sidebarCollapsed && (<div><h1 className="text-lg font-extrabold tracking-tight text-white">Vault<span className="text-amber-400">Bank</span></h1><p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Premium Banking</p></div>)}
        </div>
        <button onClick={closeMobileSidebar} className="lg:hidden text-zinc-500 hover:text-white"><X className="h-5 w-5" /></button>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {!sidebarCollapsed && <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Menu</p>}
        {navItems.map((item) => {
          const active = location.pathname === item.path; const Icon = item.icon
          return (
            <button key={item.path} onClick={() => navigate(item.path)} className={`group flex w-full items-center gap-3 rounded-2xl p-3 transition-all duration-200 ${active ? 'bg-amber-500/12 text-white shadow-sm' : 'text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300'} ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <Icon className={`h-5 w-5 transition-colors ${active ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
              {!sidebarCollapsed && <span className="text-sm font-semibold">{item.label}</span>}
              {active && !sidebarCollapsed && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-400" />}
            </button>
          )
        })}
      </nav>
      <div className="border-t border-white/[0.06] p-3 space-y-1">
        <button onClick={onLogout} className={`flex w-full items-center gap-3 rounded-2xl p-3 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}><LogOut className="h-5 w-5" />{!sidebarCollapsed && <span className="text-sm font-semibold">Sign Out</span>}</button>
        <button onClick={toggleSidebarCollapsed} className={`flex w-full items-center gap-3 rounded-2xl p-3 text-zinc-600 hover:bg-white/[0.03] hover:text-zinc-400 transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}>
          {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <><ChevronLeft className="h-5 w-5" /><span className="text-[10px] font-bold uppercase tracking-[0.2em]">Collapse</span></>}
        </button>
      </div>
    </aside>
  </>)
}
