import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import SidebarAddButton from './SidebarAddButton';

const meta = {
  title: 'Components/SidebarAddButton',
  component: SidebarAddButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: '팀 추가하기',
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarAddButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
