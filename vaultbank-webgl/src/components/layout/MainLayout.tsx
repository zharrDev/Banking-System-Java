import React, { useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ShellLayoutProvider } from '@/layout/ShellLayoutContext'
import type { User } from '@/types'
import { Sidebar } from './Sidebar'
interface Props { user: User | null; onLogout: () => void }
export const MainLayout: React.FC<Props> = ({ user, onLogout }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const shellValue = useMemo(() => ({
    sidebarCollapsed, setSidebarCollapsed,
    toggleSidebarCollapsed: () => setSidebarCollapsed(c => !c),
    mobileSidebarOpen,
    openMobileSidebar: () => setMobileSidebarOpen(true),
    closeMobileSidebar: () => setMobileSidebarOpen(false),
    toggleMobileSidebar: () => setMobileSidebarOpen(c => !c),
    onLogout,
  }), [mobileSidebarOpen, onLogout, sidebarCollapsed])
  return (
    <ShellLayoutProvider value={shellValue}>
      <div className="app-shell flex min-h-screen">
        <Sidebar user={user} />
        <main className={`app-main min-w-0 flex-1 transition-[padding] duration-300 ${sidebarCollapsed ? 'lg:pl-[96px]' : 'lg:pl-[272px]'}`}>
          <Outlet />
        </main>
      </div>
    </ShellLayoutProvider>
  )
}
