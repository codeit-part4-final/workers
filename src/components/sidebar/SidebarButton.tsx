import clsx from 'clsx';

import styles from './styles/SidebarButton.module.css';
import type { SidebarButtonProps } from './types/types';

/**
 * 사이드바 내 메뉴 항목 버튼.
 * iconOnly가 true이면 아이콘만 표시하고 라벨은 aria-label로 전환됩니다.
 * 사이드바 접힘 상태에서 사용할 수 있습니다.
 */
export default function SidebarButton({
  icon,
  label,
  isActive,
  iconOnly,
  onClick,
}: SidebarButtonProps) {
  return (
    <button
      type="button"
      className={clsx(styles.button, isActive && styles.active, iconOnly && styles.iconOnly)}
      onClick={onClick}
      aria-label={iconOnly ? label : undefined}
    >
      <span className={styles.icon}>{icon}</span>
      {!iconOnly && label}
    </button>
  );
}
