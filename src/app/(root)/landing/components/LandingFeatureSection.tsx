'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import clsx from 'clsx';

import styles from './LandingFeatureSection.module.css';

type FeatureSectionProps = {
  /** 배경 색상 테마 */
  theme: 'light' | 'blue';
  /** 이미지가 왼쪽이면 'left', 오른쪽이면 'right' */
  imagePosition: 'left' | 'right';
  /** 섹션 아이콘 */
  icon: ReactNode;
  /** 섹션 제목 (\n으로 줄바꿈 가능) */
  title: string;
  /** 섹션 설명 (\n으로 줄바꿈 가능) */
  description: string;
  /**
   * PC 이미지 src
   * SVG를 import하면 Next.js에서 string(URL)로 처리된다.
   */
  imagePc: string;
  /** 태블릿 이미지 src */
  imageTablet: string;
  /** 모바일 이미지 src */
  imageMobile: string;
  /** 이미지 alt 텍스트 */
  imageAlt: string;
  /**
   * 이미지 하단 여백 보정값 (px, 음수)
   * landingPC_03처럼 SVG 자체에 여백이 포함된 경우 음수값으로 내린다.
   * 예: imageBottomOffset={-80}
   */
  imageBottomOffset?: number;
};

/**
 * [스크롤 진입 애니메이션 — useInView]
 * 해당 섹션이 뷰포트에 진입했을 때만 애니메이션을 실행한다.
 * once: true 옵션으로 한 번 실행 후 재실행하지 않아 성능을 아낀다.
 * margin: '-100px'로 요소가 완전히 진입하기 100px 전에 미리 트리거해서
 * 사용자가 스크롤 시 버벅임 없이 자연스럽게 보이도록 한다.
 */
export default function LandingFeatureSection({
  theme,
  imagePosition,
  icon,
  title,
  description,
  imagePc,
  imageTablet,
  imageMobile,
  imageAlt,
  imageBottomOffset = 0,
}: FeatureSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  // imagePosition 기준으로 텍스트/이미지 진입 방향 결정
  const textX = imagePosition === 'right' ? -30 : 30;
  const imageX = imagePosition === 'right' ? 30 : -30;

  return (
    <section
      ref={ref}
      className={clsx(styles.section, {
        [styles.themeBlue]: theme === 'blue',
        [styles.themeLight]: theme === 'light',
      })}
    >
      <div
        className={clsx(styles.inner, {
          [styles.reverseLayout]: imagePosition === 'left',
        })}
      >
        <motion.div
          className={styles.textArea}
          initial={{ opacity: 0, x: textX }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: textX }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className={styles.iconWrapper}>{icon}</div>
          <h2
            className={clsx(styles.title, {
              [styles.titleBlue]: theme === 'blue',
            })}
          >
            {title}
          </h2>
          <p
            className={clsx(styles.description, {
              [styles.descriptionBlue]: theme === 'blue',
            })}
          >
            {description}
          </p>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          style={imageBottomOffset !== 0 ? { marginBottom: imageBottomOffset } : undefined}
          initial={{ opacity: 0, x: imageX }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageX }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          {/* SVG는 next/image 최적화(WebP 변환 등)가 적용되지 않으므로 img 태그를 직접 사용 */}
          <img src={imagePc} alt={imageAlt} className={styles.imagePc} />
          <img src={imageTablet} alt={imageAlt} className={styles.imageTablet} />
          <img src={imageMobile} alt={imageAlt} className={styles.imageMobile} />
        </motion.div>
      </div>
    </section>
  );
}
