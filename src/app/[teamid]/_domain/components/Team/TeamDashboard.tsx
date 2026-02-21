'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import KanbanBoard from '../Kanban/KanbanBoard';
import TodayReport from '../TodayReport/TodayReport';
import MemberSection from '../Member/MemberSection';
import styles from './TeamDashboard.module.css';
import {
  MOCK_MEMBERS,
  MOCK_TASKS,
  MOCK_TODAY_REPORT,
  MOCK_TEAM_NAME,
} from '../../constants/mockData';
import type { KanbanTask } from '../../interfaces/team';

const isAdmin = true;

export default function TeamDashboard() {
  const params = useParams<{ teamid: string }>();
  const teamid = params?.teamid ?? '1';

  const [tasks, setTasks] = useState<KanbanTask[]>(MOCK_TASKS);

  return (
    <div className={styles.container}>
      <TodayReport
        teamName={MOCK_TEAM_NAME}
        totalTasks={MOCK_TODAY_REPORT.totalTasks}
        doneTasks={MOCK_TODAY_REPORT.doneTasks}
        settingsHref={`/${teamid}/settings`}
      />

      <div className={styles.divider} />

      <div className={styles.content}>
        <div className={styles.kanbanArea}>
          <KanbanBoard tasks={tasks} setTasks={setTasks} teamId={teamid} />
        </div>

        <aside className={styles.rightPanel}>
          <MemberSection members={MOCK_MEMBERS} isAdmin={isAdmin} teamId={teamid} />
        </aside>
      </div>
    </div>
  );
}
