import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FilledRoundButton from '@/components/Button/domain/FilledRoundButton/FilledRoundButton';

/**
 * FilledRoundButton 컴포넌트
 *
 * 체크 아이콘과 라벨을 함께 사용하는 둥근 형태의 버튼 컴포넌트입니다.
 * CTA(Call-to-Action) 버튼이나 완료/확인 액션에 주로 사용됩니다.
 */
const meta: Meta<typeof FilledRoundButton> = {
  title: 'Components/Button/FilledRoundButton',
  component: FilledRoundButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['filled', 'inverse'],
      description: '버튼 외형 스타일',
      table: {
        defaultValue: { summary: 'filled' },
      },
    },
    shadow: {
      control: 'boolean',
      description: '그림자 적용 여부',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: '버튼 타입',
      table: {
        defaultValue: { summary: 'button' },
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
type Story = StoryObj<typeof FilledRoundButton>;

// ==============================
// 기본 스토리
// ==============================

export const Filled: Story = {
  args: {
    children: 'Filled Button',
    appearance: 'filled',
  },
};

export const Inverse: Story = {
  args: {
    children: 'Inverse Button',
    appearance: 'inverse',
  },
};

export const FilledWithoutShadow: Story = {
  args: {
    children: 'No Shadow',
    appearance: 'filled',
    shadow: false,
  },
};

export const InverseWithoutShadow: Story = {
  args: {
    children: 'No Shadow',
    appearance: 'inverse',
    shadow: false,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const DisabledInverse: Story = {
  args: {
    children: 'Disabled Inverse',
    appearance: 'inverse',
    disabled: true,
  },
};

// ==============================
// Appearance 비교 (한눈에 보기)
// ==============================

export const AllAppearances: Story = {
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
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <FilledRoundButton appearance="filled">Filled</FilledRoundButton>
          <FilledRoundButton appearance="inverse">Inverse</FilledRoundButton>
        </div>
      </div>

      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Disabled 상태</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <FilledRoundButton appearance="filled" disabled>
            Filled
          </FilledRoundButton>
          <FilledRoundButton appearance="inverse" disabled>
            Inverse
          </FilledRoundButton>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 appearance 스타일을 한눈에 확인합니다.',
      },
    },
  },
};

// ==============================
// Shadow 비교
// ==============================

export const ShadowComparison: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '20px',
      }}
    >
      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
          Filled - Shadow On / Off
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <FilledRoundButton appearance="filled" shadow={true}>
            Shadow On
          </FilledRoundButton>
          <FilledRoundButton appearance="filled" shadow={false}>
            Shadow Off
          </FilledRoundButton>
        </div>
      </div>

      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
          Inverse - Shadow On / Off
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <FilledRoundButton appearance="inverse" shadow={true}>
            Shadow On
          </FilledRoundButton>
          <FilledRoundButton appearance="inverse" shadow={false}>
            Shadow Off
          </FilledRoundButton>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'shadow prop에 따른 그림자 효과를 비교합니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - CTA 버튼
// ==============================

export const CTAExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '40px',
        maxWidth: '600px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
      }}
    >
      <div>
        <h2 style={{ margin: '0 0 12px 0', fontSize: '24px', fontWeight: '700' }}>
          프로젝트가 완성되었습니다!
        </h2>
        <p style={{ margin: '0 0 24px 0', fontSize: '16px', color: '#64748b' }}>
          작업한 내용을 확인하고 팀원들과 공유하세요.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <FilledRoundButton appearance="filled" onClick={() => alert('프로젝트 확인하기')}>
          프로젝트 확인하기
        </FilledRoundButton>
        <FilledRoundButton appearance="inverse" onClick={() => alert('나중에 하기')}>
          나중에 하기
        </FilledRoundButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CTA(Call-to-Action) 버튼으로 사용하는 예시입니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 완료 확인
// ==============================

export const ConfirmationExample: Story = {
  render: () => (
    <div
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
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            margin: '0 auto 16px',
            backgroundColor: '#eef3ff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
          }}
        >
          ✓
        </div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
          작업이 완료되었습니다
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>변경사항이 저장되었습니다.</p>
      </div>

      <FilledRoundButton
        appearance="filled"
        style={{ width: '100%' }}
        onClick={() => alert('확인')}
      >
        확인
      </FilledRoundButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '완료 확인 다이얼로그에서 사용하는 예시입니다.',
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
          정말 삭제하시겠습니까?
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
          이 작업은 되돌릴 수 없습니다. 삭제된 데이터는 복구할 수 없습니다.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
        }}
      >
        <FilledRoundButton appearance="inverse" onClick={() => alert('취소')}>
          취소
        </FilledRoundButton>
        <FilledRoundButton appearance="filled" onClick={() => alert('삭제 완료')}>
          삭제하기
        </FilledRoundButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모달 다이얼로그의 액션 버튼으로 사용하는 예시입니다.',
      },
    },
  },
};

// ==============================
// 실제 사용 예시 - 다단계 플로우
// ==============================

export const MultiStepFlowExample: Story = {
  render: () => {
    const steps = ['기본 정보', '상세 설정', '완료'];
    const currentStep = 1;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          padding: '40px',
          maxWidth: '600px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
        }}
      >
        {/* 진행 단계 표시 */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {steps.map((step, index) => (
            <div
              key={step}
              style={{
                flex: 1,
                height: '4px',
                backgroundColor: index <= currentStep ? '#5189fa' : '#e2e8f0',
                borderRadius: '2px',
              }}
            />
          ))}
        </div>

        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
            {steps[currentStep]}
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
            {currentStep + 1} / {steps.length}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'space-between',
          }}
        >
          <FilledRoundButton
            appearance="inverse"
            onClick={() => alert('이전')}
            disabled={currentStep <= 0}
          >
            이전
          </FilledRoundButton>
          <FilledRoundButton appearance="filled" onClick={() => alert('다음')}>
            {currentStep === steps.length - 1 ? '완료' : '다음'}
          </FilledRoundButton>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '다단계 플로우에서 네비게이션 버튼으로 사용하는 예시입니다.',
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
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <FilledRoundButton appearance="filled">Hover me</FilledRoundButton>
        <FilledRoundButton appearance="inverse">Click me</FilledRoundButton>
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
        <li>Filled Hover: 더 진한 파란색</li>
        <li>Inverse Hover: 테두리와 텍스트 색상 변경</li>
        <li>Active: 배경/테두리 pressed 색상</li>
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
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <FilledRoundButton onClick={() => alert('버튼 1')}>Tab me</FilledRoundButton>
        <FilledRoundButton appearance="inverse" onClick={() => alert('버튼 2')}>
          Then me
        </FilledRoundButton>
        <FilledRoundButton disabled onClick={() => alert('실행 안됨')}>
          Skip me
        </FilledRoundButton>
        <FilledRoundButton onClick={() => alert('버튼 3')}>And me</FilledRoundButton>
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
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <FilledRoundButton>Sample Button</FilledRoundButton>
        <div style={{ fontSize: '13px', color: '#64748b' }}>높이: 40px (고정)</div>
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#94a3b8',
          lineHeight: '1.6',
        }}
      >
        • height: 40px
        <br />
        • border-radius: 40px (완전한 라운드)
        <br />
        • padding: 14px 20px 14px 16px
        <br />
        • font-size: 16px
        <br />
        • font-weight: 600
        <br />
        • 체크 아이콘: 16px × 16px
        <br />• width: 콘텐츠에 맞춰 자동 조정
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
