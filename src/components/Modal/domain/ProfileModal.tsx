'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';

import Modal from '../Modal';
import styles from './ProfileModal.module.css';
import profileFallback from '@/assets/icons/img/img.svg';
import xMarkBig from '@/assets/icons/xMark/xMarkBig.svg';
import type { BaseDomainModalProps } from './types';

const TITLE_ID = 'profile-modal-title';
const EMAIL_ID = 'profile-modal-email';
const CLOSE_BUTTON_ARIA_LABEL = '닫기';
const DEFAULT_COPY_LABEL = '이메일 복사하기';
const DEFAULT_PROFILE_ALT = '프로필 이미지';

export interface ProfileModalProps extends BaseDomainModalProps {
  onCopyEmail: () => void;
  title: string;
  email: string;
  profileImageSrc?: ImageProps['src'];
  profileImageAlt?: string;
  copyButtonLabel?: string;
}

export default function ProfileModal({
  isOpen,
  onClose,
  onCopyEmail,
  title,
  email,
  profileImageSrc,
  profileImageAlt = DEFAULT_PROFILE_ALT,
  copyButtonLabel = DEFAULT_COPY_LABEL,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ProfileModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledby={TITLE_ID}
      ariaDescribedby={EMAIL_ID}
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

        <div className={styles.content}>
          <div className={styles.profileImage}>
            <Image
              src={profileImageSrc ?? profileFallback}
              alt={profileImageAlt}
              width={40}
              height={40}
            />
          </div>

          <h2 id={TITLE_ID} className={styles.title}>
            {title}
          </h2>
          <p id={EMAIL_ID} className={styles.email}>
            {email}
          </p>

          <button type="button" className={styles.copyButton} onClick={onCopyEmail}>
            {copyButtonLabel}
          </button>
        </div>
      </article>
    </Modal>
  );
}
