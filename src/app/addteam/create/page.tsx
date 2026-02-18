'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateTeamCard from '../_components/CreateTeamCard';
import { CREATE_TEAM_MESSAGES } from '../_constants/createTeam';
import { useCreateTeam } from '../_hooks/useCreateTeam';
import { getCreateTeamFailureMessage } from '../_utils/getCreateTeamFailureMessage';
import type { CreateTeamFeedback } from '../_interfaces/feedback';

export default function CreateTeamPage() {
  const [teamName, setTeamName] = useState('');
  const [createTeamFeedback, setCreateTeamFeedback] = useState<CreateTeamFeedback | null>(null);
  const { createTeam, isPending } = useCreateTeam();
  const router = useRouter();

  const isSubmitDisabled = !teamName.trim() || isPending;

  const handleSubmit = async () => {
    if (isSubmitDisabled) return;

    try {
      const group = await createTeam(teamName);
      setTeamName('');
      setCreateTeamFeedback({ type: 'success', message: CREATE_TEAM_MESSAGES.success });
      router.push(`/teams/${group.id}`);
    } catch (error) {
      setCreateTeamFeedback({ type: 'error', message: getCreateTeamFailureMessage(error) });
    }
  };

  const handleTeamNameChange = (value: string) => {
    setTeamName(value);
    setCreateTeamFeedback(null);
  };

  return (
    <CreateTeamCard
      value={teamName}
      disabled={isSubmitDisabled}
      feedback={createTeamFeedback}
      onChange={handleTeamNameChange}
      onSubmit={handleSubmit}
    />
  );
}
