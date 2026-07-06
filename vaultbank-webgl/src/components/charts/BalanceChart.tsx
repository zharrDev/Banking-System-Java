import React from 'react'

import {

  Area,

  AreaChart,

  CartesianGrid,

  ResponsiveContainer,

  Tooltip,

  XAxis,

  YAxis,

} from 'recharts'

import type { ChartDataPoint } from '@/types'

import { formatCompactNumber } from '@/utils/formatters'

interface Props {

  data: ChartDataPoint[]

}

export const BalanceChart: React.FC<Props> = ({ data }) => (

  <ResponsiveContainer width="100%" height={260}>

  <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>

  <defs>

  <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">

  <stop offset="5%" stopColor="#334e68" stopOpacity={0.12} />

  <stop offset="95%" stopColor="#334e68" stopOpacity={0} />

  </linearGradient>

  <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">

  <stop offset="5%" stopColor="#27ab83" stopOpacity={0.12} />

  <stop offset="95%" stopColor="#27ab83" stopOpacity={0} />

  </linearGradient>

  </defs>

  <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />

  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#829ab1' }} />

  <YAxis

  axisLine={false}

  tickLine={false}

  tick={{ fontSize: 11, fill: '#829ab1' }}

  tickFormatter={formatCompactNumber}

  width={60}

  />

  <Tooltip

  contentStyle={{

  backgroundColor: '#fff',

  border: '1px solid #d9e2ec',

  borderRadius: '12px',

  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',

  fontSize: '12px',

  }}

  formatter={(value: number) => [formatCompactNumber(value), '']}

  />

  <Area type="monotone" dataKey="balance" stroke="#334e68" strokeWidth={2} fill="url(#balGrad)" name="Balance" />

  <Area type="monotone" dataKey="inflow" stroke="#27ab83" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#inflowGrad)" name="Inflow" />

  </AreaChart>

  </ResponsiveContainer>

)