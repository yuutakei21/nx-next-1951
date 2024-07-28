'use client'
import { Loading } from '../components/Loading'
import PlayGround from '../components/Toast/PlayGround'

export default function Index() {
  return (
    <div className={`bg-white flex flex-column justify-center max-h-pageContent min-h-pageContent`}>
      <Loading enabled={false} />
      {/* <div className="py-2 w-10/12 h-fit">
        <NoticeAlert description="プロジェクトを選択することでプロジェクトにメンバーをアサインできます" />
      </div> */}
      <PlayGround />
      {/* <PasswordInput /> */}
      {/* <SortableTable /> */}
      {/* <Button onClick={login}>LOGIN</Button>; */}
    </div>
  )
}
