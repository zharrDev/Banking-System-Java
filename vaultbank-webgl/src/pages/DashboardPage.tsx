import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDownLeft, ArrowLeftRight, CreditCard, PiggyBank, RefreshCw, Settings2, Shield, Wallet } from 'lucide-react'
import { AccountCard } from '@/components/cards/AccountCard'
import { StatCard } from '@/components/cards/StatCard'
import { TransactionCard } from '@/components/cards/TransactionCard'
import { TopBar } from '@/components/layout/TopBar'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { RoughBorder } from '@/components/rough/RoughBorder'
import { accountService } from '@/services/accountService'
import { transactionService } from '@/services/transactionService'
import type { Account, Transaction, User } from '@/types'
import { formatCurrency } from '@/utils/formatters'
import { AdaptiveBackground } from '@/components/three/AdaptiveBackground'

const getDisplayName = (user: User | null) => { if(!user) return 'User'; if(user.fullName?.trim()) return user.fullName; return user.email.split('@')[0] || 'User' }

export const DashboardPage: React.FC<{user:User|null}> = ({ user }) => {
  const navigate = useNavigate()
  const [isLoading,setIsLoading]=useState(true)
  const [error,setError]=useState<string|null>(null)
  const [myAccount,setMyAccount]=useState<Account|null>(null)
  const [adminAccounts,setAdminAccounts]=useState<Account[]>([])
  const [transactions,setTransactions]=useState<Transaction[]>([])
  const isAdmin = String(user?.role).toUpperCase()==='ADMIN'

  const loadData = useCallback(async ()=>{
    setIsLoading(true); setError(null)
    try{
      if(isAdmin){ const a=await accountService.getAdminAccounts(); setAdminAccounts(a); setMyAccount(null); setTransactions([]) }
      else { const [acc, hist] = await Promise.all([accountService.getMyAccount(), transactionService.getMyTransactions()]); setMyAccount(acc); setTransactions(hist); setAdminAccounts([]) }
    }catch(err){ setError(err instanceof Error? err.message : 'Failed') } finally { setIsLoading(false) }
  },[isAdmin])

  useEffect(()=>{ void loadData() },[loadData])

  const inflow = useMemo(()=> transactions.filter(t=>['DEPOSIT','REFUND'].includes(t.type.toUpperCase())).reduce((s,t)=>s+t.amount,0), [transactions])
  const outflow = useMemo(()=> transactions.filter(t=>['WITHDRAWAL','PAYMENT','TRANSFER'].includes(t.type.toUpperCase())).reduce((s,t)=>s+t.amount,0), [transactions])

  if(isLoading) return <div><TopBar user={user} title="Dashboard" subtitle="Memuat..." /><div className="flex h-96 items-center justify-center"><LoadingSpinner size="lg"/></div></div>

  return (
    <div className="relative">
      {/* WebGL subtle background di dashboard */}
      <div className="fixed inset-0 opacity-[0.35] pointer-events-none -z-0"><AdaptiveBackground intensity="subtle" /></div>
      <div className="relative z-10">
      <TopBar user={user} title="Dashboard" subtitle={isAdmin ? 'Admin overview' : 'Your banking overview'} />
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {error && <div className="glass-panel border border-red-200 p-4 rounded-[24px] text-red-700">{error} <button onClick={()=>void loadData()} className="btn-secondary ml-3">Retry</button></div>}

        <RoughBorder className="rounded-[38px] glass-panel p-6 lg:p-8" stroke="#d9e2ec" roughness={0.62}>
          <h2 className="text-3xl font-bold">Halo, {getDisplayName(user)}</h2>
          <p className="mt-3 text-ink-secondary">{isAdmin ? 'Kelola data admin dengan tampilan WebGL 3D baru.' : 'Ringkasan rekening dengan background 3D interaktif.'}</p>
        </RoughBorder>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title={isAdmin?'Total Balance':'Current Balance'} value={formatCurrency(isAdmin ? adminAccounts.reduce((s,a)=>s+a.balance,0) : (myAccount?.balance ?? 0))} icon={<Wallet className="h-5 w-5 text-navy-600"/>} />
          <StatCard title="Transactions" value={transactions.length.toString()} icon={<ArrowLeftRight className="h-5 w-5 text-pale-green-600"/>} iconBg="bg-pale-green-50" />
          <StatCard title="Inflow" value={formatCurrency(inflow)} icon={<ArrowDownLeft className="h-5 w-5 text-gold-600"/>} iconBg="bg-gold-50" />
          <StatCard title="Outflow" value={formatCurrency(outflow)} icon={<RefreshCw className="h-5 w-5 text-red-500"/>} iconBg="bg-red-50" />
        </div>

        {isAdmin ? (
          <RoughBorder className="rounded-[38px] glass-panel p-5" stroke="#d9e2ec" roughness={0.6}>
            <h3 className="text-lg font-bold mb-4">Admin account showcase</h3>
            {adminAccounts.length ? <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {adminAccounts.slice(0,6).map(a=> <AccountCard key={a.id} account={a} />)}
            </div> : <EmptyState title="Tidak ada akun" description="Backend belum mengembalikan data." />}
          </RoughBorder>
        ) : (
          <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-6">
            <RoughBorder className="rounded-[38px] glass-panel p-5" stroke="#d9e2ec" roughness={0.6}>
              <h3 className="text-lg font-bold mb-3">My account</h3>
              {myAccount ? <div className="max-w-[620px]"><AccountCard account={myAccount} /></div> : <EmptyState title="Rekening tidak ditemukan" description="Periksa backend." />}
            </RoughBorder>
            <RoughBorder className="rounded-[38px] glass-panel p-5" stroke="#d9e2ec" roughness={0.6}>
              <h3 className="text-lg font-bold mb-3">Recent activity</h3>
              {transactions.length ? <div className="space-y-1">{transactions.slice(0,5).map(t=> <TransactionCard key={t.id} transaction={t} />)}</div> : <EmptyState title="Belum ada transaksi" description="Riwayat akan tampil di sini." />}
            </RoughBorder>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
