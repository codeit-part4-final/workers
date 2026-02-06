import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import EnterButton from '@/components/Button/domain/EnterButton/EnterButton';

/**
 * EnterButton 컴포넌트
 *
 * 댓글 등록(전송) 액션을 위한 아이콘 버튼입니다.
 * 입력값이 있을 때만 활성화되는 패턴으로 사용됩니다.
 */
const meta: Meta<typeof EnterButton> = {
  title: 'Components/Button/EnterButton',
  component: EnterButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'boolean',
      description: '활성화 여부 (false일 때 자동으로 disabled)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '클릭 핸들러 (active가 true일 때만 실행)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EnterButton>;

// ==============================
// 기본 스토리
// ==============================

export const Active: Story = {
  args: {
    active: true,
    onClick: () => console.log('Enter button clicked!'),
  },
};

export const Inactive: Story = {
  args: {
    active: false,
    onClick: () => console.log('This should not fire'),
  },
};

// ==============================
// 상태 비교 (한눈에 보기)
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
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
          NonActive (회색) - 클릭 불가
        </p>
        <EnterButton onClick={() => console.log('Should not fire')} active={false} />
      </div>

      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
          Active (파란색) - 클릭 가능
        </p>
        <EnterButton onClick={() => alert('댓글 전송!')} active={true} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'EnterButton의 모든 상태를 한눈에 확인합니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 댓글 입력
// ==============================

export const CommentInputExample: Story = {
  render: () => {
    const [inputValue, setInputValue] = useState('');
    const [comments, setComments] = useState<string[]>([]);

    const handleSubmit = () => {
      if (inputValue.trim()) {
        setComments([...comments, inputValue]);
        setInputValue('');
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && inputValue.trim()) {
        e.preventDefault();
        handleSubmit();
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        {/* 댓글 입력 영역 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '12px',
            padding: '16px',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
          }}
        >
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="댓글을 입력해주세요 (Enter로 전송)"
            style={{
              flex: 1,
              minHeight: '60px',
              maxHeight: '120px',
              padding: '8px',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: '14px',
              fontFamily: 'inherit',
              lineHeight: '1.5',
            }}
          />
          <EnterButton onClick={handleSubmit} active={inputValue.trim().length > 0} />
        </div>

        {/* 등록된 댓글 목록 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '14px',
              fontWeight: '600',
              color: '#1e293b',
            }}
          >
            등록된 댓글 ({comments.length})
          </h3>
          {comments.length === 0 ? (
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                color: '#94a3b8',
                textAlign: 'center',
                padding: '20px',
              }}
            >
              아직 댓글이 없습니다
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {comments.map((comment, index) => (
                <div
                  key={index}
                  style={{
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#1e293b',
                  }}
                >
                  {comment}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '댓글 입력에서 EnterButton을 사용하는 실제 예시입니다. 텍스트가 입력되면 버튼이 활성화되고, Enter 키로도 전송할 수 있습니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 채팅 입력
// ==============================

export const ChatInputExample: Story = {
  render: () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ text: string; time: string }[]>([
      { text: '안녕하세요!', time: '10:30' },
      { text: '반갑습니다 😊', time: '10:31' },
    ]);

    const handleSend = () => {
      if (message.trim()) {
        const now = new Date();
        const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        setMessages([...messages, { text: message, time }]);
        setMessage('');
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '400px',
          height: '500px',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* 채팅 헤더 */}
        <div
          style={{
            padding: '16px',
            backgroundColor: '#5189fa',
            color: '#ffffff',
            fontWeight: '600',
          }}
        >
          채팅방
        </div>

        {/* 메시지 목록 */}
        <div
          style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            backgroundColor: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf: index < 2 ? 'flex-start' : 'flex-end',
                maxWidth: '70%',
              }}
            >
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: index < 2 ? '#ffffff' : '#5189fa',
                  color: index < 2 ? '#1e293b' : '#ffffff',
                  borderRadius: '12px',
                  fontSize: '14px',
                  wordBreak: 'break-word',
                }}
              >
                {msg.text}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  marginTop: '4px',
                  textAlign: index < 2 ? 'left' : 'right',
                }}
              >
                {msg.time}
              </div>
            </div>
          ))}
        </div>

        {/* 입력 영역 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e2e8f0',
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && message.trim()) {
                handleSend();
              }
            }}
            placeholder="메시지를 입력하세요"
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <EnterButton onClick={handleSend} active={message.trim().length > 0} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '채팅 인터페이스에서 EnterButton을 사용하는 예시입니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 간단한 검색
// ==============================

export const SearchExample: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const mockData = [
      '프로젝트 기획서.pdf',
      '회의록_2025.docx',
      '디자인 시안 v1.0',
      '개발 가이드.md',
      '테스트 케이스 목록',
    ];

    const handleSearch = () => {
      if (searchQuery.trim()) {
        const results = mockData.filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setSearchResults(results);
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                handleSearch();
              }
            }}
            placeholder="파일명을 검색하세요"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '14px',
            }}
          />
          <EnterButton onClick={handleSearch} active={searchQuery.trim().length > 0} />
        </div>

        {searchResults.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ fontSize: '13px', color: '#64748b' }}>
              검색 결과: {searchResults.length}개
            </div>
            {searchResults.map((result, index) => (
              <div
                key={index}
                style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  fontSize: '14px',
                }}
              >
                {result}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '검색 인터페이스에서 EnterButton을 사용하는 예시입니다.',
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
        Active 버튼 위에 마우스를 올리거나 클릭해보세요:
      </p>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <EnterButton onClick={() => console.log('Inactive')} active={false} />
        <EnterButton onClick={() => alert('전송!')} active={true} />
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
        <li>Inactive: 회색 아이콘, 클릭 불가</li>
        <li>Active: 파란색 아이콘, 클릭 가능</li>
        <li>Hover (Active만): opacity 0.8</li>
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
        <EnterButton onClick={() => console.log('Should not fire')} active={false} />
        <EnterButton onClick={() => alert('댓글 전송 완료!')} active={true} />
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
        <li>aria-label: "댓글 등록"</li>
        <li>키보드 네비게이션: Tab으로 포커스 이동</li>
        <li>키보드 실행: Enter/Space로 클릭 (active일 때만)</li>
        <li>Inactive 상태는 disabled로 처리되어 포커스를 받지 않음</li>
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
        <EnterButton onClick={() => {}} active={true} />
        <div style={{ fontSize: '13px', color: '#64748b' }}>24px × 24px (고정 크기)</div>
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#94a3b8',
          lineHeight: '1.6',
        }}
      >
        • 아이콘 크기: 24px × 24px
        <br />
        • Active: 파란색 화살표
        <br />• Inactive: 회색 화살표 (disabled)
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
