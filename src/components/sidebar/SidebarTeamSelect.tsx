import type { ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import styles from './styles/SidebarTeamSelect.module.css';
import downArrowLarge from '@/assets/icons/arrow/downArrowLarge.svg';

type SidebarTeamSelectProps = {
  /** 좌측 아이콘 (ReactNode로 자유롭게 주입, 예: 팀 로고 이미지) */
  icon: ReactNode;
  /** 표시 텍스트 ("팀 선택" 또는 선택된 팀 이름) */
  label: string;
  /** 팀이 선택된 상태인지 여부 */
  isSelected?: boolean;
  /** 드롭다운이 열려 있는지 여부 (aria-expanded에 반영) */
  isOpen?: boolean;
  /** 클릭 시 호출되는 콜백 (드롭다운 토글 등) */
  onClick?: () => void;
};

/**
 * 사이드바 팀 선택 드롭다운 트리거 버튼.
 * 클릭하면 팀 목록 드롭다운을 여는 용도로, 드롭다운 패널 자체는 별도 구현이 필요합니다.
 * icon 슬롯에 팀 로고 이미지를 주입할 수 있습니다.
 */
export default function SidebarTeamSelect({
  icon,
  label,
  isSelected,
  isOpen = false,
  onClick,
}: SidebarTeamSelectProps) {
  return (
    <button
      type="button"
      className={clsx(styles.trigger, isSelected && styles.selected)}
      onClick={onClick}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-label={`팀 선택: ${label}`}
    >
      <span className={styles.left}>
        <span className={styles.icon}>{icon}</span>
        {label}
      </span>
      <span className={styles.arrow}>
        <Image src={downArrowLarge} alt="" width={24} height={24} />
      </span>
    </button>
  );
}
