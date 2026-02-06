import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import OutlineIconTextButton from '@/components/Button/domain/OutlineIconTextButton/OutlineIconTextButton';

/**
 * OutlineIconTextButton 컴포넌트
 *
 * 아이콘과 텍스트를 함께 사용하는 아웃라인 스타일 버튼입니다.
 * 상태별로 체크 아이콘이 변경되어 시각적 피드백을 제공합니다.
 */
const meta: Meta<typeof OutlineIconTextButton> = {
  title: 'Components/Button/OutlineIconTextButton',
  component: OutlineIconTextButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: '버튼 타입',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: '버튼 라벨 텍스트',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OutlineIconTextButton>;

// ==============================
// 기본 스토리
// ==============================

export const Default: Story = {
  args: {
    children: '완료 하기',
    onClick: () => console.log('Clicked'),
  },
};

export const Disabled: Story = {
  args: {
    children: '완료 하기',
    disabled: true,
    onClick: () => console.log('This should not fire'),
  },
};

// ==============================
// 다양한 라벨
// ==============================

export const VariousLabels: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-start',
      }}
    >
      <OutlineIconTextButton onClick={() => console.log('완료')}>완료 하기</OutlineIconTextButton>
      <OutlineIconTextButton onClick={() => console.log('취소')}>
        완료 취소하기
      </OutlineIconTextButton>
      <OutlineIconTextButton onClick={() => console.log('확인')}>확인 완료</OutlineIconTextButton>
      <OutlineIconTextButton onClick={() => console.log('작업')}>작업 완료</OutlineIconTextButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 라벨 텍스트로 버튼을 사용하는 예시입니다.',
      },
    },
  },
};

// ==============================
// 상태 비교
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
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <OutlineIconTextButton>완료 하기</OutlineIconTextButton>
          <OutlineIconTextButton>완료 취소하기</OutlineIconTextButton>
        </div>
      </div>

      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Disabled 상태</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <OutlineIconTextButton disabled>완료 하기</OutlineIconTextButton>
          <OutlineIconTextButton disabled>완료 취소하기</OutlineIconTextButton>
        </div>
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
};

// ==============================
// 실제 사용 예시 - 할일 완료
// ==============================

export const TodoCompleteExample: Story = {
  render: () => {
    const todos = [
      { id: 1, text: '프로젝트 기획서 작성', completed: false },
      { id: 2, text: '디자인 시안 검토', completed: true },
      { id: 3, text: '개발 일정 조율', completed: false },
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxWidth: '500px',
        }}
      >
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: todo.completed ? '#f8fafc' : '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                color: todo.completed ? '#94a3b8' : '#1e293b',
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </span>
            <OutlineIconTextButton
              onClick={() => alert(`"${todo.text}" 완료 상태 변경`)}
              disabled={todo.completed}
            >
              {todo.completed ? '완료됨' : '완료 하기'}
            </OutlineIconTextButton>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '할일 목록에서 완료 처리하는 예시입니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 작업 승인
// ==============================

export const ApprovalExample: Story = {
  render: () => {
    const tasks = [
      { id: 1, title: '디자인 리뷰 요청', status: 'pending' },
      { id: 2, title: '코드 리뷰 요청', status: 'pending' },
      { id: 3, title: '배포 승인 요청', status: 'approved' },
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '600px',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>승인 대기 목록</h3>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              padding: '20px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                  {task.title}
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                  {task.status === 'approved' ? '승인 완료' : '승인 대기중'}
                </p>
              </div>
              <OutlineIconTextButton
                onClick={() => alert(`"${task.title}" 승인`)}
                disabled={task.status === 'approved'}
              >
                {task.status === 'approved' ? '승인 완료' : '승인 하기'}
              </OutlineIconTextButton>
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '작업 승인 프로세스에서 사용하는 예시입니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 모달 액션
// ==============================

export const ModalActionsExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '32px',
        maxWidth: '500px',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '600' }}>
          작업을 완료하시겠습니까?
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
          완료한 작업은 목록에서 제거되며, 완료 기록에 저장됩니다.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
        }}
      >
        <OutlineIconTextButton onClick={() => alert('취소')}>취소</OutlineIconTextButton>
        <OutlineIconTextButton onClick={() => alert('완료')}>완료</OutlineIconTextButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모달 다이얼로그의 확인/취소 액션으로 사용하는 예시입니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 폼 제출
// ==============================

export const FormExample: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('폼 제출됨');
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '32px',
        maxWidth: '400px',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>프로필 수정</h3>

      <div>
        <label
          htmlFor="name"
          style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}
        >
          이름
        </label>
        <input
          id="name"
          type="text"
          defaultValue="홍길동"
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}
        >
          이메일
        </label>
        <input
          id="email"
          type="email"
          defaultValue="hong@example.com"
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <OutlineIconTextButton type="button" onClick={() => alert('취소')}>
          취소
        </OutlineIconTextButton>
        <OutlineIconTextButton type="submit">저장하기</OutlineIconTextButton>
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: '폼 제출 시나리오에서 사용하는 예시입니다.',
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
        버튼 위에 마우스를 올리거나 클릭해보세요 (아이콘이 변경됩니다):
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <OutlineIconTextButton>완료 하기</OutlineIconTextButton>
        <OutlineIconTextButton>완료 취소하기</OutlineIconTextButton>
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
        <li>기본: Primary 체크 아이콘 + 파란색 테두리</li>
        <li>Hover: Hover 체크 아이콘 + 진한 파란색</li>
        <li>Active (pressed): Pressed 체크 아이콘</li>
        <li>Disabled: Inactive 체크 아이콘 + 회색</li>
        <li>Focus: 2px 파란색 outline</li>
      </ul>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 hover, active, focus 상태와 아이콘 변경을 테스트합니다.',
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
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <OutlineIconTextButton onClick={() => alert('버튼 1')}>Tab me</OutlineIconTextButton>
        <OutlineIconTextButton onClick={() => alert('버튼 2')}>Then me</OutlineIconTextButton>
        <OutlineIconTextButton disabled onClick={() => {}}>
          Skip me
        </OutlineIconTextButton>
        <OutlineIconTextButton onClick={() => alert('버튼 3')}>And me</OutlineIconTextButton>
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
        <li>키보드 네비게이션: Tab으로 포커스 이동</li>
        <li>키보드 실행: Enter/Space로 클릭</li>
        <li>체크 아이콘: aria-hidden="true"로 장식용 처리</li>
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
      }}
    >
      <OutlineIconTextButton>완료 하기</OutlineIconTextButton>
      <div
        style={{
          fontSize: '12px',
          color: '#94a3b8',
          lineHeight: '1.6',
        }}
      >
        • height: 33px
        <br />
        • padding: 8px 12px
        <br />
        • gap: 4px (아이콘과 텍스트 사이)
        <br />
        • border-radius: 8px
        <br />
        • border: 1px solid
        <br />
        • 체크 아이콘: 16px × 16px
        <br />
        • font-size: 14px
        <br />
        • font-weight: 600
        <br />• width: max-content (콘텐츠에 맞춰 자동)
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
