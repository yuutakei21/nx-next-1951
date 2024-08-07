/* eslint-disable react/jsx-no-undef */
'use client'

import Select, { Option } from '@material-tailwind/react/components/Select'

export default function FormSelect({ id, name, onChange, value, items: options }) {
  const render = _item => {
    return typeof _item == 'object' ? (
      <Option key={`_${_item.label}`} value={_item.value} className='mb-1'>
        {_item.label}
      </Option>
    ) : (
      <Option key={`_${_item}`} value={_item} className='mb-1'>
        {_item}
      </Option>
    )
  }

  function handleChange(e) {
    onChange(e)
    console.log(e)
  }
  return (
    <Select
      id={id}
      name={name}
      onChange={handleChange}
      value={value}
      labelProps={{
        className: 'before:mr-0 after:ml-0',
      }}
    >
      {options.map((_item: any) => render(_item))}
    </Select>
  )
}
