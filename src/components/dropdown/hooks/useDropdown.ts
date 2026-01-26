import type { FocusEvent, KeyboardEvent } from 'react';
import { useId, useState } from 'react';

import type { UseDropdownOptions } from '../types/types';
import { getSelectedItem, resolveInitialValue } from '../utils/dropdown';

export default function useDropdown({
  items,
  defaultValue,
  value,
  disabled = false,
  onChange,
}: UseDropdownOptions) {
  const listboxId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    resolveInitialValue(items, defaultValue),
  );

  const currentValue = value ?? uncontrolledValue;
  const selectedItem = getSelectedItem(items, currentValue);

  const handleSelect = (nextValue: string) => {
    if (disabled) return;
    if (value === undefined) {
      setUncontrolledValue(nextValue);
    }
    onChange?.(nextValue);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocus = event.relatedTarget as Node | null;
    if (nextFocus && event.currentTarget.contains(nextFocus)) return;
    setIsOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    setIsOpen(false);
  };

  return {
    listboxId,
    isOpen,
    selectedItem,
    handleSelect,
    handleToggle,
    handleBlur,
    handleKeyDown,
  };
}
