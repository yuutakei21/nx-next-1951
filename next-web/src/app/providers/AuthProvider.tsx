'use client'

import { useRouter } from 'next/navigation'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import {
  getLocalParam,
  setLocalParam,
  getExpireDate,
  removeAllLocalParams,
} from '../commons/cookies'
import { LOGIN_ROUTE } from '../constants/strings'

export interface ISignIn {
  token: string
  role: string
  username: string
  remember?: boolean
}

interface AuthContextProps {
  signedIn: boolean | undefined
  signIn: (signin: ISignIn) => void
  signOut: () => void
  userRole: string
}

export const AuthContext = createContext<AuthContextProps>({
  signedIn: false,
  signIn: () => {
    /* do nothing */
  },
  signOut: () => {
    /* do nothing */
  },
  userRole: '',
})

export default function AuthProvider({ children }: PropsWithChildren) {
  console.log('AuthProvider')
  const router = useRouter()

  const [signedIn, setSignIn] = useState<boolean>(!!getLocalParam('token'))
  const [userRole, setUserRole] = useState<string>(getLocalParam('role') || '')

  useEffect(() => {
    console.log(`signedIn: ${signedIn}`)
  }, [signedIn])

  function signIn(data: ISignIn) {
    const { username, role, token } = data
    setLocalParam('token', token, { expires: getExpireDate(new Date()) })
    setLocalParam('role', role)
    setLocalParam('username', username)
    setSignIn(true)
    setUserRole(role)
  }

  function signOut() {
    console.log('signOut')
    removeAllLocalParams()
    setSignIn(false)
    router.push(LOGIN_ROUTE)
  }

  return (
    <div className='auth-provider-wrapper'>
      {signedIn != null && (
        <AuthContext.Provider
          value={{
            signedIn,
            signIn,
            signOut,
            userRole,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  )
}
