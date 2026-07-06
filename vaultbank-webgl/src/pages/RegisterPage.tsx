import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Landmark, Lock, Mail, UserRound } from 'lucide-react'
import { FormInput } from '@/components/forms/FormInput'
import { AdaptiveBackground } from '@/components/three/AdaptiveBackground'
import type { RegisterRequest } from '@/types'
export const RegisterPage: React.FC<{onRegister:(p:RegisterRequest)=>Promise<void>}> = ({ onRegister }) => {
  const navigate=useNavigate()
  const [form,setForm]=useState({fullName:'',email:'',password:'',confirmPassword:''})
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState('')
  const submit = async (e:React.FormEvent)=>{ e.preventDefault(); if(form.password!==form.confirmPassword){ setErr('Password tidak sama'); return } setErr(''); setLoading(true); try{ await onRegister(form); navigate('/login') }catch{ setErr('Registrasi gagal') } finally { setLoading(false) } }
  const up = (k:string)=>(e:React.ChangeEvent<HTMLInputElement>)=> setForm(f=>({...f, [k]:e.target.value}))
  return <div className="min-h-screen relative">
    <AdaptiveBackground intensity="subtle" />
    <div className="webgl-content min-h-screen flex flex-col">
      <header className="h-20 flex items-center px-6"><Link to="/" className="font-bold flex items-center gap-2"><Landmark className="h-5 w-5"/> VaultBank 3D</Link></header>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 glass-panel rounded-[32px] overflow-hidden">
          <div className="hidden lg:flex flex-col justify-center p-12 bg-navy-900 text-white"><h2 className="text-4xl font-extrabold mb-4">Start your <span className="text-gold-400">banking journey</span></h2><p className="text-navy-200">Daftar kurang dari 2 menit, langsung akses dashboard 3D.</p></div>
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl font-extrabold mb-2">Create Account</h1>
            <p className="text-ink-secondary mb-6">Isi detail untuk mulai.</p>
            {err && <div className="mb-4 p-3 rounded-2xl bg-red-50 text-red-600 text-sm">{err}</div>}
            <form onSubmit={submit} className="space-y-4">
              <FormInput label="Full Name" name="fullName" value={form.fullName} onChange={up('fullName')} icon={UserRound} required/>
              <FormInput label="Email" name="email" type="email" value={form.email} onChange={up('email')} icon={Mail} required/>
              <FormInput label="Password" name="password" type="password" value={form.password} onChange={up('password')} icon={Lock} required/>
              <FormInput label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={up('confirmPassword')} icon={Lock} required/>
              <button disabled={loading} className="btn-primary w-full py-4 text-lg mt-2">{loading?'Creating...':<>Create Account <ArrowRight className="h-5 w-5 ml-1"/></>}</button>
            </form>
            <p className="mt-6 text-center text-sm">Sudah punya akun? <Link to="/login" className="text-gold-600 font-bold">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
}
