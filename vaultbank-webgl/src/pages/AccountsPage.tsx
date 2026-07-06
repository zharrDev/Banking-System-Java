import React, { useEffect, useMemo, useState } from 'react'
import { TopBar } from '@/components/layout/TopBar'
import { AccountCard } from '@/components/cards/AccountCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { accountService } from '@/services/accountService'
import type { Account, User } from '@/types'
export const AccountsPage: React.FC<{user:User|null}> = ({ user }) => {
  const [accounts,setAccounts]=useState<Account[]>([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState<string|null>(null)
  const isAdmin = String(user?.role).toUpperCase()==='ADMIN'
  const load = async ()=> { setLoading(true); setError(null); try{ const res = isAdmin ? await accountService.getAdminAccounts() : [await accountService.getMyAccount()]; setAccounts(res) }catch(e:any){ setError(e.message) } finally { setLoading(false) } }
  useEffect(()=>{ void load() }, [isAdmin])
  const total = useMemo(()=> accounts.reduce((s,a)=>s+a.balance,0),[accounts])
  return <div><TopBar user={user} title={isAdmin?'Admin Accounts':'My Account'} subtitle={`Total balance: ${total.toLocaleString('id-ID')}`} />
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {loading ? <div className="py-20 flex justify-center"><LoadingSpinner size="lg"/></div> :
       error ? <div className="glass-panel p-6 text-red-600 rounded-[24px]">{error}</div> :
       accounts.length===0 ? <EmptyState title="No accounts" description="Backend belum mengembalikan data."/> :
       <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">{accounts.map(a=> <AccountCard key={a.id} account={a} />)}</div>}
    </div>
  </div>
}
