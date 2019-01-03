import { GEM } from './gems';
import { TIER } from './tiers';

const cardsByColor = {
  [GEM.BLACK]: {
    [TIER.ONE]: [
      { bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 1, [GEM.RED]: 1, [GEM.BLUE]: 1, [GEM.GREEN]: 1 },
      { bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 1, [GEM.BLUE]: 0, [GEM.GREEN]: 2 },
      { bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 2, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 2 },
      { bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 1, [GEM.WHITE]: 0, [GEM.RED]: 3, [GEM.BLUE]: 0, [GEM.GREEN]: 1 },
      { bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 3 },
      { bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 1, [GEM.RED]: 1, [GEM.BLUE]: 2, [GEM.GREEN]: 1 },
      { bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 2, [GEM.RED]: 1, [GEM.BLUE]: 2, [GEM.GREEN]: 0 },
      { bonus: GEM.BLACK, points: 1, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 4, [GEM.GREEN]: 0 },
    ],
    [TIER.TWO]: [
      { bonus: GEM.BLACK, points: 1, [GEM.BLACK]: 0, [GEM.WHITE]: 3, [GEM.RED]: 0, [GEM.BLUE]: 2, [GEM.GREEN]: 2 },
      { bonus: GEM.BLACK, points: 1, [GEM.BLACK]: 2, [GEM.WHITE]: 3, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 3 },
      { bonus: GEM.BLACK, points: 2, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 2, [GEM.BLUE]: 1, [GEM.GREEN]: 4 },
      { bonus: GEM.BLACK, points: 2, [GEM.BLACK]: 0, [GEM.WHITE]: 5, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.BLACK, points: 2, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 3, [GEM.BLUE]: 0, [GEM.GREEN]: 5 },
      { bonus: GEM.BLACK, points: 3, [GEM.BLACK]: 6, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
    ],
    [TIER.THREE]: [
      { bonus: GEM.BLACK, points: 3, [GEM.BLACK]: 0, [GEM.WHITE]: 3, [GEM.RED]: 3, [GEM.BLUE]: 3, [GEM.GREEN]: 5 },
      { bonus: GEM.BLACK, points: 4, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 7, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.BLACK, points: 4, [GEM.BLACK]: 3, [GEM.WHITE]: 0, [GEM.RED]: 6, [GEM.BLUE]: 0, [GEM.GREEN]: 3 },
      { bonus: GEM.BLACK, points: 5, [GEM.BLACK]: 3, [GEM.WHITE]: 0, [GEM.RED]: 7, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
    ]
  },
  [GEM.BLUE]: {
    [TIER.ONE]: [
      { bonus: GEM.BLUE, points: 0, [GEM.BLACK]: 2, [GEM.WHITE]: 1, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.BLUE, points: 0, [GEM.BLACK]: 1, [GEM.WHITE]: 1, [GEM.RED]: 2, [GEM.BLUE]: 0, [GEM.GREEN]: 1 },
      { bonus: GEM.BLUE, points: 0, [GEM.BLACK]: 1, [GEM.WHITE]: 1, [GEM.RED]: 1, [GEM.BLUE]: 0, [GEM.GREEN]: 1 },
      { bonus: GEM.BLUE, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 1, [GEM.BLUE]: 1, [GEM.GREEN]: 3 },
      { bonus: GEM.BLUE, points: 0, [GEM.BLACK]: 3, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.BLUE, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 1, [GEM.RED]: 2, [GEM.BLUE]: 0, [GEM.GREEN]: 2 },
      { bonus: GEM.BLUE, points: 0, [GEM.BLACK]: 2, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 2 },
      { bonus: GEM.BLUE, points: 1, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 4, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
    ],
    [TIER.TWO]: [
      { bonus: GEM.BLUE, points: 1, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 3, [GEM.BLUE]: 2, [GEM.GREEN]: 2 },
      { bonus: GEM.BLUE, points: 1, [GEM.BLACK]: 3, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 2, [GEM.GREEN]: 3 },
      { bonus: GEM.BLUE, points: 2, [GEM.BLACK]: 0, [GEM.WHITE]: 5, [GEM.RED]: 0, [GEM.BLUE]: 3, [GEM.GREEN]: 0 },
      { bonus: GEM.BLUE, points: 2, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 5, [GEM.GREEN]: 0 },
      { bonus: GEM.BLUE, points: 2, [GEM.BLACK]: 4, [GEM.WHITE]: 2, [GEM.RED]: 1, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.BLUE, points: 3, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 6, [GEM.GREEN]: 0 },
    ],
    [TIER.THREE]: [
      { bonus: GEM.BLUE, points: 3, [GEM.BLACK]: 5, [GEM.WHITE]: 3, [GEM.RED]: 3, [GEM.BLUE]: 0, [GEM.GREEN]: 3 },
      { bonus: GEM.BLUE, points: 4, [GEM.BLACK]: 0, [GEM.WHITE]: 7, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.BLUE, points: 4, [GEM.BLACK]: 3, [GEM.WHITE]: 6, [GEM.RED]: 0, [GEM.BLUE]: 3, [GEM.GREEN]: 0 },
      { bonus: GEM.BLUE, points: 5, [GEM.BLACK]: 0, [GEM.WHITE]: 7, [GEM.RED]: 0, [GEM.BLUE]: 3, [GEM.GREEN]: 0 },
    ]
  },
  [GEM.GREEN]: {
    [TIER.ONE]: [
      { bonus: GEM.GREEN, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 2, [GEM.RED]: 0, [GEM.BLUE]: 1, [GEM.GREEN]: 0 },
      { bonus: GEM.GREEN, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 2, [GEM.BLUE]: 2, [GEM.GREEN]: 0 },
      { bonus: GEM.GREEN, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 1, [GEM.RED]: 0, [GEM.BLUE]: 3, [GEM.GREEN]: 1 },
      { bonus: GEM.GREEN, points: 0, [GEM.BLACK]: 1, [GEM.WHITE]: 1, [GEM.RED]: 1, [GEM.BLUE]: 1, [GEM.GREEN]: 0 },
      { bonus: GEM.GREEN, points: 0, [GEM.BLACK]: 2, [GEM.WHITE]: 1, [GEM.RED]: 1, [GEM.BLUE]: 1, [GEM.GREEN]: 0 },
      { bonus: GEM.GREEN, points: 0, [GEM.BLACK]: 2, [GEM.WHITE]: 0, [GEM.RED]: 2, [GEM.BLUE]: 1, [GEM.GREEN]: 0 },
      { bonus: GEM.GREEN, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 3, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.GREEN, points: 1, [GEM.BLACK]: 4, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
    ],
    [TIER.TWO]: [
      { bonus: GEM.GREEN, points: 1, [GEM.BLACK]: 0, [GEM.WHITE]: 3, [GEM.RED]: 3, [GEM.BLUE]: 0, [GEM.GREEN]: 2 },
      { bonus: GEM.GREEN, points: 1, [GEM.BLACK]: 2, [GEM.WHITE]: 2, [GEM.RED]: 0, [GEM.BLUE]: 3, [GEM.GREEN]: 0 },
      { bonus: GEM.GREEN, points: 2, [GEM.BLACK]: 1, [GEM.WHITE]: 4, [GEM.RED]: 0, [GEM.BLUE]: 2, [GEM.GREEN]: 0 },
      { bonus: GEM.GREEN, points: 2, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 5 },
      { bonus: GEM.GREEN, points: 2, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 5, [GEM.GREEN]: 3 },
      { bonus: GEM.GREEN, points: 3, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 6 },
    ],
    [TIER.THREE]: [
      { bonus: GEM.GREEN, points: 3, [GEM.BLACK]: 3, [GEM.WHITE]: 5, [GEM.RED]: 3, [GEM.BLUE]: 3, [GEM.GREEN]: 0 },
      { bonus: GEM.GREEN, points: 4, [GEM.BLACK]: 0, [GEM.WHITE]: 3, [GEM.RED]: 0, [GEM.BLUE]: 6, [GEM.GREEN]: 3 },
      { bonus: GEM.GREEN, points: 4, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 7, [GEM.GREEN]: 0 },
      { bonus: GEM.GREEN, points: 5, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 7, [GEM.GREEN]: 3 },
    ]
  },
  [GEM.RED]: {
    [TIER.ONE]: [
      { bonus: GEM.RED, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 3, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.RED, points: 0, [GEM.BLACK]: 3, [GEM.WHITE]: 1, [GEM.RED]: 1, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.RED, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 2, [GEM.GREEN]: 1 },
      { bonus: GEM.RED, points: 0, [GEM.BLACK]: 2, [GEM.WHITE]: 2, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 1 },
      { bonus: GEM.RED, points: 0, [GEM.BLACK]: 1, [GEM.WHITE]: 2, [GEM.RED]: 0, [GEM.BLUE]: 1, [GEM.GREEN]: 1 },
      { bonus: GEM.RED, points: 0, [GEM.BLACK]: 1, [GEM.WHITE]: 1, [GEM.RED]: 0, [GEM.BLUE]: 1, [GEM.GREEN]: 1 },
      { bonus: GEM.RED, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 2, [GEM.RED]: 2, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.RED, points: 1, [GEM.BLACK]: 0, [GEM.WHITE]: 4, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
    ],
    [TIER.TWO]: [
      { bonus: GEM.RED, points: 1, [GEM.BLACK]: 3, [GEM.WHITE]: 0, [GEM.RED]: 2, [GEM.BLUE]: 3, [GEM.GREEN]: 0 },
      { bonus: GEM.RED, points: 1, [GEM.BLACK]: 3, [GEM.WHITE]: 2, [GEM.RED]: 2, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.RED, points: 2, [GEM.BLACK]: 0, [GEM.WHITE]: 1, [GEM.RED]: 0, [GEM.BLUE]: 4, [GEM.GREEN]: 2 },
      { bonus: GEM.RED, points: 2, [GEM.BLACK]: 5, [GEM.WHITE]: 3, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.RED, points: 2, [GEM.BLACK]: 5, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.RED, points: 3, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 6, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
    ],
    [TIER.THREE]: [
      { bonus: GEM.RED, points: 3, [GEM.BLACK]: 3, [GEM.WHITE]: 3, [GEM.RED]: 0, [GEM.BLUE]: 5, [GEM.GREEN]: 3 },
      { bonus: GEM.RED, points: 4, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 7 },
      { bonus: GEM.RED, points: 4, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 3, [GEM.BLUE]: 3, [GEM.GREEN]: 6 },
      { bonus: GEM.RED, points: 5, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 3, [GEM.BLUE]: 0, [GEM.GREEN]: 7 },
    ],
  },
  [GEM.WHITE]: {
    [TIER.ONE]: [
      { bonus: GEM.WHITE, points: 0, [GEM.BLACK]: 1, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 2, [GEM.GREEN]: 2 },
      { bonus: GEM.WHITE, points: 0, [GEM.BLACK]: 1, [GEM.WHITE]: 0, [GEM.RED]: 2, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.WHITE, points: 0, [GEM.BLACK]: 1, [GEM.WHITE]: 0, [GEM.RED]: 1, [GEM.BLUE]: 1, [GEM.GREEN]: 1 },
      { bonus: GEM.WHITE, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 3, [GEM.GREEN]: 0 },
      { bonus: GEM.WHITE, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 2, [GEM.GREEN]: 2 },
      { bonus: GEM.WHITE, points: 0, [GEM.BLACK]: 1, [GEM.WHITE]: 0, [GEM.RED]: 1, [GEM.BLUE]: 1, [GEM.GREEN]: 2 },
      { bonus: GEM.WHITE, points: 0, [GEM.BLACK]: 1, [GEM.WHITE]: 3, [GEM.RED]: 0, [GEM.BLUE]: 1, [GEM.GREEN]: 0 },
      { bonus: GEM.WHITE, points: 1, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 4 },
    ],
    [TIER.TWO]: [
      { bonus: GEM.WHITE, points: 1, [GEM.BLACK]: 2, [GEM.WHITE]: 0, [GEM.RED]: 2, [GEM.BLUE]: 0, [GEM.GREEN]: 3 },
      { bonus: GEM.WHITE, points: 1, [GEM.BLACK]: 0, [GEM.WHITE]: 2, [GEM.RED]: 3, [GEM.BLUE]: 3, [GEM.GREEN]: 0 },
      { bonus: GEM.WHITE, points: 2, [GEM.BLACK]: 2, [GEM.WHITE]: 0, [GEM.RED]: 4, [GEM.BLUE]: 0, [GEM.GREEN]: 1 },
      { bonus: GEM.WHITE, points: 2, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 5, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.WHITE, points: 2, [GEM.BLACK]: 3, [GEM.WHITE]: 0, [GEM.RED]: 5, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.WHITE, points: 3, [GEM.BLACK]: 0, [GEM.WHITE]: 6, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
    ],
    [TIER.THREE]: [
      { bonus: GEM.WHITE, points: 3, [GEM.BLACK]: 3, [GEM.WHITE]: 0, [GEM.RED]: 5, [GEM.BLUE]: 3, [GEM.GREEN]: 3 },
      { bonus: GEM.WHITE, points: 4, [GEM.BLACK]: 7, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.WHITE, points: 4, [GEM.BLACK]: 6, [GEM.WHITE]: 3, [GEM.RED]: 3, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
      { bonus: GEM.WHITE, points: 5, [GEM.BLACK]: 7, [GEM.WHITE]: 3, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0 },
    ],
  }
}

export const cards = {
  [TIER.ONE]: [],
  [TIER.TWO]: [],
  [TIER.THREE]: [],
};

for (const key in GEM) {
  if (GEM.hasOwnProperty(key)) {
    const gem = GEM[key];
    cards[TIER.ONE].push(...cardsByColor[gem][TIER.ONE]);
    cards[TIER.TWO].push(...cardsByColor[gem][TIER.TWO]);
    cards[TIER.THREE].push(...cardsByColor[gem][TIER.THREE]);
  }
}

