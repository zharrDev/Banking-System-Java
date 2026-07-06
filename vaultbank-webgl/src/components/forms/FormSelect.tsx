import React from 'react'

import { ChevronDown } from 'lucide-react'

interface Option {

  value: string

  label: string

}

interface Props {

  label: string

  name: string

  value: string

  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void

  options: Option[]

  placeholder?: string

  error?: string

  required?: boolean

  disabled?: boolean

}

export const FormSelect: React.FC<Props> = ({

  label,

  name,

  value,

  onChange,

  options,

  placeholder,

  error,

  required = false,

  disabled = false,

}) => (

  <div className="space-y-1.5">

  <label htmlFor={name} className="block text-sm font-medium text-navy-700">

  {label}

  {required && <span className="ml-1 text-red-500">*</span>}

  </label>

  <div className="relative">

  <select

  id={name}

  name={name}

  value={value}

  onChange={onChange}

  required={required}

  disabled={disabled}

  className={`sketch-input appearance-none pr-10 ${error ? '!border-red-400' : ''} ${

  disabled ? 'cursor-not-allowed bg-navy-50 opacity-60' : ''

  }`}

  >

  {placeholder && (

  <option value="" disabled>

  {placeholder}

  </option>

  )}

  {options.map((option) => (

  <option key={option.value} value={option.value}>

  {option.label}

  </option>

  ))}

  </select>

  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />

  </div>

  {error && <p className="text-xs text-red-500">{error}</p>}

  </div>

)