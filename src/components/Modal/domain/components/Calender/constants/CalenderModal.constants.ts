import type { Weekday } from '@/components/Button/domain/DatePickerButton/DatePickerButton';
import type { DropdownItemData } from '@/components/dropdown/types/types';
import type { CalenderRepeatType } from '../types/CalenderModal.types';

export const TITLE_ID = 'calender-modal-title';
export const DESCRIPTION_ID = 'calender-modal-description';

export const START_DATE_INPUT_ID = 'calender-modal-start-date';
export const START_TIME_INPUT_ID = 'calender-modal-start-time';

export const TODO_TITLE_NAME = 'todoTitle';
export const TODO_MEMO_NAME = 'todoMemo';

export const REPEAT_TYPE_NONE: CalenderRepeatType = 'none';
export const REPEAT_TYPE_ONCE: CalenderRepeatType = 'once';
export const REPEAT_TYPE_DAILY: CalenderRepeatType = 'daily';
export const REPEAT_TYPE_WEEKLY: CalenderRepeatType = 'weekly';
export const REPEAT_TYPE_MONTHLY: CalenderRepeatType = 'monthly';

export const DEFAULT_TITLE = '할 일 만들기';
export const DEFAULT_DESCRIPTION =
  '할 일은 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다.';
export const DEFAULT_TODO_TITLE_LABEL = '할 일 제목';
export const DEFAULT_TODO_TITLE_PLACEHOLDER = '할 일 제목을 입력해주세요.';
export const DEFAULT_START_DATE_TIME_LABEL = '시작 날짜 및 시간';
export const DEFAULT_START_DATE_PLACEHOLDER = '날짜를 선택해주세요.';
export const DEFAULT_START_TIME_PLACEHOLDER = '시간을 선택해주세요.';
export const DEFAULT_REPEAT_SETTING_LABEL = '반복 설정';
export const DEFAULT_REPEAT_WEEKDAY_LABEL = '반복 요일';
export const DEFAULT_MEMO_LABEL = '할 일 메모';
export const DEFAULT_MEMO_PLACEHOLDER = '메모를 입력해주세요.';
export const DEFAULT_SUBMIT_LABEL = '만들기';

export const REPEAT_OPTIONS: DropdownItemData[] = [
  { value: REPEAT_TYPE_NONE, label: '반복 안함' },
  { value: REPEAT_TYPE_ONCE, label: '한 번' },
  { value: REPEAT_TYPE_DAILY, label: '매일' },
  { value: REPEAT_TYPE_WEEKLY, label: '주 반복' },
  { value: REPEAT_TYPE_MONTHLY, label: '월 반복' },
];

export const WEEKDAY_OPTIONS: Array<{ day: Weekday; label: string }> = [
  { day: 'sun', label: '일' },
  { day: 'mon', label: '월' },
  { day: 'tue', label: '화' },
  { day: 'wed', label: '수' },
  { day: 'thu', label: '목' },
  { day: 'fri', label: '금' },
  { day: 'sat', label: '토' },
];

export const WEEKDAY_ORDER: Weekday[] = WEEKDAY_OPTIONS.map((weekday) => weekday.day);
export const WEEKDAY_REPEAT_TYPES: CalenderRepeatType[] = [REPEAT_TYPE_WEEKLY, REPEAT_TYPE_MONTHLY];
