/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from 'boardgame.io/core';
import { GEM, YELLOW } from './components/gemTypes';
import { tier1, tier2, tier3 } from './components/cards';
import { dealCards, canBuy } from './components/utils';

import { isNil, uniq } from 'ramda';

const Splendor = Game({
  name: 'Splendor',

  setup: (ctx) => {
    let numOfGems = 4;
    if (ctx.numPlayers === 3) {
      numOfGems = 5;
    } else if (ctx.numPlayers === 4) {
      numOfGems = 7;
    }

    let G = {
      gems: {
        [GEM.RED]: numOfGems,
        [GEM.GREEN]: numOfGems,
        [GEM.BLUE]: numOfGems,
        [GEM.WHITE]: numOfGems,
        [GEM.BLACK]: numOfGems,
        [YELLOW]: 5, // allways 5 golden tokens
      },
      decks: {
        tier1: ctx.random.Shuffle(tier1),
        tier2: ctx.random.Shuffle(tier2),
        tier3: ctx.random.Shuffle(tier3),
      },
      cards: {
        tier1: [],
        tier2: [],
        tier3: [],
      },
      players: []
    };

    for (let index = 0; index < ctx.numPlayers; index++) {
      G.players.push({
        gems: {
          [GEM.RED]: 0,
          [GEM.GREEN]: 0,
          [GEM.BLUE]: 0,
          [GEM.WHITE]: 0,
          [GEM.BLACK]: 0,
          [YELLOW]: 0,
        },
        cards: {
          [GEM.RED]: [],
          [GEM.GREEN]: [],
          [GEM.BLUE]: [],
          [GEM.WHITE]: [],
          [GEM.BLACK]: []
        },
        reserved: []
      });
    }

    dealCards(G);

    return G;
  },

  moves: {
    clickGem(G, ctx, gems) {
      // cancel action if didn't select 3 gems
      if (isNil(gems)) {
        return;
      }

      if ((gems.length === 2 && gems[0] != gems[1])
        || (gems.length === 3 && uniq(gems).length != 3)) {
        return;
      }

      // cancel action if try to buy a golden gem
      if (gems.find(gem => gem === YELLOW)) {
        return;
      }
      // cancel action if any gem is not available to buy
      if (gems.some(gem => G.gems[gem] === 0)) {
        return;
      }

      gems.forEach(gem => {
        G.players[ctx.currentPlayer].gems[gem]++;
        G.gems[gem]--;
      });

      return G;
    },

    buyCard(G, ctx, tier, pos) {
      //cancel action if no tier or position
      if (isNil(tier)
        || isNil(pos)
        || pos < 0
        || pos > 3) {
        return G;
      }

      if (!canBuy(G.players[ctx.currentPlayer], G.cards[tier][pos])) {
        return G;
      }

      const Gcopy = { ...G };
      const player = Gcopy.players[ctx.currentPlayer];
      const card = Gcopy.cards[tier][pos];
      Gcopy.cards[tier].splice(pos, 1);

      let accum = 0;
      for (const key in GEM) {
        if (key === "YELLOW") {
          continue;
        }

        // use cards to pay the cost
        let temp = card[GEM[key]] - player.cards[GEM[key]];

        // use gems to pay the cost
        if (temp > 0) {
          const cost = temp;
          temp -= player.gems[GEM[key]];
          player.gems[GEM[key]] -= cost;
          if (player.gems[GEM[key]] < 0) {
            player.gems[GEM[key]] = 0;
          }
        }

        // accum the remainder to pay the cost with gold coins
        if (temp > 0) {
          accum += temp;
        }
      }

      if (accum > 0) {
        player.gems[YELLOW] -= accum;
      }

      player.cards[card.bonus].push(card);

      return Gcopy;
    },

    reserveCard(G, ctx, tier, pos) {
      //cancel action if no tier or position
      if (isNil(tier)
        || isNil(pos)
        || pos < 0
        || pos > 3) {
        return G;
      }

      const Gcopy = { ...G };
      const player = Gcopy.players[ctx.currentPlayer];
      // check if can reserve
      if (Gcopy.gems[YELLOW] === 0
        || player.reserved.length === 3) {
        return G;
      }

      const card = Gcopy.cards[tier][pos];
      Gcopy.cards[tier].splice(pos, 1);
      player.reserved.push(card);
      player.gems[YELLOW]++;
      Gcopy.gems[YELLOW]--;

      return Gcopy;
    }
  },

  flow: {
    movesPerTurn: 1,

    endGameIf: (G, ctx) => {
    },
  },
});

export default Splendor;
