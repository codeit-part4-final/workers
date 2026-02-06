import type { BadgeState } from '../types/types';

import stateDoneLarge from '@/assets/icons/state/stateDoneLarge.svg';
import stateDoneSmall from '@/assets/icons/state/stateDoneSmall.svg';
import stateOngoingLarge from '@/assets/icons/state/stateOngoingLarge.svg';
import stateOngoingSmall from '@/assets/icons/state/stateOngoingSmall.svg';
import stateEmptyLarge from '@/assets/icons/state/stateEmptyLarge.svg';
import stateEmptySmall from '@/assets/icons/state/stateEmptySmall.svg';

export const BADGE_STATE_LABEL: Record<BadgeState, string> = {
  done: '완료',
  ongoing: '진행 중',
  empty: '시작 전',
} as const;

export const BADGE_STYLE = {
  icons: {
    done: { large: stateDoneLarge, small: stateDoneSmall },
    ongoing: { large: stateOngoingLarge, small: stateOngoingSmall },
    empty: { large: stateEmptyLarge, small: stateEmptySmall },
  },
  iconSize: { large: 20, small: 16 },
} as const;
