'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import KanbanItem from './KanbanItem';
import styles from './KanbanColumn.module.css';
import type { KanbanTask, KanbanStatus, TaskItem } from '../../interfaces/team';
import Image from 'next/image';
import Plus from '@/assets/buttons/plus/plusBoxButton.svg';

const COLUMN_LABELS: Record<KanbanStatus, string> = {
  todo: '할 일',
  inProgress: '진행중',
  done: '완료',
};

interface KanbanColumnProps {
  status: KanbanStatus;
  tasks: KanbanTask[];
  onItemCheckedChange?: (taskId: string, itemId: string, checked: boolean) => void;
  onCardClick?: (taskId: string) => void;
  onAddTask?: (status: KanbanStatus) => void;
  onDeleteTask?: (taskId: string) => void;
  onEditTask?: (taskId: string) => void;
  onUpdateTask?: (taskId: string, updatedData: { title: string; items: TaskItem[] }) => void;
}

export default function KanbanColumn({
  status,
  tasks,
  onItemCheckedChange,
  onCardClick,
  onAddTask,
  onDeleteTask,
  onEditTask,
  onUpdateTask,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const itemIds = tasks.map((t) => t.id);

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h3 className={styles.columnTitle}>{COLUMN_LABELS[status]}</h3>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => onAddTask?.(status)}
          aria-label={`${COLUMN_LABELS[status]}에 할 일 추가`}
        >
          <Image src={Plus} width={24} height={24} alt="더하기 버튼" />
        </button>
      </div>

      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className={`${styles.itemList} ${isOver ? styles.isOver : ''}`}>
          {tasks.map((task) => (
            <KanbanItem
              key={task.id}
              task={task}
              onItemCheckedChange={onItemCheckedChange}
              onCardClick={onCardClick}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              onUpdateTask={onUpdateTask}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
