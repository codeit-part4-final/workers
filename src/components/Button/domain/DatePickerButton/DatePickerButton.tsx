import styles from './DatePickerButton.module.css';

export type Weekday = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

interface DatePickerButtonProps {
  day: Weekday;
  label: string;
  selected: boolean;
  onClick: (day: Weekday) => void;
  disabled?: boolean;
}

/**
 * DatePickerButton 컴포넌트
 *
 * @description
 * 요일 선택을 위한 버튼 컴포넌트로, 단일 요일을 표현한다.
 * 선택 상태(`selected`)에 따라 시각적 스타일이 변경되며,
 * 클릭 시 해당 요일 값을 부모로 전달한다.
 *
 * @remarks
 * - 선택 상태는 `aria-pressed`를 통해 접근성 속성으로 노출된다.
 * - `disabled` 상태에서는 클릭이 비활성화되며 시각적으로 흐려진다.
 * - 날짜 로직은 외부에서 관리하며, 이 컴포넌트는 표현과 이벤트 전달만 담당한다.
 *
 * @param props.day - 요일 식별자 값
 * @param props.label - 버튼에 표시될 텍스트
 * @param props.selected - 선택 여부
 * @param props.onClick - 요일 클릭 시 호출되는 핸들러
 * @param props.disabled - 비활성화 여부
 * @returns 요일 선택 버튼
 */
export default function DatePickerButton({
  day,
  label,
  selected,
  onClick,
  disabled = false,
}: DatePickerButtonProps) {
  const handleClick = () => {
    onClick(day);
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${selected ? styles.selected : ''}`}
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
