import dayjs from 'dayjs'
import { getCookie, removeCookie, setCookie } from 'typescript-cookie'

const EXPIRE_TIME = 36000

export function getExpireDate(date: Date) {
  const seconds = process.env.NEXT_PUBLIC_EXPIRE
    ? parseInt(process.env.NEXT_PUBLIC_EXPIRE, 10)
    : EXPIRE_TIME
  return dayjs(date).add(seconds, 'seconds').toDate()
}

export function setLocalParam(field: string, value: any, attributes?: any) {
  if (attributes) {
    setCookie(`${field}`, value, attributes)
  } else {
    setCookie(`${field}`, value)
  }
}

export function removeLocalParam(field: string) {
  removeCookie(`${field}`)
}

export function getLocalParam(field: string) {
  return getCookie(`${field}`)
}

export const removeAllLocalParams = () => {
  setLocalParam('token', '', { expires: 0 })
  removeLocalParam('token')
  removeLocalParam('role')
  removeLocalParam('username')
}
