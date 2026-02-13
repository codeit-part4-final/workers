import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import AddTodoList from './AddTodoList';

const meta = {
  title: 'Components/Modal/Domain/AddTodoList',
  component: AddTodoList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
한 줄 요약: 할 일 목록을 새로 만들 때 사용하는 입력 모달입니다.

### 언제 사용하는가
- 보드/섹션에 새 할 일 목록을 추가할 때
- 목록 생성 전 제목 입력이 필요한 흐름에서 사용합니다

### 기본 사용 예시 코드
\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<AddTodoList
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={handleCreateTodoList}
/>
\`\`\`

### Props 설명
| 구분 | 이름 | 설명 |
| --- | --- | --- |
| 필수 | \`isOpen\` | 모달 열림/닫힘 상태 |
| 필수 | \`onClose\` | 닫기 버튼/오버레이/Escape로 닫힐 때 호출 |
| 필수 | \`onSubmit\` | 생성 버튼 제출 시 호출 |
| 선택 | \`text\` | 제목/버튼/placeholder 문구 커스터마이징 |
| 선택 | \`input\` | 입력창 속성(input props) 확장 |
| 선택 | \`closeOptions\` | 오버레이 클릭/Escape 닫기 허용 여부 |

### 사용 시 주의사항
- \`onSubmit\`은 입력값을 인자로 전달하지 않습니다. 값 제어가 필요하면 \`input.props\`로 별도 상태를 연결하세요.
        `,
      },
    },
  },
  args: {
    isOpen: false,
    onClose: fn(),
    onSubmit: fn(),
    text: {
      title: '할 일 목록',
      submitLabel: '만들기',
      inputPlaceholder: '할 일을 입력하세요',
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
    onSubmit: {
      action: 'submitted',
      description: '생성 버튼 제출 시 호출됩니다.',
      table: { category: '필수' },
    },
    text: {
      control: 'object',
      description: '제목/버튼/placeholder 문구를 변경합니다.',
      table: { category: '선택' },
    },
    input: {
      control: 'object',
      description: '입력창 속성(input props)을 확장합니다.',
      table: { category: '선택' },
    },
    closeOptions: {
      control: 'object',
      description: 'overlayClick, escape 닫힘 동작을 제어합니다.',
      table: { category: '선택' },
    },
  },
} satisfies Meta<typeof AddTodoList>;

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
          할 일 목록 모달 열기
        </button>

        <AddTodoList {...args} isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '버튼 클릭으로 모달을 열고, 제출/닫기 동작을 확인하는 기본 예시입니다.',
      },
    },
  },
};
