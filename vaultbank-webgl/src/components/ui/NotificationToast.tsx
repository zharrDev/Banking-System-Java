import React from 'react'
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
import type { Notification } from '@/types'
interface Props { notifications: Notification[]; onRemove: (id: string) => void }
const icons = { success: CheckCircle, error: AlertCircle, warning: AlertTriangle, info: Info }
const borders = { success: 'border-l-emerald-400', error: 'border-l-red-400', warning: 'border-l-amber-400', info: 'border-l-amber-400' }
const iconColors = { success: 'text-emerald-400', error: 'text-red-400', warning: 'text-amber-400', info: 'text-amber-400' }

export const NotificationToast: React.FC<Props> = ({ notifications, onRemove }) => {
  if (!notifications.length) return null
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[9999] w-[min(22rem,calc(100vw-2rem))] space-y-2">
      {notifications.map((n) => {
        const Icon = icons[n.type]
        return (
          <div key={n.id} className={`nd-glass pointer-events-auto flex items-start gap-3 rounded-2xl border-l-4 p-4 animate-fade-in ${borders[n.type]}`}>
            <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${iconColors[n.type]}`} />
            <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-white">{n.title}</p><p className="mt-0.5 text-xs leading-snug text-zinc-400">{n.message}</p></div>
            <button onClick={() => onRemove(n.id)} className="rounded-full p-1 text-zinc-600 hover:text-zinc-300 transition-colors"><X className="h-4 w-4" /></button>
          </div>
        )
      })}
    </div>
  )
}
