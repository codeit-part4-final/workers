import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import ProgressButton from '@/components/Button/domain/ProgressButton/ProgressButton';

/**
 * ProgressButton 컴포넌트
 *
 * 진행 영역(칸반 보드 컬럼 등)에서 새로운 항목을 추가하기 위한 버튼입니다.
 * 전체 너비를 차지하며, 텍스트가 길 경우 말줄임 처리됩니다.
 */
const meta: Meta<typeof ProgressButton> = {
  title: 'Components/Button/ProgressButton',
  component: ProgressButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '버튼에 표시될 텍스트 (카테고리명)',
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
type Story = StoryObj<typeof ProgressButton>;

// ==============================
// 기본 스토리
// ==============================

export const Default: Story = {
  args: {
    label: '할 일',
    onClick: () => console.log('할 일 추가'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '280px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LongText: Story = {
  args: {
    label: '아주 긴 카테고리 이름이 있을 때 말줄임 처리가 되는지 확인',
    onClick: () => console.log('추가'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '280px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    label: '완료',
    disabled: true,
    onClick: () => console.log('This should not fire'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '280px' }}>
        <Story />
      </div>
    ),
  ],
};

// ==============================
// 다양한 라벨
// ==============================

export const VariousLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
      <ProgressButton label="할 일" onClick={() => console.log('할 일')} />
      <ProgressButton label="진행중" onClick={() => console.log('진행중')} />
      <ProgressButton label="완료" onClick={() => console.log('완료')} />
      <ProgressButton label="보류" onClick={() => console.log('보류')} />
      <ProgressButton label="검토 중" onClick={() => console.log('검토 중')} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 카테고리 라벨로 버튼을 사용하는 예시입니다.',
      },
    },
  },
};

// ==============================
// 상태 비교
// ==============================

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '280px' }}>
      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>기본 상태</p>
        <ProgressButton label="할 일" onClick={() => console.log('클릭')} />
      </div>

      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
          긴 텍스트 (말줄임)
        </p>
        <ProgressButton
          label="매우 긴 카테고리 이름을 가진 진행 상태"
          onClick={() => console.log('클릭')}
        />
      </div>

      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Disabled 상태</p>
        <ProgressButton label="완료" onClick={() => {}} disabled />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 상태를 한눈에 확인합니다.',
      },
    },
  },
} as Story;

// ==============================
// 실제 사용 예시 - 칸반 보드
// ==============================

export const KanbanBoardExample: Story = {
  render: () => {
    const [columns, setColumns] = useState({
      todo: ['프로젝트 기획서 작성', 'UI 디자인 리뷰'],
      inProgress: ['API 개발', '테스트 코드 작성'],
      done: ['환경 설정', '레포지토리 생성', '팀 회의'],
    });

    const handleAddItem = (columnKey: keyof typeof columns) => {
      const newItem = prompt('새 항목 이름을 입력하세요');
      if (newItem) {
        setColumns({
          ...columns,
          [columnKey]: [...columns[columnKey], newItem],
        });
      }
    };

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
            할 일 ({columns.todo.length})
          </h3>
          <ProgressButton label="할 일" onClick={() => handleAddItem('todo')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {columns.todo.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '12px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '14px',
                  border: '1px solid #e2e8f0',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
            진행중 ({columns.inProgress.length})
          </h3>
          <ProgressButton label="진행중" onClick={() => handleAddItem('inProgress')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {columns.inProgress.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '12px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '14px',
                  border: '1px solid #e2e8f0',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
            완료 ({columns.done.length})
          </h3>
          <ProgressButton label="완료" onClick={() => handleAddItem('done')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {columns.done.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '12px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '14px',
                  border: '1px solid #e2e8f0',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '칸반 보드에서 ProgressButton을 사용하는 실제 예시입니다.',
      },
    },
  },
} as Story;

// ==============================
// 실제 사용 예시 - 모바일 뷰
// ==============================

export const MobileViewExample: Story = {
  render: () => {
    const [items, setItems] = useState(['할 일 1', '할 일 2', '할 일 3']);

    const handleAdd = () => {
      const newItem = prompt('새 항목 이름을 입력하세요');
      if (newItem) {
        setItems([...items, newItem]);
      }
    };

    return (
      <div
        style={{
          width: '100%',
          maxWidth: '375px',
          padding: '16px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>할 일 목록</h3>
        </div>

        <ProgressButton label="할 일" onClick={handleAdd} />

        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '모바일 화면에서 전체 너비로 사용하는 예시입니다.',
      },
    },
  },
} as Story;

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
        width: '280px',
      }}
    >
      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
        버튼 위에 마우스를 올리거나 클릭해보세요:
      </p>
      <ProgressButton label="할 일" onClick={() => console.log('클릭')} />
      <ul
        style={{
          fontSize: '13px',
          color: '#64748b',
          lineHeight: '1.8',
          margin: 0,
          paddingLeft: '20px',
        }}
      >
        <li>기본: 회색 배경 + 플러스 박스 아이콘</li>
        <li>Hover: 더 진한 회색 + 아이콘 opacity 0.8</li>
        <li>Active: scale(0.98)</li>
        <li>Focus: 2px 파란색 outline</li>
        <li>width: 100% (부모 너비에 맞춤)</li>
        <li>긴 텍스트: 말줄임(...) 처리</li>
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
} as Story;

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
        width: '280px',
      }}
    >
      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
        Tab 키로 포커스를 이동하고 Enter/Space로 실행해보세요:
      </p>
      <ProgressButton label="할 일" onClick={() => alert('할 일 추가')} />
      <ProgressButton label="진행중" onClick={() => alert('진행중 추가')} />
      <ProgressButton label="비활성화됨" onClick={() => {}} disabled />
      <ul
        style={{
          fontSize: '13px',
          color: '#64748b',
          lineHeight: '1.8',
          margin: 0,
          paddingLeft: '20px',
        }}
      >
        <li>aria-label: &quot;[라벨] 항목 추가&quot;</li>
        <li>키보드 네비게이션: Tab으로 포커스 이동</li>
        <li>키보드 실행: Enter/Space로 클릭</li>
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
} as Story;

// ==============================
// 크기 스펙
// ==============================

export const SizeReference: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        width: '280px',
      }}
    >
      <ProgressButton label="할 일" onClick={() => {}} />
      <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.6' }}>
        • width: 100% (부모 컨테이너에 맞춤)
        <br />
        • height: 38px
        <br />
        • padding: 0 8px 0 20px
        <br />
        • gap: 8px (텍스트와 아이콘 사이)
        <br />
        • border-radius: 12px
        <br />
        • 플러스 박스 아이콘: 24px × 24px
        <br />
        • font-size: 14px
        <br />
        • font-weight: 500
        <br />• 긴 텍스트: overflow hidden + ellipsis
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
} as Story;
