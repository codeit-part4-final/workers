import type { ReactNode } from 'react';

export type CommentCardProps = {
  /** 프로필 이미지 (ReactNode로 자유롭게 주입, 예: `<Image />`) */
  profileImage?: ReactNode;
  /** 댓글 작성자 이름 */
  name: string;
  /** 댓글 본문 내용 */
  content: string;
  /** 화면에 표시할 날짜 텍스트 (예: "2024년 7월 29일") */
  date: string;
  /** `<time>` 태그의 datetime 속성값 (예: "2024-07-29") */
  dateTime?: string;
  /** 우측 상단 아이콘 슬롯 (예: 케밥 메뉴 버튼) */
  icon?: ReactNode;
  /** 하단 우측 액션 슬롯 (예: 취소/수정하기 버튼) */
  actions?: ReactNode;
};
