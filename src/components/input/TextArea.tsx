import clsx from 'clsx';
import { TextAreaProps } from './types/types';
import styles from './styles/TextArea.module.css';

/**
 * 멀티라인 텍스트 입력 컴포넌트.
 * 네이티브 `<textarea>`의 모든 속성을 지원합니다.
 * 높이 자동 조절이 필요하면 ActionTextArea를 사용하세요.
 */
export default function TextArea({ className, ref, ...props }: TextAreaProps) {
  return <textarea ref={ref} className={clsx(styles.textarea, className)} {...props} />;
}
