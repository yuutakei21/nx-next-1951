'use client'

import { initialize } from '@/app/@openapi'
import { Loading } from '@/app/components/Loading'
import axios from 'axios'
import newUserTemplate from './components/newUserTemplate'
import DynamicForm from './components/DynamicForm'

export default function Index() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
  })

  const rapini = initialize(instance)

  const { queries, mutations, requests } = rapini
  const { mutate, data } = mutations.useAuthControllerLogin()
  const login = () => {
    console.log(process.env.NEXT_PUBLIC_API_DOMAIN)
    console.log('login')
    const res = mutate({
      email: 'admin@example.com',
      password: 'Ss123123',
    })
    console.log(data)
  }
  return (
    <div className={`bg-white flex flex-column justify-center max-h-pageContent min-h-pageContent`}>
      <Loading enabled={false} />
      {/* <div className="py-2 w-10/12 h-fit">
        <NoticeAlert description="プロジェクトを選択することでプロジェクトにメンバーをアサインできます" />
      </div> */}
      {/* <PlayGround /> */}
      {/* <PasswordInput /> */}
      {/* <SortableTable /> */}
      {/* <Button onClick={login}>LOGIN</Button>; */}
      <DynamicForm schema={newUserTemplate} formSubmit={e => console.log(e)} />
    </div>
  )
}
