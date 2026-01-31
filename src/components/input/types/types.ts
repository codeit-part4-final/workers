import { ComponentPropsWithRef, ReactNode } from 'react';

export type InputProps = ComponentPropsWithRef<'input'>;

export type PasswordInputProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

export type TextAreaProps = ComponentPropsWithRef<'textarea'>;

export type PasswordFieldProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

export type ActionTextAreaProps = TextAreaProps & {
  onSubmit?: () => void;
  wrapperClassName?: string;
};

export type CommentInputProps = Omit<ActionTextAreaProps, 'wrapperClassName'>;

export type AccountInputProps = {
  email?: string;
  children?: ReactNode;
};

export type ChangePasswordProps = {
  isEditing?: boolean;
  newPasswordProps?: PasswordFieldProps;
  confirmPasswordProps?: PasswordFieldProps;
  children?: ReactNode;
};
