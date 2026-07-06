import React, { useCallback } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { BackgroundModeProvider } from '@/theme/BackgroundModeContext'
import { useAuth } from '@/hooks/useAuth'
import { useNotification } from '@/hooks/useNotification'
import { NotificationToast } from '@/components/ui/NotificationToast'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { MainLayout } from '@/components/layout/MainLayout'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { AccountsPage } from '@/pages/AccountsPage'
import { TransactionsPage } from '@/pages/TransactionsPage'
import { TransferPage } from '@/pages/TransferPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { authService } from '@/services/authService'
import type { LoginRequest, RegisterRequest, User } from '@/types'

const AppShell: React.FC = () => {
  const { user, isAuthenticated, isLoading, login, logout, updateUser } = useAuth()
  const { notifications, removeNotification, success, error } = useNotification()
  const handleLogin = useCallback(async (credentials: LoginRequest) => {
    try { await login(credentials); success('Welcome!','Login berhasil – VaultBank WebGL 3D.') }
    catch(err){ error('Login Failed', err instanceof Error ? err.message : 'Invalid'); throw err }
  }, [login,success,error])
  const handleRegister = useCallback(async (payload: RegisterRequest) => {
    try { await authService.register(payload); success('Akun berhasil dibuat','Silakan login.') }
    catch(err){ error('Register Failed', err instanceof Error ? err.message : 'Gagal'); throw err }
  }, [success,error])
  const handleLogout = useCallback(async ()=>{ await logout() },[logout])
  const handleUpdateUser = useCallback((u:User)=>{ updateUser(u); success('Settings Updated','Profil disimpan.') },[updateUser,success])
  if(isLoading) return <div className="min-h-screen flex flex-col items-center justify-center gap-4"><div className="h-[4.5rem] w-[4.5rem] rounded-[24px] bg-navy-900 text-gold-400 flex items-center justify-center font-bold text-xl">VB</div><LoadingSpinner size="md"/><p className="text-sm text-ink-muted">Preparing WebGL workspace…</p></div>
  return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <NotificationToast notifications={notifications} onRemove={removeNotification}/>
    <Routes>
      {!isAuthenticated ? (<>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
        <Route path="/register" element={<RegisterPage onRegister={handleRegister}/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </>) : (<>
        <Route element={<MainLayout user={user} onLogout={handleLogout} />}>
          <Route path="/dashboard" element={<DashboardPage user={user}/>}/>
          <Route path="/accounts" element={<AccountsPage user={user}/>}/>
          <Route path="/transactions" element={<TransactionsPage user={user}/>}/>
          <Route path="/transfer" element={<TransferPage user={user}/>}/>
          <Route path="/profile" element={<ProfilePage user={user} onUpdateUser={handleUpdateUser}/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
      </>)}
    </Routes>
  </BrowserRouter>
}
const App: React.FC = () => (
  <ThemeProvider>
    <BackgroundModeProvider>
      <AppShell/>
    </BackgroundModeProvider>
  </ThemeProvider>
)
export default App
