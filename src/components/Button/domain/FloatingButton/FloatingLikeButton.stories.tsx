import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import FloatingLikeButton from '@/components/Button/domain/FloatingButton/FloatingLikeButton';

/**
 * FloatingLikeButton 컴포넌트
 *
 * 좋아요(토글) 액션을 제공하는 플로팅 버튼입니다.
 * 게시글, 콘텐츠 등에 좋아요 기능을 추가할 때 사용됩니다.
 */
const meta: Meta<typeof FloatingLikeButton> = {
  title: 'Components/Button/FloatingLikeButton',
  component: FloatingLikeButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLiked: {
      control: 'boolean',
      description: '좋아요 활성화 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    count: {
      control: 'number',
      description: '좋아요 개수 (999 초과 시 "999+" 표시)',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onToggle: {
      action: 'toggled',
      description: '좋아요 토글 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingLikeButton>;

// ==============================
// 기본 스토리
// ==============================

export const NotLiked: Story = {
  args: {
    isLiked: false,
    count: 0,
    onToggle: () => console.log('Toggle'),
  },
};

export const Liked: Story = {
  args: {
    isLiked: true,
    count: 1,
    onToggle: () => console.log('Toggle'),
  },
};

export const WithCount: Story = {
  args: {
    isLiked: false,
    count: 42,
    onToggle: () => console.log('Toggle'),
  },
};

export const WithLargeCount: Story = {
  args: {
    isLiked: true,
    count: 999,
    onToggle: () => console.log('Toggle'),
  },
};

export const WithMaxCount: Story = {
  args: {
    isLiked: true,
    count: 1234,
    onToggle: () => console.log('Toggle'),
  },
};

export const Disabled: Story = {
  args: {
    isLiked: false,
    count: 10,
    disabled: true,
    onToggle: () => console.log('This should not fire'),
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
        gap: '32px',
      }}
    >
      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>기본 상태</p>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div style={{ textAlign: 'center' }}>
            <FloatingLikeButton isLiked={false} count={0} onToggle={() => {}} />
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>미선택, 0</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <FloatingLikeButton isLiked={true} count={1} onToggle={() => {}} />
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>선택, 1</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <FloatingLikeButton isLiked={false} count={42} onToggle={() => {}} />
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>미선택, 42</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <FloatingLikeButton isLiked={true} count={999} onToggle={() => {}} />
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>선택, 999</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <FloatingLikeButton isLiked={true} count={1234} onToggle={() => {}} />
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>
              선택, 1234 (999+)
            </p>
          </div>
        </div>
      </div>

      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Disabled 상태</p>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <FloatingLikeButton isLiked={false} count={10} onToggle={() => {}} disabled />
          <FloatingLikeButton isLiked={true} count={10} onToggle={() => {}} disabled />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 상태와 count 표시를 한눈에 확인합니다.',
      },
    },
  },
};

// ==============================
// 인터랙티브 토글
// ==============================

