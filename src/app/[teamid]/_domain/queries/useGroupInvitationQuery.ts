import { queryOptions, useQuery } from '@tanstack/react-query';
import { getGroupInvitation } from '../apis/group';
import { teamGroupKeys } from './queryKeys';

export function groupInvitationQueryOptions(groupId: number) {
  return queryOptions({
    queryKey: teamGroupKeys.invitation(groupId),
    queryFn: () => getGroupInvitation(groupId),
    // 토큰은 매번 새로 발급받아야 하므로 캐시 사용 안 함
    staleTime: 0,
  });
}

export function useGroupInvitationQuery(groupId: number, enabled: boolean) {
  return useQuery({
    ...groupInvitationQueryOptions(groupId),
    enabled,
  });
}
