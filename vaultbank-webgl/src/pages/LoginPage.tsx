import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, Landmark, Lock, Mail } from 'lucide-react'
import { FormInput } from '@/components/forms/FormInput'
import { AdaptiveBackground } from '@/components/three/AdaptiveBackground'
import type { LoginRequest } from '@/types'
export const LoginPage: React.FC<{onLogin:(c:LoginRequest)=>Promise<void>}> = ({ onLogin }) => {
  const navigate=useNavigate()
  const [cred,setCred]=useState({email:'',password:''})
  const [show,setShow]=useState(false)
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState('')
  const submit = async (e:React.FormEvent)=>{ e.preventDefault(); setErr(''); setLoading(true); try{ await onLogin(cred); navigate('/dashboard') }catch{ setErr('Invalid email or password') } finally { setLoading(false) } }
  return <div className="min-h-screen relative flex flex-col">
    <AdaptiveBackground intensity="subtle" />
    <div className="webgl-content flex flex-col min-h-screen">
      <header className="h-20 flex items-center px-6"><Link to="/" className="flex items-center gap-2 font-bold"><Landmark className="h-5 w-5"/> VaultBank 3D</Link></header>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden glass-panel rounded-[32px]">
          <div className="hidden lg:flex flex-col justify-center p-12 bg-navy-900 text-white relative">
            <h2 className="text-4xl font-extrabold mb-4">Sign in to <span className="text-gold-400">VaultBank</span></h2>
            <p className="text-navy-200">Akses dashboard WebGL 3D banking workspace.</p>
          </div>
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl font-extrabold mb-2">Welcome Back</h1>
            <p className="text-ink-secondary mb-6">Masuk untuk akses workspace 3D.</p>
            {err && <div className="mb-4 p-3 rounded-2xl bg-red-50 text-red-600 text-sm">{err}</div>}
            <form onSubmit={submit} className="space-y-5">
              <FormInput label="Email" name="email" type="email" value={cred.email} onChange={e=>setCred(c=>({...c, email:e.target.value}))} icon={Mail} required placeholder="you@vaultbank.id"/>
              <div className="relative">
                <FormInput label="Password" name="password" type={show?'text':'password'} value={cred.password} onChange={e=>setCred(c=>({...c, password:e.target.value}))} icon={Lock} required placeholder="••••••••"/>
                <button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-4 top-[42px] text-ink-muted">{show?<EyeOff className="h-5 w-5"/>:<Eye className="h-5 w-5"/>}</button>
              </div>
              <button disabled={loading} className="btn-primary w-full py-4 text-lg justify-center">{loading?'Signing in...':<>Sign In <ArrowRight className="h-5 w-5 ml-1"/></>}</button>
            </form>
            <p className="mt-8 text-center text-sm text-ink-secondary">Belum punya akun? <Link to="/register" className="text-gold-600 font-bold">Daftar</Link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
}
