'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import TextArea from './TextArea';
import { ActionTextAreaProps } from './types/types';
import arrowActive from '@/assets/buttons/arrow/arrowUpActivedButton.svg';
import arrowInactive from '@/assets/buttons/arrow/arrowUpNonActivedButton.svg';
import styles from './styles/ActionTextArea.module.css';

/**
 * 전송 버튼이 포함된 텍스트 입력 컴포넌트.
 * 텍스트를 입력하면 전송 버튼이 활성화되고, 높이가 내용에 맞게 자동 조절됩니다.
 * CommentInput의 기반 컴포넌트로, 단독으로도 사용할 수 있습니다.
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

  return (
    <div
      className={clsx(styles.wrapper, wrapperClassName)}
      role="group"
      aria-label="텍스트 입력 및 전송"
    >
      <TextArea
        ref={textareaRef}
        rows={1}
        className={clsx(styles.textarea, className)}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          const el = textareaRef.current;
          if (el) {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
          }
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
