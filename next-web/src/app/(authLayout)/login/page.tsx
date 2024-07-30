'use client'

import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'

import Button from '@material-tailwind/react/components/Button'
import Typography from '@material-tailwind/react/components/Typography'

import { Loading } from '@/app/components/Loading'
import TextInput from '@/app/components/molecules/TextInput'
import PasswordInput from '@/app/components/molecules/PasswordInput'
import Link from 'next/link'
import { useToast } from '@/app/components/Toast'
import { ToastError, ToastSuccess } from '@/app/components/Toast/type'
import { useRouter } from 'next/navigation'
import {
  EMAIL_STR,
  FORGOT_PW_STR,
  HOME_ROUTE,
  PASSWORD_STR,
  SIGN_IN_STR,
} from '@/app/constants/strings'
import { getLocalParam } from '@/app/commons/cookies'
import { AuthContext } from '@/app/providers/AuthProvider'
import { initialize } from '@/app/@openapi'
import axios from 'axios'

export default function Index() {
  const router = useRouter()
  const { signedIn, signIn } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const { add } = useToast()
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
  })

  const rapini = initialize(instance)
  const { queries, mutations, requests } = rapini
  const { mutate, data } = mutations.useAuthControllerLogin()

  useEffect(() => {
    console.log(getLocalParam('token'))
    if (!!getLocalParam('token') == true) {
      console.log('already signin')
      router.push(HOME_ROUTE)
    } else {
      // closeLoader();
    }
  }, [signedIn])

  useEffect(() => {
    console.log(data)
    if (data) {
      if (data.token && data.user) {
        add(new ToastSuccess('login success'))
        console.log('login success')
        const { token, user } = data
        const { firstName, lastName, role } = user
        const username = `${lastName} ${firstName}`
        signIn({ token, role, username })
        router.push(HOME_ROUTE)
      } else {
        add(new ToastError('login failed'))
        console.log('login failed')
      }
    }

    setLoading(false)
  }, [data])

  const login = async () => {
    setLoading(true)
    console.log('login')
    const { email, password } = values
    mutate({ email, password })
  }

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    // Basic Information
    email: Yup.string().email('メールアドレスは無効です').required('メールアドレスは必須です'),
    password: Yup.string().required('パスワードは必須です'),
  })

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: login,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
  })

  return (
    <div className='login-page relative'>
      <Loading enabled={loading} />
      {/* <Header /> */}
      {/* Body */}
      <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6'>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 select-none'>
            <Typography className='text-center font-bold text-2xl mb-4'>{SIGN_IN_STR}</Typography>
            <form onSubmit={handleSubmit}>
              <div>
                <div className='mt-1 relative rounded-md shadow-none flex flex-col'>
                  <Typography>{EMAIL_STR}</Typography>
                  <TextInput
                    placeholder='メールアドレス'
                    id='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                  />
                  {Boolean(errors.email) && (
                    <Typography variant='small' color='red' className='pl-2'>
                      {errors.email}
                    </Typography>
                  )}
                </div>
              </div>

              <div className='mt-6 flex flex-col'>
                <div className='flex flex-row justify-between'>
                  <Typography>{PASSWORD_STR}</Typography>
                  <Link
                    className='text-sm underline text-blue-600 hover:text-blue-800 visited:text-purple-600'
                    href='/password_reset'
                  >
                    {FORGOT_PW_STR}
                  </Link>
                </div>
                <PasswordInput
                  id='password'
                  name='password'
                  placeholder='パスワード'
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                />

                {Boolean(errors.password) && (
                  <Typography variant='small' color='red' className='pl-2'>
                    {errors.password}
                  </Typography>
                )}
              </div>

              <div className='mt-6'>
                <span className='block w-full rounded-md shadow-sm'>
                  <Button className='w-full' type='submit'>
                    {SIGN_IN_STR}
                  </Button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  )
}
