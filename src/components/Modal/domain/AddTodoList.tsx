'use client';

import Image from 'next/image';
import type { FormEvent } from 'react';
import { Input } from '@/components/input';
import type { InputProps } from '@/components/input/types/types';
import Modal from '../Modal';
import styles from './AddTodoList.module.css';
import xMarkBig from '@/assets/icons/xMark/xMarkBig.svg';
import type { BaseDomainModalProps } from './types';

const TITLE_ID = 'add-todo-list-title';
const CLOSE_BUTTON_ARIA_LABEL = '닫기';
const DEFAULT_TITLE = '할 일 목록';
const DEFAULT_PLACEHOLDER = '할 일을 입력하세요';
const DEFAULT_SUBMIT_LABEL = '만들기';

type TodoInputProps = Omit<InputProps, 'className' | 'type' | 'name' | 'placeholder'>;

export interface AddTodoListProps extends BaseDomainModalProps {
  onSubmit: () => void;
  title?: string;
  submitLabel?: string;
  inputPlaceholder?: string;
  inputProps?: TodoInputProps;
}

export default function AddTodoList({
  isOpen,
  onClose,
  onSubmit,
  title = DEFAULT_TITLE,
  submitLabel = DEFAULT_SUBMIT_LABEL,
  inputPlaceholder = DEFAULT_PLACEHOLDER,
  inputProps,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: AddTodoListProps) {
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
        <header className={styles.header}>
          <h2 id={TITLE_ID} className={styles.title}>
            {title}
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            aria-label={CLOSE_BUTTON_ARIA_LABEL}
            onClick={onClose}
          >
            <Image src={xMarkBig} alt="" width={24} height={24} />
          </button>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            {...inputProps}
            className={styles.input}
            type="text"
            name="todo"
            placeholder={inputPlaceholder}
          />
          <footer className={styles.footer}>
            <button type="submit" className={styles.button}>
              {submitLabel}
            </button>
          </footer>
        </form>
      </article>
    </Modal>
  );
}
