/* eslint-disable react/jsx-no-undef */
import React from 'react'
import { useFormik } from 'formik'
import TextInput from '@/app/components/molecules/TextInput'
import FormSelect from './form-control/FormSelect'

const DynamicForm = ({ schema, formSubmit }) => {
  const formik = useFormik({
    initialValues: schema.reduce((values, field) => {
      values[field.name] = field.value || ''
      return values
    }, {}),
    onSubmit: values => {
      console.log(values)
      if (formSubmit) formSubmit(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
      {schema.map((field, idx) => (
        <div key={`_${field.name}_${idx}`} className='flex flex-row gap-2 items-center'>
          <label htmlFor={field.name} className='min-w-20'>
            {field.label}
          </label>
          {(field.type == 'string' || field.type == 'number') && (
            <TextInput
              id={field.name}
              name={field.name}
              type={field.type}
              onChange={formik.handleChange}
              value={formik.values[field.name]}
            />
          )}
          {field.type == 'select' && (
            <FormSelect
              id={field.name}
              name={field.name}
              onChange={formik.handleChange}
              value={formik.values[field.name]}
              items={field.items}
            />
          )}
        </div>
      ))}
      <button type='submit'>Submit</button>
    </form>
  )
}

export default DynamicForm