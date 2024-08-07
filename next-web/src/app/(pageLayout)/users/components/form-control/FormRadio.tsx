/* eslint-disable react/jsx-no-undef */
'use client'

import TextInput from '@/app/components/molecules/TextInput'
import Radio from '@material-tailwind/react/components/Radio'
import { useState } from 'react'

type FormRadioProps = {
  id: string
  name: string
  onChange?: any
  value?: any
  items: any
  otherLabel?: string
}
export default function FormRadio({
  id,
  name,
  onChange,
  value,
  items: options,
  otherLabel,
}: FormRadioProps) {
  const [state, setState] = useState(value)
  const [emitValue, setEmitValue] = useState(value)
  const [inputValue, setInput] = useState('')
  
  const render = _item => {
    return typeof _item == 'object' ? (
      <Radio
        key={`_${_item.label}`}
        name={_item.label}
        label={_item.label}
        value={_item.value}
        crossOrigin={undefined}
        checked={_item === state}
        onClick={e => handleChange(_item.value)}
      />
    ) : (
      <Radio
        key={`_${_item}`}
        name={_item}
        label={_item}
        value={_item}
        checked={_item === state}
        crossOrigin={undefined}
        onClick={e => handleChange(_item)}
      />
    )
  }

  function handleChange(e, other?) {
    setState(e)
    if (other) {
      setEmitValue(inputValue)
      onChange(inputValue)
    } else {
      setEmitValue(e)
      onChange(e)
    }
    console.log(emitValue)
  }
  return (
    <div className={`${name} flex flex-row gap-8`} id={id}>
      {options.map((_item: any) => render(_item))}
      {otherLabel && (
        <div className='flex gap-4 items-center'>
          <Radio
            key={`_${otherLabel}`}
            name={otherLabel}
            label={otherLabel}
            value={otherLabel}
            checked={emitValue == inputValue && inputValue != ''}
            crossOrigin={undefined}
            onChange={e => handleChange(e, true)}
          />
          <TextInput />
        </div>
      )}
    </div>
  )
}
