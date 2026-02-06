import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import ArrowButton from '@/components/Button/domain/ArrowButton/ArrowButton';

/**
 * ArrowButton 컴포넌트
 *
 * 좌/우 방향 전환(이전/다음) 용도로 사용하는 아이콘 버튼입니다.
 * 캐러셀, 달력 네비게이션 등에서 사용됩니다.
 */
const meta: Meta<typeof ArrowButton> = {
  title: 'Components/Button/ArrowButton',
  component: ArrowButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['left', 'right'],
      description: '화살표 방향',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    size: {
      control: 'select',
      options: ['large', 'small'],
      description: '버튼 크기 (large: 32px, small: 16px)',
      table: {
        defaultValue: { summary: 'large' },
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
      description: '클릭 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

// ==============================
// 기본 스토리
// ==============================

export const LeftLarge: Story = {
  args: {
    direction: 'left',
    size: 'large',
    onClick: () => console.log('Left clicked'),
  },
};

export const RightLarge: Story = {
  args: {
    direction: 'right',
    size: 'large',
    onClick: () => console.log('Right clicked'),
  },
};

export const LeftSmall: Story = {
  args: {
    direction: 'left',
    size: 'small',
    onClick: () => console.log('Left small clicked'),
  },
};

export const RightSmall: Story = {
  args: {
    direction: 'right',
    size: 'small',
    onClick: () => console.log('Right small clicked'),
  },
};

export const Disabled: Story = {
  args: {
    direction: 'left',
    size: 'large',
    disabled: true,
    onClick: () => console.log('This should not fire'),
  },
};

// ==============================
// Size & Direction 조합 (한눈에 보기)
// ==============================

export const AllSizesAndDirections: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Large (32px)</p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <ArrowButton direction="left" size="large" onClick={() => console.log('Left')} />
          <ArrowButton direction="right" size="large" onClick={() => console.log('Right')} />
          <ArrowButton
            direction="left"
            size="large"
            onClick={() => console.log('Disabled')}
            disabled
          />
        </div>
      </div>

      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Small (16px)</p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <ArrowButton direction="left" size="small" onClick={() => console.log('Left')} />
          <ArrowButton direction="right" size="small" onClick={() => console.log('Right')} />
          <ArrowButton
            direction="left"
            size="small"
            onClick={() => console.log('Disabled')}
            disabled
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 크기와 방향, disabled 상태를 한눈에 확인합니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 캐러셀
// ==============================

export const CarouselExample: Story = {
  render: () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalItems = 5;

    const handlePrev = () => {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
      setCurrentIndex((prev) => Math.min(totalItems - 1, prev + 1));
    };

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          minWidth: '400px',
        }}
      >
        <ArrowButton
          direction="left"
          size="large"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        />

        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: '600',
            color: '#1e293b',
            padding: '40px 20px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
          }}
        >
          아이템 {currentIndex + 1} / {totalItems}
        </div>

        <ArrowButton
          direction="right"
          size="large"
          onClick={handleNext}
          disabled={currentIndex === totalItems - 1}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '캐러셀에서 ArrowButton을 사용하는 예시입니다. 첫 번째/마지막 아이템에서는 해당 방향 버튼이 비활성화됩니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 달력 네비게이션
// ==============================

export const CalendarNavigationExample: Story = {
  render: () => {
    const [currentMonth, setCurrentMonth] = useState(5);
    const [currentYear, setCurrentYear] = useState(2025);

    const handlePrevMonth = () => {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    };

    const handleNextMonth = () => {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          minWidth: '300px',
        }}
      >
        <ArrowButton direction="left" size="small" onClick={handlePrevMonth} />

        <span
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '600',
            color: '#1e293b',
          }}
        >
          {currentYear}년 {currentMonth}월
        </span>

        <ArrowButton direction="right" size="small" onClick={handleNextMonth} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '달력 헤더에서 ArrowButton을 사용하는 예시입니다. Small 사이즈를 사용하여 컴팩트하게 표현합니다.',
      },
    },
  },
};

// ==============================
// Hover & Active 상태 테스트
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
      <div style={{ display: 'flex', gap: '16px' }}>
        <ArrowButton direction="left" size="large" onClick={() => console.log('Hover me!')} />
        <ArrowButton direction="right" size="large" onClick={() => console.log('Click me!')} />
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
        <li>Hover: opacity 0.8</li>
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
        Tab 키로 포커스를 이동하고 Enter/Space로 실행해보세요:
      </p>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <ArrowButton direction="left" size="large" onClick={() => alert('이전 버튼 클릭!')} />
        <ArrowButton direction="right" size="large" onClick={() => alert('다음 버튼 클릭!')} />
        <ArrowButton
          direction="left"
          size="large"
          onClick={() => alert('실행되지 않아야 함')}
          disabled
        />
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
        <li>aria-label: direction에 따라 "이전" 또는 "다음"</li>
        <li>키보드 네비게이션: Tab으로 포커스 이동</li>
        <li>disabled 버튼은 포커스를 받지 않음</li>
      </ul>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '키보드 네비게이션과 스크린 리더 지원을 테스트합니다.',
      },
    },
  },
};
