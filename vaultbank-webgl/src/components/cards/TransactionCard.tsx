import React from 'react'

import {

  ArrowDownLeft,

  ArrowLeftRight,

  ArrowUpRight,

  CreditCard,

  RotateCcw,

} from 'lucide-react'

import type { Transaction } from '@/types'

import { formatCurrency, formatDateTime, getStatusColor } from '@/utils/formatters'

interface Props {

  transaction: Transaction

}

const icons: Record<string, React.ElementType> = {

  TRANSFER: ArrowLeftRight,

  DEPOSIT: ArrowDownLeft,

  WITHDRAWAL: ArrowUpRight,

  PAYMENT: CreditCard,

  REFUND: RotateCcw,

}

const iconStyles: Record<string, string> = {

  TRANSFER: 'bg-navy-50 text-navy-600',

  DEPOSIT: 'bg-pale-green-50 text-pale-green-600',

  WITHDRAWAL: 'bg-red-50 text-red-500',

  PAYMENT: 'bg-gold-50 text-gold-600',

  REFUND: 'bg-blue-50 text-blue-500',

}

export const TransactionCard: React.FC<Props> = ({ transaction }) => {

  const upperType = transaction.type.toUpperCase()

  const Icon = icons[upperType] ?? ArrowLeftRight

  const style = iconStyles[upperType] ?? iconStyles.TRANSFER

  const statusColors = getStatusColor(transaction.status)

  const isCredit = upperType === 'DEPOSIT' || upperType === 'REFUND'

  return (

  <div className="flex items-center gap-3 rounded-[24px] border border-transparent p-3.5 transition-colors hover:border-navy-100 hover:bg-navy-50/45">

  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[18px] ${style}`}>

  <Icon className="h-4 w-4" />

  </div>

  <div className="min-w-0 flex-1">

  <div className="flex flex-wrap items-center gap-2">

  <p className="truncate text-sm font-semibold text-charcoal">{transaction.description}</p>

  <span className="rounded-full border border-navy-100 bg-white/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-500">

  {transaction.type}

  </span>

  </div>

  <p className="mt-1 text-[11px] text-navy-400">{formatDateTime(transaction.createdAt)}</p>

  {transaction.balanceAfter != null && (

  <p className="mt-1 text-[11px] text-navy-500">

  Balance after: <span className="font-semibold text-charcoal">{formatCurrency(transaction.balanceAfter, transaction.currency)}</span>

  </p>

  )}

  </div>

  <div className="flex-shrink-0 text-right">

  <p className={`text-sm font-bold ${isCredit ? 'text-pale-green-600' : 'text-charcoal'}`}>

  {isCredit ? '+' : '-'}

  {formatCurrency(transaction.amount, transaction.currency)}

  </p>

  <div className="mt-1 flex items-center justify-end gap-1.5">

  <div className={`h-1.5 w-1.5 rounded-full ${statusColors.dot}`} />

  <span className={`text-[10px] font-semibold ${statusColors.text}`}>{transaction.status}</span>

  </div>

  </div>

  </div>

  )

}