import Input from './Input';
import { ChangePasswordProps } from './types/types';
import styles from './styles/ChangePassword.module.css';

/**
 * 비밀번호 변경 컴포넌트.
 * @param isEditing 편집 모드 여부 (false면 인풋 비활성화, 기본값 false)
 * @param newPasswordProps 새 비밀번호 인풋에 전달할 props
 * @param confirmPasswordProps 새 비밀번호 확인 인풋에 전달할 props
 * @param children 버튼 등 하단 영역에 렌더링할 요소
 */
export default function ChangePassword({
  isEditing = false,
  newPasswordProps,
  confirmPasswordProps,
  children,
}: ChangePasswordProps) {
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <label className={styles.label}>새 비밀번호</label>
        <Input
          type="password"
          placeholder="새 비밀번호를 입력해 주세요."
          disabled={!isEditing}
          {...newPasswordProps}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>새 비밀번호 확인</label>
        <Input
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
