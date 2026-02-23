import { NextRequest, NextResponse } from 'next/server';
import { fetchApiServer } from '@/shared/apis/fetchApi.server';
import { setAuthCookies } from '../../_lib/cookies';

const TEAM_ID = process.env.API_TEAM_ID ?? '20-1';

interface KakaoSignInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    image: string | null;
    teamId: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * GET /api/auth/kakao/callback
 *
 * 카카오가 인가코드를 전달하는 Redirect URI 핸들러입니다.
 *
 * 흐름:
 * 1. 카카오가 ?code=인가코드 형태로 이 URL을 호출합니다.
 * 2. 인가코드 + redirectUri를 백엔드 /auth/signIn/KAKAO로 전달합니다.
 * 3. 백엔드가 카카오에 토큰 교환 후 accessToken/refreshToken을 발급합니다.
 * 4. httpOnly 쿠키에 저장 후 적절한 페이지로 이동합니다.
 *
 * 왜 redirectUri를 다시 백엔드에 보내는가?
 * - 카카오 보안 정책상, 인가코드 발급 시 사용한 redirectUri와
 *   토큰 교환 시 사용하는 redirectUri가 정확히 일치해야 합니다.
 * - 백엔드가 카카오 토큰 API를 호출할 때 이 값이 필요합니다.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // 사용자가 카카오 로그인 동의를 거부한 경우
  if (error || !code) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const redirectUri = `${APP_URL}/oauth/kakao`;

  try {
    console.log('[kakao callback] code:', code);
    console.log('[kakao callback] redirectUri:', redirectUri);

    const response = await fetchApiServer(`/auth/signIn/KAKAO`, {
      method: 'POST',
      body: JSON.stringify({
        token: code,
        redirectUri,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      console.error('[kakao callback] 백엔드 응답 실패:', response.status, errorBody);
      return NextResponse.redirect(new URL('/login?error=kakao_failed', req.url));
    }

    const data: KakaoSignInResponse = await response.json();
    await setAuthCookies(data.accessToken, data.refreshToken);

    // 소속 팀이 있으면 팀 페이지로, 없으면 팀 추가 페이지로
    const redirectPath = data.user?.teamId ? `/${data.user.teamId}` : '/addteam';
    return NextResponse.redirect(new URL(redirectPath, req.url));
  } catch (e) {
    console.error('[kakao callback] 예외 발생:', e);
    return NextResponse.redirect(new URL('/login?error=kakao_failed', req.url));
  }
}
