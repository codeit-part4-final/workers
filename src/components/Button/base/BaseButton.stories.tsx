import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BaseButton from '@/components/Button/base/BaseButton';

/**
 * BaseButton 컴포넌트
 *
 * Coworkers 프로젝트의 기본 버튼 컴포넌트입니다.
 *
 * ## 설계 철학
 *
 * BaseButton은 모든 버튼의 기초가 되는 컴포넌트로, 합성(Composition) 패턴을 사용합니다.
 * 상속이 아닌 ButtonBehavior.module.css를 합성하여 일관된 동작을 보장합니다.
 *
 *
 * ### Props
 * - variant: 'primary' | 'outline' | 'danger' (기본값: 'primary')
 * - size: 'default' | 'small' (기본값: 'default', 48px / 33px)
 * - disabled: boolean (기본값: false)
 * - type: 'button' | 'submit' | 'reset' (기본값: 'button')
 *
 * ## 용도
 *
 * ### ✅ 사용해야 할 때
 * - 범용적인 확인/취소/저장 버튼
 * - 특별한 기능 없이 단순 클릭만 필요할 때
 * - 빠른 프로토타이핑
 *
 * ### ❌ 사용하지 말아야 할 때
 * - 특정 도메인 기능 (편집, 좋아요, 추가 등)
 * - 이런 경우 도메인 버튼을 사용하거나 새로 만드세요
 *
 * ## 컴포넌트 목록
 *
 * ### 도메인 버튼들
 *
 * **ArrowButton** - 좌/우 방향 전환 (캐러셀, 달력)
 *
 * **DatePickerButton** - 요일 선택 (반복 일정)
 *
 * **EditButton** - 이미지 편집 (프로필, 썸네일)
 *
 * **EnterButton** - 댓글/메시지 전송
 *
 * **FilledRoundButton** - CTA 버튼 (모달, 완료)
 *
 * **FloatingButton** - 주요 액션 (우측 하단 고정)
 *
 * **FloatingLikeButton** - 좋아요 토글
 *
 * **GnbAddButton** - GNB에서 팀/프로젝트 추가
 *
 * **OutlineIconTextButton** - 완료/확인 액션
 *
 * **ProgressButton** - 칸반 보드 항목 추가
 *
 * ## 확장 방법
 *
 * ### 1. className으로 확장 (간단)
 * ```tsx
 * <BaseButton className={styles.custom}>커스텀</BaseButton>
 * ```
 *
 * ### 2. Wrapper 컴포넌트 (권장)
 * ```tsx
 * export function DeleteButton(props) {
 *   return <BaseButton variant="danger" {...props}>삭제</BaseButton>;
 * }
 * ```
 *
 * ### 3. ButtonBehavior만 재사용 (완전히 다른 스타일)
 * ```tsx
 * import behavior from '@/components/Button/shared/ButtonBehavior.module.css';
 *
 * export function CustomButton({ children }) {
 *   return <button className={behavior.buttonBase}>{children}</button>;
 * }
 * ```
 *
 * ## 자주 묻는 질문
 *
 * **Q1. BaseButton vs 도메인 버튼, 언제 뭘 써야 하나요?**
 * A. 용도가 명확하면 도메인 버튼, 범용이면 BaseButton을 사용하세요.
 *
 * **Q2. Form 안에서 버튼이 자동으로 submit 되는데요?**
 * A. 기본 type이 'button'이므로 submit 안됩니다. submit 원하면 type='submit' 사용하세요.
 *
 * **Q3. 버튼이 클릭되지 않아요!**
 * A. disabled prop 확인하세요. onClick에 함수() 말고 함수만 전달하세요.
 *
 * **Q4. 새로운 버튼을 만들어야 하나요?**
 * A. 프로젝트 전체에서 3번 이상 사용되고 명확한 용도가 있으면 만드세요.
 *
 * **Q5. 모바일에서 버튼 크기를 조정하려면?**
 * A. size='small' prop을 사용하거나 CSS media query를 사용하세요.
 *
 * ## CSS 구조
 *
 * - ButtonBehavior.module.css (공통 레이어): focus, transition, cursor
 * - BaseButton.module.css (개별 스타일): variant, size
 *
 * ## 디자인 토큰
 *
 * - --color-brand-primary: Primary 배경색
 * - --color-interaction-hover: Hover 상태
 * - --color-interaction-pressed: Active 상태
 * - --color-interaction-inactive: Disabled 상태
 *
 * ## 접근성
 *
 * - 키보드 네비게이션 (Tab, Enter, Space) 지원
 * - Focus-visible 스타일 제공
 * - Disabled 상태에서 포커스 차단
 * - 기본 type="button"으로 의도치 않은 form submit 방지
 */
const meta: Meta<typeof BaseButton> = {
  title: 'Components/Button/BaseButton',
  component: BaseButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'danger'],
      description: '버튼의 스타일 변형',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'small'],
      description: '버튼의 크기 (default: 48px, small: 33px)',
      table: {
        defaultValue: { summary: 'default' },
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
      description: '버튼 내부 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

// ==============================
// 기본 스토리
// ==============================

export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger',
    variant: 'danger',
  },
};

// ==============================
// Size 변형
// ==============================

export const SmallPrimary: Story = {
  args: {
    children: 'Small Primary',
    size: 'small',
    variant: 'primary',
  },
};

