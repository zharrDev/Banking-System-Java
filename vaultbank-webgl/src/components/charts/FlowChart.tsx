import React from 'react'

import {

  Bar,

  BarChart,

  CartesianGrid,

  Legend,

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

export const FlowChart: React.FC<Props> = ({ data }) => (

  <ResponsiveContainer width="100%" height={260}>

  <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>

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

  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />

  <Bar dataKey="inflow" fill="#27ab83" radius={[4, 4, 0, 0]} name="Money In" barSize={18} />

  <Bar dataKey="outflow" fill="#e12d39" radius={[4, 4, 0, 0]} name="Money Out" barSize={18} opacity={0.75} />

  </BarChart>

  </ResponsiveContainer>

)