'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import BaseButton from '@/components/Button/base/BaseButton';
import Sidebar from '@/components/sidebar/Sidebar';

import profileImg from '@/assets/buttons/human/profile.svg';
import gradationLogo from '@/assets/icons/landing/gradation_logo.svg';
import gradationFolder from '@/assets/icons/landing/gradation_folder.svg';
import gradationCheck from '@/assets/icons/landing/gradation_check.svg';
import gradationMessage from '@/assets/icons/landing/gradation_message.svg';

/* PC 이미지 */
import landingPC01 from '@/assets/img/landing/pc/landingPC_01.svg';
import landingPC02 from '@/assets/img/landing/pc/landingPC_02.svg';
import landingPC03 from '@/assets/img/landing/pc/landingPC_03.svg';
import landingPC04 from '@/assets/img/landing/pc/landingPC_04.svg';

/* 태블릿 이미지 */
import landingTablet01 from '@/assets/img/landing/tablet/landingTablet_01.svg';
import landingTablet02 from '@/assets/img/landing/tablet/landingTablet_02.svg';
import landingTablet03 from '@/assets/img/landing/tablet/landingTablet_03.svg';
import landingTablet04 from '@/assets/img/landing/tablet/landingTablet_04.svg';

/* 모바일 이미지 */
import landingMobile01 from '@/assets/img/landing/mobile/mobileSmall_01.svg';
import landingMobile02 from '@/assets/img/landing/mobile/mobileSmall_02.svg';
import landingMobile03 from '@/assets/img/landing/mobile/mobileSmall_03.svg';
import landingMobile04 from '@/assets/img/landing/mobile/mobileSmall_04.svg';

import styles from './page.module.css';

/** 텍스트를 단어 단위로 분리해 순차적으로 등장시키는 Split 애니메이션 */
function SplitText({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={styles.splitWord}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </span>
  );
}

