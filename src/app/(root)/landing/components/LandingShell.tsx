'use client';

import Sidebar from '@/components/sidebar/Sidebar';
import MobileHeader from '@/components/sidebar/MobileHeader';
import styles from '../LandingLayout.module.css';

type LandingShellProps = {
  children: React.ReactNode;
};

export default function LandingShell({ children }: LandingShellProps) {
  // 랜딩은 비로그인 기본 (요구사항: 모바일/태블릿은 헤더 형태)
  const isLoggedIn = false;

  return (
    <>
      {/* PC: Sidebar (CSS에서 1199px 이하 display: none) */}
      <Sidebar
        isLoggedIn={isLoggedIn}
        defaultCollapsed={false}
        onProfileClick={() => {
          // TODO: 로그인 페이지 이동 연결 (나중에)
        }}
      />

      {/* Tablet/Mobile: MobileHeader (CSS에서 1199px 이하 display: flex) */}
      <MobileHeader
        isLoggedIn={isLoggedIn}
        onMenuClick={() => {
          // TODO: 로그인 상태에서만 drawer 열기 (나중에)
        }}
        onProfileClick={() => {
          // TODO: 로그인 페이지 이동 연결 (나중에)
        }}
      />

      {/* 콘텐츠는 오프셋 적용된 래퍼 안에 넣기 */}
      <div className={styles.content}>{children}</div>
    </>
  );
}
