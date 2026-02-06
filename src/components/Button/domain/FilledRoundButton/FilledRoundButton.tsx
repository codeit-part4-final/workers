import type { ButtonHTMLAttributes } from 'react';

import behavior from '@/components/Button/shared/ButtonBehavior.module.css';
import styles from './FilledRoundButton.module.css';

import checkWhite from '@/assets/icons/check/check-1.svg';
import checkBlue from '@/assets/icons/check/check.svg';

type Appearance = 'filled' | 'inverse';

interface FilledRoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: Appearance;
  shadow?: boolean;
}

/**
 * FilledRoundButton 컴포넌트
 *
 * @description
 * 체크 아이콘과 라벨을 함께 사용하는 둥근 형태의 버튼 컴포넌트이다.
 * BaseButton을 상속하지 않고, 공통 ButtonBehavior를 합성하여
 * 버튼의 기본 동작과 접근성, 인터랙션을 공유한다.
 *
 * @remarks
 * - `appearance` 값에 따라 배경 스타일과 체크 아이콘 색상이 전환된다.
 * - `shadow` 옵션을 통해 시각적 깊이(그림자)를 선택적으로 적용할 수 있다.
 * - BaseButton과 동일한 HTML button 속성을 지원한다.
 *
 * @param props.appearance - 버튼 외형 스타일(`filled` | `inverse`)
 * @param props.shadow - 그림자 적용 여부(기본값: true)
 * @param props.children - 버튼 라벨 콘텐츠
 * @returns 체크 아이콘이 포함된 라운드 버튼
 */
export default function FilledRoundButton({
  appearance = 'filled',
  shadow = true,
  type = 'button',
  className,
  children,
  ...rest
}: FilledRoundButtonProps) {
  const checkIconSrc = appearance === 'inverse' ? checkBlue : checkWhite;

  return (
    <button
      type={type}
      className={[
        behavior.buttonBase,
        styles.root,
        appearance === 'filled' ? styles.filled : styles.inverse,
        shadow ? styles.shadow : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className={styles.icon} aria-hidden="true">
        <img src={checkIconSrc.src} alt="" />
      </span>

      <span className={styles.label}>{children}</span>
    </button>
  );
}
