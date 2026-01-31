'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import TextArea from './TextArea';
import { ActionTextAreaProps } from './types/types';
import arrowActive from '@/assets/buttons/arrow/arrowUpActivedButton.svg';
import arrowInactive from '@/assets/buttons/arrow/arrowUpNonActivedButton.svg';
import styles from './styles/ActionTextArea.module.css';

/**
 * 전송 버튼이 포함된 텍스트 입력 기본 컴포넌트.
 * 입력값이 있으면 전송 버튼이 활성화된다.
 * @param onSubmit 전송 버튼 클릭 시 호출되는 콜백
 * @param wrapperClassName wrapper div에 적용할 추가 CSS 클래스
 * @param className TextArea에 적용할 추가 CSS 클래스
 * @param props 네이티브 textarea의 모든 속성
 */
export default function ActionTextArea({
  onSubmit,
  wrapperClassName,
  className,
  onChange,
  ...props
}: ActionTextAreaProps) {
  const [hasValue, setHasValue] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)}>
      <TextArea
        ref={textareaRef}
        rows={1}
        className={clsx(styles.textarea, className)}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          autoResize();
          onChange?.(e);
        }}
        {...props}
      />
      <button
        type="button"
        className={styles.action}
        onClick={onSubmit}
        disabled={!hasValue}
        aria-label="전송"
      >
        <Image src={hasValue ? arrowActive : arrowInactive} alt="" width={24} height={24} />
      </button>
    </div>
  );
}
