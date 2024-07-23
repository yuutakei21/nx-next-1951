'use client';

import { Alert } from '@material-tailwind/react';
import { Loading } from '../components/Loading';
import { Sidebar } from '../components/Sidebar/Sidebar';
import PlayGround from '../components/Toast/PlayGround';
import PasswordInput from '../components/molecules/PasswordInput';
import styles from './page.module.css';
import NoticeAlert from '../components/molecules/NoticeAlert';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div
      className={`bg-white flex justify-center max-h-pageContent min-h-pageContent`}
    >
      <Loading enabled={false} />
      <div className="py-2 w-10/12 h-fit">
        <NoticeAlert description="プロジェクトを選択することでプロジェクトにメンバーをアサインできます" />
      </div>
      {/* <PlayGround /> */}
    </div>
  );
}
