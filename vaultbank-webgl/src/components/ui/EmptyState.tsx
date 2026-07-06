import React from 'react'
import { Inbox } from 'lucide-react'
interface Props { icon?: React.ReactNode; title: string; description?: string; action?: React.ReactNode }
export const EmptyState: React.FC<Props> = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
    <div className="rounded-[30px] border border-dashed border-navy-200 bg-navy-50/55 px-6 py-5">
      {icon ?? <Inbox className="mx-auto h-14 w-14 text-navy-200" />}
    </div>
    <h3 className="mt-4 text-base font-semibold text-charcoal">{title}</h3>
    {description && <p className="mt-2 max-w-sm text-sm leading-6 text-navy-400">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
)
