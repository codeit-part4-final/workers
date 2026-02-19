'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TodoCard from '@/components/todo-card/TodoCard';
import styles from './KanbanItem.module.css';
import type { KanbanTask } from '../interfaces/team';

interface KanbanItemProps {
  task: KanbanTask;
  onItemCheckedChange?: (taskId: string, itemId: string, checked: boolean) => void;
  onCardClick?: (taskId: string) => void;
}

export default function KanbanItem({ task, onItemCheckedChange, onCardClick }: KanbanItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button, input, label, a')) {
      onCardClick?.(task.id);
    }
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.item} onClick={handleContainerClick}>
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className={styles.dragHandle}
        aria-label="드래그 핸들"
      >
        <span className={styles.dragDots} aria-hidden="true">
          ⠿
        </span>
      </div>
      <TodoCard
        title={task.title}
        items={task.items}
        onItemCheckedChange={
          onItemCheckedChange
            ? (itemId, checked) => onItemCheckedChange(task.id, itemId, checked)
            : undefined
        }
        className={styles.todoCard}
      />
    </div>
  );
}
