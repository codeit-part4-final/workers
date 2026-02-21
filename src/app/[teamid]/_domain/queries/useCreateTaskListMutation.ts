import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTaskList } from '../apis/taskList';
import { teamGroupKeys } from './queryKeys';

export function useCreateTaskListMutation(groupId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createTaskList(groupId, name),
    onSettled: () => {
      // taskLists가 Group 응답에 포함되므로 group 상세를 무효화
      void queryClient.invalidateQueries({ queryKey: teamGroupKeys.detail(groupId) });
    },
  });
}
