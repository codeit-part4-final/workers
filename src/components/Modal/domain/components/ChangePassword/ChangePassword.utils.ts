import type { FormEvent } from 'react';
import type { DomainModalCloseOptions } from '../../types/types';
import type { ChangePasswordInputOptions, ChangePasswordTextOptions } from './ChangePassword.types';
import {
  DEFAULT_CLOSE_LABEL,
  DEFAULT_CONFIRM_PASSWORD_LABEL,
  DEFAULT_CONFIRM_PASSWORD_PLACEHOLDER,
  DEFAULT_NEW_PASSWORD_LABEL,
  DEFAULT_NEW_PASSWORD_PLACEHOLDER,
  DEFAULT_SUBMIT_LABEL,
  DEFAULT_TITLE,
} from './ChangePassword.constants';

export function resolveChangePasswordText(text?: ChangePasswordTextOptions) {
  return {
    title: text?.title ?? DEFAULT_TITLE,
    newPasswordLabel: text?.newPasswordLabel ?? DEFAULT_NEW_PASSWORD_LABEL,
    confirmPasswordLabel: text?.confirmPasswordLabel ?? DEFAULT_CONFIRM_PASSWORD_LABEL,
    newPasswordPlaceholder: text?.newPasswordPlaceholder ?? DEFAULT_NEW_PASSWORD_PLACEHOLDER,
    confirmPasswordPlaceholder:
      text?.confirmPasswordPlaceholder ?? DEFAULT_CONFIRM_PASSWORD_PLACEHOLDER,
    closeLabel: text?.closeLabel ?? DEFAULT_CLOSE_LABEL,
    submitLabel: text?.submitLabel ?? DEFAULT_SUBMIT_LABEL,
  };
}

export function resolveCloseOptions(closeOptions?: DomainModalCloseOptions) {
  return {
    closeOnOverlayClick: closeOptions?.overlayClick ?? true,
    closeOnEscape: closeOptions?.escape ?? true,
  };
}

export function resolvePasswordInputIds(
  input: ChangePasswordInputOptions | undefined,
  fallbackNewPasswordId: string,
  fallbackConfirmPasswordId: string,
) {
  return {
    newPasswordId: input?.newPassword?.id ?? fallbackNewPasswordId,
    confirmPasswordId: input?.confirmPassword?.id ?? fallbackConfirmPasswordId,
  };
}

export function createSubmitHandler(onSubmit: () => void) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
}
