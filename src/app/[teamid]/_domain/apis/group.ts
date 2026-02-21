import { requestJson, requestVoid } from '@/shared/apis/groups/http';
import type { Group, GroupInvitation, Task, UpdateGroupBody } from './types';

const GROUP_ERROR_MESSAGE = {
  fetch: '그룹 정보 조회 실패',
  update: '그룹 정보 수정 실패',
  delete: '그룹 삭제 실패',
  invitation: '초대 링크 조회 실패',
  tasks: '그룹 작업 조회 실패',
} as const;

export function getGroup(groupId: number): Promise<Group> {
  return requestJson<Group>(`/groups/${groupId}`, GROUP_ERROR_MESSAGE.fetch);
}

export function updateGroup(groupId: number, body: UpdateGroupBody): Promise<Group> {
  return requestJson<Group>(`/groups/${groupId}`, GROUP_ERROR_MESSAGE.update, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export function deleteGroup(groupId: number): Promise<void> {
  return requestVoid(`/groups/${groupId}`, GROUP_ERROR_MESSAGE.delete, {
    method: 'DELETE',
  });
}

export function getGroupInvitation(groupId: number): Promise<GroupInvitation> {
  return requestJson<GroupInvitation>(
    `/groups/${groupId}/invitation`,
    GROUP_ERROR_MESSAGE.invitation,
  );
}

export function getGroupTasks(groupId: number, date?: string): Promise<Task[]> {
  const query = date ? `?date=${encodeURIComponent(date)}` : '';
  return requestJson<Task[]>(`/groups/${groupId}/tasks${query}`, GROUP_ERROR_MESSAGE.tasks);
}
