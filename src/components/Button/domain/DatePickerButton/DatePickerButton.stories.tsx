import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import DatePickerButton, {
  type Weekday,
} from '@/components/Button/domain/DatePickerButton/DatePickerButton';

/**
 * DatePickerButton 컴포넌트
 *
 * 요일 선택을 위한 버튼 컴포넌트입니다.
 * 반복 일정 설정, 근무일 선택 등에서 사용됩니다.
 */
const meta: Meta<typeof DatePickerButton> = {
  title: 'Components/Button/DatePickerButton',
  component: DatePickerButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    day: {
      control: 'select',
      options: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      description: '요일 식별자',
    },
    label: {
      control: 'text',
      description: '버튼에 표시될 텍스트',
    },
    selected: {
      control: 'boolean',
      description: '선택 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '요일 클릭 시 호출되는 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerButton>;

// ==============================
// 기본 스토리
// ==============================

export const Unselected: Story = {
  args: {
    day: 'mon',
    label: '월',
    selected: false,
    onClick: (day) => console.log('Clicked:', day),
  },
};

export const Selected: Story = {
  args: {
    day: 'mon',
    label: '월',
    selected: true,
    onClick: (day) => console.log('Clicked:', day),
  },
};

export const Disabled: Story = {
  args: {
    day: 'mon',
    label: '월',
    selected: false,
    disabled: true,
    onClick: (day) => console.log('This should not fire:', day),
  },
};

export const SelectedDisabled: Story = {
  args: {
    day: 'mon',
    label: '월',
    selected: true,
    disabled: true,
    onClick: (day) => console.log('This should not fire:', day),
  },
};

// ==============================
// 모든 상태 (한눈에 보기)
// ==============================

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>기본 상태</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <DatePickerButton day="mon" label="월" selected={false} onClick={() => {}} />
          <DatePickerButton day="tue" label="화" selected={true} onClick={() => {}} />
        </div>
      </div>

      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Disabled 상태</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <DatePickerButton day="mon" label="월" selected={false} onClick={() => {}} disabled />
          <DatePickerButton day="tue" label="화" selected={true} onClick={() => {}} disabled />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 상태 조합을 한눈에 확인합니다.',
      },
    },
  },
};

// ==============================
// 전체 요일 표시
// ==============================

const WEEKDAYS: { day: Weekday; label: string }[] = [
  { day: 'sun', label: '일' },
  { day: 'mon', label: '월' },
  { day: 'tue', label: '화' },
  { day: 'wed', label: '수' },
  { day: 'thu', label: '목' },
  { day: 'fri', label: '금' },
  { day: 'sat', label: '토' },
];

