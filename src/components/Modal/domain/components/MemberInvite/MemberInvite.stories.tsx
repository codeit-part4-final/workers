import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import MemberInvite from './MemberInvite';

const meta = {
  title: 'Components/Modal/Domain/MemberInvite',
  component: MemberInvite,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
한 줄 요약: 팀/그룹 초대 링크를 복사하도록 안내하는 멤버 초대 모달입니다.

### 언제 사용하는가
- 그룹 설정에서 멤버를 초대할 때
- 초대 링크를 생성한 뒤 사용자에게 복사 액션을 제공할 때

### 기본 사용 예시 코드
\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<MemberInvite
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  invite={{
    link: inviteLink,
    onCopyLink: (link) => navigator.clipboard.writeText(link),
  }}
/>
\`\`\`

### Props 설명
| 구분 | 이름 | 설명 |
| --- | --- | --- |
| 필수 | \`isOpen\` | 모달 열림/닫힘 상태 |
| 필수 | \`onClose\` | 닫기 처리 콜백 |
| 필수 | \`invite.link\` | 복사 대상 초대 링크 |
| 필수 | \`invite.onCopyLink\` | 복사 버튼 클릭 시 링크를 전달받는 콜백 |
| 선택 | \`text\` | 제목/설명/복사 버튼 문구 변경 |
| 선택 | \`closeOptions\` | 오버레이 클릭/Escape 닫기 허용 여부 |

### 사용 시 주의사항
- 실제 클립보드 복사 성공/실패 처리(토스트, 에러 안내)는 \`onCopyLink\`에서 함께 처리하세요.
        `,
      },
    },
  },
  args: {
    isOpen: false,
    onClose: fn(),
    invite: {
      link: 'https://coworkers.example/invite/abc123',
      onCopyLink: fn<(link: string) => void>(),
    },
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
    invite: {
      control: 'object',
      description: '초대 링크와 복사 콜백을 전달합니다.',
      table: { category: '필수' },
    },
    text: {
      control: 'object',
      description: '제목/설명/복사 버튼 문구를 변경합니다.',
      table: { category: '선택' },
    },
    closeOptions: {
      control: 'object',
      description: 'overlayClick, escape 닫힘 동작을 제어합니다.',
      table: { category: '선택' },
    },
  },
} satisfies Meta<typeof MemberInvite>;

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

    return (
      <div style={{ minHeight: '260px', padding: '24px' }}>
        <button type="button" style={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          멤버 초대 모달 열기
        </button>

        <MemberInvite {...args} isOpen={isOpen} onClose={handleClose} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '초대 링크 복사 흐름을 확인하는 기본 사용 예시입니다.',
      },
    },
  },
};
