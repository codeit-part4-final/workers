'use client';

import Modal from '../Modal';
import styles from './LogoutModal.module.css';
import type { BaseDomainModalProps } from './types';

const TITLE_ID = 'logout-modal-title';
const DEFAULT_TITLE = '로그아웃 하시겠어요?';
const DEFAULT_CLOSE_LABEL = '닫기';
const DEFAULT_CONFIRM_LABEL = '로그아웃';

export interface LogoutModalProps extends BaseDomainModalProps {
  onConfirm: () => void;
  title?: string;
  closeLabel?: string;
  confirmLabel?: string;
}

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
  title = DEFAULT_TITLE,
  closeLabel = DEFAULT_CLOSE_LABEL,
  confirmLabel = DEFAULT_CONFIRM_LABEL,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: LogoutModalProps) {
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
