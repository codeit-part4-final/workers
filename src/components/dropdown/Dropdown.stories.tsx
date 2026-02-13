import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { fn } from 'storybook/test';

import Dropdown from './Dropdown';
import type { DropdownItemData } from './types/types';

const SORT_ITEMS: DropdownItemData[] = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'due-date', label: '마감일순' },
  { value: 'title', label: '제목순 (A-Z)' },
];

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Dropdown은 짧은 옵션 목록에서 하나를 선택할 때 사용하는 컴포넌트입니다.

### 언제 사용하나요
- 정렬, 필터 모드, 보기 모드처럼 단일 선택이 필요할 때
- 공간이 좁아 라디오 그룹을 드롭다운으로 대체할 때
- 제어/비제어 방식으로 간단하게 선택 UI를 구성할 때

### 기본 사용 예시
\`\`\`tsx
<Dropdown
  items={[
    { value: 'latest', label: '최신순' },
    { value: 'popular', label: '인기순' },
  ]}
  placeholder="정렬 기준"
  ariaLabel="정렬 옵션"
  onChange={(value) => setSort(value)}
/>
\`\`\`

### Props
| Prop | 필수 | 설명 |
| --- | --- | --- |
| \`items\` | 예 | 옵션 목록. 각 항목은 \`{ value, label }\` 형태입니다. |
| \`placeholder\` | 아니요 | 선택 전 노출되는 안내 텍스트입니다. |
| \`defaultValue\` | 아니요 | 비제어 사용 시 초기 선택값입니다. |
| \`value\` | 아니요 | 제어 사용 시 현재 선택값입니다. |
| \`onChange\` | 아니요 | 선택값이 바뀌면 \`value\`를 전달합니다. |
| \`size\` | 아니요 | 메뉴 크기: \`default | small | repeat\` |
| \`disabled\` | 아니요 | 트리거와 선택을 비활성화합니다. |
| \`ariaLabel\` | 아니요* | 접근성 라벨입니다. *보이는 라벨/placeholder가 없으면 권장됩니다.* |

### 동작 메모
- \`defaultValue\`(비제어) 또는 \`value\`(제어) 중 한 가지 패턴으로 사용하세요.
- 선택 불일치를 막기 위해 \`items\`의 value는 안정적으로 유지하세요.

### 자주 쓰는 패턴
- 비제어: \`defaultValue\` + \`onChange\`
- 제어: \`value\` + \`onChange\` + 부모 상태
        `,
      },
    },
  },
  args: {
    items: SORT_ITEMS,
    placeholder: '정렬 기준',
    ariaLabel: '정렬 옵션',
    size: 'default',
    disabled: false,
    onChange: fn(),
  },
  argTypes: {
    items: {
      control: 'object',
      description: '`{ value, label }` 형태의 옵션 목록입니다.',
      table: { category: 'Required' },
    },
    placeholder: {
      control: 'text',
      description: '선택 전 표시할 플레이스홀더 텍스트입니다.',
      table: { category: 'Optional' },
    },
    defaultValue: {
      control: 'text',
      description: '비제어 사용 시 초기 선택값입니다.',
      table: { category: 'Optional' },
    },
    value: {
      control: 'text',
      description: '제어 사용 시 현재 선택값입니다.',
      table: { category: 'Optional' },
    },
    onChange: {
      action: 'changed',
      description: '선택값이 변경될 때 호출됩니다.',
      table: { category: 'Optional' },
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'small', 'repeat'],
      description: '드롭다운 메뉴 크기입니다.',
      table: {
        category: 'Optional',
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '컴포넌트를 비활성화합니다.',
      table: {
        category: 'Optional',
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: '트리거/리스트박스를 위한 접근성 라벨입니다.',
      table: { category: 'Optional' },
    },
    className: {
      control: false,
      table: { category: 'Styling' },
    },
    buttonClassName: {
      control: false,
      table: { category: 'Styling' },
    },
    menuClassName: {
      control: false,
      table: { category: 'Styling' },
    },
    itemClassName: {
      control: false,
      table: { category: 'Styling' },
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'popular',
  },
  parameters: {
    docs: {
      description: {
        story: '초기 선택값을 주는 비제어 사용 예시입니다.',
      },
    },
  },
};

export const Controlled: Story = {
  args: {
    value: 'latest',
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.value ?? 'latest');

    const handleChange = (nextValue: string) => {
      setSelectedValue(nextValue);
      args.onChange?.(nextValue);
    };

    return <Dropdown {...args} value={selectedValue} onChange={handleChange} />;
  },
  parameters: {
    docs: {
      description: {
        story: '부모 상태가 선택값을 소유하는 제어 패턴 예시입니다.',
      },
    },
  },
};
