import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGroup } from '@/shared/apis/groups/group';
import { groupsKeys } from './queryKeys';
import { currentUserKeys } from '@/shared/queries/user/useCurrentUserQuery';

export function useCreateGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: groupsKeys.create(),
    mutationFn: createGroup,
    onSuccess: (group) => {
      queryClient.setQueryData(groupsKeys.detail(group.id), group);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: groupsKeys.all });
      // 사이드바가 사용하는 유저 정보(memberships)도 갱신
      void queryClient.invalidateQueries({ queryKey: currentUserKeys.all });
    },
  });
}
