import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';
import Image from 'next/image';

import SidebarTeamSelect from './SidebarTeamSelect';
import chessSmall from '@/assets/icons/chess/chessSmall.svg';

const meta = {
  title: 'Components/SidebarTeamSelect',
  component: SidebarTeamSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    icon: <Image src={chessSmall} alt="" width={20} height={20} />,
    label: '팀 선택',
    onClick: fn(),
  },
  argTypes: {
    isSelected: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarTeamSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    label: '경영관리팀',
    isSelected: true,
  },
};

export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}>
      <SidebarTeamSelect
        icon={<Image src={chessSmall} alt="" width={20} height={20} />}
        label="팀 선택"
      />
      <SidebarTeamSelect
        icon={<Image src={chessSmall} alt="" width={20} height={20} />}
        label="경영관리팀"
        isSelected
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
