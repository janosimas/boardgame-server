import { GEM } from './gemTypes';

const black = {
  tier1: [
    {bonus: GEM.BLACK, points: 0, black: 0, white: 1, red: 1, blue: 1, green: 1},
    {bonus: GEM.BLACK, points: 0, black: 0, white: 0, red: 1, blue: 0, green: 2},
    {bonus: GEM.BLACK, points: 0, black: 0, white: 2, red: 0, blue: 0, green: 2},
    {bonus: GEM.BLACK, points: 0, black: 1, white: 0, red: 3, blue: 0, green: 1},
    {bonus: GEM.BLACK, points: 0, black: 0, white: 0, red: 0, blue: 0, green: 3},
    {bonus: GEM.BLACK, points: 0, black: 0, white: 1, red: 1, blue: 2, green: 1},
    {bonus: GEM.BLACK, points: 0, black: 0, white: 2, red: 1, blue: 2, green: 0},
    {bonus: GEM.BLACK, points: 1, black: 0, white: 0, red: 0, blue: 4, green: 0},
  ],
  tier2: [
    {bonus: GEM.BLACK, points: 1, black: 0, white: 3, red: 0, blue: 2, green: 2},
    {bonus: GEM.BLACK, points: 1, black: 2, white: 3, red: 0, blue: 0, green: 3},
    {bonus: GEM.BLACK, points: 2, black: 0, white: 0, red: 2, blue: 1, green: 4},
    {bonus: GEM.BLACK, points: 2, black: 0, white: 5, red: 0, blue: 0, green: 0},
    {bonus: GEM.BLACK, points: 2, black: 0, white: 0, red: 3, blue: 0, green: 5},
    {bonus: GEM.BLACK, points: 3, black: 6, white: 0, red: 0, blue: 0, green: 0},
  ],
  tier3: [
    {bonus: GEM.BLACK, points: 3, black: 0, white: 3, red: 3, blue: 3, green: 5},
    {bonus: GEM.BLACK, points: 4, black: 0, white: 0, red: 7, blue: 0, green: 0},
    {bonus: GEM.BLACK, points: 4, black: 3, white: 0, red: 6, blue: 0, green: 3},
    {bonus: GEM.BLACK, points: 5, black: 3, white: 0, red: 7, blue: 0, green: 0},
  ]
};

export const tier1 = [...black.tier1];
export const tier2 = [...black.tier2];
export const tier3 = [...black.tier3];