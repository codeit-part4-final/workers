import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { KanbanTask, KanbanStatus, TaskItem } from '../interfaces/team';
import { MOCK_TASKS } from '../constants/mockData';

export function useKanbanTasks(teamId: string) {
  const router = useRouter();
  const [tasks, setTasks] = useState<KanbanTask[]>(MOCK_TASKS);
  const [addingStatus, setAddingStatus] = useState<KanbanStatus | null>(null);
  const [newListTitle, setNewListTitle] = useState('');

  const handleItemCheckedChange = useCallback(
    (taskId: string, itemId: string, checked: boolean) => {
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
    },
    [],
  );

  const handleCardClick = useCallback(
    (taskId: string) => {
      router.push(`/${teamId}/tasks/${taskId}`);
    },
    [router, teamId],
  );

  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }, []);

  const handleUpdateTask = useCallback(
    (taskId: string, updatedData: { title: string; items: TaskItem[] }) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, title: updatedData.title, items: updatedData.items } : t,
        ),
      );
    },
    [],
  );

  const handleAddTask = useCallback((status: KanbanStatus) => {
    setAddingStatus(status);
  }, []);

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

  const handleAddListClose = () => {
    setAddingStatus(null);
    setNewListTitle('');
  };

  const handleNewListTitleChange = (value: string) => {
    setNewListTitle(value);
  };

  return {
    tasks,
    setTasks,
    addingStatus,
    newListTitle,
    handleItemCheckedChange,
    handleCardClick,
    handleDeleteTask,
    handleUpdateTask,
    handleAddTask,
    handleAddListSubmit,
    handleAddListClose,
    handleNewListTitleChange,
  };
}
