/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from 'boardgame.io/core';
import { GEM } from './components/gemTypes';
import { tier1, tier2, tier3 } from './components/cards';
import { dealCards, canBuy } from './components/utils';

import { isNil } from 'ramda';

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
      gems: {},
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
        gems: {},
        cards: {},
        reserved: []
      });
    }

    G.gems[GEM.RED] = numOfGems;
    G.gems[GEM.GREEN] = numOfGems;
    G.gems[GEM.BLUE] = numOfGems;
    G.gems[GEM.WHITE] = numOfGems;
    G.gems[GEM.BLACK] = numOfGems;
    G.gems[GEM.YELLOW] = 5; // allways 5 golden tokens

    dealCards(G);

    return G;
  },

  moves: {
    clickGem(G, ctx, gems) {
      // cancel action if didn't select 3 gems
      if (isNil(gems)
        || gems.length < 3) {
        return G;
      }

      // cancel action if try to buy a golden gem
      if (gems[0] === GEM.YELLOW
        || gems[1] === GEM.YELLOW
        || gems[2] === GEM.YELLOW) {
        return G;
      }
      // cancel action if any gem is not available to buy
      if (G.gems[gems[0]] === 0
        || G.gems[gems[1]] === 0
        || G.gems[gems[2]] === 0) {
        return G;
      }

      const Gcopy = { ...G };
      Gcopy.gems[gems[0]] -= 1;
      Gcopy.gems[gems[1]] -= 1;
      Gcopy.gems[gems[2]] -= 1;

      Gcopy.players[ctx.currentPlayer].gems[gems[0]] += 1;
      Gcopy.players[ctx.currentPlayer].gems[gems[1]] += 1;
      Gcopy.players[ctx.currentPlayer].gems[gems[2]] += 1;

      return Gcopy;
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
        player.gems[GEM.YELLOW] -= accum;
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
      if (Gcopy.gems[GEM.YELLOW] === 0
        || player.reserved.length === 3) {
        return G;
      }

      const card = Gcopy.cards[tier][pos];
      Gcopy.cards[tier].splice(pos, 1);
      player.reserved.push(card);
      player.gems[GEM.YELLOW] += 1;
      Gcopy.gems[GEM.YELLOW] -= 1;

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
