'use client';

import Image from 'next/image';

import Modal from '../Modal';
import styles from './WarningModal.module.css';
import alertSmall from '@/assets/icons/alert/alertSmall.svg';
import type { BaseDomainModalProps } from './types';

const TITLE_ID = 'warning-modal-title';
const DESCRIPTION_ID = 'warning-modal-description';
const DEFAULT_TITLE = '회원 탈퇴를 진행하시겠어요?';
const DEFAULT_DESCRIPTION = '그룹장으로 있는 그룹은 자동으로 삭제되고,\n모든 그룹에서 나가집니다.';
const DEFAULT_CLOSE_LABEL = '닫기';
const DEFAULT_CONFIRM_LABEL = '회원 탈퇴';

export interface WarningModalProps extends BaseDomainModalProps {
  onConfirm: () => void;
  title?: string;
  description?: string;
  closeLabel?: string;
  confirmLabel?: string;
}

export default function WarningModal({
  isOpen,
  onClose,
  onConfirm,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  closeLabel = DEFAULT_CLOSE_LABEL,
  confirmLabel = DEFAULT_CONFIRM_LABEL,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: WarningModalProps) {
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
          <Image
            className={styles.icon}
            src={alertSmall}
            alt=""
            width={24}
            height={24}
            aria-hidden
          />
          <h2 id={TITLE_ID} className={styles.title}>
            {title}
          </h2>
        </header>

        <p id={DESCRIPTION_ID} className={styles.description}>
          {description}
        </p>

        <footer className={styles.actions}>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            {closeLabel}
          </button>
          <button type="button" className={styles.confirmButton} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </footer>
      </article>
    </Modal>
  );
}
