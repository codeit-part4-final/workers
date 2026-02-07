'use client';

import Image from 'next/image';
import Modal from '../Modal';
import styles from './MemberInvite.module.css';
import xMarkBig from '@/assets/icons/xMark/xMarkBig.svg';
import type { BaseDomainModalProps } from './types';

const TITLE_ID = 'member-invite-title';
const DESCRIPTION_ID = 'member-invite-description';
const CLOSE_BUTTON_ARIA_LABEL = '닫기';
const DEFAULT_TITLE = '멤버 초대';
const DEFAULT_DESCRIPTION = '그룹에 참여할 수 있는 링크를 복사합니다.';
const DEFAULT_COPY_LABEL = '링크 복사하기';

export interface MemberInviteProps extends BaseDomainModalProps {
  inviteLink: string;
  onCopyLink?: (link: string) => void;
  title?: string;
  description?: string;
  copyButtonLabel?: string;
}

export default function MemberInvite({
  isOpen,
  onClose,
  inviteLink,
  onCopyLink,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  copyButtonLabel = DEFAULT_COPY_LABEL,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: MemberInviteProps) {
  const handleCopy = () => onCopyLink?.(inviteLink);

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
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={CLOSE_BUTTON_ARIA_LABEL}
        >
          <Image src={xMarkBig} alt="" width={24} height={24} aria-hidden />
        </button>
        <h2 id={TITLE_ID} className={styles.title}>
          {title}
        </h2>
        <p id={DESCRIPTION_ID} className={styles.description}>
          {description}
        </p>
        <button type="button" className={styles.copyButton} onClick={handleCopy}>
          {copyButtonLabel}
        </button>
      </article>
    </Modal>
  );
}
