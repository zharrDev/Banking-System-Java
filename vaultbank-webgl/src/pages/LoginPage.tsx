import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, Lock, Mail, Landmark } from 'lucide-react'
import type { LoginRequest } from '@/types'

export const LoginPage: React.FC<{ onLogin: (c: LoginRequest) => Promise<void> }> = ({ onLogin }) => {
  const navigate = useNavigate()
  const [cred, setCred] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setErr(''); setLoading(true); try { await onLogin(cred); navigate('/dashboard') } catch { setErr('Invalid email or password.') } finally { setLoading(false) } }

  return (
    <div className="min-h-screen bg-nd-bg flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"><div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-amber-500/[0.03] blur-[120px]"/><div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-blue-500/[0.02] blur-[120px]"/></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="h-20 flex items-center px-6"><Link to="/" className="flex items-center gap-2.5 font-bold group"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20"><Landmark className="h-4 w-4 text-nd-bg"/></div><span className="text-lg text-white">Vault<span className="text-amber-400">Bank</span></span></Link></header>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="nd-glass p-8 sm:p-10">
              <div className="text-center mb-8"><h1 className="text-3xl font-extrabold text-white mb-2">Welcome Back</h1><p className="text-zinc-400 text-sm">Sign in to access your premium banking workspace</p></div>
              {err && <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{err}</div>}
              <form onSubmit={submit} className="space-y-5">
                <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 mb-2">Email</label><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600"/><input type="email" value={cred.email} onChange={e=>setCred(c=>({...c,email:e.target.value}))} required placeholder="you@vaultbank.id" className="nd-input pl-11"/></div></div>
                <div><label className="block text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 mb-2">Password</label><div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600"/><input type={show?'text':'password'} value={cred.password} onChange={e=>setCred(c=>({...c,password:e.target.value}))} required placeholder="••••••••" className="nd-input pl-11 pr-11"/><button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400">{show?<EyeOff className="h-4 w-4"/>:<Eye className="h-4 w-4"/>}</button></div></div>
                <button disabled={loading} className="nd-btn w-full py-3.5 text-base mt-2">{loading?'Signing in...':<><span>Sign In</span> <ArrowRight className="h-4 w-4 ml-1"/></>}</button>
              </form>
              <p className="mt-8 text-center text-sm text-zinc-500">Don't have an account? <Link to="/register" className="text-amber-400 font-bold hover:text-amber-300">Create account</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
