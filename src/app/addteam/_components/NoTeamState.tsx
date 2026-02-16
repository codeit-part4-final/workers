'use client';

import Image from 'next/image';
import { BaseButton } from '@/components/Button/base';
import noTeamImage from '../svg/noTeamImg.svg';
import styles from '../page.module.css';

interface NoTeamStateProps {
  onCreateTeamClick: () => void;
  onJoinTeamClick: () => void;
}

export default function NoTeamState({ onCreateTeamClick, onJoinTeamClick }: NoTeamStateProps) {
  return (
    <section className={styles.noTeamState}>
      <Image
        className={styles.noTeamIllustration}
        src={noTeamImage}
        alt="소속된 팀이 없는 상태 일러스트"
        priority
      />
      <p className={styles.noTeamMessage}>
        아직 소속된 팀이 없습니다.
        <br />
        팀을 생성하거나 팀에 참여해보세요.
      </p>
      <div className={styles.noTeamActions}>
        <BaseButton className={styles.noTeamActionButton} onClick={onCreateTeamClick}>
          팀 생성하기
        </BaseButton>
        <BaseButton
          variant="outline"
          className={styles.noTeamActionButton}
          onClick={onJoinTeamClick}
        >
          팀 참가하기
        </BaseButton>
      </div>
    </section>
  );
}
