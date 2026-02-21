'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import TodoCard from '@/components/todo-card/TodoCard';
import AddTodoList from '@/components/Modal/domain/components/AddTodoList/AddTodoList';
import KanbanColumn from './KanbanColumn';
import styles from './KanbanBoard.module.css';
import type { KanbanTask, KanbanStatus } from '../../interfaces/team';

const KANBAN_COLUMNS: { id: KanbanStatus; label: string }[] = [
  { id: 'todo', label: '할 일' },
  { id: 'inProgress', label: '진행중' },
  { id: 'done', label: '완료' },
];

interface KanbanBoardProps {
  tasks: KanbanTask[];
  setTasks: React.Dispatch<React.SetStateAction<KanbanTask[]>>;
  teamId: string;
}

export default function KanbanBoard({ tasks, setTasks, teamId }: KanbanBoardProps) {
  const router = useRouter();
  const [activeTask, setActiveTask] = useState<KanbanTask | null>(null);
  const [addingStatus, setAddingStatus] = useState<KanbanStatus | null>(null);
  const [newListTitle, setNewListTitle] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const getTasksByStatus = useCallback(
    (status: KanbanStatus) => tasks.filter((t) => t.status === status),
    [tasks],
  );

  const handleDragStart = (event: DragStartEvent) => {
    const found = tasks.find((t) => t.id === String(event.active.id));
    setActiveTask(found ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // over가 컬럼인 경우 (빈 컬럼에 드롭)
    const overColumn = KANBAN_COLUMNS.find((c) => c.id === overId);
    if (overColumn) {
      setTasks((prev) =>
        prev.map((t) => (t.id === activeId ? { ...t, status: overColumn.id } : t)),
      );
      return;
    }

    // over가 다른 태스크인 경우
    const overTask = tasks.find((t) => t.id === overId);
    const activeTask = tasks.find((t) => t.id === activeId);
    if (!overTask || !activeTask) return;

    if (activeTask.status === overTask.status) {
      // 같은 컬럼 내 순서 변경
      setTasks((prev) => {
        const colTasks = prev.filter((t) => t.status === activeTask.status);
        const otherTasks = prev.filter((t) => t.status !== activeTask.status);
        const oldIdx = colTasks.findIndex((t) => t.id === activeId);
        const newIdx = colTasks.findIndex((t) => t.id === overId);
        const reordered = arrayMove(colTasks, oldIdx, newIdx);
        return [...otherTasks, ...reordered];
      });
    } else {
      // 다른 컬럼으로 이동
      setTasks((prev) =>
        prev.map((t) => (t.id === activeId ? { ...t, status: overTask.status } : t)),
      );
    }
  };

  const handleItemCheckedChange = (taskId: string, itemId: string, checked: boolean) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              items: task.items.map((item) => (item.id === itemId ? { ...item, checked } : item)),
            }
          : task,
      ),
    );
  };

  const handleCardClick = (taskId: string) => {
    router.push(`/${teamId}/tasks/${taskId}`);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleEditTask = (_taskId: string) => {
    // 수정 기능 추후 구현
  };

  const handleAddListSubmit = () => {
    if (!newListTitle.trim() || !addingStatus) return;

    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      title: newListTitle.trim(),
      status: addingStatus,
      items: [],
    };

    setTasks((prev) => [...prev, newTask]);
    setNewListTitle('');
    setAddingStatus(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.boardHeader}>
        <h2 className={styles.boardTitle}>
          할 일 목록 <span className={styles.boardCount}>({tasks.length}개)</span>
        </h2>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className={styles.board}>
          {KANBAN_COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              status={col.id}
              tasks={getTasksByStatus(col.id)}
              onItemCheckedChange={handleItemCheckedChange}
              onCardClick={handleCardClick}
              onAddTask={(status) => setAddingStatus(status)}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && (
            <div className={styles.dragOverlay}>
              <TodoCard title={activeTask.title} items={activeTask.items} />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <AddTodoList
        isOpen={addingStatus !== null}
        onClose={() => {
          setAddingStatus(null);
          setNewListTitle('');
        }}
        onSubmit={handleAddListSubmit}
        input={{
          props: {
            value: newListTitle,
            onChange: (e) => setNewListTitle(e.target.value),
          },
        }}
      />
    </div>
  );
}
