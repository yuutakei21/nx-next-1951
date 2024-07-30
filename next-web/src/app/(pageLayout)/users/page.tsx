'use client'
import { Loading } from '@/app/components/Loading'
import { GetUsersInput, initialize } from '@/app/@openapi/index'
import { useToast } from '@/app/components/Toast/useToast'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { UserTable } from './components/UserTable'

export default function Index() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
  })

  const rapini = initialize(instance)
  const { queries, mutations, requests } = rapini
  const { mutate, data } = mutations.useUsersControllerUsers()
  const [loading, setLoading] = useState(false)
  const { add } = useToast()

  const getUsers = () => {
    console.log('login')
    const input: GetUsersInput = {}
    const res = mutate(input)
    console.log(data)
  }

  useEffect(() => {
    if (data != undefined) {
      console.log(data)
    }
    setLoading(false)
  }, [data])

  return (
    <div className={`bg-white flex flex-column justify-center max-h-pageContent min-h-pageContent`}>
      <Loading enabled={false} />
      {/* <div className="py-2 w-10/12 h-fit">
        <NoticeAlert description="プロジェクトを選択することでプロジェクトにメンバーをアサインできます" />
      </div> */}
      {/* <PlayGround /> */}
      {/* <PasswordInput /> */}
      <UserTable />
      {/* <Button onClick={getUsers}>LOGIN</Button>; */}
      {/* <DynamicForm schema={newUserTemplate} formSubmit={e => console.log(e)} /> */}
    </div>
  )
}
