import React, { useEffect, useState } from 'react'
import { TopBar } from '@/components/layout/TopBar'
import { FormInput } from '@/components/forms/FormInput'
import { accountService } from '@/services/accountService'
import type { Account, User } from '@/types'
import { formatCurrency } from '@/utils/formatters'
import { AdaptiveBackground } from '@/components/three/AdaptiveBackground'
export const TransferPage: React.FC<{user:User|null}> = ({ user }) => {
  const [account,setAccount]=useState<Account|null>(null)
  const [form,setForm]=useState({ toAccountNumber:'', amount:'', description:'' })
  const [loading,setLoading]=useState(false)
  const [msg,setMsg]=useState<string|null>(null)
  const isAdmin = String(user?.role).toUpperCase()==='ADMIN'
  useEffect(()=>{ if(!isAdmin) accountService.getMyAccount().then(setAccount).catch(()=>{}) },[isAdmin])
  const submit = async (e:React.FormEvent)=>{ e.preventDefault(); setLoading(true); setMsg(null); try{ const res = await accountService.transfer({ toAccountNumber: form.toAccountNumber, amount: Number(form.amount), description: form.description }); setMsg('Transfer berhasil! Saldo: '+formatCurrency(res.balance)); setAccount(res); setForm({toAccountNumber:'',amount:'',description:''}) }catch(err:any){ setMsg(err.message||'Gagal') } finally { setLoading(false) } }
  if(isAdmin) return <div><TopBar user={user} title="Transfer" subtitle="Customer only" /><div className="p-8"><div className="glass-panel p-6 rounded-[24px]">Login sebagai USER.</div></div></div>
  return <div className="relative"><div className="fixed inset-0 opacity-[0.22] pointer-events-none"><AdaptiveBackground intensity="subtle" /></div><div className="relative z-10"><TopBar user={user} title="Transfer & Payments" subtitle="WebGL enhanced" />
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="glass-panel rounded-[30px] p-6">
        <h3 className="text-xl font-bold mb-1">Kirim Transfer</h3>
        <p className="text-sm text-ink-secondary mb-5">Saldo: {account ? formatCurrency(account.balance) : '-'}</p>
        {msg && <div className="mb-4 p-3 rounded-2xl bg-pale-green-50 text-pale-green-700 text-sm">{msg}</div>}
        <form onSubmit={submit} className="space-y-4">
          <FormInput label="Nomor Rekening Tujuan" name="toAccountNumber" value={form.toAccountNumber} onChange={e=>setForm(f=>({...f, toAccountNumber:e.target.value}))} required placeholder="123-456-789" />
          <FormInput label="Nominal" name="amount" type="number" value={form.amount} onChange={e=>setForm(f=>({...f, amount:e.target.value}))} required placeholder="50000" />
          <FormInput label="Deskripsi (opsional)" name="description" value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))} placeholder="Transfer antar teman" />
          <button disabled={loading} className="btn-primary w-full py-3">{loading ? 'Memproses...' : 'Kirim Transfer'}</button>
        </form>
      </div>
    </div></div></div>
}
