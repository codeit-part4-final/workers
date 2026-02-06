import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import FloatingButton from '@/components/Button/domain/FloatingButton/FloatingButton';

/**
 * FloatingButton 컴포넌트
 *
 * 화면에 고정되어 주요 액션을 제공하는 플로팅 버튼입니다.
 * 새 항목 추가, 편집 등의 주요 액션에 사용됩니다.
 */
const meta: Meta<typeof FloatingButton> = {
  title: 'Components/Button/FloatingButton',
  component: FloatingButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['plus', 'edit'],
      description: '버튼에 표시할 아이콘 타입',
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
type Story = StoryObj<typeof FloatingButton>;

// ==============================
// 기본 스토리
// ==============================

export const Plus: Story = {
  args: {
    icon: 'plus',
    onClick: () => console.log('Plus button clicked'),
  },
};

export const Edit: Story = {
  args: {
    icon: 'edit',
    onClick: () => console.log('Edit button clicked'),
  },
};

export const Disabled: Story = {
  args: {
    icon: 'plus',
    disabled: true,
    onClick: () => console.log('This should not fire'),
  },
};

// ==============================
// Icon 비교 (한눈에 보기)
// ==============================

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
          Plus Icon (새 항목 추가)
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <FloatingButton icon="plus" onClick={() => console.log('Plus')} />
          <FloatingButton icon="plus" onClick={() => console.log('Disabled')} disabled />
        </div>
      </div>

      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Edit Icon (편집)</p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <FloatingButton icon="edit" onClick={() => console.log('Edit')} />
          <FloatingButton icon="edit" onClick={() => console.log('Disabled')} disabled />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 아이콘 타입과 disabled 상태를 한눈에 확인합니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 게시판 목록
// ==============================

export const BoardListExample: Story = {
  render: () => {
    const [posts] = useState([
      { id: 1, title: '첫 번째 게시글', author: '홍길동' },
      { id: 2, title: '두 번째 게시글', author: '김철수' },
      { id: 3, title: '세 번째 게시글', author: '이영희' },
    ]);

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          height: '500px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>자유게시판</h2>
        </div>

        {/* 게시글 목록 */}
        <div style={{ padding: '16px' }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                padding: '16px',
                marginBottom: '12px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
              }}
            >
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                {post.title}
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>작성자: {post.author}</p>
            </div>
          ))}
        </div>

        {/* Floating Button */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
          }}
        >
          <FloatingButton icon="plus" onClick={() => alert('새 글 작성')} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '게시판 목록 페이지에서 FloatingButton을 사용하는 예시입니다. 우측 하단에 고정됩니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 할일 목록
// ==============================

export const TodoListExample: Story = {
  render: () => {
    const [todos, setTodos] = useState([
      { id: 1, text: '프로젝트 기획서 작성', completed: false },
      { id: 2, text: '디자인 시안 검토', completed: true },
      { id: 3, text: '개발 일정 조율', completed: false },
    ]);

    const handleAddTodo = () => {
      const newTodo = prompt('새 할일을 입력하세요');
      if (newTodo) {
        setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      }
    };

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          height: '500px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#5189fa',
            color: '#ffffff',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>오늘의 할일</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', opacity: 0.9 }}>
            {todos.filter((t) => !t.completed).length}개 남음
          </p>
        </div>

        {/* 할일 목록 */}
        <div style={{ padding: '16px', height: 'calc(100% - 120px)', overflowY: 'auto' }}>
          {todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                padding: '12px',
                marginBottom: '8px',
                backgroundColor: todo.completed ? '#f8fafc' : '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  setTodos(
                    todos.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t)),
                  );
                }}
                style={{ width: '18px', height: '18px' }}
              />
              <span
                style={{
                  fontSize: '14px',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#94a3b8' : '#1e293b',
                }}
              >
                {todo.text}
              </span>
            </div>
          ))}
        </div>

        {/* Floating Button */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
          }}
        >
          <FloatingButton icon="plus" onClick={handleAddTodo} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '할일 목록에서 새 항목을 추가하는 FloatingButton 예시입니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 편집 모드
// ==============================

export const EditModeExample: Story = {
  render: () => {
    const [isEditMode, setIsEditMode] = useState(false);

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '500px',
          height: '400px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>프로필</h2>
          {isEditMode && (
            <button
              onClick={() => setIsEditMode(false)}
              style={{
                padding: '6px 12px',
                fontSize: '13px',
                backgroundColor: '#5189fa',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              완료
            </button>
          )}
        </div>

        {/* 프로필 내용 */}
        <div style={{ padding: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 12px',
                borderRadius: '50%',
                backgroundColor: '#e2e8f0',
              }}
            />
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>홍길동</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>hong@example.com</p>
          </div>

          {isEditMode && (
            <div
              style={{
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#64748b',
                textAlign: 'center',
              }}
            >
              편집 모드가 활성화되었습니다
            </div>
          )}
        </div>

        {/* Floating Button */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
          }}
        >
          <FloatingButton icon="edit" onClick={() => setIsEditMode(!isEditMode)} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '편집 모드를 토글하는 FloatingButton 예시입니다.',
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
      <div style={{ display: 'flex', gap: '16px' }}>
        <FloatingButton icon="plus" onClick={() => console.log('Plus clicked')} />
        <FloatingButton icon="edit" onClick={() => console.log('Edit clicked')} />
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
        <li>기본: 파란색 원형 배경 + 그림자</li>
        <li>Hover: 더 진한 파란색</li>
        <li>Active: scale(0.95)</li>
        <li>Focus: 2px 파란색 outline</li>
        <li>Disabled: opacity 0.5</li>
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
        <FloatingButton icon="plus" onClick={() => alert('새 항목 추가')} />
        <FloatingButton icon="edit" onClick={() => alert('편집')} />
        <FloatingButton icon="plus" onClick={() => alert('실행되지 않음')} disabled />
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
        <li>Plus: aria-label "새 항목 추가"</li>
        <li>Edit: aria-label "편집"</li>
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
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <FloatingButton icon="plus" onClick={() => {}} />
        <div style={{ fontSize: '13px', color: '#64748b' }}>56px × 56px (고정 크기)</div>
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#94a3b8',
          lineHeight: '1.6',
        }}
      >
        • 크기: 56px × 56px
        <br />
        • border-radius: 50% (완전한 원형)
        <br />
        • box-shadow: 0px 5px 5px 0px rgba(49, 84, 153, 0.2)
        <br />
        • 아이콘: 24px × 24px
        <br />• background: var(--color-brand-primary)
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
