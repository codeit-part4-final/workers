'use client';

import { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TodoCard from '@/components/todo-card/TodoCard';
import styles from './KanbanItem.module.css';
import type { KanbanTask } from '../../interfaces/team';

interface KanbanItemProps {
  task: KanbanTask;
  onItemCheckedChange?: (taskId: string, itemId: string, checked: boolean) => void;
  onCardClick?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
  onEditTask?: (taskId: string) => void;
}

export default function KanbanItem({
  task,
  onItemCheckedChange,
  onCardClick,
  onDeleteTask,
  onEditTask,
}: KanbanItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleContainerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button, input, label, a')) {
      onCardClick?.(task.id);
    }
  };

  const handleKebabClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEditTask?.(task.id);
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDeleteTask?.(task.id);
  };

  return (
    // dnd-kit의 PointerSensor는 button 요소를 드래그 제외 대상으로 처리하므로
    // listeners를 item 컨테이너에 배치하여 카드 전체 영역에서 드래그 가능하게 함
    <div
      ref={setNodeRef}
      style={style}
      className={styles.item}
      onClick={handleContainerClick}
      {...listeners}
    >
      <div ref={containerRef} className={styles.cardWrapper}>
        <TodoCard
          title={task.title}
          items={task.items}
          onItemCheckedChange={
            onItemCheckedChange
              ? (itemId, checked) => onItemCheckedChange(task.id, itemId, checked)
              : undefined
          }
          onKebabClick={handleKebabClick}
          className={styles.todoCard}
        />
        {isMenuOpen && (
          <div className={styles.contextMenu}>
            <button type="button" className={styles.menuItem} onClick={handleEdit}>
              수정하기
            </button>
            <button type="button" className={styles.menuItem} onClick={handleDelete}>
              삭제하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
