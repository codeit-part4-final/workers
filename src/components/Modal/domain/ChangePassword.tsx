'use client';

import type { FormEvent } from 'react';
import { useId } from 'react';

import Modal from '../Modal';
import { Input } from '@/components/input';
import type { InputProps } from '@/components/input/types/types';
import styles from './ChangePassword.module.css';
import type { BaseDomainModalProps } from './types';

const TITLE_ID = 'change-password-title';
const NEW_PASSWORD_NAME = 'newPassword';
const CONFIRM_PASSWORD_NAME = 'confirmPassword';
const DEFAULT_TITLE = '비밀번호 변경하기';
const DEFAULT_NEW_PASSWORD_LABEL = '새 비밀번호';
const DEFAULT_CONFIRM_PASSWORD_LABEL = '새 비밀번호 확인';
const DEFAULT_NEW_PASSWORD_PLACEHOLDER = '새 비밀번호를 입력해주세요.';
const DEFAULT_CONFIRM_PASSWORD_PLACEHOLDER = '새 비밀번호를 다시 한 번 입력해주세요.';
const DEFAULT_CLOSE_LABEL = '닫기';
const DEFAULT_SUBMIT_LABEL = '변경하기';

type PasswordInputFieldProps = Omit<
  InputProps,
  'className' | 'type' | 'name' | 'autoComplete' | 'placeholder'
>;

export interface ChangePasswordProps extends BaseDomainModalProps {
  onSubmit: () => void;
  title?: string;
  newPasswordLabel?: string;
  confirmPasswordLabel?: string;
  newPasswordPlaceholder?: string;
  confirmPasswordPlaceholder?: string;
  closeLabel?: string;
  submitLabel?: string;
  newPasswordInputProps?: PasswordInputFieldProps;
  confirmPasswordInputProps?: PasswordInputFieldProps;
}

export default function ChangePassword({
  isOpen,
  onClose,
  onSubmit,
  title = DEFAULT_TITLE,
  newPasswordLabel = DEFAULT_NEW_PASSWORD_LABEL,
  confirmPasswordLabel = DEFAULT_CONFIRM_PASSWORD_LABEL,
  newPasswordPlaceholder = DEFAULT_NEW_PASSWORD_PLACEHOLDER,
  confirmPasswordPlaceholder = DEFAULT_CONFIRM_PASSWORD_PLACEHOLDER,
  closeLabel = DEFAULT_CLOSE_LABEL,
  submitLabel = DEFAULT_SUBMIT_LABEL,
  newPasswordInputProps,
  confirmPasswordInputProps,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ChangePasswordProps) {
  const generatedNewPasswordId = useId();
  const generatedConfirmPasswordId = useId();
  const newPasswordId = newPasswordInputProps?.id ?? generatedNewPasswordId;
  const confirmPasswordId = confirmPasswordInputProps?.id ?? generatedConfirmPasswordId;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledby={TITLE_ID}
      contentClassName={styles.modalContent}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEscape={closeOnEscape}
    >
      <article className={styles.container}>
        <h2 id={TITLE_ID} className={styles.title}>
          {title}
        </h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor={newPasswordId} className={styles.label}>
              {newPasswordLabel}
            </label>
            <Input
              {...newPasswordInputProps}
              id={newPasswordId}
              className={styles.input}
              type="password"
              name={NEW_PASSWORD_NAME}
              autoComplete="new-password"
              placeholder={newPasswordPlaceholder}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={confirmPasswordId} className={styles.label}>
              {confirmPasswordLabel}
            </label>
            <Input
              {...confirmPasswordInputProps}
              id={confirmPasswordId}
              className={styles.input}
              type="password"
              name={CONFIRM_PASSWORD_NAME}
              autoComplete="new-password"
              placeholder={confirmPasswordPlaceholder}
            />
          </div>

          <footer className={styles.actions}>
            <button type="button" className={styles.closeButton} onClick={onClose}>
              {closeLabel}
            </button>
            <button type="submit" className={styles.submitButton}>
              {submitLabel}
            </button>
          </footer>
        </form>
      </article>
    </Modal>
  );
}
