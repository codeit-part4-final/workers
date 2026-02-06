import styles from './FloatingButton.module.css';

import plusBigIcon from '@/assets/icons/plus/plusBig.svg';
import pencilIcon from '@/assets/icons/pencil/pencil.svg';

interface FloatingButtonProps {
  icon: 'plus' | 'edit';
  onClick: () => void;
  disabled?: boolean;
}

/**
 * FloatingButton 컴포넌트
 *
 * @description
 * 화면에 고정되어 주요 액션을 제공하는 플로팅 버튼이다.
 * `icon` 값에 따라 추가(plus) 또는 편집(edit) 아이콘을 렌더링한다.
 *
 * @remarks
 * - `icon` 타입에 따라 `aria-label`을 자동으로 설정한다.
 * - `disabled`가 true이면 버튼 클릭이 비활성화된다.
 *
 * @param props.icon - 버튼에 표시할 아이콘 타입(`plus` | `edit`)
 * @param props.onClick - 클릭 핸들러
 * @param props.disabled - 비활성화 여부
 * @returns 플로팅 액션 버튼
 */
export default function FloatingButton({ icon, onClick, disabled }: FloatingButtonProps) {
  const iconSrc = icon === 'plus' ? plusBigIcon : pencilIcon;
  const ariaLabel = icon === 'plus' ? '새 항목 추가' : '편집';

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <img src={iconSrc.src} alt="" width={24} height={24} className={styles.icon} />
    </button>
  );
}
