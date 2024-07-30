'use client'
import Input from '@material-tailwind/react/components/Input'
import React from 'react'

const defaultClass =
  'text-input-control !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10'

export default function TextInput({
  type = 'text',
  id,
  name,
  value,
  error,
  placeholder,
  className = '',
  autoComplete = 'off',
  onChange,
}: any) {
  return (
    <Input
      type={type}
      className={`${defaultClass} ${className}`}
      labelProps={{
        className: 'hidden',
      }}
      placeholder={placeholder}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      autoComplete={autoComplete}
      crossOrigin={undefined}
    />
  )
}
