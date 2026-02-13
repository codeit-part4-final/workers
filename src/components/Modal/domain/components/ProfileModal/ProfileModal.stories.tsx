import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import ProfileModal from './ProfileModal';

const meta = {
  title: 'Components/Modal/Domain/ProfileModal',
  component: ProfileModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
한 줄 요약: 사용자 프로필 정보(이름/이메일)를 보여주고 이메일 복사 액션을 제공하는 모달입니다.

### 언제 사용하는가
- 멤버 카드/아바타 클릭 후 상세 프로필을 확인할 때
- 이메일 기반 초대/연락을 위해 즉시 복사 기능이 필요할 때

### 기본 사용 예시 코드
\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<ProfileModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onCopyEmail={handleCopyEmail}
  profile={{
    title: '이준서',
    email: 'jieunsse@example.com',
  }}
/>
\`\`\`

### Props 설명
| 구분 | 이름 | 설명 |
| --- | --- | --- |
| 필수 | \`isOpen\` | 모달 열림/닫힘 상태 |
| 필수 | \`onClose\` | 닫기 처리 콜백 |
| 필수 | \`onCopyEmail\` | 이메일 복사 버튼 클릭 시 호출 |
| 필수 | \`profile.title\` | 프로필 이름/타이틀 |
| 필수 | \`profile.email\` | 표시할 이메일 |
| 선택 | \`profile.imageSrc\` | 프로필 이미지 소스 |
| 선택 | \`profile.imageAlt\` | 프로필 이미지 대체 텍스트 |
| 선택 | \`profile.copyButtonLabel\` | 복사 버튼 라벨 변경 |
| 선택 | \`closeOptions\` | 오버레이 클릭/Escape 닫기 허용 여부 |

### 사용 시 주의사항
- 이메일 복사 성공/실패 안내는 \`onCopyEmail\`에서 처리하세요.
        `,
      },
    },
  },
  args: {
    isOpen: false,
    onClose: fn(),
    onCopyEmail: fn(),
    profile: {
      title: '이준서',
      email: 'jieunsse@example.com',
      copyButtonLabel: '이메일 복사하기',
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
    onCopyEmail: {
      action: 'email-copied',
      description: '이메일 복사 버튼 클릭 시 호출됩니다.',
      table: { category: '필수' },
    },
    profile: {
      control: 'object',
      description: '프로필 표시 정보(title, email, image 등)를 전달합니다.',
      table: { category: '필수/선택 혼합' },
    },
    closeOptions: {
      control: 'object',
      description: 'overlayClick, escape 닫힘 동작을 제어합니다.',
      table: { category: '선택' },
    },
  },
} satisfies Meta<typeof ProfileModal>;

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
      <div style={{ minHeight: '280px', padding: '24px' }}>
        <button type="button" style={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          프로필 모달 열기
        </button>

        <ProfileModal {...args} isOpen={isOpen} onClose={handleClose} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '프로필 표시와 이메일 복사 액션을 확인하는 기본 예시입니다.',
      },
    },
  },
};
