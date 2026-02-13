'use client';

import { useState } from 'react';
import { BaseButton } from '@/components/Button/base';
import { Input } from '@/components/input';
import { ProfileImage } from '@/components/profile-img';
import { MobileHeader, Sidebar } from '@/components/sidebar';
import { useCreateTeam } from './_hooks/useCreateTeam';
import styles from './page.module.css';

export default function AddTeamPage() {
  const [teamName, setTeamName] = useState('');
  const { createTeam, isPending, error } = useCreateTeam();

  const isSubmitDisabled = !teamName.trim() || isPending;

  const handleSubmit = async () => {
    if (isSubmitDisabled) return;

    await createTeam(teamName);
    setTeamName('');
  };

  return (
    <main className={styles.page}>
      <Sidebar />
      <div className={styles.mobileGnb}>
        <MobileHeader />
      </div>
      <section className={styles.mainContents}>
        <div className={styles.card}>
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
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="팀 이름을 입력해주세요"
              className={styles.teamNameInput}
            />
          </div>

          <BaseButton
            className={styles.submitButton}
            disabled={isSubmitDisabled}
            onClick={() => void handleSubmit()}
          >
            생성하기
          </BaseButton>

          {error ? (
            <p role="alert" className={styles.errorText}>
              {error.message}
            </p>
          ) : (
            <p className={styles.helperText}>
              팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
