'use client';

import Link from 'next/link';
import { type Variants, motion } from 'framer-motion';

import styles from './LandingHero.module.css';
import landingPc01 from '@/assets/img/landing/pc/landingPC_01.svg';
import landingTablet01 from '@/assets/img/landing/tablet/landingTablet_01.svg';
import landingMobile01 from '@/assets/img/landing/mobile/mobileSmall_01.svg';

/**
 * [텍스트 분할 애니메이션 — Split Text]
 * 텍스트를 단어 단위로 나눠서 각 단어가 아래에서 위로 올라오는 효과.
 * 단순히 전체 텍스트에 fadein을 쓰는것과 달리 staggerChildren으로
 * 단어마다 시차를 줘서 자연스러운 리듬감을 만든다.
 */
const splitVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span className={className} variants={splitVariants} initial="hidden" animate="visible">
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function LandingHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.textArea}>
          <motion.p
            className={styles.subTitle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            함께 만들어가는 To do list
          </motion.p>

          <SplitText text="Coworkers" className={styles.title} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link href="/signup" className={styles.ctaButton}>
              지금 시작하기
            </Link>
          </motion.div>
        </div>

        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          {/* SVG는 next/image 최적화가 적용되지 않으므로 img 태그 직접 사용 */}
          <img src={landingPc01} alt="Coworkers 업무 관리 화면" className={styles.imagePc} />
          <img
            src={landingTablet01}
            alt="Coworkers 업무 관리 화면"
            className={styles.imageTablet}
          />
          <img
            src={landingMobile01}
            alt="Coworkers 업무 관리 화면"
            className={styles.imageMobile}
          />
        </motion.div>
      </div>
    </section>
  );
}