export const SmallOutline: Story = {
  args: {
    children: 'Small Outline',
    size: 'small',
    variant: 'outline',
  },
};

export const SmallDanger: Story = {
  args: {
    children: 'Small Danger',
    size: 'small',
    variant: 'danger',
  },
};

// ==============================
// Disabled 상태
// ==============================

export const DisabledPrimary: Story = {
  args: {
    children: 'Disabled Primary',
    disabled: true,
  },
};

export const DisabledOutline: Story = {
  args: {
    children: 'Disabled Outline',
    variant: 'outline',
    disabled: true,
  },
};

export const DisabledDanger: Story = {
  args: {
    children: 'Disabled Danger',
    variant: 'danger',
    disabled: true,
  },
};

// ==============================
// Variant × Size 조합 (한눈에 보기)
// ==============================

export const AllVariantsDefault: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ width: '332px' }}>
        <BaseButton>Primary</BaseButton>
      </div>
      <div style={{ width: '332px' }}>
        <BaseButton variant="outline">Outline</BaseButton>
      </div>
      <div style={{ width: '332px' }}>
        <BaseButton variant="danger">Danger</BaseButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'default 사이즈(48px)의 모든 variant를 한눈에 확인',
      },
    },
  },
};

export const AllVariantsSmall: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ width: '332px' }}>
        <BaseButton size="small">Primary</BaseButton>
      </div>
      <div style={{ width: '332px' }}>
        <BaseButton size="small" variant="outline">
          Outline
        </BaseButton>
      </div>
      <div style={{ width: '332px' }}>
        <BaseButton size="small" variant="danger">
          Danger
        </BaseButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'small 사이즈(33px)의 모든 variant를 한눈에 확인',
      },
    },
  },
};

export const AllVariantsDisabled: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>default (48px)</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '332px' }}>
            <BaseButton disabled>Primary</BaseButton>
          </div>
          <div style={{ width: '332px' }}>
            <BaseButton variant="outline" disabled>
              Outline
            </BaseButton>
          </div>
          <div style={{ width: '332px' }}>
            <BaseButton variant="danger" disabled>
              Danger
            </BaseButton>
          </div>
        </div>
      </div>

      <div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>small (33px)</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '332px' }}>
            <BaseButton size="small" disabled>
              Primary
            </BaseButton>
          </div>
          <div style={{ width: '332px' }}>
            <BaseButton size="small" variant="outline" disabled>
              Outline
            </BaseButton>
          </div>
          <div style={{ width: '332px' }}>
            <BaseButton size="small" variant="danger">
              Danger
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'disabled 상태의 모든 조합을 확인',
      },
    },
  },
};

// ==============================
// Width 테스트 (부모 컨테이너 너비에 따라 변동)
// ==============================

export const WidthResponsiveDefault: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ width: '200px' }}>
        <BaseButton>200px</BaseButton>
      </div>
      <div style={{ width: '280px' }}>
        <BaseButton>280px</BaseButton>
      </div>
      <div style={{ width: '400px' }}>
        <BaseButton>400px</BaseButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'BaseButton은 width: 100%로 설정되어 부모 컨테이너의 너비를 따릅니다.',
      },
    },
  },
};

export const WidthResponsiveSmall: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ width: '160px' }}>
        <BaseButton size="small">160px</BaseButton>
      </div>
      <div style={{ width: '240px' }}>
        <BaseButton size="small">240px</BaseButton>
      </div>
      <div style={{ width: '360px' }}>
        <BaseButton size="small">360px</BaseButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'small 사이즈에서도 동일하게 부모 너비를 따릅니다.',
      },
    },
  },
};

export const WidthResponsiveOutline: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ width: '180px' }}>
        <BaseButton variant="outline">180px</BaseButton>
      </div>
      <div style={{ width: '300px' }}>
        <BaseButton variant="outline">300px</BaseButton>
      </div>
      <div style={{ width: '420px' }}>
        <BaseButton variant="outline">420px</BaseButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'outline variant도 동일한 반응형 너비 동작을 합니다.',
      },
    },
  },
};

// ==============================
// Focus 테스트 (키보드 탭 이동)
// ==============================

export const FocusTest: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ width: '200px' }}>
        <BaseButton>Tab me</BaseButton>
      </div>
      <div style={{ width: '200px' }}>
        <BaseButton variant="outline">Then me</BaseButton>
      </div>
      <div style={{ width: '200px' }}>
        <BaseButton variant="danger" disabled>
          Skip me
        </BaseButton>
      </div>
      <div style={{ width: '200px' }}>
        <BaseButton variant="danger">And me</BaseButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tab 키로 버튼 간 이동을 테스트합니다. disabled 버튼은 focus를 받지 않습니다.',
      },
    },
  },
};

// ==============================
// Form Submit 동작 테스트
// ==============================

export const FormSubmitBehavior: Story = {
  render: () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      alert('Form submitted');
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '520px',
        }}
      >
        <input
          placeholder="input"
          style={{
            height: '40px',
            padding: '0 12px',
            borderRadius: '8px',
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            color: '#f8fafc',
            fontSize: '14px',
          }}
        />
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ width: '200px' }}>
            <BaseButton>Default (no submit)</BaseButton>
          </div>
          <div style={{ width: '200px' }}>
            <BaseButton type="submit">Submit</BaseButton>
          </div>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `type="button"(기본값)은 submit하지 않고, type="submit"만 form을 submit합니다.`,
      },
    },
  },
};
