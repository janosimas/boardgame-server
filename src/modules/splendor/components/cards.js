import { GEM } from './gemTypes';

const black = {
  tier1: [
    {bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 1, [GEM.RED]: 1, [GEM.BLUE]: 1, [GEM.GREEN]: 1},
    {bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 1, [GEM.BLUE]: 0, [GEM.GREEN]: 2},
    {bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 2, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 2},
    {bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 1, [GEM.WHITE]: 0, [GEM.RED]: 3, [GEM.BLUE]: 0, [GEM.GREEN]: 1},
    {bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 3},
    {bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 1, [GEM.RED]: 1, [GEM.BLUE]: 2, [GEM.GREEN]: 1},
    {bonus: GEM.BLACK, points: 0, [GEM.BLACK]: 0, [GEM.WHITE]: 2, [GEM.RED]: 1, [GEM.BLUE]: 2, [GEM.GREEN]: 0},
    {bonus: GEM.BLACK, points: 1, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 4, [GEM.GREEN]: 0},
  ],
  tier2: [
    {bonus: GEM.BLACK, points: 1, [GEM.BLACK]: 0, [GEM.WHITE]: 3, [GEM.RED]: 0, [GEM.BLUE]: 2, [GEM.GREEN]: 2},
    {bonus: GEM.BLACK, points: 1, [GEM.BLACK]: 2, [GEM.WHITE]: 3, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 3},
    {bonus: GEM.BLACK, points: 2, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 2, [GEM.BLUE]: 1, [GEM.GREEN]: 4},
    {bonus: GEM.BLACK, points: 2, [GEM.BLACK]: 0, [GEM.WHITE]: 5, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0},
    {bonus: GEM.BLACK, points: 2, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 3, [GEM.BLUE]: 0, [GEM.GREEN]: 5},
    {bonus: GEM.BLACK, points: 3, [GEM.BLACK]: 6, [GEM.WHITE]: 0, [GEM.RED]: 0, [GEM.BLUE]: 0, [GEM.GREEN]: 0},
  ],
  tier3: [
    {bonus: GEM.BLACK, points: 3, [GEM.BLACK]: 0, [GEM.WHITE]: 3, [GEM.RED]: 3, [GEM.BLUE]: 3, [GEM.GREEN]: 5},
    {bonus: GEM.BLACK, points: 4, [GEM.BLACK]: 0, [GEM.WHITE]: 0, [GEM.RED]: 7, [GEM.BLUE]: 0, [GEM.GREEN]: 0},
    {bonus: GEM.BLACK, points: 4, [GEM.BLACK]: 3, [GEM.WHITE]: 0, [GEM.RED]: 6, [GEM.BLUE]: 0, [GEM.GREEN]: 3},
    {bonus: GEM.BLACK, points: 5, [GEM.BLACK]: 3, [GEM.WHITE]: 0, [GEM.RED]: 7, [GEM.BLUE]: 0, [GEM.GREEN]: 0},
  ]
};

export const tier1 = [...black.tier1];
export const tier2 = [...black.tier2];
export const tier3 = [...black.tier3];