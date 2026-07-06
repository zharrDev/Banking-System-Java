import React, { useEffect, useState, useMemo } from 'react'
import { TopBar } from '@/components/layout/TopBar'
import { DataTable } from '@/components/tables/DataTable'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { transactionService } from '@/services/transactionService'
import type { Transaction, User } from '@/types'
import { formatCurrency, formatDateTime } from '@/utils/formatters'
export const TransactionsPage: React.FC<{user:User|null}> = ({ user }) => {
  const [txs,setTxs]=useState<Transaction[]>([])
  const [loading,setLoading]=useState(true)
  const isAdmin = String(user?.role).toUpperCase()==='ADMIN'
  useEffect(()=>{ if(isAdmin){ setLoading(false); return } ; transactionService.getMyTransactions().then(setTxs).finally(()=>setLoading(false)) },[isAdmin])
  const columns = useMemo(()=>[
    { key:'desc', header:'Description', render:(t:Transaction)=><div><p className="font-medium">{t.description}</p><p className="text-xs text-ink-muted font-mono">{t.referenceNumber}</p></div> },
    { key:'amount', header:'Amount', render:(t:Transaction)=><span className="font-bold">{formatCurrency(t.amount, t.currency)}</span> },
    { key:'status', header:'Status', render:(t:Transaction)=><StatusBadge status={t.status}/> },
    { key:'date', header:'Date', render:(t:Transaction)=><span className="text-sm text-ink-secondary">{formatDateTime(t.createdAt)}</span> },
  ],[])
  if(isAdmin) return <div><TopBar user={user} title="Transactions" subtitle="Customer only" /><div className="p-8"><div className="glass-panel p-8 rounded-[24px] text-center">Login sebagai USER untuk melihat transaksi.</div></div></div>
  return <div><TopBar user={user} title="Transactions" subtitle={`${txs.length} records`} />
    <div className="p-4 sm:p-6 lg:p-8"><DataTable columns={columns} data={txs} isLoading={loading} /></div>
  </div>
}
