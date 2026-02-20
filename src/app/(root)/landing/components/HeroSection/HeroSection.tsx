import Image from 'next/image';
import Link from 'next/link';
import BaseButton from '@/components/Button/base/BaseButton';

import gradationLogo from '@/assets/icons/landing/gradation_logo.svg';
import landingPC01 from '@/assets/img/landing/pc/landingPC_01.svg';

import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.icon} aria-hidden="true">
            <Image src={gradationLogo} alt="" />
          </div>

          {/* 텍스트/버튼은 아이콘보다 안쪽 */}
          <div className={styles.textBlock}>
            <p className={styles.kicker}>함께 만들어가는 To do list</p>
            <h1 className={styles.title}>Coworkers</h1>

            <Link href="/login" className={styles.ctaLink}>
              <BaseButton>지금 시작하기</BaseButton>
            </Link>
          </div>
        </div>
      </div>

      {/* 우측 꽉 차는 이미지 */}
      <div className={styles.visual}>
        <Image src={landingPC01} alt="" priority />
      </div>
    </section>
  );
}
