'use client';

import { ComponentPropsWithRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Input from './Input';
import visibilityTrue from '@/assets/icons/visibility/visibillityTrue.svg';
import visibilityFalse from '@/assets/icons/visibility/visibillityFalse.svg';
import styles from './PasswordInput.module.css';

type PasswordInputProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

/**
 * 비밀번호 Input 컴포넌트 (Molecule)
 *
 * - Input(Atom) + 눈 아이콘 토글 조합
 * - 눈 아이콘 클릭으로 비밀번호 표시/숨김 전환
 * - type은 내부에서 관리하므로 별도로 넘기지 않습니다.
 *
 * @example
 * <PasswordInput placeholder="비밀번호를 입력해 주세요." />
 *
 * // react-hook-form 연동
 * <PasswordInput {...register('password')} placeholder="비밀번호를 입력해 주세요." />
 */
export default function PasswordInput({ className, ref, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        className={clsx(styles.input, className)}
        {...props}
      />
      <button
        type="button"
        className={styles.toggleButton}
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
      >
        <Image
          src={showPassword ? visibilityTrue : visibilityFalse}
          alt=""
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
