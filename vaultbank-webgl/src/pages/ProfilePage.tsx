import React, { useState } from 'react'
import { TopBar } from '@/components/layout/TopBar'
import { FormInput } from '@/components/forms/FormInput'
import { useTheme } from '@/theme/ThemeProvider'
import type { User } from '@/types'
import { User as UserIcon, MoonStar, SunMedium, Save } from 'lucide-react'
export const ProfilePage: React.FC<{user:User|null; onUpdateUser:(u:User)=>void}> = ({ user, onUpdateUser }) => {
  const { theme, setTheme } = useTheme()
  const [form,setForm]=useState({ fullName:user?.fullName||'', phone:user?.phone||'', address:user?.address||'' })
  const save = (e:React.FormEvent)=>{ e.preventDefault(); if(!user) return; onUpdateUser({ ...user, ...form }) }
  return <div><TopBar user={user} title="Settings" subtitle="Profil & preferensi" />
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      <div className="glass-panel rounded-[30px] p-6">
        <h3 className="text-lg font-bold mb-4">User preferences</h3>
        <form onSubmit={save} className="space-y-4">
          <FormInput label="Display Name" name="fullName" value={form.fullName} onChange={e=>setForm(f=>({...f, fullName:e.target.value}))} icon={UserIcon} />
          <FormInput label="Phone" name="phone" value={form.phone} onChange={e=>setForm(f=>({...f, phone:e.target.value}))} />
          <FormInput label="Address" name="address" value={form.address} onChange={e=>setForm(f=>({...f, address:e.target.value}))} />
          <div className="flex gap-2">
            <button type="button" onClick={()=>setTheme('light')} className={`btn-secondary ${theme==='light'?'!border-gold-300':''}`}><SunMedium className="h-4 w-4"/> Light</button>
            <button type="button" onClick={()=>setTheme('dark')} className={`btn-secondary ${theme==='dark'?'!border-gold-300':''}`}><MoonStar className="h-4 w-4"/> Dark</button>
          </div>
          <button className="btn-primary"><Save className="h-4 w-4"/> Save Changes</button>
        </form>
      </div>
    </div>
  </div>
}
