import type { Weekday } from '@/components/Button/domain/DatePickerButton/DatePickerButton';
import type { DomainModalCloseOptions } from '../../../types/types';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_MEMO_LABEL,
  DEFAULT_MEMO_PLACEHOLDER,
  DEFAULT_REPEAT_SETTING_LABEL,
  DEFAULT_REPEAT_WEEKDAY_LABEL,
  DEFAULT_START_DATE_PLACEHOLDER,
  DEFAULT_START_DATE_TIME_LABEL,
  DEFAULT_START_TIME_PLACEHOLDER,
  DEFAULT_SUBMIT_LABEL,
  DEFAULT_TITLE,
  DEFAULT_TODO_TITLE_LABEL,
  DEFAULT_TODO_TITLE_PLACEHOLDER,
  REPEAT_OPTIONS,
  REPEAT_TYPE_NONE,
  WEEKDAY_ORDER,
  WEEKDAY_REPEAT_TYPES,
} from '../constants/CalenderModal.constants';
import type {
  CalenderActivePicker,
  CalenderModalFormValues,
  CalenderModalInitialValues,
  CalenderModalTextOptions,
  CalenderRepeatType,
  ResolvedCalenderModalText,
} from '../types/CalenderModal.types';

export function resolveCalenderModalText(
  text?: CalenderModalTextOptions,
): ResolvedCalenderModalText {
  return {
    title: text?.title ?? DEFAULT_TITLE,
    description: text?.description ?? DEFAULT_DESCRIPTION,
    todoTitleLabel: text?.todoTitleLabel ?? DEFAULT_TODO_TITLE_LABEL,
    todoTitlePlaceholder: text?.todoTitlePlaceholder ?? DEFAULT_TODO_TITLE_PLACEHOLDER,
    startDateTimeLabel: text?.startDateTimeLabel ?? DEFAULT_START_DATE_TIME_LABEL,
    startDatePlaceholder: text?.startDatePlaceholder ?? DEFAULT_START_DATE_PLACEHOLDER,
    startTimePlaceholder: text?.startTimePlaceholder ?? DEFAULT_START_TIME_PLACEHOLDER,
    repeatSettingLabel: text?.repeatSettingLabel ?? DEFAULT_REPEAT_SETTING_LABEL,
    repeatWeekdayLabel: text?.repeatWeekdayLabel ?? DEFAULT_REPEAT_WEEKDAY_LABEL,
    memoLabel: text?.memoLabel ?? DEFAULT_MEMO_LABEL,
    memoPlaceholder: text?.memoPlaceholder ?? DEFAULT_MEMO_PLACEHOLDER,
    submitLabel: text?.submitLabel ?? DEFAULT_SUBMIT_LABEL,
  };
}

export function resolveCloseOptions(closeOptions?: DomainModalCloseOptions) {
  return {
    closeOnOverlayClick: closeOptions?.overlayClick ?? true,
    closeOnEscape: closeOptions?.escape ?? true,
  };
}

export function formatDateLabel(date: Date | null): string {
  if (!date) return '';

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function resolveRepeatType(value?: string): CalenderRepeatType {
  if (!value) return REPEAT_TYPE_NONE;

  const found = REPEAT_OPTIONS.find((option) => option.value === value);
  if (!found) return REPEAT_TYPE_NONE;

  return found.value as CalenderRepeatType;
}

export function isWeekdayRepeatType(repeatType: CalenderRepeatType): boolean {
  return WEEKDAY_REPEAT_TYPES.includes(repeatType);
}

export function sortWeekdays(days: Weekday[]): Weekday[] {
  const uniqueDays = Array.from(new Set(days));
  return WEEKDAY_ORDER.filter((weekday) => uniqueDays.includes(weekday));
}

export function toggleWeekday(selectedDays: Weekday[], targetDay: Weekday): Weekday[] {
  const nextDays = selectedDays.includes(targetDay)
    ? selectedDays.filter((day) => day !== targetDay)
    : [...selectedDays, targetDay];

  return sortWeekdays(nextDays);
}

export function resolveInitialValues(
  initialValues?: CalenderModalInitialValues,
): CalenderModalFormValues {
  return {
    todoTitle: initialValues?.todoTitle ?? '',
    startDate: initialValues?.startDate ?? null,
    startTime: initialValues?.startTime ?? '',
    repeatType: resolveRepeatType(initialValues?.repeatType),
    repeatDays: sortWeekdays(initialValues?.repeatDays ?? []),
    memo: initialValues?.memo ?? '',
  };
}

export function isPickerToggleKey(key: string): boolean {
  return key === 'Enter' || key === ' ';
}

interface ContentHeightStyles {
  modalContentDateOpen: string;
  modalContentTimeOpen: string;
  modalContentWeekdayOpen: string;
}

export function resolveContentHeightClassNames(
  activePicker: CalenderActivePicker,
  isWeekdaySelectorVisible: boolean,
  styles: ContentHeightStyles,
) {
  return {
    [styles.modalContentDateOpen]: activePicker === 'date',
    [styles.modalContentTimeOpen]: activePicker === 'time',
    [styles.modalContentWeekdayOpen]: activePicker === 'none' && isWeekdaySelectorVisible,
  };
}
