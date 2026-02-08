'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Image from 'next/image';

import styles from './styles/MobileDrawer.module.css';
import xMarkBig from '@/assets/icons/xMark/xMarkBig.svg';

type MobileDrawerProps = {
  /** 드로어 열림/닫힘 상태 */
  isOpen: boolean;
  /** 드로어 내부에 표시할 콘텐츠 */
  children: ReactNode;
  /** 닫기 시 호출되는 콜백 (오버레이 클릭, X 버튼, ESC 키) */
  onClose: () => void;
};

/**
 * 모바일 사이드 드로어 (슬라이드 패널).
 * 오버레이 클릭, X 버튼, ESC 키로 닫을 수 있으며 포커스 트랩이 적용됩니다.
 * children에 사이드바 메뉴 등 원하는 콘텐츠를 주입할 수 있습니다.
 */
const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function MobileDrawer({ isOpen, children, onClose }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const focusableRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    focusableRef.current = Array.from(
      drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const items = focusableRef.current;
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      drawerRef.current?.querySelector<HTMLElement>('button')?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      <aside
        ref={drawerRef}
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="메뉴"
      >
        <div className={styles.header}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="메뉴 닫기"
          >
            <Image src={xMarkBig} alt="" width={18} height={18} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </aside>
    </>
  );
}
