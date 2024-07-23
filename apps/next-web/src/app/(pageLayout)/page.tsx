'use client';

import { Loading } from '../components/Loading';
import { Sidebar } from '../components/Sidebar';
import PlayGround from '../components/Toast/PlayGround';
import PasswordInput from '../components/molecules/PasswordInput';
import styles from './page.module.css';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className={`${styles.page} flex justify-center max-h-pageContent min-h-pageContent`}>
      <Loading enabled={false} />
      dasds
      {/* <PlayGround /> */}
    </div>
  );
}
