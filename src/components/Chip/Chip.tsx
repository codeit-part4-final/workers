import styles from './Chip.module.css';

interface ChipProps {
  label: string;
  count?: number;
  size?: 'large' | 'small';
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Chip({
  label,
  count,
  size = 'large',
  selected = false,
  disabled = false,
  onClick,
  className = '',
}: ChipProps) {
  const chipClassName = [styles.chip, styles[size], selected && styles.selected, className]
    .filter(Boolean)
    .join(' ');

  const isClickable = Boolean(onClick) && !disabled;

  return (
    <button
      type="button"
      className={chipClassName}
      onClick={isClickable ? onClick : undefined}
      disabled={disabled}
      aria-pressed={selected}
    >
      <span className={styles.label}>{label}</span>
      {typeof count === 'number' && <span className={styles.count}>{count}</span>}
    </button>
  );
}
