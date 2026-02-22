import { MobileHeader, TabletHeader } from '@/components/sidebar';
import SidebarWrapper from './_domain/components/Team/SidebarWrapper';
import styles from './page.module.css';

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.page}>
      <div className={styles.desktopSidebar}>
        <SidebarWrapper />
      </div>
      <div className={styles.tabletHeaderWrapper}>
        <TabletHeader />
      </div>
      <div className={styles.mobileHeaderWrapper}>
        <MobileHeader />
      </div>
      <section className={styles.mainContents}>{children}</section>
    </main>
  );
}
