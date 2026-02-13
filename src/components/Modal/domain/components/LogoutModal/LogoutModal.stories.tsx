import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import LogoutModal from './LogoutModal';

const meta = {
  title: 'Components/Modal/Domain/LogoutModal',
  component: LogoutModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
한 줄 요약: 로그아웃 실행 전 한 번 더 확인하는 도메인 확인 모달입니다.

### 언제 사용하는가
- 사용자 메뉴에서 로그아웃을 누른 직후
- 진행 중 작업 유실 가능성이 있어 재확인이 필요할 때

### 기본 사용 예시 코드
\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<LogoutModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleLogout}
/>
\`\`\`

### Props 설명
| 구분 | 이름 | 설명 |
| --- | --- | --- |
| 필수 | \`isOpen\` | 모달 열림/닫힘 상태 |
| 필수 | \`onClose\` | 닫기 처리 콜백 |
| 필수 | \`onConfirm\` | 로그아웃 확정 시 호출 |
| 선택 | \`text\` | 제목/버튼 문구 커스터마이징 |
| 선택 | \`closeOptions\` | 오버레이 클릭/Escape 닫기 허용 여부 |

### 사용 시 주의사항
- 중요한 작업 중 로그아웃을 막고 싶다면 \`closeOptions\`로 실수 닫힘을 제한하세요.
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
      description: '로그아웃 확정 시 호출됩니다.',
      table: { category: '필수' },
    },
    text: {
      control: 'object',
      description: '제목/버튼 문구를 변경합니다.',
      table: { category: '선택' },
    },
    closeOptions: {
      control: 'object',
      description: 'overlayClick, escape 닫힘 동작을 제어합니다.',
      table: { category: '선택' },
    },
  },
} satisfies Meta<typeof LogoutModal>;

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
      <div style={{ minHeight: '260px', padding: '24px' }}>
        <button type="button" style={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          로그아웃 모달 열기
        </button>

        <LogoutModal {...args} isOpen={isOpen} onClose={handleClose} onConfirm={handleConfirm} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '기본 로그아웃 확인 플로우를 확인하는 예시입니다.',
      },
    },
  },
};
