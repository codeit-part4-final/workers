'use client';

import { useState } from 'react';
import MemberInvite from '@/components/Modal/domain/components/MemberInvite/MemberInvite';
import MemberCard from './MemberCard';
import styles from './MemberSection.module.css';
import { MOCK_INVITE_LINK } from '../../constants/mockData';
import type { TeamMember } from '../../interfaces/team';

interface MemberSectionProps {
  members: TeamMember[];
  isAdmin: boolean;
  teamId: string;
}

export default function MemberSection({ members, isAdmin, teamId }: MemberSectionProps) {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link).catch(() => {});
  };

  return (
    <section className={styles.section} aria-label="팀 멤버">
      <div className={styles.header}>
        <h2 className={styles.title}>
          멤버 <span className={styles.count}>({members.length}명)</span>
        </h2>
        <button
          type="button"
          className={styles.inviteButton}
          onClick={() => setIsInviteOpen(true)}
          aria-label="멤버 초대하기"
        >
          + 초대하기
        </button>
      </div>

      <div className={styles.list}>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      <MemberInvite
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        invite={{
          link: MOCK_INVITE_LINK,
          onCopyLink: handleCopyLink,
        }}
      />
    </section>
  );
}
