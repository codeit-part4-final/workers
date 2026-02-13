import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import Modal from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Modal은 사용자의 주의와 선택이 필요한 내용을 화면 위에 집중시켜 보여주는 컴포넌트입니다.

### 언제 사용하나요
- 삭제/로그아웃 같은 파괴적 액션을 확인할 때
- 짧지만 진행을 멈추는 입력이 필요할 때
- 반드시 확인해야 하는 중요 정보를 표시할 때

### 기본 사용 예시
\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  ariaLabel="삭제 확인"
>
  <h2>이 항목을 삭제할까요?</h2>
</Modal>
\`\`\`

### Props
| Prop | 필수 | 설명 |
| --- | --- | --- |
| \`isOpen\` | 예 | 모달 렌더링 여부를 제어합니다. |
| \`onClose\` | 예 | 모달이 닫혀야 할 때 호출됩니다. |
| \`ariaLabel\` 또는 \`ariaLabelledby\` | 예 | 접근성 다이얼로그 이름입니다(둘 중 하나 필수). |
| \`children\` | 아니요 | 모달 내부 콘텐츠입니다. |
| \`ariaDescribedby\` | 아니요 | 설명 텍스트 요소의 id를 연결합니다. |
| \`closeOnOverlayClick\` | 아니요 | 배경 클릭 시 닫기. 기본값: \`true\` |
| \`closeOnEscape\` | 아니요 | Escape 입력 시 닫기. 기본값: \`true\` |
| \`className\`, \`contentClassName\` | 아니요 | 스타일 확장용 클래스입니다. |

### 동작 메모
- \`isOpen\`은 부모 상태에서 관리하세요.
- 모달 내부에 명확한 닫기 액션 버튼을 제공하세요.
- 모달이 열려 있는 동안 포커스가 모달 내부에 유지됩니다.

### 자주 쓰는 패턴
- 확인 모달: 제목 + 설명 + 확인/취소 버튼
- 강제 선택 모달: overlay/Escape 닫기 비활성 + 명시적 버튼 선택
        `,
      },
    },
  },
  args: {
    isOpen: false,
    ariaLabel: '예시 다이얼로그',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    onClose: fn(),
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 표시 여부를 제어합니다.',
      table: { category: 'Required' },
    },
    onClose: {
      action: 'closed',
      description: '모달이 닫힘을 요청할 때 호출됩니다.',
      table: { category: 'Required' },
    },
    ariaLabel: {
      control: 'text',
      description: '접근성 라벨입니다(`ariaLabelledby`와 둘 중 하나 사용).',
      table: { category: 'Required (one of)' },
    },
    ariaLabelledby: {
      control: 'text',
      description: '다이얼로그 라벨로 사용할 제목 요소의 ID입니다.',
      table: { category: 'Required (one of)' },
    },
    children: {
      control: false,
      table: { category: 'Optional' },
    },
    ariaDescribedby: {
      control: 'text',
      description: '모달 내부 설명 텍스트 요소의 ID입니다.',
      table: { category: 'Optional' },
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: '배경 클릭 시 모달을 닫을지 여부입니다.',
      table: {
        category: 'Optional',
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Escape 키로 모달을 닫을지 여부입니다.',
      table: {
        category: 'Optional',
        defaultValue: { summary: 'true' },
      },
    },
    className: {
      control: false,
      table: { category: 'Styling' },
    },
    contentClassName: {
      control: false,
      table: { category: 'Styling' },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const triggerButtonStyle = {
  border: '1px solid #d1d5db',
  borderRadius: '10px',
  background: '#ffffff',
  color: '#111827',
  padding: '10px 14px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
};

const primaryButtonStyle = {
  border: 0,
  borderRadius: '10px',
  background: '#2563eb',
  color: '#ffffff',
  padding: '10px 14px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
};

const secondaryButtonStyle = {
  border: '1px solid #d1d5db',
  borderRadius: '10px',
  background: '#ffffff',
  color: '#111827',
  padding: '10px 14px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
};

export const Playground: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {
      setIsOpen(false);
      args.onClose?.();
    };

    return (
      <div style={{ minHeight: '300px', padding: '24px' }}>
        <button type="button" style={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          모달 열기
        </button>

        <Modal {...args} isOpen={isOpen} onClose={handleClose}>
          <div style={{ width: '360px', padding: '24px' }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>할 일을 삭제할까요?</h2>
            <p style={{ margin: '8px 0 0', color: '#6b7280', lineHeight: 1.5 }}>
              이 작업은 되돌릴 수 없습니다.
            </p>
            <div
              style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}
            >
              <button type="button" style={secondaryButtonStyle} onClick={handleClose}>
                취소
              </button>
              <button type="button" style={primaryButtonStyle} onClick={handleClose}>
                삭제
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'overlay/Escape 닫기가 활성화된 기본 확인 모달 예시입니다.',
      },
    },
  },
};

export const NonDismissible: Story = {
  args: {
    closeOnOverlayClick: false,
    closeOnEscape: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {
      setIsOpen(false);
      args.onClose?.();
    };

    return (
      <div style={{ minHeight: '300px', padding: '24px' }}>
        <button type="button" style={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          강제 선택 모달 열기
        </button>

        <Modal {...args} isOpen={isOpen} onClose={handleClose}>
          <div style={{ width: '360px', padding: '24px' }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>필수 단계를 완료하세요</h2>
            <p style={{ margin: '8px 0 0', color: '#6b7280', lineHeight: 1.5 }}>
              계속하려면 버튼으로 명시적인 선택이 필요합니다.
            </p>
            <div
              style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}
            >
              <button type="button" style={secondaryButtonStyle} onClick={handleClose}>
                뒤로
              </button>
              <button type="button" style={primaryButtonStyle} onClick={handleClose}>
                계속
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'overlay 클릭과 Escape 닫기를 모두 비활성화한 강제 선택 패턴입니다.',
      },
    },
  },
};
