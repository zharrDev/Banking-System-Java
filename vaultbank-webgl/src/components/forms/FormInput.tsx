import React from 'react'

import type { LucideIcon } from 'lucide-react'

interface Props {

  label: string

  name: string

  type?: string

  value: string

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void

  placeholder?: string

  error?: string

  icon?: LucideIcon

  required?: boolean

  disabled?: boolean

  autoComplete?: string

}

export const FormInput: React.FC<Props> = ({

  label,

  name,

  type = 'text',

  value,

  onChange,

  placeholder,

  error,

  icon: Icon,

  required = false,

  disabled = false,

  autoComplete,

}) => (

  <div className="space-y-2">

  <label htmlFor={name} className="block text-sm font-medium text-navy-700">

  {label}

  {required && <span className="ml-1 text-red-500">*</span>}

  </label>

  <div className="relative">

  {Icon && (

  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy-400">

  <Icon className="h-4 w-4" />

  </div>

  )}

  <input

  id={name}

  name={name}

  type={type}

  value={value}

  onChange={onChange}

  placeholder={placeholder}

  required={required}

  disabled={disabled}

  autoComplete={autoComplete}

  className={`sketch-input ${Icon ? 'pl-11' : ''} ${

  error ? '!border-red-400 focus:!ring-red-400' : ''

  } ${disabled ? 'cursor-not-allowed bg-navy-50 opacity-60' : ''}`}

  />

  </div>

  {error && <p className="text-xs text-red-500">{error}</p>}

  </div>

)