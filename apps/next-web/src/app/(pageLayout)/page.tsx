import { Loading } from '../components/Loading';
import styles from './page.module.css';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className={`${styles.page} flex justify-center h-pageContent`}>
      <Loading enabled={true} />
      PAGE CONTENT
    </div>
  );
}
