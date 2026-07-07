import React from 'react'
import { CreditCard, Landmark, TrendingUp, Briefcase } from 'lucide-react'
import type { Account } from '@/types'
import { formatCurrency, getStatusColor, maskAccountNumber } from '@/utils/formatters'

interface Props { account: Account; onClick?: () => void }

const icons: Record<string, React.ElementType> = {
  CHECKING: CreditCard, SAVINGS: Landmark, INVESTMENT: TrendingUp, BUSINESS: Briefcase,
}
const gradients: Record<string, string> = {
  CHECKING: 'from-violet-600 via-violet-700 to-indigo-800',
  SAVINGS: 'from-emerald-600 via-emerald-700 to-teal-800',
  INVESTMENT: 'from-amber-500 via-amber-600 to-orange-700',
  BUSINESS: 'from-indigo-600 via-indigo-700 to-violet-800',
}

export const AccountCard: React.FC<Props> = ({ account, onClick }) => {
  const upperType = account.accountType.toUpperCase()
  const Icon = icons[upperType] ?? CreditCard
  const gradient = gradients[upperType] ?? gradients.CHECKING
  const statusColors = getStatusColor(account.status)

  return (
    <div onClick={onClick} className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${gradient} p-6 text-white shadow-xl shadow-black/20 transition-all duration-300 ${onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/15' : ''}`}>
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/[0.07] blur-2xl" />
      <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-white/[0.05] blur-2xl" />
      <div className="relative z-10 flex flex-col justify-between min-h-[220px]">
        <div>
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">{account.accountType}</div>
              <p className="mt-3 font-mono text-xs tracking-[0.18em] text-white/65">{maskAccountNumber(account.accountNumber)}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/10"><Icon className="h-5 w-5 text-white/80" /></div>
          </div>
          <div className="mb-5">
            <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-white/45">Available Balance</p>
            <p className="text-[2rem] font-extrabold leading-none tracking-tight">{formatCurrency(account.balance, account.currency)}</p>
            {account.interestRate != null && (
              <p className="mt-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/75">Interest {account.interestRate}%</p>
            )}
          </div>
        </div>
        <div className="flex items-end justify-between gap-3 border-t border-white/[0.08] pt-4">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white/80">{account.customerName}</p>
            <p className="mt-0.5 truncate text-[11px] text-white/50">{account.customerEmail || 'VaultBank customer'}</p>
          </div>
          <div className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusColors.bg} ${statusColors.text}`}>
            <div className={`h-1.5 w-1.5 rounded-full ${statusColors.dot}`} />{account.status}
          </div>
        </div>
      </div>
    </div>
  )
}
