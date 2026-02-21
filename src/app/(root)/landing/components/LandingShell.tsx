'use client';

import Sidebar from '@/components/sidebar/Sidebar';
import MobileHeader from '@/components/sidebar/MobileHeader';
import styles from '../LandingLayout.module.css';

type LandingShellProps = {
  children: React.ReactNode;
};

/**
 * LandingShell — 클라이언트 경계 컴포넌트
 *
 * [왜 필요한가?]
 * Sidebar, MobileHeader는 useState 등 클라이언트 훅을 사용하는 'use client' 컴포넌트다.
 * LandingPage(서버 컴포넌트)에서 이들을 직접 import하면 클라이언트 번들 범위가
 * 불필요하게 확장된다. LandingShell을 클라이언트 경계로 두고 클라이언트 컴포넌트들을
 * 여기서 조립하면, HeroSection 등 자식 서버 컴포넌트는 서버에서 유지된다.
 *
 * [레이아웃 구조]
 * - PC(≥1200px): 접힌 Sidebar(72px) fixed 고정 + 콘텐츠 영역은 CSS 오프셋으로 처리
 * - 태블릿/모바일(<1200px): MobileHeader(fixed) + 콘텐츠 top padding으로 처리
 *   (Sidebar는 CSS에서 display:none)
 */
export default function LandingShell({ children }: LandingShellProps) {
  const isLoggedIn = false;

  return (
    <>
      {/* PC 전용: 항상 접힌(collapsed) 상태로 고정 */}
      <Sidebar isLoggedIn={isLoggedIn} defaultCollapsed={true} onProfileClick={() => {}} />

      {/* 태블릿/모바일 전용: 비로그인 상태 → 로고만 표시 */}
      <MobileHeader isLoggedIn={isLoggedIn} onMenuClick={() => {}} onProfileClick={() => {}} />

      <div className={styles.content}>{children}</div>
    </>
  );
}
