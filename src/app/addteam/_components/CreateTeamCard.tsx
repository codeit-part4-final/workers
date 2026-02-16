'use client';

import { type FormEvent } from 'react';
import { BaseButton } from '@/components/Button/base';
import { Input } from '@/components/input';
import { ProfileImage } from '@/components/profile-img';
import type { CreateTeamFeedback } from '../_interfaces/feedback';
import FeedbackMessage from './FeedbackMessage';
import styles from '../page.module.css';

const CREATE_TEAM_FEEDBACK_ID = 'create-team-feedback';

interface CreateTeamCardProps {
  value: string;
  disabled: boolean;
  feedback: CreateTeamFeedback | null;
  onChange: (value: string) => void;
  onSubmit: () => void | Promise<void>;
}

export default function CreateTeamCard({
  value,
  disabled,
  feedback,
  onChange,
  onSubmit,
}: CreateTeamCardProps) {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onSubmit();
  };

  return (
    <form className={styles.card} onSubmit={handleFormSubmit}>
      <h2 className={styles.title}>팀 생성하기</h2>

      <div className={styles.profileSection}>
        <ProfileImage variant="team" size="xl" editable />
      </div>

      <div className={styles.inputSection}>
        <label htmlFor="team-name" className={styles.label}>
          팀 이름
        </label>
        <Input
          id="team-name"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={CREATE_TEAM_FEEDBACK_ID}
          placeholder="팀 이름을 입력해주세요"
          className={styles.teamNameInput}
        />
      </div>

      <BaseButton className={styles.submitButton} type="submit" disabled={disabled}>
        생성하기
      </BaseButton>

      <FeedbackMessage id={CREATE_TEAM_FEEDBACK_ID} createTeamFeedback={feedback} />
    </form>
  );
}
