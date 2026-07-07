import React from 'react'
import { Inbox } from 'lucide-react'
interface Props { title: string; description?: string }
export const EmptyState: React.FC<Props> = ({ title, description }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/15 mb-4">
      <Inbox className="h-7 w-7 text-amber-400" />
    </div>
    <h3 className="text-base font-bold text-zinc-300">{title}</h3>
    {description && <p className="mt-1.5 text-sm text-zinc-600 max-w-sm">{description}</p>}
  </div>
)
