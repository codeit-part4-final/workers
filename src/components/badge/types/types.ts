/** 뱃지 상태. `done`(완료) | `ongoing`(진행 중) | `empty`(시작 전) */
export type BadgeState = 'done' | 'ongoing' | 'empty';

/** 뱃지 크기. `large`(아이콘 20px) | `small`(아이콘 16px) */
export type BadgeSize = 'large' | 'small';

export type BadgeProps = {
  /** 뱃지 상태 (색상·아이콘이 자동 결정됨) */
  state: BadgeState;
  /** 뱃지 크기 (기본값: `'small'`) */
  size?: BadgeSize;
  /** 뱃지에 표시할 텍스트 (예: "3개" , "마감 완료") */
  label: string;
};
