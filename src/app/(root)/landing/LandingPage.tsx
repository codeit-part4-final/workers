'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Sidebar from '@/components/sidebar/Sidebar';
import MobileHeader from '@/components/sidebar/MobileHeader';
import BaseButton from '@/components/Button/base/BaseButton';

import profileImg from '@/assets/buttons/human/profile.svg';
import gradationLogo from '@/assets/icons/landing/gradation_logo.svg';
import gradationFolder from '@/assets/icons/landing/gradation_folder.svg';
import gradationCheck from '@/assets/icons/landing/gradation_check.svg';
import gradationMessage from '@/assets/icons/landing/gradation_message.svg';

import landingPC01 from '@/assets/img/landing/pc/landingPC_01.svg';
import landingPC02 from '@/assets/img/landing/pc/landingPC_02.svg';
import landingPC03 from '@/assets/img/landing/pc/landingPC_03.svg';
import landingPC04 from '@/assets/img/landing/pc/landingPC_04.svg';

import landingMobile01 from '@/assets/img/landing/mobile/mobileSmall_01.svg';
import landingMobile02 from '@/assets/img/landing/mobile/mobileSmall_02.svg';
import landingMobile03 from '@/assets/img/landing/mobile/mobileSmall_03.svg';
import landingMobile04 from '@/assets/img/landing/mobile/mobileSmall_04.svg';

import styles from './LandingPage.module.css';

/**
 * [LandingPage 컴포넌트 구조]
 *
 * page.tsx (Server Component)
 *   └─ LandingPage.tsx (Client Component — 'use client')
 *
 * [왜 이렇게 분리했는가?]
 * Next.js의 SEO 핵심인 metadata export는 Server Component에서만 가능하다.
 * Framer Motion은 브라우저 DOM에 의존하므로 'use client'가 필요하다.
 * 두 요구사항을 동시에 충족하기 위해 page.tsx는 Server Component로 유지하고,
 * UI 조립과 애니메이션은 LandingPage.tsx(Client Component)에서 담당한다.
 * 이렇게 해도 Next.js App Router는 Client Component도 서버에서 초기 HTML을 생성(pre-render)하므로
 * 크롤러가 빈 페이지를 보는 React SPA의 문제가 발생하지 않는다.
 *
 * [섹션 구성]
 * - Sidebar: PC 전용 (fixed, float 방식으로 콘텐츠 위에 덮힘)
 * - MobileHeader: 모바일 전용 (375px 이하)
 * - 섹션 1 Hero, 섹션 2 칸반보드, 섹션 3 체크, 섹션 4 댓글, 섹션 5 CTA
 * - scroll-snap으로 섹션 단위 풀페이지 스크롤 (CTA 섹션 제외)
 */

/** 텍스트를 단어 단위로 분리해 순차적으로 등장시키는 Split 애니메이션 */
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
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
        ── PC 사이드바 ──
        position: fixed로 float 처리되어 콘텐츠 위에 덮힌다.
        접힘/펼침 시 콘텐츠 영역이 줄어들지 않는다(협의된 방식).
        TODO: profileName 클릭 시 /login 이동은 Sidebar 담당자 수정 후 반영
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

      {/* 모바일 헤더 — 375px 이하에서만 표시 */}
      <div className={styles.mobileHeaderWrapper}>
        <MobileHeader isLoggedIn={false} />
      </div>

      {/* 스크롤 컨테이너 — scroll-snap으로 섹션 단위 이동 */}
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
              칸반보드로 함께
              <br />할 일 목록을 관리해요
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
              src={landingMobile02}
              alt="칸반보드 화면"
              width={320}
              height={240}
              className={`${styles.sectionImage} ${styles.sectionImageMobile}`}
            />
          </motion.div>
        </section>

        {/* 섹션 3 — 체크 */}
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
              세부적으로 할 일들을
              <br />
              간편하게 체크해요
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
              할 일 공유를 넘어
              <br />
              의견을 나누고 함께 결정해요
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
              src={landingMobile04}
              alt="댓글 및 공유 화면"
              width={320}
              height={240}
              className={`${styles.sectionCommentImage} ${styles.sectionImageMobile}`}
            />
          </motion.div>
        </section>

        {/* 섹션 5 — CTA (scroll-snap 제외, 자연스러운 높이) */}
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
