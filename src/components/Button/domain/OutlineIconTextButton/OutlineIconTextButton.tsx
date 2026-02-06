import type { ButtonHTMLAttributes } from 'react';

import behavior from '@/components/Button/shared/ButtonBehavior.module.css';
import styles from './OutlineIconTextButton.module.css';

import checkPrimary from '@/assets/icons/check/primarycheck.svg';
import checkHover from '@/assets/icons/check/hovercheck.svg';
import checkPressed from '@/assets/icons/check/pressedcheck.svg';
import checkInactive from '@/assets/icons/check/inactivecheck.svg';

type OutlineIconTextButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * OutlineIconTextButton 컴포넌트
 *
 * @description
 * 아이콘과 텍스트를 함께 사용하는 아웃라인 스타일 버튼이다.
 * ButtonBehavior를 합성하여 버튼의 공통 동작과 접근성을 공유하며,
 * 상태별 아이콘(primary/hover/pressed/inactive)은 CSS를 통해 제어된다.
 *
 * @remarks
 * - BaseButton을 상속하지 않고 ButtonBehavior를 합성하여 구현한다.
 * - 아이콘은 여러 SVG를 중첩 렌더링한 뒤, CSS 상태에 따라 표시 여부를 제어한다.
 * - 버튼 상태(disabled, hover, active)는 시각적 아이콘 변화로 명확히 구분된다.
 *
 * @param props.type - 버튼 타입(기본값: `button`)
 * @param props.className - 외부에서 전달되는 추가 클래스
 * @param props.children - 버튼 라벨 콘텐츠
 * @returns 아이콘과 텍스트가 결합된 아웃라인 버튼
 */
export default function OutlineIconTextButton({
  type = 'button',
  className,
  children,
  ...rest
}: OutlineIconTextButtonProps) {
  return (
    <button
      type={type}
      className={[behavior.buttonBase, styles.root, className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className={styles.icon} aria-hidden="true">
        <img className={styles.iconPrimary} src={checkPrimary.src} alt="" />
        <img className={styles.iconHover} src={checkHover.src} alt="" />
        <img className={styles.iconPressed} src={checkPressed.src} alt="" />
        <img className={styles.iconInactive} src={checkInactive.src} alt="" />
      </span>

      <span className={styles.label}>{children}</span>
    </button>
  );
}
