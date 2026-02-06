import type { ButtonHTMLAttributes, ReactNode } from 'react';

import behavior from '@/components/Button/shared/ButtonBehavior.module.css';
import styles from '@/components/Button/base/BaseButton.module.css';

export type ButtonVariant = 'primary' | 'outline' | 'danger';
export type ButtonSize = 'default' | 'small';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

/**
 * BaseButton 컴포넌트
 *
 * @description
 * 프로젝트에서 사용하는 버튼의 “베이스” 컴포넌트로, 공통적인 버튼 동작/리셋(behavior)과
 * 버튼 기본 스타일(base), 변형(variant), 크기(size) 스타일을 조합하여 적용한다.
 *
 * @remarks
 * - 스타일은 `ButtonBehavior.module.css`(행동/리셋) + `BaseButton.module.css`(베이스/프리셋) 조합으로 구성된다.
 * - `type` 기본값은 `button`이며, 폼 내부에서 의도치 않은 submit을 방지한다.
 * - `className`을 추가로 전달하면 마지막에 합쳐져 외부에서 확장이 가능하다.
 *
 * @param props.variant - 버튼 스타일 변형(기본값: `primary`)
 * @param props.size - 버튼 크기 프리셋(기본값: `default`)
 * @param props.type - 버튼 타입(기본값: `button`)
 * @param props.disabled - 비활성화 여부
 * @param props.children - 버튼 내부 콘텐츠
 * @returns 버튼 엘리먼트
 */
export default function BaseButton({
  variant = 'primary',
  size = 'default',
  type = 'button',
  children,
  className,
  disabled,
  ...rest
}: BaseButtonProps) {
  return (
    <button
      type={type}
      className={[behavior.buttonBase, styles.base, styles[variant], styles[size], className]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
