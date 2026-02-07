import { useCallback, useState } from 'react';
import type { Weekday } from '@/components/Button/domain/DatePickerButton/DatePickerButton';
import type {
  CalenderActivePicker,
  CalenderModalFormValues,
  CalenderModalInitialValues,
} from '../types/CalenderModal.types';
import {
  isWeekdayRepeatType,
  resolveInitialValues,
  resolveRepeatType,
  toggleWeekday,
} from '../utils/CalenderModal.utils';

interface UseCalenderModalFormProps {
  initialValues?: CalenderModalInitialValues;
}

export function useCalenderModalForm({ initialValues }: UseCalenderModalFormProps) {
  const [formValues, setFormValues] = useState<CalenderModalFormValues>(() =>
    resolveInitialValues(initialValues),
  );
  const [activePicker, setActivePicker] = useState<CalenderActivePicker>('none');

  const setTodoTitle = useCallback((nextTodoTitle: string) => {
    setFormValues((previousValues) => ({
      ...previousValues,
      todoTitle: nextTodoTitle,
    }));
  }, []);

  const setStartDate = useCallback((nextStartDate: Date | null) => {
    setFormValues((previousValues) => ({
      ...previousValues,
      startDate: nextStartDate,
    }));
  }, []);

  const setStartTime = useCallback((nextStartTime: string) => {
    setFormValues((previousValues) => ({
      ...previousValues,
      startTime: nextStartTime,
    }));
  }, []);

  const setMemo = useCallback((nextMemo: string) => {
    setFormValues((previousValues) => ({
      ...previousValues,
      memo: nextMemo,
    }));
  }, []);

  const handleRepeatTypeChange = useCallback((nextValue: string) => {
    const nextRepeatType = resolveRepeatType(nextValue);
    setFormValues((previousValues) => ({
      ...previousValues,
      repeatType: nextRepeatType,
      repeatDays: isWeekdayRepeatType(nextRepeatType) ? previousValues.repeatDays : [],
    }));
  }, []);

  const handleToggleWeekday = useCallback((targetDay: Weekday) => {
    setFormValues((previousValues) => ({
      ...previousValues,
      repeatDays: toggleWeekday(previousValues.repeatDays, targetDay),
    }));
  }, []);

  const handleDatePickerToggle = useCallback(() => {
    setActivePicker((previousPicker) => (previousPicker === 'date' ? 'none' : 'date'));
  }, []);

  const handleTimePickerToggle = useCallback(() => {
    setActivePicker((previousPicker) => (previousPicker === 'time' ? 'none' : 'time'));
  }, []);

  const resetForm = useCallback(() => {
    setFormValues(resolveInitialValues(initialValues));
    setActivePicker('none');
  }, [initialValues]);

  const isWeekdaySelectorVisible =
    isWeekdayRepeatType(formValues.repeatType) && activePicker === 'none';

  return {
    todoTitle: formValues.todoTitle,
    startDate: formValues.startDate,
    startTime: formValues.startTime,
    repeatType: formValues.repeatType,
    repeatDays: formValues.repeatDays,
    memo: formValues.memo,
    activePicker,
    isWeekdaySelectorVisible,
    setTodoTitle,
    setStartDate,
    setStartTime,
    setMemo,
    handleRepeatTypeChange,
    handleToggleWeekday,
    handleDatePickerToggle,
    handleTimePickerToggle,
    resetForm,
  };
}