export const InteractiveToggle: Story = {
  render: () => {
    const [isLiked, setIsLiked] = useState(false);
    const [count, setCount] = useState(42);

    const handleToggle = () => {
      setIsLiked(!isLiked);
      setCount(isLiked ? count - 1 : count + 1);
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <FloatingLikeButton isLiked={isLiked} count={count} onToggle={handleToggle} />
        <p
          style={{
            fontSize: '14px',
            color: '#64748b',
            textAlign: 'center',
          }}
        >
          클릭하여 좋아요를 토글해보세요
          <br />
          <span style={{ fontSize: '12px' }}>
            현재 상태: {isLiked ? '좋아요 ❤️' : '좋아요 안함 🤍'}
          </span>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '좋아요를 토글할 수 있는 인터랙티브 예시입니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 게시글
// ==============================

export const BlogPostExample: Story = {
  render: () => {
    const [isLiked, setIsLiked] = useState(false);
    const [count, setCount] = useState(127);

    const handleToggle = () => {
      setIsLiked(!isLiked);
      setCount(isLiked ? count - 1 : count + 1);
    };

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          minHeight: '600px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* 헤더 이미지 */}
        <div
          style={{
            width: '100%',
            height: '250px',
            backgroundColor: '#e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            fontSize: '14px',
          }}
        >
          Featured Image
        </div>

        {/* 콘텐츠 */}
        <div style={{ padding: '32px' }}>
          <h1
            style={{
              margin: '0 0 16px 0',
              fontSize: '32px',
              fontWeight: '700',
              lineHeight: '1.3',
            }}
          >
            블로그 포스트 제목
          </h1>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '24px',
              fontSize: '14px',
              color: '#64748b',
            }}
          >
            <span>홍길동</span>
            <span>•</span>
            <span>2025년 2월 4일</span>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#334155',
            }}
          >
            이것은 블로그 포스트의 본문 내용입니다. 여기에 긴 글이 들어가며, 사용자는 우측에 있는
            FloatingLikeButton을 통해 이 글에 좋아요를 표시할 수 있습니다.
          </p>
        </div>

        {/* Floating Like Button */}
        <div
          style={{
            position: 'absolute',
            top: '300px',
            right: '32px',
          }}
        >
          <FloatingLikeButton isLiked={isLiked} count={count} onToggle={handleToggle} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '블로그 포스트에서 FloatingLikeButton을 사용하는 예시입니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 이미지 갤러리
// ==============================

export const ImageGalleryExample: Story = {
  render: () => {
    const [likes, setLikes] = useState([
      { id: 1, isLiked: false, count: 24 },
      { id: 2, isLiked: true, count: 156 },
      { id: 3, isLiked: false, count: 89 },
    ]);

    const handleToggle = (id: number) => {
      setLikes(
        likes.map((item) =>
          item.id === id
            ? {
                ...item,
                isLiked: !item.isLiked,
                count: item.isLiked ? item.count - 1 : item.count + 1,
              }
            : item,
        ),
      );
    };

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          maxWidth: '800px',
        }}
      >
        {likes.map((item) => (
          <div
            key={item.id}
            style={{
              position: 'relative',
              aspectRatio: '1',
              backgroundColor: '#e2e8f0',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                fontSize: '14px',
              }}
            >
              Image {item.id}
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
              }}
            >
              <FloatingLikeButton
                isLiked={item.isLiked}
                count={item.count}
                onToggle={() => handleToggle(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '이미지 갤러리에서 각 이미지에 좋아요 버튼을 추가한 예시입니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 카드 리스트
// ==============================

export const CardListExample: Story = {
  render: () => {
    const [cards, setCards] = useState([
      { id: 1, title: '첫 번째 카드', description: '카드 설명 1', isLiked: false, count: 12 },
      { id: 2, title: '두 번째 카드', description: '카드 설명 2', isLiked: true, count: 45 },
      { id: 3, title: '세 번째 카드', description: '카드 설명 3', isLiked: false, count: 999 },
    ]);

    const handleToggle = (id: number) => {
      setCards(
        cards.map((card) =>
          card.id === id
            ? {
                ...card,
                isLiked: !card.isLiked,
                count: card.isLiked ? card.count - 1 : card.count + 1,
              }
            : card,
        ),
      );
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '500px',
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              position: 'relative',
              padding: '20px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                {card.title}
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>{card.description}</p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <FloatingLikeButton
                isLiked={card.isLiked}
                count={card.count}
                onToggle={() => handleToggle(card.id)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '카드 리스트에서 각 카드에 좋아요 버튼을 추가한 예시입니다.',
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
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <FloatingLikeButton isLiked={false} count={10} onToggle={() => {}} />
        <FloatingLikeButton isLiked={true} count={20} onToggle={() => {}} />
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
        <li>기본: 흰색 원형 배경 + 테두리 + 그림자</li>
        <li>미선택: 빈 하트 아이콘</li>
        <li>선택: 채워진 하트 아이콘</li>
        <li>Hover: 테두리 색상 변경</li>
        <li>Active: scale(0.95) + 아이콘 scale(1.1)</li>
        <li>Focus: 2px 파란색 outline</li>
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
    const [isLiked, setIsLiked] = useState(false);
    const [count, setCount] = useState(5);

    const handleToggle = () => {
      setIsLiked(!isLiked);
      setCount(isLiked ? count - 1 : count + 1);
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
          Tab 키로 포커스를 이동하고 Enter/Space로 토글해보세요:
        </p>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <FloatingLikeButton isLiked={isLiked} count={count} onToggle={handleToggle} />
          <FloatingLikeButton isLiked={false} count={10} onToggle={() => {}} disabled />
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
          <li>aria-label: "좋아요" 또는 "좋아요 취소"</li>
          <li>aria-pressed: 선택 상태를 스크린 리더에 전달</li>
          <li>키보드 네비게이션: Tab으로 포커스 이동</li>
          <li>키보드 실행: Enter/Space로 토글</li>
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
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <FloatingLikeButton isLiked={false} count={42} onToggle={() => {}} />
        <div style={{ fontSize: '13px', color: '#64748b', paddingTop: '4px' }}>
          버튼: 56px × 56px
          <br />
          Count: 16px font-size
        </div>
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#94a3b8',
          lineHeight: '1.6',
        }}
      >
        • 버튼 크기: 56px × 56px
        <br />
        • border-radius: 50% (완전한 원형)
        <br />
        • border: 1px solid
        <br />
        • box-shadow: 0px 15px 50px 0px rgba(0, 0, 0, 0.05)
        <br />
        • 아이콘: 24px × 24px
        <br />
        • Count: 16px, font-weight: 400
        <br />• Count 최대값: 999 (초과 시 "999+" 표시)
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
