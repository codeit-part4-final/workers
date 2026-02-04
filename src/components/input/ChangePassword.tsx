import { useId } from 'react';

import Input from './Input';
import { ChangePasswordProps } from './types/types';
import styles from './styles/ChangePassword.module.css';

/**
 * 비밀번호 변경 폼 컴포넌트.
 * 새 비밀번호 + 확인 입력 필드로 구성되며, isEditing이 false면 입력이 비활성화됩니다.
 * children 슬롯에 변경하기/취소 버튼 등을 주입할 수 있습니다.
 */
export default function ChangePassword({
  isEditing = false,
  newPasswordProps,
  confirmPasswordProps,
  children,
}: ChangePasswordProps) {
  const newPasswordId = useId();
  const confirmPasswordId = useId();

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <label htmlFor={newPasswordId} className={styles.label}>
          새 비밀번호
        </label>
        <Input
          id={newPasswordId}
          type="password"
          placeholder="새 비밀번호를 입력해 주세요."
          disabled={!isEditing}
          {...newPasswordProps}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor={confirmPasswordId} className={styles.label}>
          새 비밀번호 확인
        </label>
        <Input
          id={confirmPasswordId}
          type="password"
          placeholder="새 비밀번호를 다시 한 번 입력해 주세요."
          disabled={!isEditing}
          {...confirmPasswordProps}
        />
      </div>
      <div className={styles.buttonArea}>{children}</div>
    </div>
  );
}
