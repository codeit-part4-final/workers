import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import Input from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: '텍스트를 입력해 주세요.',
    onChange: fn(),
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['text', 'email', 'password'],
    },
    errorMessage: {
      control: 'text',
    },
    isError: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 460 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: '이메일을 입력해 주세요.',
  },
};

export const EmailWithError: Story = {
  args: {
    type: 'email',
    placeholder: '이메일을 입력해 주세요.',
    errorMessage: '유효한 이메일이 아닙니다',
  },
};

export const ErrorBorderOnly: Story = {
  args: {
    isError: true,
    placeholder: '보더만 빨간색',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '비활성 상태',
  },
};

export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 460 }}>
      <Input placeholder="기본 Input" />
      <Input type="email" placeholder="이메일" />
      <Input type="email" placeholder="이메일" errorMessage="유효한 이메일이 아닙니다" />
      <Input placeholder="보더만 에러" isError />
      <Input placeholder="비활성" disabled />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
