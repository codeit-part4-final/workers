import Input from './Input';
import { AccountInputProps } from './types/types';
import styles from './styles/AccountInput.module.css';

/**
 * 프로필 페이지용 계정 정보 표시 컴포넌트.
 * 이메일과 비밀번호 모두 읽기 전용으로 표시한다.
 * @param email 등록된 이메일 주소
 * @param children 하단 영역에 렌더링할 요소 (수정하기 버튼 등)
 */
export default function AccountInput({ email, children }: AccountInputProps) {
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <label className={styles.label}>이메일</label>
        <Input type="email" value={email} disabled className={styles.readOnly} />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>비밀번호</label>
        <Input type="password" value="••••••••" disabled className={styles.readOnly} />
      </div>
      {children && <div className={styles.buttonArea}>{children}</div>}
    </div>
  );
}
