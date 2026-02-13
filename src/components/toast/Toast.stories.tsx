import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import Toast from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Toast는 사용자 액션에 대한 짧고 비차단성 피드백을 보여주는 컴포넌트입니다.

### 언제 사용하나요
- 저장/수정 완료 또는 경고 메시지를 잠깐 보여줄 때
- 되돌리기, 재시도 같은 후속 액션을 안내할 때
- 일정 시간 후 자동으로 사라지는 상태 알림이 필요할 때

### 기본 사용 예시
\`\`\`tsx
const [open, setOpen] = useState(false);

<Toast
  isOpen={open}
  message="저장되지 않은 변경사항이 있어요."
  actionLabel="지금 저장"
  onAction={handleSave}
  onDismiss={() => setOpen(false)}
/>
\`\`\`

### Props
| Prop | 필수 | 설명 |
| --- | --- | --- |
| *(없음)* | 아니요 | 모든 prop이 선택 사항입니다. |
| \`message\` | 아니요 | 메인 메시지 텍스트입니다. |
| \`actionLabel\` | 아니요 | 액션 버튼 텍스트입니다. 비우면 버튼이 숨겨집니다. |
| \`isOpen\` | 아니요 | 표시 여부를 제어합니다. 기본값: \`true\` |
| \`autoDismissMs\` | 아니요 | 자동 닫힘 시간(ms). 기본값: \`3000\`, \`0\`이면 자동 닫힘 없음 |
| \`enterDurationMs\`, \`exitDurationMs\` | 아니요 | 애니메이션 시간(ms). 기본값: \`600\` |
| \`onAction\` | 아니요 | 액션 버튼 클릭 시 호출됩니다. |
| \`onDismiss\` | 아니요 | 닫힘 애니메이션이 끝난 뒤 호출됩니다. |

### 동작 메모
- Toast 열림/닫힘 상태는 부모에서 관리하고, \`onDismiss\`에서 상태를 정리하세요.
- Toast 메시지는 짧고 명확하게 유지하세요.

### 자주 쓰는 패턴
- 자동 닫힘 알림
- 단일 액션 버튼이 있는 Toast(재시도/되돌리기/저장)
        `,
      },
    },
  },
  args: {
    message: '저장되지 않은 변경사항이 있어요.',
    actionLabel: '지금 저장',
    isOpen: true,
    autoDismissMs: 3000,
    enterDurationMs: 600,
    exitDurationMs: 600,
    onAction: fn(),
    onDismiss: fn(),
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Toast 메시지 텍스트입니다.',
      table: { category: 'Optional' },
    },
    actionLabel: {
      control: 'text',
      description: '액션 버튼 라벨입니다. 비우면 버튼이 숨겨집니다.',
      table: { category: 'Optional' },
    },
    isOpen: {
      control: 'boolean',
      description: 'Toast 표시 여부를 제어합니다.',
      table: {
        category: 'Optional',
        defaultValue: { summary: 'true' },
      },
    },
    autoDismissMs: {
      control: { type: 'number', min: 0, step: 100 },
      description: '자동 닫힘 시간(ms)입니다. 0이면 닫히지 않습니다.',
      table: {
        category: 'Optional',
        defaultValue: { summary: '3000' },
      },
    },
    enterDurationMs: {
      control: { type: 'number', min: 0, step: 100 },
      description: '진입 애니메이션 시간(ms)입니다.',
      table: {
        category: 'Optional',
        defaultValue: { summary: '600' },
      },
    },
    exitDurationMs: {
      control: { type: 'number', min: 0, step: 100 },
      description: '종료 애니메이션 시간(ms)입니다.',
      table: {
        category: 'Optional',
        defaultValue: { summary: '600' },
      },
    },
    onAction: {
      action: 'action-clicked',
      description: '액션 버튼 클릭 시 호출됩니다.',
      table: { category: 'Optional' },
    },
    onDismiss: {
      action: 'dismissed',
      description: '닫힘 애니메이션 완료 후 호출됩니다.',
      table: { category: 'Optional' },
    },
    className: {
      control: false,
      table: { category: 'Styling' },
    },
    actionClassName: {
      control: false,
      table: { category: 'Styling' },
    },
  },
} satisfies Meta<typeof Toast>;

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
  args: {
    autoDismissMs: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '`autoDismissMs`를 `0`으로 둔 고정 미리보기 예시입니다.',
      },
    },
  },
};

export const AutoDismiss: Story = {
  args: {
    isOpen: false,
    autoDismissMs: 2000,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleAction = () => {
      args.onAction?.();
      setIsOpen(false);
    };

    const handleDismiss = () => {
      args.onDismiss?.();
      setIsOpen(false);
    };

    return (
      <div style={{ minHeight: '200px', padding: '24px' }}>
        <button
          type="button"
          style={triggerButtonStyle}
          onClick={() => setIsOpen(true)}
          disabled={isOpen}
        >
          토스트 표시
        </button>
        <Toast {...args} isOpen={isOpen} onAction={handleAction} onDismiss={handleDismiss} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '버튼 클릭으로 Toast를 띄우고 2초 뒤 자동으로 닫히는 예시입니다.',
      },
    },
  },
};

export const WithoutAction: Story = {
  args: {
    actionLabel: undefined,
    autoDismissMs: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '액션 버튼 없이 메시지만 보여주는 상태 알림 예시입니다.',
      },
    },
  },
};
