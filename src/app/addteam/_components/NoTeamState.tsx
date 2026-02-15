'use client';

import Image from 'next/image';
import { BaseButton } from '@/components/Button/base';
import noTeamImage from '../svg/noTeamImg.svg';
import styles from './NoTeamState.module.css';

export default function NoTeamState() {
  return (
    <section className={styles.emptyState}>
      <Image
        className={styles.illustration}
        src={noTeamImage}
        alt="소속된 팀이 없는 상태 일러스트"
        priority
      />
      <p className={styles.message}>
        아직 소속된 팀이 없습니다.
        <br />
        팀을 생성하거나 팀에 참여해보세요.
      </p>
      <div className={styles.actions}>
        <BaseButton className={styles.actionButton}>팀 생성하기</BaseButton>
        <BaseButton variant="outline" className={styles.actionButton}>
          팀 참가하기
        </BaseButton>
      </div>
    </section>
  );
}
