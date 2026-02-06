import styles from './FloatingLikeButton.module.css';

import emptyHeartIcon from '@/assets/icons/heart/emptyHeartLarge.svg';
import fullHeartIcon from '@/assets/icons/heart/fullHeartLarge.svg';

interface FloatingLikeButtonProps {
  isLiked: boolean;
  count?: number;
  onToggle: () => void;
  disabled?: boolean;
}

function formatCount(n: number): string {
  return n > 999 ? '999+' : String(n);
}

/**
 * FloatingLikeButton 컴포넌트
 *
 * @description
 * 좋아요(토글) 액션을 제공하는 플로팅 버튼이다.
 * 좋아요 상태(`isLiked`)에 따라 아이콘이 전환되며,
 * 선택 상태는 `aria-pressed`로 접근성 속성을 제공한다.
 *
 * @remarks
 * - 좋아요 개수(`count`)가 전달되면 버튼 하단에 표시된다.
 * - 개수는 999를 초과할 경우 `"999+"` 형식으로 축약된다.
 *
 * @param props.isLiked - 좋아요 활성화 여부
 * @param props.count - 좋아요 개수(선택)
 * @param props.onToggle - 좋아요 토글 핸들러
 * @param props.disabled - 비활성화 여부
 * @returns 좋아요 플로팅 버튼
 */
export default function FloatingLikeButton({
  isLiked,
  count,
  onToggle,
  disabled,
}: FloatingLikeButtonProps) {
  const iconSrc = isLiked ? fullHeartIcon : emptyHeartIcon;
  const ariaLabel = isLiked ? '좋아요 취소' : '좋아요';

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        onClick={onToggle}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-pressed={isLiked}
      >
        <img src={iconSrc.src} alt="" width={24} height={24} className={styles.icon} />
      </button>

      {typeof count === 'number' && count > 0 && (
        <span className={styles.count}>{formatCount(count)}</span>
      )}
    </div>
  );
}
