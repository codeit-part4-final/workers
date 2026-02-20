'use client';

import Link from 'next/link';

import styles from './LandingGnb.module.css';
import logoLarge from '@/assets/logos/logoLarge.svg';
import logoSmall from '@/assets/logos/logoSmall.svg';

/**
 * 랜딩 페이지 전용 GNB (Global Navigation Bar)
 *
 * [왜 랜딩 전용 GNB를 별도로 만들었는가?]
 * 기존 Sidebar·MobileHeader 컴포넌트는 "로그인된 사용자"의 업무 환경을 기준으로 설계되어
 * 팀 선택, 프로필, 햄버거 메뉴 등 랜딩에 불필요한 구조를 포함한다.
 * 랜딩 페이지는 "미인증 방문자"에게 서비스를 소개하는 목적이라 완전히 다른 맥락이기 때문에
 * 최소한의 책임(로고 + 로그인/회원가입 링크)만 가진 별도 컴포넌트로 분리했다.
 *
 * [반응형 처리]
 * - PC(1024px+): logoLarge + 우측 텍스트 링크
 * - 태블릿·모바일(~1023px): logoSmall + 링크 (figma 모바일 디자인 기준)
 */
export default function LandingGnb() {
  return (
    <nav className={styles.gnb}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Coworkers 홈">
          {/* SVG 로고는 img 태그 직접 사용 */}
          <img src={logoLarge} alt="COWORKERS" className={styles.logoLarge} />
          <img src={logoSmall} alt="COWORKERS" className={styles.logoSmall} />
        </Link>

        <div className={styles.actions}>
          <Link href="/login" className={styles.loginLink}>
            로그인
          </Link>
          <Link href="/signup" className={styles.signupLink}>
            회원가입
          </Link>
        </div>
      </div>
    </nav>
  );
}
