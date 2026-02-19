'use client';

import ProgressBar from '@/components/progressbar/ProgressBar';
import styles from './TodayReport.module.css';

interface TodayReportProps {
  totalTasks: number;
  doneTasks: number;
}

export default function TodayReport({ totalTasks, doneTasks }: TodayReportProps) {
  const progressPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <section className={styles.card} aria-label="오늘의 진행 상황">
      <h2 className={styles.title}>오늘의 진행 상황</h2>

      <div className={styles.percentRow}>
        <span className={styles.percent}>{progressPercent}%</span>
      </div>

      <ProgressBar done={doneTasks} total={totalTasks} ariaLabel="오늘의 진행률" />

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>오늘의 할 일</span>
          <span className={styles.statValue}>{totalTasks}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>완료 🙌</span>
          <span className={styles.statValue}>{doneTasks}</span>
        </div>
      </div>
    </section>
  );
}
