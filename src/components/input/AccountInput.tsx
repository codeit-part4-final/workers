import { useId } from 'react';

import Input from './Input';
import { AccountInputProps } from './types/types';
import styles from './styles/AccountInput.module.css';

/**
 * 프로필 페이지용 계정 정보 표시 컴포넌트.
 * 이메일과 비밀번호를 읽기 전용으로 보여줍니다.
 * children 슬롯에 변경하기 버튼 등을 주입할 수 있습니다.
 */
export default function AccountInput({ email, children }: AccountInputProps) {
  const emailId = useId();
  const passwordId = useId();

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <label htmlFor={emailId} className={styles.label}>
          이메일
        </label>
        <Input id={emailId} type="email" value={email} disabled className={styles.readOnly} />
      </div>
      <div className={styles.field}>
        <label htmlFor={passwordId} className={styles.label}>
          비밀번호
        </label>
        <Input
          id={passwordId}
          type="password"
          value="••••••••"
          disabled
          className={styles.readOnly}
        />
      </div>
      {children && <div className={styles.buttonArea}>{children}</div>}
    </div>
  );
}
