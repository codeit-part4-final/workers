'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import TeamHeader from '@/components/team-header/TeamHeader';
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

  const memberImageUrls = MOCK_MEMBERS.filter((m) => m.imageUrl).map((m) => m.imageUrl as string);

  return (
    <div className={styles.container}>
      <TeamHeader
        variant="team"
        teamName={MOCK_TEAM_NAME}
        memberCount={MOCK_MEMBERS.length}
        memberImageUrls={memberImageUrls}
        settingsHref={`/${teamid}/settings`}
      />

      <TodayReport
        totalTasks={MOCK_TODAY_REPORT.totalTasks}
        doneTasks={MOCK_TODAY_REPORT.doneTasks}
      />

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
