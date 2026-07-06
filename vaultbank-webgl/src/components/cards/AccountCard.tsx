import React from 'react'

import { Briefcase, CreditCard, Landmark, TrendingUp } from 'lucide-react'

import type { Account } from '@/types'

import { formatCurrency, getStatusColor, maskAccountNumber } from '@/utils/formatters'

import { RoughBorder } from '@/components/rough/RoughBorder'

interface Props {

  account: Account

  onClick?: () => void

}

const icons: Record<string, React.ElementType> = {

  CHECKING: CreditCard,

  SAVINGS: Landmark,

  INVESTMENT: TrendingUp,

  BUSINESS: Briefcase,

}

const gradients: Record<string, string> = {

  CHECKING: 'from-navy-700 via-navy-800 to-navy-900',

  SAVINGS: 'from-pale-green-600 via-pale-green-600 to-pale-green-700',

  INVESTMENT: 'from-gold-500 via-gold-500 to-gold-600',

  BUSINESS: 'from-navy-600 via-navy-700 to-navy-800',

}

export const AccountCard: React.FC<Props> = ({ account, onClick }) => {

  const upperType = account.accountType.toUpperCase()

  const Icon = icons[upperType] ?? CreditCard

  const gradient = gradients[upperType] ?? gradients.CHECKING

  const statusColors = getStatusColor(account.status)

  return (

  <RoughBorder

  className={`rounded-[30px] bg-gradient-to-br ${gradient} p-6 text-white shadow-[0_20px_55px_rgba(16,42,67,0.16)] transition-transform duration-200 ${

  onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(16,42,67,0.2)]' : ''

  }`}

  stroke="rgba(255,255,255,0.18)"

  strokeWidth={1.2}

  roughness={0.8}

  >

  <div onClick={onClick} className="relative min-h-[228px] overflow-hidden rounded-[24px] sm:min-h-[240px]">

  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/8 blur-2xl" />

  <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-gold-200/10 blur-2xl" />

  <div className="relative z-10 flex h-full flex-col justify-between">

  <div>

  <div className="mb-7 flex items-start justify-between gap-4">

  <div className="min-w-0">

  <div className="inline-flex rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">

  {account.accountType}

  </div>

  <p className="mt-3 font-mono text-xs tracking-[0.18em] text-white/75">

  {maskAccountNumber(account.accountNumber)}

  </p>

  </div>

  <div className="flex h-12 w-12 items-center justify-center rounded-[20px] border border-white/12 bg-white/10 shadow-inner">

  <Icon className="h-6 w-6 text-white/85" />

  </div>

  </div>

  <div className="mb-6">

  <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-white/55">Available balance</p>

  <p className="text-[1.95rem] font-bold leading-none tracking-tight">

  {formatCurrency(account.balance, account.currency)}

  </p>

  {account.interestRate != null && (

  <p className="mt-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80">

  Interest {account.interestRate}%

  </p>

  )}

  </div>

  </div>

  <div className="flex items-end justify-between gap-3 border-t border-white/12 pt-4">

  <div className="min-w-0">

  <p className="truncate text-xs font-semibold text-white/85">{account.customerName}</p>

  <p className="mt-1 truncate text-[11px] text-white/60">{account.customerEmail || 'VaultBank customer'}</p>

  </div>

  <div className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 ${statusColors.bg}`}>

  <div className={`h-1.5 w-1.5 rounded-full ${statusColors.dot}`} />

  <span className={`text-[10px] font-bold ${statusColors.text}`}>{account.status}</span>

  </div>

  </div>

  </div>

  </div>

  </RoughBorder>

  )

}