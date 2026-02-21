'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProgressBar from '@/components/progressbar/ProgressBar';
import SettingBig from '@/assets/icons/setting/SettingBig.svg';
import styles from './TodayReport.module.css';

interface TodayReportProps {
  teamName: string;
  totalTasks: number;
  doneTasks: number;
  settingsHref?: string;
}

export default function TodayReport({
  teamName,
  totalTasks,
  doneTasks,
  settingsHref,
}: TodayReportProps) {
  const progressPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <section className={styles.card}>
      <h1 className={styles.teamName}>{teamName}</h1>

      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.leftCol}>
            <span className={styles.progressLabel}>오늘의 진행 상황</span>
            <span className={styles.percent}>{progressPercent}%</span>
          </div>

          <div className={styles.statsGroup}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>오늘의 할 일</span>
              <span className={styles.statValue}>{totalTasks}</span>
            </div>
            <div className={styles.divider} aria-hidden="true" />
            <div className={styles.statItem}>
              <span className={styles.statLabel}>완료 🙌</span>
              <span className={`${styles.statValue} ${styles.statValueDone}`}>{doneTasks}</span>
            </div>
          </div>
        </div>

        <div className={styles.progressRow}>
          <ProgressBar
            done={doneTasks}
            total={totalTasks}
            ariaLabel="오늘의 진행률"
            className={styles.progressBar}
          />
          {settingsHref && (
            <Link href={settingsHref} className={styles.settingsLink} aria-label="설정">
              <Image src={SettingBig} alt="설정 버튼" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
