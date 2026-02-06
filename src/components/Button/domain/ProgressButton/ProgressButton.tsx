import styles from './ProgressButton.module.css';

import plusBoxIcon from '@/assets/buttons/plus/plusBoxButton.svg';

interface ProgressButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

/**
 * ProgressButton 컴포넌트
 *
 * @description
 * 진행 영역(예: 컬럼/리스트 하단)에서 새로운 항목을 추가하기 위한 버튼이다.
 * 텍스트 라벨과 플러스 아이콘을 함께 표시하며, 전체 너비를 차지하는 형태로 렌더링된다.
 *
 * @remarks
 * - 버튼 텍스트는 길이가 길 경우 말줄임 처리된다.
 * - 아이콘은 시각적 보조 요소로 사용되며, hover 시 투명도가 변경된다.
 * - 접근성을 위해 `aria-label`에 라벨 기반 설명을 제공한다.
 *
 * @param props.label - 버튼에 표시될 텍스트
 * @param props.onClick - 클릭 핸들러
 * @param props.disabled - 비활성화 여부
 * @returns 진행 영역용 추가 버튼
 */
export default function ProgressButton({ label, onClick, disabled = false }: ProgressButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${label} 항목 추가`}
    >
      <span className={styles.text}>{label}</span>
      <img src={plusBoxIcon.src} alt="" className={styles.icon} />
    </button>
  );
}
