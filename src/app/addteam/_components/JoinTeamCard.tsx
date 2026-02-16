'use client';

import { BaseButton } from '@/components/Button/base';
import { Input } from '@/components/input';
import styles from '../page.module.css';

interface JoinTeamCardProps {
  teamLink: string;
  onTeamLinkChange: (value: string) => void;
}

export default function JoinTeamCard({ teamLink, onTeamLinkChange }: JoinTeamCardProps) {
  const helperTextId = 'join-team-helper-text';

  return (
    <div className={styles.joinCard}>
      <h2 className={styles.title}>팀 참여하기</h2>

      <div className={styles.joinInputSection}>
        <label htmlFor="team-link" className={styles.joinLabel}>
          팀 링크
        </label>
        <Input
          id="team-link"
          value={teamLink}
          onChange={(event) => onTeamLinkChange(event.target.value)}
          aria-describedby={helperTextId}
          placeholder="팀 링크를 입력해주세요."
          className={styles.teamLinkInput}
        />
      </div>

      <BaseButton className={styles.joinSubmitButton}>참여하기</BaseButton>

      <p id={helperTextId} className={styles.joinHelperText}>
        공유받은 팀 링크를 입력해 참여할 수 있어요.
      </p>
    </div>
  );
}
