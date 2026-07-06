import React from 'react'
import { getStatusColor } from '@/utils/formatters'
interface Props { status: string; size?: 'sm'|'md' }
export const StatusBadge: React.FC<Props> = ({ status, size='sm' }) => {
  const colors = getStatusColor(status)
  return <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${colors.bg} ${colors.text} ${size==='sm'?'px-2.5 py-0.5 text-[10px]':'px-3 py-1 text-xs'}`}><span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${colors.dot}`} />{status}</span>
}
