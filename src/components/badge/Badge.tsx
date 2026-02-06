import clsx from 'clsx';
import Image from 'next/image';

import styles from './styles/Badge.module.css';
import { BADGE_STATE_LABEL, BADGE_STYLE } from './constants/badgeConstants';
import type { BadgeProps } from './types/types';

/**
 * 상태 표시 뱃지 컴포넌트.
 * state에 따라 색상과 아이콘이 자동 결정되며 (done=초록, ongoing=파랑, empty=회색),
 * 스크린리더용 aria-label도 자동으로 "완료: 라벨", "진행 중: 라벨" 형태로 생성됩니다.
 */
export default function Badge({ state, size = 'small', label }: BadgeProps) {
  const iconSrc = BADGE_STYLE.icons[state][size];
  const iconSize = BADGE_STYLE.iconSize[size];

  return (
    <span
      className={clsx(styles.badge, styles[size], styles[state])}
      role="img"
      aria-label={`${BADGE_STATE_LABEL[state]}: ${label}`}
    >
      <Image className={styles.icon} src={iconSrc} alt="" width={iconSize} height={iconSize} />
      <span aria-hidden="true">{label}</span>
    </span>
  );
}
