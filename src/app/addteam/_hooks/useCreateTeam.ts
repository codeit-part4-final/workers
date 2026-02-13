import { Group } from '@/shared/apis/groups/types';
import { useCreateGroupMutation } from '@/shared/queries/groups/useCreateGroupMutation';
import { groupsKeys } from '@/shared/queries/groups/queryKeys';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { isDuplicated, normalizeTeamName } from '../_utils/duplicationCalculator';

const EMPTY_TEAM_NAME_ERROR = '팀 이름을 입력해주세요.';
const DUPLICATED_TEAM_NAME_ERROR = '중복된 팀 이름입니다.';

function getCachedTeamNames(queryClient: QueryClient) {
  const cachedDetails = queryClient.getQueriesData<Group>({
    queryKey: groupsKeys.details(),
  });

  return cachedDetails
    .map(([, group]) => group?.name)
    .filter((name): name is string => typeof name === 'string');
}

export function useCreateTeam() {
  const queryClient = useQueryClient();
  const createGroupMutation = useCreateGroupMutation();

  const createTeam = async (name: string) => {
    const normalizedName = normalizeTeamName(name);
    if (!normalizedName) {
      throw new Error(EMPTY_TEAM_NAME_ERROR);
    }

    const cachedNames = getCachedTeamNames(queryClient);
    if (isDuplicated(cachedNames, normalizedName)) {
      throw new Error(DUPLICATED_TEAM_NAME_ERROR);
    }

    return createGroupMutation.mutateAsync({ name: normalizedName });
  };

  return {
    ...createGroupMutation,
    createTeam,
  };
}
