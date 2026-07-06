import React from 'react'
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
import type { Notification } from '@/types'
interface Props { notifications: Notification[]; onRemove: (id:string)=>void }
const icons = { success: CheckCircle, error: AlertCircle, warning: AlertTriangle, info: Info }
const borders = { success:'border-l-pale-green-500', error:'border-l-red-500', warning:'border-l-gold-500', info:'border-l-navy-500' }
const iconColors = { success:'text-pale-green-600', error:'text-red-600', warning:'text-gold-600', info:'text-navy-600' }
export const NotificationToast: React.FC<Props> = ({ notifications, onRemove }) => {
  if (!notifications.length) return null
  return <div className="pointer-events-none fixed right-4 top-4 z-[9999] w-[min(20rem,calc(100vw-2rem))] space-y-2">
    {notifications.map(n=>{ const Icon=icons[n.type]; return <div key={n.id} className={`glass-panel pointer-events-auto flex items-start gap-3 rounded-[30px] border-l-4 p-4 animate-fade-in ${borders[n.type]}`}><Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${iconColors[n.type]}`} /><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{n.title}</p><p className="mt-0.5 text-xs leading-snug text-ink-secondary">{n.message}</p></div><button onClick={()=>onRemove(n.id)} className="rounded-full p-1 text-ink-muted hover:text-ink-primary"><X className="h-4 w-4" /></button></div>})}
  </div>
}
