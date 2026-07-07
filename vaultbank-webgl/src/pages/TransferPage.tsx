import React, { useEffect, useState } from 'react'
import { SendHorizontal } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { accountService } from '@/services/accountService'
import type { Account, User } from '@/types'
import { formatCurrency } from '@/utils/formatters'

export const TransferPage: React.FC<{ user: User | null }> = ({ user }) => {
  const [account, setAccount] = useState<Account | null>(null)
  const [form, setForm] = useState({ toAccountNumber: '', amount: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const isAdmin = String(user?.role).toUpperCase() === 'ADMIN'

  useEffect(() => { if (!isAdmin) accountService.getMyAccount().then(setAccount).catch(() => {}) }, [isAdmin])

  const submit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setMsg(null); try { const res = await accountService.transfer({ toAccountNumber: form.toAccountNumber, amount: Number(form.amount), description: form.description }); setMsg('Transfer successful! New balance: '+formatCurrency(res.balance)); setAccount(res); setForm({ toAccountNumber: '', amount: '', description: '' }) } catch(err: any) { setMsg(err.message || 'Transfer failed') } finally { setLoading(false) } }

  if (isAdmin) return <div><TopBar user={user} title="Transfer" subtitle="Customer only" /><div className="p-8"><div className="nd-card p-8 text-center text-zinc-400">Please login as a USER to access transfers.</div></div></div>

  const inputs = [
    { label: 'Recipient Account Number', key: 'toAccountNumber', type: 'text', placeholder: '123-456-789', required: true },
    { label: 'Amount', key: 'amount', type: 'number', placeholder: '50000', required: true },
    { label: 'Description (optional)', key: 'description', type: 'text', placeholder: 'Transfer to friend', required: false },
  ]

  return (
    <div>
      <TopBar user={user} title="Transfer & Payments" subtitle="Send money instantly" />
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="nd-card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15"><SendHorizontal className="h-5 w-5 text-violet-400"/></div><div><h3 className="text-xl font-bold text-white">Send Transfer</h3><p className="text-sm text-zinc-500">Balance: {account ? formatCurrency(account.balance) : '—'}</p></div></div>
          {msg && <div className={`mb-5 p-4 rounded-2xl text-sm ${msg.includes('successful') ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>{msg}</div>}
          <form onSubmit={submit} className="space-y-4">
            {inputs.map(f => (
              <div key={f.key}><label className="block text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 mb-2">{f.label}</label><input type={f.type} value={(form as any)[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} required={f.required} placeholder={f.placeholder} className="nd-input" /></div>
            ))}
            <button disabled={loading} className="nd-btn w-full py-3.5 mt-2">{loading ? 'Processing...' : 'Send Transfer'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
