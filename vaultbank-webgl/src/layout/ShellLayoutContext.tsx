import React, { createContext, useContext } from 'react'
interface ShellLayoutContextValue { sidebarCollapsed:boolean; setSidebarCollapsed:React.Dispatch<React.SetStateAction<boolean>>; toggleSidebarCollapsed:()=>void; mobileSidebarOpen:boolean; openMobileSidebar:()=>void; closeMobileSidebar:()=>void; toggleMobileSidebar:()=>void; onLogout:()=>void }
const ShellLayoutContext = createContext<ShellLayoutContextValue|null>(null)
export const ShellLayoutProvider = ShellLayoutContext.Provider
export const useShellLayout = () => { const ctx = useContext(ShellLayoutContext); if(!ctx) throw new Error('useShellLayout must be used within ShellLayoutProvider'); return ctx }
