'use client';

import { useState } from 'react';
import JoinTeamCard from '../_components/JoinTeamCard';

export default function JoinTeamPage() {
  const [teamLink, setTeamLink] = useState('');

  return <JoinTeamCard teamLink={teamLink} onTeamLinkChange={setTeamLink} />;
}
