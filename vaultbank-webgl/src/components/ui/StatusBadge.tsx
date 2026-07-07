import React from 'react'

interface Props { status: string }

const styles: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  ACTIVE: { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400', label: 'Active' },
  COMPLETED: { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400', label: 'Completed' },
  PENDING: { bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400', label: 'Pending' },
  FAILED: { bg: 'bg-red-500/10 border-red-500/20', text: 'text-red-400', dot: 'bg-red-400', label: 'Failed' },
  SUSPENDED: { bg: 'bg-zinc-500/10 border-zinc-500/20', text: 'text-zinc-400', dot: 'bg-zinc-400', label: 'Suspended' },
  CLOSED: { bg: 'bg-zinc-500/10 border-zinc-500/20', text: 'text-zinc-400', dot: 'bg-zinc-400', label: 'Closed' },
  DEFAULT: { bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400', label: '' },
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const upper = status.toUpperCase()
  const style = styles[upper] ?? styles.DEFAULT
  const display = style.label || status
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold border ${style.bg} ${style.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />{display}
    </span>
  )
}
