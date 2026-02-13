import { useGroupQuery } from '@/shared/queries/groups/useGroupQuery';

export function useTeams(teamId?: number) {
  return useGroupQuery(teamId);
}
