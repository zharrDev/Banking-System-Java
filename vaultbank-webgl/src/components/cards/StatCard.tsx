import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface Props { title: string; value: string; change?: number; changeLabel?: string; icon: React.ReactNode }

export const StatCard: React.FC<Props> = ({ title, value, change, changeLabel, icon }) => {
  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0
  return (
    <div className="nd-stat-card group">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{title}</p>
          <p className="mt-2 truncate text-[1.75rem] font-extrabold tracking-tight text-white">{value}</p>
          {change !== undefined && (
            <div className="mt-2.5 flex items-center gap-1.5">
              {isPositive && <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />}
              {isNegative && <TrendingDown className="h-3.5 w-3.5 text-red-400" />}
              {!isPositive && !isNegative && <Minus className="h-3.5 w-3.5 text-zinc-500" />}
              <span className={`text-xs font-semibold ${isPositive ? 'text-emerald-400' : isNegative ? 'text-red-400' : 'text-zinc-500'}`}>{isPositive && '+'}{change}%</span>
              {changeLabel && <span className="text-xs text-zinc-600">{changeLabel}</span>}
            </div>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/15 flex-shrink-0 group-hover:bg-amber-500/15 transition-colors">
          <div className="text-amber-400">{icon}</div>
        </div>
      </div>
    </div>
  )
}
