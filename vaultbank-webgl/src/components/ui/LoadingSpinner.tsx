import React from 'react'
interface Props { size?: 'sm'|'md'|'lg'; className?: string }
export const LoadingSpinner: React.FC<Props> = ({ size='md', className='' }) => {
  const sizes = { sm:'h-4 w-4 border-2', md:'h-8 w-8 border-2', lg:'h-12 w-12 border-[3px]' }
  return <div className={`flex items-center justify-center ${className}`}><div className={`${sizes[size]} animate-spin rounded-full border-navy-200 border-t-navy-600`} /></div>
}
