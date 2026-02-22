'use client';

import dynamic from 'next/dynamic';

// SSR을 비활성화하여 서버에서 인증 없이 API 호출하는 문제를 방지
// [teamid] 페이지는 로그인 이후에만 접근하는 인증 필요 페이지
const TeamDashboard = dynamic(() => import('./_domain/components/Team/TeamDashboard'), {
  ssr: false,
});

export default function TeamPage() {
  return <TeamDashboard />;
}
