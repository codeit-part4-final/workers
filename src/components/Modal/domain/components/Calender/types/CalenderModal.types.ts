import type { Weekday } from '@/components/Button/domain/DatePickerButton/DatePickerButton';
import type { InputProps, TextAreaProps } from '@/components/input/types/types';
import type { BaseDomainModalProps } from '../../../types/types';

export type CalenderRepeatType = 'none' | 'once' | 'daily' | 'weekly' | 'monthly';
export type CalenderActivePicker = 'none' | 'date' | 'time';

export interface CalenderModalFormValues {
  todoTitle: string;
  startDate: Date | null;
  startTime: string;
  repeatType: CalenderRepeatType;
  repeatDays: Weekday[];
  memo: string;
}

export type CalenderModalSubmitPayload = CalenderModalFormValues;

export interface CalenderModalTextOptions {
  title?: string;
  description?: string;
  todoTitleLabel?: string;
  todoTitlePlaceholder?: string;
  startDateTimeLabel?: string;
  startDatePlaceholder?: string;
  startTimePlaceholder?: string;
  repeatSettingLabel?: string;
  repeatWeekdayLabel?: string;
  memoLabel?: string;
  memoPlaceholder?: string;
  submitLabel?: string;
}

export interface ResolvedCalenderModalText {
  title: string;
  description: string;
  todoTitleLabel: string;
  todoTitlePlaceholder: string;
  startDateTimeLabel: string;
  startDatePlaceholder: string;
  startTimePlaceholder: string;
  repeatSettingLabel: string;
  repeatWeekdayLabel: string;
  memoLabel: string;
  memoPlaceholder: string;
  submitLabel: string;
}

export type TodoTitleInputProps = Omit<
  InputProps,
  'className' | 'type' | 'name' | 'placeholder' | 'value' | 'defaultValue' | 'onChange'
>;

export type TodoMemoInputProps = Omit<
  TextAreaProps,
  'className' | 'name' | 'placeholder' | 'value' | 'defaultValue' | 'onChange'
>;

export interface CalenderModalInputOptions {
  todoTitle?: TodoTitleInputProps;
  memo?: TodoMemoInputProps;
}

export type CalenderModalInitialValues = Partial<CalenderModalFormValues>;

export interface CalenderModalProps extends BaseDomainModalProps {
  onSubmit: (payload: CalenderModalSubmitPayload) => void;
  text?: CalenderModalTextOptions;
  input?: CalenderModalInputOptions;
  initialValues?: CalenderModalInitialValues;
}
