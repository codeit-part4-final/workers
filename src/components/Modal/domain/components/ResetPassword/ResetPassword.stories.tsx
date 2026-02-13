import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import ResetPassword from './ResetPassword';

const meta = {
  title: 'Components/Modal/Domain/ResetPassword',
  component: ResetPassword,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
한 줄 요약: 계정 비밀번호 재설정 링크를 전송할 때 사용하는 이메일 입력 모달입니다.

### 언제 사용하는가
- 로그인 화면에서 비밀번호 찾기를 선택했을 때
- 계정 복구 흐름에서 재설정 링크 전송이 필요할 때

### 기본 사용 예시 코드
\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<ResetPassword
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={handleSendResetLink}
/>
\`\`\`

### Props 설명
| 구분 | 이름 | 설명 |
| --- | --- | --- |
| 필수 | \`isOpen\` | 모달 열림/닫힘 상태 |
| 필수 | \`onClose\` | 닫기 처리 콜백 |
| 필수 | \`onSubmit\` | 링크 전송 제출 시 호출 |
| 선택 | \`text\` | 제목/설명/버튼/placeholder 문구 변경 |
| 선택 | \`input\` | 이메일 입력창 props 확장 |
| 선택 | \`closeOptions\` | 오버레이 클릭/Escape 닫기 허용 여부 |

### 사용 시 주의사항
- \`onSubmit\`은 이메일 값을 직접 전달하지 않습니다. 입력값 검증/전송은 \`input\` 제어와 함께 상위에서 처리하세요.
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
      description: '링크 전송 제출 시 호출됩니다.',
      table: { category: '필수' },
    },
    text: {
      control: 'object',
      description: '제목/설명/버튼 문구를 변경합니다.',
      table: { category: '선택' },
    },
    input: {
      control: 'object',
      description: '이메일 입력창 props를 확장합니다.',
      table: { category: '선택' },
    },
    closeOptions: {
      control: 'object',
      description: 'overlayClick, escape 닫힘 동작을 제어합니다.',
      table: { category: '선택' },
    },
  },
} satisfies Meta<typeof ResetPassword>;

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
          비밀번호 재설정 모달 열기
        </button>

        <ResetPassword {...args} isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '이메일 입력 후 링크 전송 동작을 확인하는 기본 예시입니다.',
      },
    },
  },
};
