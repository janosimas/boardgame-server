/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from 'boardgame.io/core';
import { GEM, YELLOW } from './components/gems';
import { cards } from './components/cards';
import { dealCards, canBuy, canReserve, calcPoints, countGems } from './components/utils';

import { isNil, isEmpty, uniq } from 'ramda';
import { TIER, RESERVE } from './components/tiers';
import { PHASE } from './components/phases';
import { INVALID_MOVE } from 'boardgame.io/dist/core';
import { nobles } from './components/nobles';

const Splendor = Game({
  name: 'Splendor',

  setup: (ctx) => {
    let numOfGems = 4;
    let numOfNobles = 3;
    if (ctx.numPlayers === 3) {
      numOfGems = 5;
      numOfNobles = 4;
    } else if (ctx.numPlayers === 4) {
      numOfGems = 7;
      numOfNobles = 5;
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
      decks: cards,
      cards: {
        [TIER.ONE]: [],
        [TIER.TWO]: [],
        [TIER.THREE]: [],
      },
      nobles: ctx.random.Shuffle(nobles).slice(0, numOfNobles),
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
        reserved: [],
        nobles: [],
        matchNobles: []
      });
    }

    dealCards(G, ctx);

    return G;
  },

  moves: {
    clickGem: (G, ctx, gems) => {
      // cancel action if didn't select 3 gems
      if (isNil(gems)) {
        return INVALID_MOVE;
      }

      if ((gems.length === 2 && gems[0] != gems[1])
        || (gems.length === 3 && uniq(gems).length != 3)) {
        return INVALID_MOVE;
      }

      // cancel action if try to buy a golden gem
      if (gems.find(gem => gem === YELLOW)) {
        return INVALID_MOVE;
      }
      // cancel action if any gem is not available to buy
      if (gems.some(gem => G.gems[gem] === 0)) {
        return INVALID_MOVE;
      }

      gems.forEach(gem => {
        G.players[ctx.currentPlayer].gems[gem]++;
        G.gems[gem]--;
      });
    },

    buyCard: (G, ctx, tier, pos) => {
      //cancel action if no tier or position
      if (isNil(tier)
        || isNil(pos)
        || pos < 0
        || pos > 3) {
        return INVALID_MOVE;
      }

      const player = G.players[ctx.currentPlayer];
      let card = tier === RESERVE ? player.reserved[pos] : G.cards[tier][pos];
      if (!canBuy(player, card)) {
        return INVALID_MOVE;
      }
      tier === RESERVE ? player.reserved.splice(pos, 1) : G.cards[tier].splice(pos, 1);

      let accum = 0;
      for (const key in GEM) {
        // use cards to pay the cost
        let temp = card[GEM[key]] - player.cards[GEM[key]];

        // use gems to pay the cost
        if (temp > 0) {
          const cost = temp;
          temp -= player.gems[GEM[key]];
          while (player.gems[GEM[key]] != 0 && cost != 0) {
            player.gems[GEM[key]]--;
            G.gems[GEM[key]]++;
          }
        }

        // accum the remainder to pay the cost with gold coins
        if (temp > 0) {
          accum += temp;
        }
      }

      if (accum > 0) {
        player.gems[YELLOW] -= accum;
        G.gems[YELLOW] += accum;
      }

      player.cards[card.bonus].push(card);
    },

    reserveCard: (G, ctx, tier, pos) => {
      //cancel action if no tier or position
      if (isNil(tier)
        || isNil(pos)
        || pos < 0
        || pos > 3) {
        return INVALID_MOVE;
      }

      const player = G.players[ctx.currentPlayer];
      // check if can reserve
      if (!canReserve(G, player)) {
        return INVALID_MOVE;
      }

      const card = G.cards[tier][pos];
      G.cards[tier].splice(pos, 1);
      player.reserved.push(card);
      player.gems[YELLOW]++;
      G.gems[YELLOW]--;
    },

    discardExtraTokens: (G, ctx, gems) => {
      // cancel action if didn't select any gem
      if (isNil(gems) || gems.length === 0) {
        return INVALID_MOVE;
      }

      const player = G.players[ctx.currentPlayer];
      // cancel action if player doesn't have that gem
      if (gems.some(gem => player.gems[gem] === 0)) {
        return INVALID_MOVE;
      }

      gems.forEach(gem => {
        G.players[ctx.currentPlayer].gems[gem]--;
        G.gems[gem]++;
      });
    },
    selectNoble: (G, ctx, index) => {
      // TODO: add sanity check
      const player = G.players[ctx.currentPlayer];
      player.nobles.push(player.matchNobles[index]);
      player.matchNobles = undefined;
      G.nobles.splice(index, 1);
    }
  },

  flow: {
    startingPhase: PHASE.ACTION_PHASE,
    phases: {
      [PHASE.ACTION_PHASE]: {
        allowedMoves: ['clickGem', 'buyCard', 'reserveCard'],
        next: PHASE.SELECT_NOBLE_PHASE,
        onPhaseEnd: (G, ctx) => dealCards(G, ctx),
        onMove: (G, ctx) => ctx.events.endPhase(),
        endGameIf: (G, ctx) => {
          let maxPoints = 0;
          let maxPointsPlayers = [];

          // check for players with 15 or more points
          for (const playerID in G.players) {
            if (G.players.hasOwnProperty(playerID)) {
              const player = G.players[playerID];
              const points = calcPoints(player);
              if (points >= 15) {
                if (points > maxPoints) {
                  // player with most points
                  maxPoints = points;
                  maxPointsPlayers = [playerID];
                } else if (points === maxPoints) {
                  // tie between players
                  maxPointsPlayers.push(playerID);
                }
              }
            }
          }

          // Tie breaker:
          // 1) player with least cards
          let leastCards = 1000; // very high number
          for (const playerID of [...maxPointsPlayers]) {
            const player = G.players[playerID];
            let cardsCount = 0;
            for (const key in GEM) {
              const gem = GEM[key];
              cardsCount += player.cards[gem];
            }

            if (cardsCount < leastCards) {
              maxPointsPlayers = [playerID];
              leastCards = cardsCount;
            }
          }

          if (!isEmpty(maxPointsPlayers)) {
            return maxPointsPlayers[0];
          }
        },
      },
      [PHASE.SELECT_NOBLE_PHASE]: {
        next: PHASE.DISCARD_TOKENS_PHASE,
        allowedMoves: ['selectNoble'],
        onPhaseBegin: (G, ctx) => {
          const player = G.players[ctx.currentPlayer];
          if (isNil(player.matchNobles)) {
            return;
          }

          if (player.matchNobles.length === 1) {
            // if only one noble match
            // - save it to player
            // - clear list
            // - remove from game pool
            player.nobles.push(player.matchNobles[0]);
            player.matchNobles = undefined;
            G.nobles.pop();
          }
        },
        endPhaseIf: (G, ctx) => isNil(G.players[ctx.currentPlayer].matchNobles),
      },
      [PHASE.DISCARD_TOKENS_PHASE]: {
        next: PHASE.ACTION_PHASE,
        allowedMoves: ['discardExtraTokens'],
        endPhaseIf: (G, ctx) => countGems(G.players[ctx.currentPlayer]) <= 10,
        onPhaseEnd: (G, ctx) => ctx.events.endTurn(),
      }
    },
  },
});

export default Splendor;
