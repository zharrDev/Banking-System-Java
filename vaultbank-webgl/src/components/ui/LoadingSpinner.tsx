import React from 'react'
interface Props { size?: 'sm' | 'md' | 'lg' }
const sizes = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' }
export const LoadingSpinner: React.FC<Props> = ({ size = 'md' }) => (
  <div className="flex items-center justify-center">
    <div className={`${sizes[size]} animate-spin rounded-full border-2 border-zinc-800 border-t-amber-400`} />
  </div>
)
