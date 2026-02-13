import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import CheckBox from './CheckBox';

const meta = {
  title: 'Components/Checkbox',
  component: CheckBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Checkbox는 단일 불리언 값을 켜고 끄는 선택 컴포넌트입니다.

### 언제 사용하나요
- 약관/정책 동의 체크가 필요할 때
- 설정 화면에서 옵션 on/off를 토글할 때
- 간단한 목록에서 항목 선택/해제를 처리할 때

### 기본 사용 예시
\`\`\`tsx
const [checked, setChecked] = useState(false);

<CheckBox
  checked={checked}
  label="이메일 업데이트 받기"
  onCheckedChange={setChecked}
/>
\`\`\`

### Props
| Prop | 필수 | 설명 |
| --- | --- | --- |
| \`checked\` | 예 | 현재 체크 상태입니다. |
| \`label\` | 예* | 화면에 보이는 라벨입니다. |
| \`options.ariaLabel\` | 예* | \`label\`이 없을 때 필수입니다. |
| \`onCheckedChange\` | 아니요 | 다음 체크 상태를 전달해 호출됩니다. |
| \`size\` | 아니요 | \`large | small\` |
| \`disabled\` | 아니요 | 상호작용을 비활성화합니다. |
| \`options.readOnly\` | 아니요 | 상태 표시는 유지하고 토글만 막습니다. |
| \`id/name/value\` | 아니요 | 폼 연동을 위한 네이티브 input 속성입니다. |

*접근성을 위해 \`label\` 또는 \`options.ariaLabel\` 중 하나는 반드시 제공하세요.

### 동작 메모
- 이 컴포넌트는 제어 컴포넌트이므로 부모 상태로 \`checked\`를 관리하세요.
- \`onCheckedChange\`가 없으면 읽기 전용처럼 동작합니다.

### 자주 쓰는 패턴
- 폼 필드: \`checked\` + \`onCheckedChange\`
- 아이콘 전용 체크박스: \`label\` 생략 + \`options.ariaLabel\` 제공
        `,
      },
    },
  },
  args: {
    checked: false,
    label: '이메일 업데이트 받기',
    size: 'large',
    disabled: false,
    onCheckedChange: fn(),
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: '현재 체크 상태입니다.',
      table: { category: 'Required' },
    },
    label: {
      control: 'text',
      description: '표시할 라벨입니다. 생략 시 `options.ariaLabel`을 사용하세요.',
      table: { category: 'Required*' },
    },
    onCheckedChange: {
      action: 'checked-changed',
      description: '다음 체크값으로 호출됩니다.',
      table: { category: 'Optional' },
    },
    size: {
      control: 'inline-radio',
      options: ['large', 'small'],
      description: '체크박스 크기입니다.',
      table: {
        category: 'Optional',
        defaultValue: { summary: 'large' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '입력을 비활성화합니다.',
      table: {
        category: 'Optional',
        defaultValue: { summary: 'false' },
      },
    },
    id: {
      control: 'text',
      table: { category: 'Optional' },
    },
    name: {
      control: 'text',
      table: { category: 'Optional' },
    },
    value: {
      control: 'text',
      table: { category: 'Optional' },
    },
    className: {
      control: false,
      table: { category: 'Styling' },
    },
    options: {
      control: 'object',
      description: '고급 옵션: `ariaLabel`, `readOnly`, 커스텀 아이콘',
      table: { category: 'Optional' },
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledCheckBox: Story['render'] = (args) => {
  const [{ checked }, updateArgs] = useArgs();

  const handleCheckedChange = (nextChecked: boolean) => {
    updateArgs({ checked: nextChecked });
    args.onCheckedChange?.(nextChecked);
  };

  return <CheckBox {...args} checked={checked} onCheckedChange={handleCheckedChange} />;
};

export const Playground: Story = {
  render: ControlledCheckBox,
};

export const Checked: Story = {
  render: ControlledCheckBox,
  args: {
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '초기 체크 상태 예시입니다. 저장된 설정 표시 시 유용합니다.',
      },
    },
  },
};

export const Small: Story = {
  render: ControlledCheckBox,
  args: {
    size: 'small',
  },
  parameters: {
    docs: {
      description: {
        story: '동일한 동작을 작은 사이즈로 보여주는 예시입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  render: ControlledCheckBox,
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '값은 보이지만 상호작용은 막는 비활성 상태 예시입니다.',
      },
    },
  },
};

export const WithoutLabel: Story = {
  render: ControlledCheckBox,
  args: {
    label: undefined,
    options: {
      ariaLabel: '이메일 업데이트 받기',
    },
  },
  parameters: {
    docs: {
      description: {
        story: '라벨 없는 사용 예시입니다. 보이는 라벨이 없으면 `options.ariaLabel`을 제공하세요.',
      },
    },
  },
};

export const ReadOnly: Story = {
  args: {
    checked: true,
    label: '알림 활성화',
    options: {
      readOnly: true,
    },
    onCheckedChange: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: '토글 없이 상태만 표시하는 읽기 전용 체크박스 예시입니다.',
      },
    },
  },
};
