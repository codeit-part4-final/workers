import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import WarningModal from './WarningModal';

const meta = {
  title: 'Components/Modal/Domain/WarningModal',
  component: WarningModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
한 줄 요약: 탈퇴/삭제처럼 되돌리기 어려운 작업 전 경고와 최종 확인을 제공하는 모달입니다.

### 언제 사용하는가
- 회원 탈퇴, 리소스 삭제 등 파괴적 액션 직전
- 사용자에게 영향 범위를 명확히 알리고 재확인이 필요할 때

### 기본 사용 예시 코드
\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<WarningModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleWithdraw}
/>
\`\`\`

### Props 설명
| 구분 | 이름 | 설명 |
| --- | --- | --- |
| 필수 | \`isOpen\` | 모달 열림/닫힘 상태 |
| 필수 | \`onClose\` | 닫기 처리 콜백 |
| 필수 | \`onConfirm\` | 경고 액션 확정 시 호출 |
| 선택 | \`text\` | 제목/설명/버튼 문구 커스터마이징 |
| 선택 | \`closeOptions\` | 오버레이 클릭/Escape 닫기 허용 여부 |

### 사용 시 주의사항
- 파괴적 액션에서는 \`closeOptions\`로 실수 닫힘(overlay/Escape)을 제한하는 패턴을 권장합니다.
        `,
      },
    },
  },
  args: {
    isOpen: false,
    onClose: fn(),
    onConfirm: fn(),
    closeOptions: {
      overlayClick: true,
      escape: true,
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 표시 여부입니다.',
      table: { category: '필수' },
    },
    onClose: {
      action: 'closed',
      description: '모달 닫힘 요청 시 호출됩니다.',
      table: { category: '필수' },
    },
    onConfirm: {
      action: 'confirmed',
      description: '경고 액션 확정 시 호출됩니다.',
      table: { category: '필수' },
    },
    text: {
      control: 'object',
      description: '제목/설명/버튼 문구를 변경합니다.',
      table: { category: '선택' },
    },
    closeOptions: {
      control: 'object',
      description: 'overlayClick, escape 닫힘 동작을 제어합니다.',
      table: { category: '선택' },
    },
  },
} satisfies Meta<typeof WarningModal>;

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

export const Playground: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
      setIsOpen(false);
      args.onClose?.();
    };

    const handleConfirm = () => {
      args.onConfirm?.();
      setIsOpen(false);
    };

    return (
      <div style={{ minHeight: '280px', padding: '24px' }}>
        <button type="button" style={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          경고 모달 열기
        </button>

        <WarningModal {...args} isOpen={isOpen} onClose={handleClose} onConfirm={handleConfirm} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '위험 액션 전 확인 모달 흐름을 점검하는 기본 예시입니다.',
      },
    },
  },
};

export const StrictClosePolicy: Story = {
  args: {
    closeOptions: {
      overlayClick: false,
      escape: false,
    },
  },
  render: Playground.render,
  parameters: {
    docs: {
      description: {
        story: '실수 닫힘을 막아 명시적 버튼 선택을 강제하는 패턴입니다.',
      },
    },
  },
};
