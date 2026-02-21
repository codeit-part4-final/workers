import type { InputHTMLAttributes } from 'react';
import type { ModalProps } from '@/components/Modal/types/types';

export interface CreateTeamModalTextOptions {
  title?: string;
  submitLabel?: string;
  inputPlaceholder?: string;
}

export interface CreateTeamModalInputOptions {
  props?: InputHTMLAttributes<HTMLInputElement>;
}

export interface CreateTeamModalProps extends ModalProps {
  onSubmit: (teamName: string) => void;
  text?: CreateTeamModalTextOptions;
  input?: CreateTeamModalInputOptions;
}
