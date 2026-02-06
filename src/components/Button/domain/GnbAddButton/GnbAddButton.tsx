import styles from './GnbAddButton.module.css';

import plusIcon from '@/assets/buttons/plus/plusGnbAddButton.svg';

interface GnbAddButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

/**
 * GnbAddButton 컴포넌트
 *
 * @description
 * GNB(Global Navigation Bar) 영역에서 새 항목을 추가하기 위한 버튼이다.
 * 플러스 아이콘과 텍스트 라벨을 함께 표시하며, 전체 너비를 차지하는 형태로 렌더링된다.
 *
 * @remarks
 * - 접근성을 위해 `aria-label`에 `label` 값을 그대로 사용한다.
 * - `disabled`가 true이면 버튼 클릭이 비활성화된다.
 *
 * @param props.label - 버튼에 표시될 텍스트 및 aria-label 값
 * @param props.onClick - 클릭 핸들러
 * @param props.disabled - 비활성화 여부
 * @returns GNB 추가 버튼
 */
export default function GnbAddButton({ label, onClick, disabled = false }: GnbAddButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <img src={plusIcon.src} alt="" className={styles.icon} />
      <span className={styles.text}>{label}</span>
    </button>
  );
}
