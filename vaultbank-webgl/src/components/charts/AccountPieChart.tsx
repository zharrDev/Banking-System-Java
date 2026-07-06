import React from 'react'

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import type { AccountTypeData } from '@/types'

import { formatCompactNumber } from '@/utils/formatters'

interface Props {

  data: AccountTypeData[]

}

const COLORS = ['#334e68', '#27ab83', '#f0b429', '#829ab1']

export const AccountPieChart: React.FC<Props> = ({ data }) => (

  <ResponsiveContainer width="100%" height={260}>

  <PieChart>

  <Pie

  data={data}

  dataKey="totalBalance"

  nameKey="type"

  cx="50%"

  cy="50%"

  innerRadius={60}

  outerRadius={95}

  paddingAngle={3}

  strokeWidth={2}

  stroke="#fff"

  >

  {data.map((_, index) => (

  <Cell key={index} fill={COLORS[index % COLORS.length]} />

  ))}

  </Pie>

  <Tooltip

  contentStyle={{

  backgroundColor: '#fff',

  border: '1px solid #d9e2ec',

  borderRadius: '12px',

  fontSize: '12px',

  }}

  formatter={(value: number) => [formatCompactNumber(value), 'Balance']}

  />

  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />

  </PieChart>

  </ResponsiveContainer>

)