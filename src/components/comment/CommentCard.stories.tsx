import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import CommentCard from './CommentCard';

const meta = {
  title: 'Components/CommentCard',
  component: CommentCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    name: '안해나',
    content: '오늘 할 일 목록을 정리했습니다.',
    date: '2025.01.15',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 460 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithProfileImage: Story = {
  args: {
    profileImage: (
      <div style={{ width: 32, height: 32, borderRadius: 12, background: '#cbd5e1' }} />
    ),
  },
};

export const WithIcon: Story = {
  args: {
    profileImage: (
      <div style={{ width: 32, height: 32, borderRadius: 12, background: '#cbd5e1' }} />
    ),
    icon: (
      <button
        type="button"
        onClick={fn()}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 16 }}
      >
        ⋮
      </button>
    ),
  },
};

export const WithActions: Story = {
  args: {
    profileImage: (
      <div style={{ width: 32, height: 32, borderRadius: 12, background: '#cbd5e1' }} />
    ),
    icon: (
      <button
        type="button"
        onClick={fn()}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 16 }}
      >
        ⋮
      </button>
    ),
    actions: (
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={fn()}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            color: '#64748b',
          }}
        >
          취소
        </button>
        <button
          type="button"
          onClick={fn()}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            color: '#3b82f6',
          }}
        >
          수정하기
        </button>
      </div>
    ),
  },
};

export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 460 }}>
      <CommentCard name="안해나" content="기본 댓글입니다." date="2025.01.15" />
      <CommentCard
        name="안해나"
        content="프로필 이미지가 있는 댓글입니다."
        date="2025.01.15"
        profileImage={
          <div style={{ width: 32, height: 32, borderRadius: 12, background: '#cbd5e1' }} />
        }
      />
      <CommentCard
        name="안해나"
        content="모든 슬롯이 채워진 댓글입니다."
        date="2025.01.15"
        profileImage={
          <div style={{ width: 32, height: 32, borderRadius: 12, background: '#cbd5e1' }} />
        }
        icon={<span style={{ fontSize: 16, cursor: 'pointer' }}>⋮</span>}
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#64748b', cursor: 'pointer' }}>취소</span>
            <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer' }}>수정하기</span>
          </div>
        }
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
