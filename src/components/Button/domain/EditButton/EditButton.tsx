import styles from './EditButton.module.css';

import editLargeIcon from '@/assets/buttons/edit/editButtonLarge.svg';
import editSmallIcon from '@/assets/buttons/edit/editButtonSmall.svg';

interface EditButtonProps {
  size?: 'large' | 'small';
  onClick: () => void;
  disabled?: boolean;
}

/**
 * EditButton 컴포넌트
 *
 * @description
 * 이미지 편집(수정) 액션을 트리거하는 아이콘 버튼이다.
 * `size` 값에 따라 large/small 아이콘을 선택하여 렌더링한다.
 *
 * @remarks
 * - `disabled`가 true이면 버튼 클릭이 비활성화된다.
 *
 * @param props.size - 버튼 크기 프리셋(기본값: `large`)
 * @param props.onClick - 클릭 핸들러
 * @param props.disabled - 비활성화 여부
 * @returns 이미지 편집 버튼
 */
export default function EditButton({ size = 'large', onClick, disabled }: EditButtonProps) {
  const iconSrc = size === 'large' ? editLargeIcon : editSmallIcon;

  return (
    <button
      type="button"
      className={`${styles.button} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="이미지 편집"
    >
      <img src={iconSrc.src} alt="" className={styles.icon} />
    </button>
  );
}
