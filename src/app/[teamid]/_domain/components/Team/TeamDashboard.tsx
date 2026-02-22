'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useQueries } from '@tanstack/react-query';
import KanbanBoard from '../Kanban/KanbanBoard';
import TodayReport from '../TodayReport/TodayReport';
import MemberSection from '../Member/MemberSection';
import WarningModal from '@/components/Modal/domain/components/WarningModal/WarningModal';
import styles from './TeamDashboard.module.css';
import { groupQueryOptions } from '../../queries/useGroupQuery';
import { taskListQueryOptions } from '../../queries/useTaskListQuery';
import { useCurrentUserQuery } from '@/shared/queries/user/useCurrentUserQuery';
import { useDeleteGroupMutation } from '../../queries/useDeleteGroupMutation';
import type { GroupMember } from '../../apis/types';

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

function isGroupAdmin(members: GroupMember[] | undefined, userId: number): boolean {
  return members?.some((m) => m.userId === userId && m.role === 'ADMIN') ?? false;
}

// 칸반 카드 완료 여부 판정 (모든 태스크가 완료된 경우)
function isTaskListDone(tasks: { doneAt: string | null }[]): boolean {
  return tasks.length > 0 && tasks.every((t) => t.doneAt !== null);
}

export default function TeamDashboard() {
  const params = useParams<{ teamid: string }>();
  const router = useRouter();
  const teamid = params?.teamid ?? '';
  const groupId = Number(teamid);

  const {
    data: group,
    isPending,
    isError,
  } = useQuery({
    ...groupQueryOptions(groupId),
    enabled: groupId > 0,
  });
  const today = getTodayDateString();

  // 칸반과 동일한 쿼리로 태스크 목록을 가져와 TodayReport 카운트 산출
  const taskListQueries = useQueries({
    queries: (group?.taskLists ?? []).map((tl) => taskListQueryOptions(groupId, tl.id, today)),
  });

  const { data: currentUser } = useCurrentUserQuery();
  const { mutate: deleteGroup } = useDeleteGroupMutation(groupId);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isNaN(groupId) || groupId <= 0) {
    return (
      <div className={styles.container}>
        <p>유효하지 않은 팀 ID입니다.</p>
      </div>
    );
  }

  if (isPending) {
    return <div className={styles.container}>로딩 중...</div>;
  }

  if (isError || !group) {
    return (
      <div className={styles.container}>
        <p>그룹을 찾을 수 없습니다.</p>
      </div>
    );
  }

  // 칸반 카드(할 일 목록) 기준으로 오늘의 할 일/완료 카운트 산출
  const totalTasks = taskListQueries.length;
  const doneTasks = taskListQueries.filter((q) => isTaskListDone(q.data?.tasks ?? [])).length;
  const isAdmin = currentUser ? isGroupAdmin(group.members, currentUser.id) : false;

  const handleConfirmDelete = () => {
    deleteGroup(undefined, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <div className={styles.container}>
      <TodayReport
        teamName={group.name}
        totalTasks={totalTasks}
        doneTasks={doneTasks}
        onDeleteGroup={isAdmin ? () => setIsDeleteModalOpen(true) : undefined}
      />

      <WarningModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        text={{
          title: '팀을 삭제하시겠어요?',
          description: '팀을 삭제하면 모든 데이터가\n영구적으로 삭제됩니다.',
          closeLabel: '취소',
          confirmLabel: '삭제하기',
        }}
      />

      <div className={styles.divider} />

      <div className={styles.content}>
        <div className={styles.kanbanArea}>
          <KanbanBoard groupId={groupId} teamId={teamid} taskLists={group.taskLists ?? []} />
        </div>

        <aside className={styles.rightPanel}>
          <MemberSection
            members={group.members ?? []}
            isAdmin={isAdmin}
            groupId={groupId}
            teamId={teamid}
          />
        </aside>
      </div>
    </div>
  );
}
