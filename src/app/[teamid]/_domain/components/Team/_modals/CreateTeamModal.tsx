'use client';

import Image from 'next/image';
import type { FormEvent } from 'react';
import BaseButton from '@/components/Button/base/BaseButton';
import { Input } from '@/components/input';
import Modal from '@/components/Modal/Modal'; // Adjust import path if needed
import styles from './CreateTeamModal.module.css';
import xMarkBig from '@/assets/icons/xMark/xMarkBig.svg';
import {
  CLOSE_BUTTON_ARIA_LABEL,
  DEFAULT_PLACEHOLDER,
  DEFAULT_SUBMIT_LABEL,
  DEFAULT_TITLE,
  TITLE_ID,
} from './CreateTeamModal.constants';
import type { CreateTeamModalProps } from './CreateTeamModal.types';
export type { CreateTeamModalProps } from './CreateTeamModal.types';

/**
 * @param props.isOpen 모달 표시 여부를 boolean으로 전달합니다.
 * @param props.onClose 모달을 닫을 때 실행할 함수를 전달합니다.
 * @param props.onSubmit 팀 생성 버튼 클릭 시 실행할 함수를 전달합니다.
 * @param props.text 모달 제목과 버튼 문구 같은 텍스트 옵션을 객체로 전달합니다.
 * @param props.input 팀 이름 입력창에 적용할 옵션을 객체로 전달합니다.
 */
export default function CreateTeamModal({
  isOpen,
  onClose,
  onSubmit,
  text,
  input,
}: CreateTeamModalProps) {
  const title = text?.title ?? DEFAULT_TITLE;
  const submitLabel = text?.submitLabel ?? DEFAULT_SUBMIT_LABEL;
  const inputPlaceholder = text?.inputPlaceholder ?? DEFAULT_PLACEHOLDER;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 여기에 실제 팀 이름 값을 가져와 onSubmit에 전달하는 로직 추가
    // 현재는 더미값으로 호출하거나, input ref를 사용하거나, state를 관리해야 함
    onSubmit('새로운 팀 이름'); // 임시로 "새로운 팀 이름" 전달
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledby={TITLE_ID}
      contentClassName={styles.modalContent}
    >
      <article className={styles.container}>
        <div className={styles.buttonContainer}>
          <BaseButton
            type="button"
            className={styles.closeButton}
            aria-label={CLOSE_BUTTON_ARIA_LABEL}
            onClick={onClose}
          >
            <Image src={xMarkBig} alt="" width={24} height={24} />
          </BaseButton>
        </div>
        <header className={styles.header}>
          <h2 id={TITLE_ID} className={styles.title}>
            {title}
          </h2>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            {...input?.props}
            className={styles.input}
            type="text"
            name="teamName"
            placeholder={inputPlaceholder}
          />
          <footer className={styles.footer}>
            <BaseButton type="submit" variant="primary" className={styles.button}>
              {submitLabel}
            </BaseButton>
          </footer>
        </form>
      </article>
    </Modal>
  );
}
