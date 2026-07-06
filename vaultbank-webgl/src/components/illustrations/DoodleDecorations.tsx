import React from 'react'

interface DoodleProps {

  className?: string

}

export const DoodleSparkle: React.FC<DoodleProps> = ({ className = '' }) => (

  <svg className={`pointer-events-none ${className}`} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">

  <path d="M10 0L12.2 7.8L20 10L12.2 12.2L10 20L7.8 12.2L0 10L7.8 7.8L10 0Z" fill="currentColor" opacity="0.18" />

  </svg>

)

export const DoodleCircle: React.FC<DoodleProps> = ({ className = '' }) => (

  <svg className={`pointer-events-none ${className}`} width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">

  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.12" />

  </svg>

)

export const DoodleZigzag: React.FC<DoodleProps> = ({ className = '' }) => (

  <svg className={`pointer-events-none ${className}`} width="64" height="20" viewBox="0 0 64 20" fill="none" aria-hidden="true">

  <path d="M2 18L12 2L22 18L32 2L42 18L52 2L62 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.1" />

  </svg>

)

export const DoodleCross: React.FC<DoodleProps> = ({ className = '' }) => (

  <svg className={`pointer-events-none ${className}`} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">

  <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.12" />

  </svg>

)

export const DoodleDots: React.FC<DoodleProps> = ({ className = '' }) => (

  <svg className={`pointer-events-none ${className}`} width="40" height="8" viewBox="0 0 40 8" fill="none" aria-hidden="true">

  <circle cx="4" cy="4" r="2" fill="currentColor" opacity="0.12" />

  <circle cx="14" cy="4" r="2" fill="currentColor" opacity="0.1" />

  <circle cx="24" cy="4" r="2" fill="currentColor" opacity="0.12" />

  <circle cx="34" cy="4" r="2" fill="currentColor" opacity="0.1" />

  </svg>

)