import { MobileHeader, Sidebar } from '@/components/sidebar';
import TeamSidebarDropdown from './_domain/components/Team/TeamSidebarDropdown';
import styles from './page.module.css';

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.page}>
      <Sidebar teamSelect={<TeamSidebarDropdown />} />
      <div className={styles.mobileOnlyHeader}>
        <MobileHeader />
      </div>
      <section className={styles.mainContents}>{children}</section>
    </main>
  );
}