export const AllWeekdays: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      {WEEKDAYS.map(({ day, label }) => (
        <DatePickerButton
          key={day}
          day={day}
          label={label}
          selected={false}
          onClick={(clickedDay) => console.log('Clicked:', clickedDay)}
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '일주일 전체 요일 버튼을 표시합니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 반복 요일 선택
// ==============================

export const WeekdaySelector: Story = {
  render: () => {
    const [selectedDays, setSelectedDays] = useState<Weekday[]>(['mon', 'wed', 'fri']);

    const handleDayClick = (day: Weekday) => {
      setSelectedDays((prev) =>
        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
      );
    };

    const handleReset = () => {
      setSelectedDays([]);
    };

    const handleSelectWeekdays = () => {
      setSelectedDays(['mon', 'tue', 'wed', 'thu', 'fri']);
    };

    const handleSelectWeekend = () => {
      setSelectedDays(['sat', 'sun']);
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          minWidth: '400px',
        }}
      >
        {/* 요일 버튼 그룹 */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {WEEKDAYS.map(({ day, label }) => (
            <DatePickerButton
              key={day}
              day={day}
              label={label}
              selected={selectedDays.includes(day)}
              onClick={handleDayClick}
            />
          ))}
        </div>

        {/* 선택된 요일 표시 */}
        <div
          style={{
            textAlign: 'center',
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#64748b',
          }}
        >
          선택된 요일: {selectedDays.length > 0 ? selectedDays.join(', ') : '없음'}
        </div>

        {/* 컨트롤 버튼 */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button
            onClick={handleSelectWeekdays}
            style={{
              padding: '8px 16px',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            평일 선택
          </button>
          <button
            onClick={handleSelectWeekend}
            style={{
              padding: '8px 16px',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            주말 선택
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '8px 16px',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            초기화
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '반복 일정 설정에서 요일을 선택하는 예시입니다. 여러 요일을 토글 방식으로 선택/해제할 수 있습니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 근무일 선택
// ==============================

export const WorkdaySelector: Story = {
  render: () => {
    const [workdays, setWorkdays] = useState<Weekday[]>(['mon', 'tue', 'wed', 'thu', 'fri']);

    const handleDayClick = (day: Weekday) => {
      setWorkdays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
    };

    const workdayCount = workdays.length;
    const weekendCount = 7 - workdayCount;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          minWidth: '400px',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: '600',
            color: '#1e293b',
            textAlign: 'center',
          }}
        >
          근무일 설정
        </h3>

        {/* 요일 버튼 그룹 */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {WEEKDAYS.map(({ day, label }) => (
            <DatePickerButton
              key={day}
              day={day}
              label={label}
              selected={workdays.includes(day)}
              onClick={handleDayClick}
            />
          ))}
        </div>

        {/* 통계 정보 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          <div
            style={{
              padding: '12px',
              backgroundColor: '#eef3ff',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>근무일</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#5189fa' }}>
              {workdayCount}일
            </div>
          </div>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>휴무일</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#94a3b8' }}>
              {weekendCount}일
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '근무일을 설정하는 예시입니다. 선택된 근무일과 휴무일의 수를 표시합니다.',
      },
    },
  },
};

// ==============================
// 상호작용 테스트
// ==============================

export const InteractionStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
      }}
    >
      <p
        style={{
          fontSize: '14px',
          color: '#64748b',
          marginBottom: '8px',
        }}
      >
        버튼 위에 마우스를 올리거나 클릭해보세요:
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <DatePickerButton day="mon" label="월" selected={false} onClick={() => {}} />
        <DatePickerButton day="tue" label="화" selected={true} onClick={() => {}} />
      </div>
      <ul
        style={{
          fontSize: '13px',
          color: '#64748b',
          lineHeight: '1.8',
          margin: 0,
          paddingLeft: '20px',
        }}
      >
        <li>미선택 + Hover: 배경색 변경</li>
        <li>선택됨 + Hover: 더 진한 파란색</li>
        <li>Active: scale(0.95)</li>
        <li>Focus: 2px outline</li>
      </ul>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 hover, active, focus 상태를 테스트합니다.',
      },
    },
  },
};

// ==============================
// 접근성 (Accessibility) 테스트
// ==============================

export const AccessibilityTest: Story = {
  render: () => {
    const [selectedDays, setSelectedDays] = useState<Weekday[]>(['wed']);

    const handleDayClick = (day: Weekday) => {
      setSelectedDays((prev) =>
        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
      );
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '20px',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            color: '#64748b',
            marginBottom: '8px',
          }}
        >
          Tab 키로 포커스를 이동하고 Space/Enter로 선택/해제해보세요:
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {WEEKDAYS.map(({ day, label }) => (
            <DatePickerButton
              key={day}
              day={day}
              label={label}
              selected={selectedDays.includes(day)}
              onClick={handleDayClick}
            />
          ))}
        </div>
        <ul
          style={{
            fontSize: '13px',
            color: '#64748b',
            lineHeight: '1.8',
            margin: 0,
            paddingLeft: '20px',
          }}
        >
          <li>aria-pressed: 선택 상태를 스크린 리더에 전달</li>
          <li>키보드 네비게이션: Tab으로 포커스 이동</li>
          <li>키보드 실행: Space/Enter로 토글</li>
          <li>disabled 버튼은 포커스를 받지 않음</li>
        </ul>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '키보드 네비게이션과 스크린 리더 지원을 테스트합니다.',
      },
    },
  },
};

// ==============================
// 크기 확인
// ==============================

export const SizeReference: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
      }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <DatePickerButton day="mon" label="월" selected={false} onClick={() => {}} />
        <div
          style={{
            fontSize: '13px',
            color: '#64748b',
          }}
        >
          44px × 48px (너비 × 높이)
        </div>
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#94a3b8',
          lineHeight: '1.6',
        }}
      >
        • border-radius: 12px
        <br />
        • font-size: 14px
        <br />• font-weight: 500
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 크기와 스타일 스펙을 확인합니다.',
      },
    },
  },
};
