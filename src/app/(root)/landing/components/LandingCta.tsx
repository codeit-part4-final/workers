'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import styles from './LandingCta.module.css';

export default function LandingCta() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <section ref={ref} className={styles.cta}>
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className={styles.title}>지금 바로 시작해보세요</h2>
        <p className={styles.description}>
          팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
        </p>
        <Link href="/signup" className={styles.ctaButton}>
          지금 시작하기
        </Link>
      </motion.div>
    </section>
  );
}
