import Image from 'next/image';

import styles from './styles/SidebarAddButton.module.css';
import plusBig from '@/assets/icons/plus/plusBig.svg';

type SidebarAddButtonProps = {
  /** 버튼에 표시할 텍스트 (예: "팀 추가하기") */
  label: string;
  /** 클릭 시 호출되는 콜백 */
  onClick?: () => void;
};

/**
 * 사이드바 하단의 항목 추가 버튼.
 * + 아이콘과 텍스트로 구성되며, 팀 추가 등의 액션에 사용합니다.
 */
export default function SidebarAddButton({ label, onClick }: SidebarAddButtonProps) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <span className={styles.icon}>
        <Image src={plusBig} alt="" width={16} height={16} />
      </span>
      {label}
    </button>
  );
}
