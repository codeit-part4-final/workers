import styles from './EnterButton.module.css';

import arrowUpActive from '@/assets/buttons/arrow/arrowUpActivedButton.svg';
import arrowUpNonActive from '@/assets/buttons/arrow/arrowUpNonActivedButton.svg';

interface EnterButtonProps {
  onClick: () => void;
  active?: boolean;
}

/**
 * EnterButton 컴포넌트
 *
 * @description
 * 댓글 등록(전송) 액션을 위한 아이콘 버튼이다.
 * `active` 값에 따라 아이콘이 전환되며, `active`가 false이면 버튼이 비활성화된다.
 *
 * @remarks
 * - `disabled={!active}`로 상태를 강제하여, 비활성 상태에서는 클릭이 발생하지 않는다.
 * - 비활성 시각 표현은 NonActive SVG 자체의 색상으로 처리하며, CSS로 opacity를 추가로 적용하지 않는다.
 *
 * @param props.onClick - 클릭 핸들러
 * @param props.active - 활성화 여부(기본값: `false`)
 * @returns 댓글 등록 아이콘 버튼
 */
export default function EnterButton({ onClick, active = false }: EnterButtonProps) {
  const iconSrc = active ? arrowUpActive : arrowUpNonActive;

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={!active} // active가 false면 자동으로 disabled
      aria-label="전송"
    >
      <img src={iconSrc.src} alt="" className={styles.icon} />
    </button>
  );
}
