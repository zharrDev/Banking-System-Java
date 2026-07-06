import React from 'react'

import { Minus, TrendingDown, TrendingUp } from 'lucide-react'

import { RoughBorder } from '@/components/rough/RoughBorder'

interface Props {

  title: string

  value: string

  change?: number

  changeLabel?: string

  icon: React.ReactNode

  iconBg?: string

}

export const StatCard: React.FC<Props> = ({

  title,

  value,

  change,

  changeLabel,

  icon,

  iconBg = 'bg-navy-100',

}) => {

  const isPositive = change !== undefined && change > 0

  const isNegative = change !== undefined && change < 0

  return (

  <RoughBorder className="rounded-[36px] bg-white/90 p-5 shadow-[0_18px_50px_rgba(16,42,67,0.08)]" stroke="#d9e2ec" strokeWidth={1} roughness={0.6}>

  <div className="flex items-start justify-between gap-3">

  <div className="min-w-0 flex-1">

  <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">{title}</p>

  <p className="mt-2 truncate text-2xl font-bold text-charcoal">{value}</p>

  {change !== undefined && (

  <div className="mt-2 flex items-center gap-1.5">

  {isPositive && <TrendingUp className="h-3.5 w-3.5 text-pale-green-600" />}

  {isNegative && <TrendingDown className="h-3.5 w-3.5 text-red-500" />}

  {!isPositive && !isNegative && <Minus className="h-3.5 w-3.5 text-navy-400" />}

  <span

  className={`text-xs font-semibold ${

  isPositive ? 'text-pale-green-600' : isNegative ? 'text-red-500' : 'text-navy-400'

  }`}

  >

  {isPositive && '+'}

  {change}%

  </span>

  {changeLabel && <span className="text-xs text-navy-400">{changeLabel}</span>}

  </div>

  )}

  </div>

  <div className={`${iconBg} rounded-[24px] border border-white/25 p-3 shadow-inner flex-shrink-0`}>

  {icon}

  </div>

  </div>

  </RoughBorder>

  )

}