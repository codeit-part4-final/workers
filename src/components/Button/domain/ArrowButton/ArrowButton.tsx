import styles from './ArrowButton.module.css';

import leftArrowIcon from '@/assets/buttons/arrow/leftArrowButton.svg';
import rightArrowIcon from '@/assets/buttons/arrow/rightArrowButton.svg';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  size?: 'large' | 'small';
  onClick: () => void;
  disabled?: boolean;
}

/**
 * ArrowButton 컴포넌트
 *
 * @description
 * 좌/우 방향 전환(이전/다음) 용도로 사용하는 아이콘 버튼이다.
 * `direction` 값에 따라 아이콘과 aria-label(이전/다음)을 자동으로 설정한다.
 *
 * @remarks
 * - `disabled`가 true이면 버튼 클릭이 비활성화된다.
 *
 * @param props.direction - 화살표 방향(`left` | `right`)
 * @param props.size - 버튼 크기 프리셋(기본값: `large 32px small: 16px`)
 * @param props.onClick - 클릭 핸들러
 * @param props.disabled - 비활성화 여부
 * @returns 화살표 아이콘 버튼
 */
export default function ArrowButton({
  direction,
  size = 'large',
  onClick,
  disabled,
}: ArrowButtonProps) {
  const iconSrc = direction === 'left' ? leftArrowIcon : rightArrowIcon;
  const ariaLabel = direction === 'left' ? '이전' : '다음';

  return (
    <button
      type="button"
      className={`${styles.button} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <img src={iconSrc.src} alt="" className={styles.icon} />
    </button>
  );
}
