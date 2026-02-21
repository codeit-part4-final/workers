export type MemberRole = 'ADMIN' | 'MEMBER';

export type FrequencyType = 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface GroupMember {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string;
  role: MemberRole;
}

export interface TaskUser {
  id: number;
  nickname: string;
  image: string | null;
}

export interface Task {
  id: number;
  name: string;
  description: string | null;
  date: string;
  doneAt: string | null;
  updatedAt: string;
  frequency: FrequencyType;
  recurringId: number;
  deletedAt: string | null;
  commentCount: number;
  displayIndex: number;
  writer: TaskUser | null;
  doneBy: { user: TaskUser | null } | null;
}

export interface TaskList {
  id: number;
  name: string;
  groupId: number;
  displayIndex: number;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}

export interface Group {
  id: number;
  teamId: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  members: GroupMember[];
  taskLists: Omit<TaskList, 'tasks'>[];
}

export interface UpdateGroupBody {
  name?: string;
  image?: string | null;
}

// swagger 스펙이 {} 이므로 실제 응답 확인 후 수정 필요
export interface GroupInvitation {
  inviteToken: string;
}
