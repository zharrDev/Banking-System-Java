import React, { useState } from 'react'
import { Save, User as UserIcon } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import type { User } from '@/types'

export const ProfilePage: React.FC<{ user: User | null; onUpdateUser: (u: User) => void }> = ({ user, onUpdateUser }) => {
  const [form, setForm] = useState({ fullName: user?.fullName || '', phone: user?.phone || '', address: user?.address || '' })
  const save = (e: React.FormEvent) => { e.preventDefault(); if (!user) return; onUpdateUser({ ...user, ...form }) }

  return (
    <div>
      <TopBar user={user} title="Settings" subtitle="Profile & preferences" />
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl">
        <div className="nd-card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15">
              <UserIcon className="h-5 w-5 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Profile Settings</h3>
          </div>
          <form onSubmit={save} className="space-y-4">
            {[
              { label: 'Display Name', key: 'fullName', placeholder: 'Your name' },
              { label: 'Phone', key: 'phone', placeholder: '+62...' },
              { label: 'Address', key: 'address', placeholder: 'Your address' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 mb-2">{f.label}</label>
                <input type="text" value={(form as any)[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} placeholder={f.placeholder} className="nd-input" />
              </div>
            ))}
            <button className="nd-btn mt-3"><Save className="h-4 w-4" /> Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  )
}
