import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import CalenderModal from './CalenderModal';
import type { CalenderModalSubmitPayload } from './types/CalenderModal.types';

const meta = {
  title: 'Components/Modal/Domain/CalenderModal',
  component: CalenderModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
한 줄 요약: 시작 날짜/시간과 반복 조건을 포함해 할 일을 생성하는 일정 기반 모달입니다.

### 언제 사용하는가
- 날짜/시간이 포함된 할 일을 새로 등록할 때
- 반복 일정(매일/주 반복/월 반복)을 설정해야 할 때

### 기본 사용 예시 코드
\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<CalenderModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={(payload) => createTodo(payload)}
/>
\`\`\`

### Props 설명
| 구분 | 이름 | 설명 |
| --- | --- | --- |
| 필수 | \`isOpen\` | 모달 열림/닫힘 상태 |
| 필수 | \`onClose\` | 모달 닫힘 처리 콜백 |
| 필수 | \`onSubmit\` | 생성 시 폼 payload를 전달받는 콜백 |
| 선택 | \`text\` | 라벨/설명/placeholder 문구 커스터마이징 |
| 선택 | \`input\` | 제목/메모 입력창 props 확장 |
| 선택 | \`initialValues\` | 초기 입력값(수정/재진입 시 유용) |
| 선택 | \`closeOptions\` | 오버레이 클릭/Escape 닫기 허용 여부 |

### 사용 시 주의사항
- \`onSubmit\` payload의 \`repeatDays\`는 반복 타입이 주/월 반복일 때만 의미가 있습니다.
        `,
      },
    },
  },
  args: {
    isOpen: false,
    onClose: fn(),
    onSubmit: fn<(payload: CalenderModalSubmitPayload) => void>(),
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
      description: '생성 시 일정 payload를 전달해 호출됩니다.',
      table: { category: '필수' },
    },
    text: {
      control: 'object',
      description: '제목/설명/라벨/placeholder 문구를 변경합니다.',
      table: { category: '선택' },
    },
    input: {
      control: 'object',
      description: '제목/메모 입력창 props를 확장합니다.',
      table: { category: '선택' },
    },
    initialValues: {
      control: 'object',
      description: '폼 초기값을 설정합니다.',
      table: { category: '선택' },
    },
    closeOptions: {
      control: 'object',
      description: 'overlayClick, escape 닫힘 동작을 제어합니다.',
      table: { category: '선택' },
    },
  },
} satisfies Meta<typeof CalenderModal>;

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

    const handleSubmit = (payload: CalenderModalSubmitPayload) => {
      args.onSubmit?.(payload);
      setIsOpen(false);
    };

    return (
      <div style={{ minHeight: '360px', padding: '24px' }}>
        <button type="button" style={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          일정 모달 열기
        </button>

        <CalenderModal {...args} isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '일정/반복 설정 후 생성 콜백 payload를 확인하는 기본 사용 예시입니다.',
      },
    },
  },
};

export const WithInitialValues: Story = {
  args: {
    initialValues: {
      todoTitle: '분기 리뷰 준비',
      startDate: new Date('2026-02-15'),
      startTime: '09:00',
      repeatType: 'weekly',
      repeatDays: ['mon', 'wed'],
      memo: '회의 전에 안건 정리',
    },
  },
  render: Playground.render,
  parameters: {
    docs: {
      description: {
        story: '초기값을 넣어 수정/재작성 흐름처럼 시작하는 패턴입니다.',
      },
    },
  },
};
