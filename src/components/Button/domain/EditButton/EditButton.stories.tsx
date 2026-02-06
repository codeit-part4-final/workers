import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import EditButton from '@/components/Button/domain/EditButton/EditButton';

/**
 * EditButton 컴포넌트
 *
 * 이미지 편집(수정) 액션을 트리거하는 아이콘 버튼입니다.
 * 주로 프로필 이미지, 썸네일 등의 편집 기능에 사용됩니다.
 */
const meta: Meta<typeof EditButton> = {
  title: 'Components/Button/EditButton',
  component: EditButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'small'],
      description: '버튼 크기 (large: 32px, small: 24px)',
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
type Story = StoryObj<typeof EditButton>;

// ==============================
// 기본 스토리
// ==============================

export const Large: Story = {
  args: {
    size: 'large',
    onClick: () => console.log('Edit clicked'),
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    onClick: () => console.log('Edit clicked'),
  },
};

export const Disabled: Story = {
  args: {
    size: 'large',
    disabled: true,
    onClick: () => console.log('This should not fire'),
  },
};

// ==============================
// Size 비교 (한눈에 보기)
// ==============================

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Large (32x32px)</p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <EditButton size="large" onClick={() => console.log('Large')} />
          <EditButton size="large" onClick={() => console.log('Disabled')} disabled />
        </div>
      </div>

      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Small (24x24px)</p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <EditButton size="small" onClick={() => console.log('Small')} />
          <EditButton size="small" onClick={() => console.log('Disabled')} disabled />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 크기와 disabled 상태를 한눈에 확인합니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 프로필 이미지
// ==============================

export const ProfileImageExample: Story = {
  render: () => {
    const handleFileUpload = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          console.log('선택된 파일:', file.name);
          alert(`파일 선택됨: ${file.name}`);
        }
      };
      input.click();
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          <img
            src="https://via.placeholder.com/120"
            alt="프로필"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
            }}
          >
            <EditButton size="large" onClick={handleFileUpload} />
          </div>
        </div>
        <p
          style={{
            fontSize: '13px',
            color: '#64748b',
            textAlign: 'center',
          }}
        >
          버튼 클릭 시 파일 업로더가 열립니다
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '프로필 이미지에 EditButton을 배치한 예시입니다. 버튼은 이미지 우측 하단에 위치합니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 카드 썸네일
// ==============================

export const CardThumbnailExample: Story = {
  render: () => {
    const handleEdit = () => {
      console.log('썸네일 편집');
      alert('썸네일 편집 기능');
    };

    return (
      <div
        style={{
          width: '280px',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '160px' }}>
          <img
            src="https://via.placeholder.com/280x160"
            alt="썸네일"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
            }}
          >
            <EditButton size="small" onClick={handleEdit} />
          </div>
        </div>
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>카드 제목</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>카드 설명 텍스트입니다.</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '카드 썸네일에 EditButton을 배치한 예시입니다. 버튼은 이미지 우측 상단에 위치합니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 여러 이미지 그리드
// ==============================

export const ImageGridExample: Story = {
  render: () => {
    const handleEdit = (index: number) => {
      console.log(`이미지 ${index + 1} 편집`);
      alert(`이미지 ${index + 1} 편집`);
    };

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          maxWidth: '360px',
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div
            key={item}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <img
              src={`https://via.placeholder.com/120?text=${item}`}
              alt={`이미지 ${item}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
              }}
            >
              <EditButton size="small" onClick={() => handleEdit(index)} />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '여러 이미지를 그리드로 배치하고 각각에 EditButton을 추가한 예시입니다.',
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
        <EditButton size="large" onClick={() => console.log('Hover me!')} />
        <EditButton size="small" onClick={() => console.log('Click me!')} />
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
        <li>기본: 회색 원형 배경</li>
        <li>Hover: 더 진한 회색</li>
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
        <EditButton size="large" onClick={() => alert('편집 실행!')} />
        <EditButton size="small" onClick={() => alert('편집 실행!')} />
        <EditButton size="large" onClick={() => alert('실행되지 않아야 함')} disabled />
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
        <li>aria-label: "이미지 편집"</li>
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
// 다양한 배경에서의 표시
// ==============================

export const OnDifferentBackgrounds: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
      }}
    >
      {/* 흰색 배경 */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            color: '#64748b',
            marginBottom: '12px',
            textAlign: 'center',
          }}
        >
          밝은 배경
        </p>
        <EditButton size="large" onClick={() => console.log('Click')} />
      </div>

      {/* 회색 배경 */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#f1f5f9',
          borderRadius: '8px',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            color: '#64748b',
            marginBottom: '12px',
            textAlign: 'center',
          }}
        >
          회색 배경
        </p>
        <EditButton size="large" onClick={() => console.log('Click')} />
      </div>

      {/* 어두운 배경 */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#1e293b',
          borderRadius: '8px',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            color: '#94a3b8',
            marginBottom: '12px',
            textAlign: 'center',
          }}
        >
          어두운 배경
        </p>
        <EditButton size="large" onClick={() => console.log('Click')} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 배경색에서 EditButton의 가시성을 확인합니다.',
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
        gap: '24px',
        padding: '20px',
      }}
    >
      <div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
          <EditButton size="large" onClick={() => {}} />
          <div style={{ fontSize: '13px', color: '#64748b' }}>Large: 32px × 32px</div>
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', paddingLeft: '44px' }}>
          • border-radius: 50% (원형)
          <br />• background: var(--color-background-tertiary)
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
          <EditButton size="small" onClick={() => {}} />
          <div style={{ fontSize: '13px', color: '#64748b' }}>Small: 24px × 24px</div>
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', paddingLeft: '36px' }}>
          • border-radius: 50% (원형)
          <br />• background: var(--color-background-tertiary)
        </div>
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
