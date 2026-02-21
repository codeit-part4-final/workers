import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroup } from '../apis/group';
import { teamGroupKeys } from './queryKeys';

export function useDeleteGroupMutation(groupId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteGroup(groupId),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: teamGroupKeys.all });
    },
  });
}
