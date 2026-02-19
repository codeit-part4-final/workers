'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanItem from './KanbanItem';
import styles from './KanbanColumn.module.css';
import type { KanbanTask, KanbanStatus } from '../../interfaces/team';

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
}

export default function KanbanColumn({
  status,
  tasks,
  onItemCheckedChange,
  onCardClick,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const itemIds = tasks.map((t) => t.id);

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h3 className={styles.columnTitle}>{COLUMN_LABELS[status]}</h3>
        <span className={styles.columnCount}>{tasks.length}</span>
      </div>

      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className={`${styles.itemList} ${isOver ? styles.isOver : ''}`}>
          {tasks.map((task) => (
            <KanbanItem
              key={task.id}
              task={task}
              onItemCheckedChange={onItemCheckedChange}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
