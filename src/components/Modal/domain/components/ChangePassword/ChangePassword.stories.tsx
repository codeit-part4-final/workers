import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import ChangePassword from './ChangePassword';

const meta = {
  title: 'Components/Modal/Domain/ChangePassword',
  component: ChangePassword,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
한 줄 요약: 로그인한 사용자가 새 비밀번호를 입력하고 변경 요청을 보내는 모달입니다.

### 언제 사용하는가
- 계정 설정 화면에서 비밀번호 변경 시
- 보안 점검 후 비밀번호 재설정을 유도할 때

### 기본 사용 예시 코드
\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<ChangePassword
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={handleChangePassword}
/>
\`\`\`

### Props 설명
| 구분 | 이름 | 설명 |
| --- | --- | --- |
| 필수 | \`isOpen\` | 모달 열림/닫힘 상태 |
| 필수 | \`onClose\` | 닫기 처리 콜백 |
| 필수 | \`onSubmit\` | 변경 제출 시 호출되는 콜백 |
| 선택 | \`text\` | 제목/라벨/버튼/placeholder 문구 변경 |
| 선택 | \`input\` | 새 비밀번호/확인 입력창 props 확장 |
| 선택 | \`closeOptions\` | 오버레이 클릭/Escape 닫기 허용 여부 |

### 사용 시 주의사항
- \`onSubmit\`은 입력값을 직접 넘겨주지 않습니다. 값 검증/전송은 \`input\` 제어와 함께 상위에서 구성하세요.
        `,
      },
    },
  },
  args: {
    isOpen: false,
    onClose: fn(),
    onSubmit: fn(),
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
    onSubmit: {
      action: 'submitted',
      description: '변경 제출 시 호출됩니다.',
      table: { category: '필수' },
    },
    text: {
      control: 'object',
      description: '제목/라벨/버튼 문구를 커스터마이징합니다.',
      table: { category: '선택' },
    },
    input: {
      control: 'object',
      description: '비밀번호 입력창 props를 확장합니다.',
      table: { category: '선택' },
    },
    closeOptions: {
      control: 'object',
      description: 'overlayClick, escape 닫힘 동작을 제어합니다.',
      table: { category: '선택' },
    },
  },
} satisfies Meta<typeof ChangePassword>;

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

    const handleSubmit = () => {
      args.onSubmit?.();
      setIsOpen(false);
    };

    return (
      <div style={{ minHeight: '280px', padding: '24px' }}>
        <button type="button" style={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          비밀번호 변경 모달 열기
        </button>

        <ChangePassword {...args} isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '버튼으로 모달을 열어 닫기/변경 제출 흐름을 확인하는 기본 예시입니다.',
      },
    },
  },
};

export const CloseLocked: Story = {
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
        story: '실수로 닫히면 안 되는 상황에서 overlay/Escape 닫기를 막는 패턴입니다.',
      },
    },
  },
};
