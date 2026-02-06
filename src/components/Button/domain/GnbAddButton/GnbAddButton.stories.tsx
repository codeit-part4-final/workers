import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import GnbAddButton from '@/components/Button/domain/GnbAddButton/GnbAddButton';

/**
 * GnbAddButton 컴포넌트
 *
 * GNB(Global Navigation Bar) 영역에서 새 항목을 추가하기 위한 버튼입니다.
 * 주로 사이드바에서 팀, 프로젝트 등을 추가할 때 사용됩니다.
 */
const meta: Meta<typeof GnbAddButton> = {
  title: 'Components/Button/GnbAddButton',
  component: GnbAddButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '버튼에 표시될 텍스트',
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
type Story = StoryObj<typeof GnbAddButton>;

// ==============================
// 기본 스토리
// ==============================

export const Default: Story = {
  args: {
    label: '팀 추가하기',
    onClick: () => console.log('팀 추가 클릭'),
  },
};

export const Disabled: Story = {
  args: {
    label: '팀 추가하기',
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
        width: '280px',
      }}
    >
      <GnbAddButton label="팀 추가하기" onClick={() => console.log('팀 추가')} />
      <GnbAddButton label="프로젝트 추가" onClick={() => console.log('프로젝트 추가')} />
      <GnbAddButton label="워크스페이스 생성" onClick={() => console.log('워크스페이스 생성')} />
      <GnbAddButton label="새 보드 만들기" onClick={() => console.log('보드 생성')} />
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
        width: '280px',
      }}
    >
      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>기본 상태</p>
        <GnbAddButton label="팀 추가하기" onClick={() => console.log('클릭')} />
      </div>

      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Disabled 상태</p>
        <GnbAddButton label="팀 추가하기" onClick={() => {}} disabled />
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
// 실제 사용 예시 - GNB Sidebar
// ==============================

export const GnbSidebarExample: Story = {
  render: () => (
    <div
      style={{
        width: '280px',
        height: '600px',
        backgroundColor: '#1e293b',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* GNB Header */}
      <div
        style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(248, 250, 252, 0.1)',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '700',
            color: '#ffffff',
          }}
        >
          COWORKERS
        </h3>
      </div>

      {/* Team List */}
      <div
        style={{
          flex: 1,
          padding: '16px 12px',
          overflowY: 'auto',
        }}
      >
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#94a3b8', padding: '0 8px' }}>
          팀 선택
        </div>
        {['경영관리팀', '프로덕트팀', '마케팅팀', '콘텐츠팀'].map((team, index) => (
          <div
            key={team}
            style={{
              padding: '10px 12px',
              marginBottom: '4px',
              borderRadius: '6px',
              fontSize: '14px',
              color: index === 0 ? '#5189fa' : '#f8fafc',
              backgroundColor: index === 0 ? 'rgba(81, 137, 250, 0.1)' : 'transparent',
              cursor: 'pointer',
            }}
          >
            {team}
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div style={{ padding: '12px' }}>
        <GnbAddButton label="팀 추가하기" onClick={() => alert('팀 생성 모달 열기')} />
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(248, 250, 252, 0.1)',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#f8fafc',
            cursor: 'pointer',
          }}
        >
          자유게시판
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'GNB 사이드바에서 GnbAddButton을 사용하는 실제 예시입니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 프로젝트 사이드바
// ==============================

export const ProjectSidebarExample: Story = {
  render: () => (
    <div
      style={{
        width: '280px',
        height: '500px',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <h3
          style={{
            margin: '0 0 4px 0',
            fontSize: '16px',
            fontWeight: '700',
            color: '#1e293b',
          }}
        >
          내 프로젝트
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>5개의 프로젝트</p>
      </div>

      {/* Project List */}
      <div
        style={{
          flex: 1,
          padding: '12px',
          overflowY: 'auto',
        }}
      >
        {[
          { name: '웹사이트 리뉴얼', status: '진행중' },
          { name: '모바일 앱 개발', status: '계획중' },
          { name: 'UI/UX 개선', status: '완료' },
          { name: '마케팅 캠페인', status: '진행중' },
          { name: 'CS 시스템 구축', status: '진행중' },
        ].map((project) => (
          <div
            key={project.name}
            style={{
              padding: '12px',
              marginBottom: '8px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
              {project.name}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{project.status}</div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div style={{ padding: '12px', borderTop: '1px solid #e2e8f0' }}>
        <GnbAddButton label="프로젝트 추가" onClick={() => alert('프로젝트 생성')} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '프로젝트 사이드바에서 새 프로젝트를 추가하는 예시입니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 워크스페이스 선택
// ==============================

export const WorkspaceExample: Story = {
  render: () => (
    <div
      style={{
        width: '320px',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: '700',
            color: '#1e293b',
          }}
        >
          워크스페이스
        </h3>
      </div>

      {/* Workspace List */}
      <div style={{ padding: '12px' }}>
        {['개인 워크스페이스', '팀 A 워크스페이스', '팀 B 워크스페이스'].map((workspace, index) => (
          <div
            key={workspace}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              marginBottom: '8px',
              borderRadius: '8px',
              backgroundColor: index === 0 ? '#eef3ff' : '#ffffff',
              border: index === 0 ? '1px solid #5189fa' : '1px solid #e2e8f0',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: index === 0 ? '#5189fa' : '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              {workspace[0]}
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                {workspace}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div style={{ padding: '12px', borderTop: '1px solid #e2e8f0' }}>
        <GnbAddButton label="워크스페이스 생성" onClick={() => alert('워크스페이스 생성 모달')} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '워크스페이스 선택 UI에서 새 워크스페이스를 추가하는 예시입니다.',
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
        width: '280px',
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
      <GnbAddButton label="팀 추가하기" onClick={() => console.log('클릭')} />
      <ul
        style={{
          fontSize: '13px',
          color: '#64748b',
          lineHeight: '1.8',
          margin: 0,
          paddingLeft: '20px',
        }}
      >
        <li>기본: 투명 배경 + 파란색 테두리</li>
        <li>Hover: 연한 파란색 배경 + 진한 테두리</li>
        <li>Active: scale(0.98)</li>
        <li>Focus: 2px 파란색 outline</li>
        <li>width: 100% (부모 너비에 맞춤)</li>
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
        width: '280px',
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
      <GnbAddButton label="팀 추가하기" onClick={() => alert('팀 추가')} />
      <GnbAddButton label="프로젝트 추가" onClick={() => alert('프로젝트 추가')} />
      <GnbAddButton label="비활성화됨" onClick={() => {}} disabled />
      <ul
        style={{
          fontSize: '13px',
          color: '#64748b',
          lineHeight: '1.8',
          margin: 0,
          paddingLeft: '20px',
        }}
      >
        <li>aria-label: label prop 값과 동일</li>
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
        width: '280px',
      }}
    >
      <GnbAddButton label="팀 추가하기" onClick={() => {}} />
      <div
        style={{
          fontSize: '12px',
          color: '#94a3b8',
          lineHeight: '1.6',
        }}
      >
        • width: 100% (부모 컨테이너에 맞춤)
        <br />
        • height: 33px
        <br />
        • padding: 0 12px
        <br />
        • border-radius: 4px
        <br />
        • border: 1px solid
        <br />
        • icon: 16px × 16px
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
