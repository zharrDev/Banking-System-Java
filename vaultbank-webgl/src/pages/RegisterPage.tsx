import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, Mail, Landmark, UserRound } from 'lucide-react'
import type { RegisterRequest } from '@/types'

export const RegisterPage: React.FC<{ onRegister: (p: RegisterRequest) => Promise<void> }> = ({ onRegister }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const submit = async (e: React.FormEvent) => { e.preventDefault(); if(form.password!==form.confirmPassword){ setErr('Passwords do not match.'); return } setErr(''); setLoading(true); try { await onRegister(form); navigate('/login') } catch { setErr('Registration failed.') } finally { setLoading(false) } }
  const up = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))
  const fields = [
    { label: 'Full Name', key: 'fullName', icon: UserRound, type: 'text', ph: 'John Doe' },
    { label: 'Email', key: 'email', icon: Mail, type: 'email', ph: 'you@vaultbank.id' },
    { label: 'Password', key: 'password', icon: Lock, type: 'password', ph: 'Min. 8 characters' },
    { label: 'Confirm Password', key: 'confirmPassword', icon: Lock, type: 'password', ph: 'Repeat password' },
  ]

  return (
    <div className="min-h-screen bg-nd-bg flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"><div className="absolute top-20 -right-40 h-[450px] w-[450px] rounded-full bg-amber-500/[0.03] blur-[120px]"/><div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-blue-500/[0.02] blur-[120px]"/></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="h-20 flex items-center px-6"><Link to="/" className="flex items-center gap-2.5 font-bold group"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20"><Landmark className="h-4 w-4 text-nd-bg"/></div><span className="text-lg text-white">Vault<span className="text-amber-400">Bank</span></span></Link></header>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="nd-glass p-8 sm:p-10">
              <div className="text-center mb-8"><h1 className="text-3xl font-extrabold text-white mb-2">Create Account</h1><p className="text-zinc-400 text-sm">Start your premium banking journey in seconds</p></div>
              {err && <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{err}</div>}
              <form onSubmit={submit} className="space-y-4">
                {fields.map(f => (
                  <div key={f.key}><label className="block text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 mb-2">{f.label}</label><div className="relative"><f.icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600"/><input type={f.type} value={(form as any)[f.key]} onChange={up(f.key)} required placeholder={f.ph} className="nd-input pl-11"/></div></div>
                ))}
                <button disabled={loading} className="nd-btn w-full py-3.5 text-base mt-3">{loading?'Creating Account...':<><span>Create Account</span> <ArrowRight className="h-4 w-4 ml-1"/></>}</button>
              </form>
              <p className="mt-8 text-center text-sm text-zinc-500">Already have an account? <Link to="/login" className="text-amber-400 font-bold hover:text-amber-300">Sign in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
