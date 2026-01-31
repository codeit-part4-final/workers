import clsx from 'clsx';
import ActionTextArea from './ActionTextArea';
import { CommentInputProps } from './types/types';
import styles from './styles/CommentInput.module.css';

/**
 * 댓글 입력 컴포넌트.
 * ActionTextArea를 위아래 보더 스타일로 감싼다.
 * @param className TextArea에 적용할 추가 CSS 클래스
 * @param props ActionTextArea의 모든 속성
 */
export default function CommentInput({ className, ...props }: CommentInputProps) {
  return (
    <ActionTextArea
      wrapperClassName={styles.wrapper}
      className={clsx(styles.textarea, className)}
      {...props}
    />
  );
}
