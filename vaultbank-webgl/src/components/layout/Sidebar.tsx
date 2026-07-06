import React, { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftRight, ChevronLeft, ChevronRight, CreditCard, Landmark, LayoutDashboard, LogOut, SendHorizontal, Settings2, X } from 'lucide-react'
import { useShellLayout } from '@/layout/ShellLayoutContext'
import type { User } from '@/types'
export const Sidebar: React.FC<{user:User|null}> = ({ user }) => {
  const navigate = useNavigate(); const location = useLocation()
  const { sidebarCollapsed, toggleSidebarCollapsed, mobileSidebarOpen, closeMobileSidebar, onLogout } = useShellLayout()
  const isAdmin = String(user?.role).toUpperCase() === 'ADMIN'
  const navItems = useMemo(() => [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CreditCard, label: isAdmin ? 'Admin Accounts' : 'My Account', path: '/accounts' },
    ...(!isAdmin ? [
      { icon: ArrowLeftRight, label: 'Transactions', path: '/transactions' },
      { icon: SendHorizontal, label: 'Transfer', path: '/transfer' },
    ] : []),
    { icon: Settings2, label: 'Settings', path: '/profile' },
  ], [isAdmin])
  useEffect(()=>{ closeMobileSidebar() }, [location.pathname, closeMobileSidebar])
  return (<>
    <div onClick={closeMobileSidebar} className={`fixed inset-0 z-40 bg-navy-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
    <aside className={`app-sidebar fixed left-0 top-0 z-50 flex h-screen flex-col text-white transition-all duration-300 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'lg:w-[96px]' : 'lg:w-[272px]'} w-[272px] lg:translate-x-0`}>
      <div className="flex items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-500"><Landmark className="h-6 w-6 text-navy-900" /></div>
          {!sidebarCollapsed && (<div><h1 className="text-xl font-bold">VaultBank</h1><p className="text-[10px] uppercase tracking-[0.2em] text-navy-300">WebGL 3D</p></div>)}
        </div>
        <button onClick={closeMobileSidebar} className="lg:hidden text-navy-200"><X className="h-5 w-5"/></button>
      </div>
      <nav className="flex-1 space-y-1 px-4">
        {navItems.map(item => { const active = location.pathname === item.path; const Icon=item.icon; return (
          <button key={item.path} onClick={()=>navigate(item.path)} className={`flex w-full items-center gap-3 rounded-2xl p-3.5 transition-all ${active ? 'bg-white/10 text-white' : 'text-navy-300 hover:bg-white/5 hover:text-white'} ${sidebarCollapsed?'justify-center':''}`}>
            <Icon className={`h-5 w-5 ${active?'text-gold-400':''}`} />
            {!sidebarCollapsed && <span className="text-sm font-semibold">{item.label}</span>}
          </button>
        )})}
      </nav>
      <div className="border-t border-white/5 p-4 space-y-1">
        <button onClick={onLogout} className={`flex w-full items-center gap-3 rounded-2xl p-3.5 text-navy-300 hover:bg-red-500/10 hover:text-red-400 ${sidebarCollapsed?'justify-center':''}`}><LogOut className="h-5 w-5" />{!sidebarCollapsed && <span className="text-sm font-semibold">Logout</span>}</button>
        <button onClick={toggleSidebarCollapsed} className={`flex w-full items-center gap-3 rounded-2xl p-3.5 text-navy-400 hover:bg-white/5 hover:text-white ${sidebarCollapsed?'justify-center':''}`}>{sidebarCollapsed ? <ChevronRight className="h-5 w-5"/> : <><ChevronLeft className="h-5 w-5"/><span className="text-[10px] font-bold uppercase tracking-[0.2em]">Collapse</span></>}</button>
      </div>
    </aside>
  </>)
}