/** 아래에서 위로 fade-up 등장 애니메이션 */
function FadeUpBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className={styles.pageWrapper}>
      {/*
        ── 좌측 사이드바 ──
        - 모바일에서는 sidebarWrapper가 display:none 처리
        - profileImage: 접힘/펼침 모두에서 노출
        - profileName: 펼쳤을 때만 노출
        - TODO: 팀원에게 profileName 클릭 시 /login 이동 기능 추가 요청 필요
      */}
      <div className={styles.sidebarWrapper}>
        <Sidebar
          profileImage={
            <Image
              src={profileImg}
              alt="로그인"
              width={32}
              height={32}
              className={styles.loginImage}
            />
          }
          profileName="로그인"
        />
      </div>

      {/* ── 스크롤 컨테이너 ── */}
      <main className={styles.scrollContainer}>
        {/* 섹션 1 — Hero */}
        <section className={`${styles.section} ${styles.sectionHero}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroTopGroup}>
              <FadeUpBlock delay={0.1}>
                <Image src={gradationLogo} alt="" width={48} height={48} />
              </FadeUpBlock>

              <div className={styles.heroTextGroup}>
                <FadeUpBlock delay={0.2}>
                  <p className={styles.heroSubtitle}>함께 만들어가는 To do list</p>
                </FadeUpBlock>
                <h1 className={styles.heroTitle}>
                  <SplitText text="Coworkers" />
                </h1>
              </div>
            </div>

            <FadeUpBlock delay={0.5}>
              <div className={styles.heroButtonWrapper}>
                <Link href="/login" className={styles.linkReset}>
                  <BaseButton size="default">지금 시작하기</BaseButton>
                </Link>
              </div>
            </FadeUpBlock>
          </div>

          {/* PC/태블릿/모바일 이미지 — CSS display로 전환 */}
          <motion.div
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          >
            <Image
              src={landingPC01}
              alt="Coworkers 대시보드 화면"
              width={900}
              height={650}
              priority
              className={`${styles.heroImage} ${styles.heroImagePc}`}
            />
            <Image
              src={landingTablet01}
              alt="Coworkers 대시보드 화면"
              width={700}
              height={500}
              priority
              className={`${styles.heroImage} ${styles.heroImageTablet}`}
            />
            <Image
              src={landingMobile01}
              alt="Coworkers 대시보드 화면"
              width={340}
              height={400}
              priority
              className={`${styles.heroImage} ${styles.heroImageMobile}`}
            />
          </motion.div>
        </section>

        {/* 섹션 2 — 칸반보드 */}
        <section className={`${styles.section} ${styles.sectionKanban}`}>
          <div className={`${styles.sectionTextBlock} ${styles.sectionTextBlockTop}`}>
            <FadeUpBlock>
              <Image src={gradationFolder} alt="" width={48} height={48} />
            </FadeUpBlock>
            <h2 className={styles.sectionTitle}>
              <SplitText text="칸반보드로 함께" />
              <br />
              <SplitText text="할 일 목록을 관리해요" />
            </h2>
            <FadeUpBlock delay={0.2}>
              <p className={styles.sectionDescription}>
                팀원과 함께 실시간으로 할 일을 추가하고
                <br />
                지금 무엇을 해야 하는지 한눈에 볼 수 있어요
              </p>
            </FadeUpBlock>
          </div>

          <motion.div
            className={styles.sectionImageWrapper}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          >
            <Image
              src={landingPC02}
              alt="칸반보드 화면"
              width={860}
              height={560}
              className={`${styles.sectionImage} ${styles.sectionImagePc}`}
            />
            <Image
              src={landingTablet02}
              alt="칸반보드 화면"
              width={640}
              height={420}
              className={`${styles.sectionImage} ${styles.sectionImageTablet}`}
            />
            <Image
              src={landingMobile02}
              alt="칸반보드 화면"
              width={320}
              height={240}
              className={`${styles.sectionImage} ${styles.sectionImageMobile}`}
            />
          </motion.div>
        </section>

        {/* 섹션 3 — 체크/캘린더 */}
        <section className={`${styles.section} ${styles.sectionCheck}`}>
          <motion.div
            className={`${styles.sectionImageWrapper} ${styles.sectionImageWrapperBottom}`}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          >
            <Image
              src={landingPC03}
              alt="일정 체크 화면"
              width={600}
              height={420}
              className={`${styles.sectionCheckImage} ${styles.sectionImagePc}`}
            />
            <Image
              src={landingTablet03}
              alt="일정 체크 화면"
              width={500}
              height={360}
              className={`${styles.sectionCheckImage} ${styles.sectionImageTablet}`}
            />
            <Image
              src={landingMobile03}
              alt="일정 체크 화면"
              width={320}
              height={240}
              className={`${styles.sectionCheckImage} ${styles.sectionImageMobile}`}
            />
          </motion.div>

          <div className={`${styles.sectionTextBlock} ${styles.sectionTextBlockCenter}`}>
            <FadeUpBlock>
              <Image src={gradationCheck} alt="" width={48} height={48} />
            </FadeUpBlock>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleInverse}`}>
              <SplitText text="세부적으로 할 일들을" />
              <br />
              <SplitText text="간편하게 체크해요" />
            </h2>
            <FadeUpBlock delay={0.2}>
              <p className={`${styles.sectionDescription} ${styles.sectionDescriptionInverse}`}>
                일정에 맞춰 해야 할 세부 항목을 정리하고,
                <br />
                하나씩 빠르게 완료해보세요
              </p>
            </FadeUpBlock>
          </div>
        </section>

        {/* 섹션 4 — 댓글/공유 */}
        <section className={`${styles.section} ${styles.sectionComment}`}>
          <div
            className={`${styles.sectionTextBlock} ${styles.sectionTextBlockTop} ${styles.sectionTextBlockWide}`}
          >
            <FadeUpBlock>
              <Image src={gradationMessage} alt="" width={48} height={48} />
            </FadeUpBlock>
            <h2 className={styles.sectionTitle}>
              <SplitText text="할 일 공유를 넘어" />
              <br />
              <SplitText text="의견을 나누고 함께 결정해요" />
            </h2>
            <FadeUpBlock delay={0.2}>
              <p className={styles.sectionDescription}>
                댓글로 진행상황을 기록하고 피드백을 주고받으며
                <br />
                함께 결정을 내릴 수 있어요.
              </p>
            </FadeUpBlock>
          </div>

          <motion.div
            className={`${styles.sectionImageWrapper} ${styles.sectionImageWrapperBottom}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          >
            <Image
              src={landingPC04}
              alt="댓글 및 공유 화면"
              width={860}
              height={560}
              className={`${styles.sectionCommentImage} ${styles.sectionImagePc}`}
            />
            <Image
              src={landingTablet04}
              alt="댓글 및 공유 화면"
              width={640}
              height={420}
              className={`${styles.sectionCommentImage} ${styles.sectionImageTablet}`}
            />
            <Image
              src={landingMobile04}
              alt="댓글 및 공유 화면"
              width={320}
              height={240}
              className={`${styles.sectionCommentImage} ${styles.sectionImageMobile}`}
            />
          </motion.div>
        </section>

        {/* 섹션 5 — CTA */}
        <section className={`${styles.section} ${styles.sectionCta} ${styles.sectionCtaAuto}`}>
          <FadeUpBlock delay={0.1}>
            <p className={styles.ctaSubtitle}>
              팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
            </p>
          </FadeUpBlock>

          <h2 className={styles.ctaTitle}>
            <SplitText text="지금 바로 시작해보세요" />
          </h2>

          <FadeUpBlock delay={0.4}>
            <Link href="/login" className={styles.linkReset}>
              <BaseButton size="default" className={styles.ctaButton}>
                지금 시작하기
              </BaseButton>
            </Link>
          </FadeUpBlock>
        </section>
      </main>
    </div>
  );
}
