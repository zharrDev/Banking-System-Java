import React, { useCallback } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
import { Landmark } from 'lucide-react'
import type { LoginRequest, RegisterRequest, User } from '@/types'
import { ThemeProvider } from '@/context/ThemeContext'

const AppShell: React.FC = () => {
  const { user, isAuthenticated, isLoading, login, logout, updateUser } = useAuth()
  const { notifications, removeNotification, success, error } = useNotification()

  const handleLogin = useCallback(async (credentials: LoginRequest) => {
    try { await login(credentials); success('Welcome!', 'Login successful.') }
    catch(err) { error('Login Failed', err instanceof Error ? err.message : 'Invalid'); throw err }
  }, [login, success, error])
  const handleRegister = useCallback(async (payload: RegisterRequest) => {
    try { await authService.register(payload); success('Account created', 'Please sign in.') }
    catch(err) { error('Failed', err instanceof Error ? err.message : 'Error'); throw err }
  }, [success, error])
  const handleLogout = useCallback(async () => { await logout() }, [logout])
  const handleUpdateUser = useCallback((u: User) => { updateUser(u); success('Saved', 'Profile updated.') }, [updateUser, success])

  if (isLoading) return (
    <div className="min-h-screen bg-nd-bg flex flex-col items-center justify-center gap-5">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-2xl shadow-amber-500/30"><Landmark className="h-7 w-7 text-nd-bg" /></div>
      <LoadingSpinner size="md" /><p className="text-sm text-zinc-500 font-medium">Preparing your workspace…</p>
    </div>
  )

  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <NotificationToast notifications={notifications} onRemove={removeNotification} />
        <Routes>
          {!isAuthenticated ? (<>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>) : (<>
            <Route element={<MainLayout user={user} onLogout={handleLogout} />}>
              <Route path="/dashboard" element={<DashboardPage user={user} />} />
              <Route path="/accounts" element={<AccountsPage user={user} />} />
              <Route path="/transactions" element={<TransactionsPage user={user} />} />
              <Route path="/transfer" element={<TransferPage user={user} />} />
              <Route path="/profile" element={<ProfilePage user={user} onUpdateUser={handleUpdateUser} />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>)}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
const App: React.FC = () => <AppShell />
export default App
