import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Badge from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    state: 'done',
    label: '5/5',
  },
  argTypes: {
    state: {
      control: 'inline-radio',
      options: ['done', 'ongoing', 'empty'],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'large'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Done: Story = {
  args: {
    state: 'done',
    label: '5/5',
  },
};

export const Ongoing: Story = {
  args: {
    state: 'ongoing',
    label: '3/5',
  },
};

export const Empty: Story = {
  args: {
    state: 'empty',
    label: '0/5',
  },
};

export const Large: Story = {
  args: {
    state: 'done',
    size: 'large',
    label: '5/5',
  },
};

export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Badge state="done" size="small" label="5/5" />
        <Badge state="ongoing" size="small" label="3/5" />
        <Badge state="empty" size="small" label="0/5" />
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Badge state="done" size="large" label="5/5" />
        <Badge state="ongoing" size="large" label="3/5" />
        <Badge state="empty" size="large" label="0/5" />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
