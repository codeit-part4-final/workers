import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import PasswordInput from './PasswordInput';

const meta = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: '비밀번호를 입력해 주세요.',
    onChange: fn(),
  },
  argTypes: {
    errorMessage: {
      control: 'text',
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
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    errorMessage: '비밀번호를 입력해주세요.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 460 }}>
      <PasswordInput placeholder="기본 비밀번호" />
      <PasswordInput placeholder="에러 상태" errorMessage="비밀번호를 입력해주세요." />
      <PasswordInput placeholder="비활성" disabled />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
