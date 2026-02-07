'use client';

import type { FormEvent } from 'react';

import Modal from '../Modal';
import { Input } from '@/components/input';
import type { InputProps } from '@/components/input/types/types';
import styles from './ResetPassword.module.css';
import type { BaseDomainModalProps } from './types';

const TITLE_ID = 'reset-password-title';
const DESCRIPTION_ID = 'reset-password-description';
const DEFAULT_TITLE = '비밀번호 재설정';
const DEFAULT_DESCRIPTION = '비밀번호 재설정 링크를 보내드립니다.';
const DEFAULT_CLOSE_LABEL = '닫기';
const DEFAULT_SUBMIT_LABEL = '링크 보내기';
const DEFAULT_EMAIL_PLACEHOLDER = '이메일을 입력하세요';

type EmailInputFieldProps = Omit<
  InputProps,
  'className' | 'type' | 'name' | 'autoComplete' | 'placeholder'
>;

export interface ResetPasswordProps extends BaseDomainModalProps {
  onSubmit: () => void;
  title?: string;
  description?: string;
  closeLabel?: string;
  submitLabel?: string;
  emailPlaceholder?: string;
  emailInputProps?: EmailInputFieldProps;
}

/**
 * 비밀번호 재설정 링크를 보내기 위한 모달 UI 컴포넌트.
 *
 * @param props.isOpen 모달을 열지 여부
 * @param props.onClose 모달을 닫을 때 호출 (오버레이 클릭/Escape 포함)
 * @param props.onSubmit "링크 보내기" 제출 시 호출되는 콜백
 * @param props.emailInputProps 이메일 Input에 그대로 전달할 props (예: `value`, `onChange`, `isError`, `errorMessage`)
 */
export default function ResetPassword({
  isOpen,
  onClose,
  onSubmit,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  closeLabel = DEFAULT_CLOSE_LABEL,
  submitLabel = DEFAULT_SUBMIT_LABEL,
  emailPlaceholder = DEFAULT_EMAIL_PLACEHOLDER,
  emailInputProps,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ResetPasswordProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledby={TITLE_ID}
      ariaDescribedby={DESCRIPTION_ID}
      contentClassName={styles.modalContent}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEscape={closeOnEscape}
    >
      <article className={styles.container}>
        <header className={styles.header}>
          <h2 id={TITLE_ID} className={styles.title}>
            {title}
          </h2>
          <p id={DESCRIPTION_ID} className={styles.description}>
            {description}
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            {...emailInputProps}
            className={styles.input}
            type="email"
            name="email"
            autoComplete="email"
            placeholder={emailPlaceholder}
          />

          <footer className={styles.actions}>
            <button type="button" className={styles.closeButton} onClick={onClose}>
              {closeLabel}
            </button>
            <button type="submit" className={styles.sendButton}>
              {submitLabel}
            </button>
          </footer>
        </form>
      </article>
    </Modal>
  );
}
