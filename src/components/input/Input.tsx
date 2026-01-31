import { ComponentPropsWithRef } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

type InputProps = ComponentPropsWithRef<'input'>;

/**
 * 공통 Input 컴포넌트 (Atom)
 *
 * - 네이티브 <input>의 모든 속성(placeholder, type, onChange 등)을 그대로 사용할 수 있습니다.
 * - width는 부모 요소에 맞춰 100%로 채워지므로, 부모에서 width를 지정해 주세요.
 * - 비밀번호 입력에는 PasswordInput을 사용하세요.
 *
 * @example
 * // 기본 사용
 * <Input placeholder="댓글을 입력해 주세요." />
 *
 * // react-hook-form 연동
 * <Input {...register('email')} placeholder="이메일을 입력해 주세요." />
 */
export default function Input({ className, ref, ...props }: InputProps) {
  return <input ref={ref} className={clsx(styles.input, className)} {...props} />;
}
