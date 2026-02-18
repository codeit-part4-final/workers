import { MobileHeader, Sidebar } from '@/components/sidebar';
import clsx from 'clsx';
import commonStyles from './_styles/common.module.css';
import styles from './page.module.css';

export default function AddTeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.page}>
      <Sidebar />
      <div className={styles.mobileOnlyHeader}>
        <MobileHeader />
      </div>
      <section className={clsx(commonStyles.flexCenter, styles.mainContents)}>{children}</section>
    </main>
  );
}
