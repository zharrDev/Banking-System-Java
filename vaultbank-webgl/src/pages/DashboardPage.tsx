import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, RefreshCw, Star, Wallet } from 'lucide-react'
import { AccountCard } from '@/components/cards/AccountCard'
import { StatCard } from '@/components/cards/StatCard'
import { TransactionCard } from '@/components/cards/TransactionCard'
import { TopBar } from '@/components/layout/TopBar'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { accountService } from '@/services/accountService'
import { transactionService } from '@/services/transactionService'
import type { Account, Transaction, User } from '@/types'
import { formatCurrency } from '@/utils/formatters'

const getDisplayName = (user: User | null) => { if(!user) return 'User'; if(user.fullName?.trim()) return user.fullName; return user.email.split('@')[0] || 'User' }

export const DashboardPage: React.FC<{ user: User | null }> = ({ user }) => {
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

  if(isLoading) return <div><TopBar user={user} title="Dashboard" subtitle="Loading..." /><div className="flex h-[70vh] items-center justify-center"><LoadingSpinner size="lg"/></div></div>

  return (
    <div>
      <TopBar user={user} title="Dashboard" subtitle={isAdmin ? 'Admin overview' : 'Your financial command center'} />
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {error && <div className="nd-card border-red-500/20 bg-red-500/5 p-5 text-red-400 rounded-3xl flex items-center gap-3"><span className="text-sm">{error}</span><button onClick={()=>void loadData()} className="nd-btn-ghost ml-auto text-red-400 text-xs"><RefreshCw className="h-3.5 w-3.5"/> Retry</button></div>}

        <div className="nd-gradient-card p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-amber-500/[0.04] blur-[80px]"/><div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-blue-500/[0.03] blur-[80px]"/></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2"><Star className="h-5 w-5 text-amber-400 fill-amber-400"/><span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Welcome back</span></div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Halo, {getDisplayName(user)} 👋</h1>
            <p className="mt-3 text-zinc-400 max-w-xl">{isAdmin ? 'Manage all accounts and monitor banking activity from your admin dashboard.' : "Here's your financial overview. Track balances, monitor transactions, and stay in control."}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title={isAdmin?'Total Balance':'Current Balance'} value={formatCurrency(isAdmin ? adminAccounts.reduce((s,a)=>s+a.balance,0) : (myAccount?.balance ?? 0))} icon={<Wallet className="h-5 w-5"/>} />
          <StatCard title="Transactions" value={transactions.length.toString()} icon={<ArrowLeftRight className="h-5 w-5"/>} />
          <StatCard title="Inflow" value={formatCurrency(inflow)} icon={<ArrowDownLeft className="h-5 w-5"/>} />
          <StatCard title="Outflow" value={formatCurrency(outflow)} icon={<ArrowUpRight className="h-5 w-5"/>} />
        </div>

        {isAdmin ? (
          <div className="nd-card p-5 sm:p-6"><h3 className="text-lg font-bold text-white mb-5">All Accounts</h3>
            {adminAccounts.length ? <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{adminAccounts.slice(0,6).map(a=> <AccountCard key={a.id} account={a} />)}</div> : <EmptyState title="No accounts" description="No account data returned from backend." />}
          </div>
        ) : (
          <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="nd-card p-5 sm:p-6"><h3 className="text-lg font-bold text-white mb-4">My Account</h3>
              {myAccount ? <div className="max-w-[560px]"><AccountCard account={myAccount} /></div> : <EmptyState title="No account found" description="Please check your backend connection." />}
            </div>
            <div className="nd-card p-5 sm:p-6"><h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
              {transactions.length ? <div className="space-y-2">{transactions.slice(0,5).map(t=> <TransactionCard key={t.id} transaction={t} />)}</div> : <EmptyState title="No transactions yet" description="Your transaction history will appear here." />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
