'use client';

import clsx from 'clsx';

import DropdownItem from './DropdownItem';
import useDropdown from './hooks/useDropdown';
import styles from './styles/Dropdown.module.css';
import type { DropdownMenuSize, DropdownProps } from './types/types';

const DEFAULT_SIZE: DropdownMenuSize = 'default';
const MENU_SIZE_CLASS: Record<DropdownMenuSize, string> = {
  default: styles.menuDefault,
  small: styles.menuSmall,
  repeat: styles.menuRepeat,
};

export default function Dropdown({
  items,
  defaultValue,
  value,
  size = DEFAULT_SIZE,
  disabled = false,
  ariaLabel,
  className,
  buttonClassName,
  menuClassName,
  itemClassName,
  onChange,
}: DropdownProps) {
  const { listboxId, isOpen, selectedItem, handleSelect, handleToggle, handleBlur, handleKeyDown } =
    useDropdown({ items, defaultValue, value, disabled, onChange });
  const triggerAriaLabel = selectedItem ? undefined : ariaLabel;

  return (
    <div className={clsx(styles.dropdown, className)} onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className={clsx(styles.button, disabled && styles.disabled, buttonClassName)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={triggerAriaLabel}
        disabled={disabled}
        onClick={handleToggle}
      >
        <span className={styles.label}>{selectedItem?.label}</span>
        <span className={clsx(styles.icon, isOpen && styles.iconOpen)} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3.5 6L8 10.5L12.5 6" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
      </button>
      {isOpen ? (
        <div
          id={listboxId}
          className={clsx(styles.menu, MENU_SIZE_CLASS[size], menuClassName)}
          role="listbox"
          aria-label={ariaLabel}
        >
          {items.map((item) => (
            <DropdownItem
              key={item.value}
              label={item.label}
              isSelected={item.value === selectedItem?.value}
              size={size}
              className={itemClassName}
              onSelect={() => handleSelect(item.value)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
