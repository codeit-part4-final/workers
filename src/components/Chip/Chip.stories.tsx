import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Chip from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '칩에 표시될 텍스트',
    },
    count: {
      control: 'number',
      description: '개수 표시 (optional)',
    },
    size: {
      control: 'select',
      options: ['large', 'small'],
      description: '칩 크기',
    },
    selected: {
      control: 'boolean',
      description: '선택 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 (Default)
export const Default: Story = {
  args: {
    label: '법인 등기',
    count: 3,
    size: 'large',
  },
};

// Small 사이즈
export const Small: Story = {
  args: {
    label: '법인 등기',
    count: 3,
    size: 'small',
  },
};

// Selected 상태
export const Selected: Story = {
  args: {
    label: '법인 등기',
    count: 3,
    size: 'large',
    selected: true,
  },
};

// Count 없는 경우
export const WithoutCount: Story = {
  args: {
    label: '법인 등기',
    size: 'large',
  },
};

// Disabled 상태
export const Disabled: Story = {
  args: {
    label: '법인 등기',
    count: 3,
    size: 'large',
    disabled: true,
  },
};

// 모든 상태 비교 (Playground)
export const AllStates: Story = {
  args: {
    label: '법인 등기',
    count: 3,
  },
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Large */}
        <div>
          <h3 style={{ marginBottom: '16px', color: '#64748b' }}>Large</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Chip label="법인 등기" count={3} size="large" />
            <Chip label="법인 등기" count={3} size="large" selected />
            <Chip label="법인 등기" count={3} size="large" disabled />
          </div>
        </div>

        {/* Small */}
        <div>
          <h3 style={{ marginBottom: '16px', color: '#64748b' }}>Small</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Chip label="법인 등기" count={3} size="small" />
            <Chip label="법인 등기" count={3} size="small" selected />
            <Chip label="법인 등기" count={3} size="small" disabled />
          </div>
        </div>

        {/* Without Count */}
        <div>
          <h3 style={{ marginBottom: '16px', color: '#64748b' }}>Without Count</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Chip label="법인 등기" size="large" />
            <Chip label="법인 등기" size="large" selected />
          </div>
        </div>
      </div>
    );
  },
};

// 실제 사용 예시 (Interactive)
export const InteractiveExample: Story = {
  args: {
    label: '법인 설립',
    count: 3,
  },
  render: () => {
    const ChipGroup = () => {
      const [selectedChip, setSelectedChip] = useState<string | null>('법인 설립');

      const chips = [
        { id: '법인 설립', label: '법인 설립', count: 3 },
        { id: '변경 등기', label: '변경 등기', count: 2 },
        { id: '법인 폐업', label: '법인 폐업', count: 5 },
      ];

      return (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {chips.map((chip) => (
            <Chip
              key={chip.id}
              label={chip.label}
              count={chip.count}
              size="large"
              selected={selectedChip === chip.id}
              onClick={() => setSelectedChip(chip.id)}
            />
          ))}
        </div>
      );
    };

    return <ChipGroup />;
  },
};
