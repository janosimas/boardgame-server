/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from "boardgame.io/core";

import { isNil } from "ramda";

import { default as german } from "./languages/de-de.js";

import { PHASE } from "./components/phase.js";
import { selectTranslationMove } from "./components/selectTranslationMove";
import { takeHintMove } from "./takeHintMove";

import dotenv from "dotenv";
import { setCurrentContex } from "./components/setCurrentContex.js";
dotenv.config();

const LanguageGame = Game({
  name: "LanguageGame",

  setup: ctx => {
    const G = {
      secret: {
        words: ctx.random.Shuffle([...german.words])
      }
    };

    G.players = [];
    for (let index = 0; index < ctx.numPlayers; index++) {
      G.players.push({
        points: 0
      });
    }
    return G;
  },

  moves: {
    selectTranslation: selectTranslationMove,

    takeHint: takeHintMove,

    endTurn: (_G, ctx) => {
      ctx.events.endTurn();
    }
  },
  flow: {
    startingPhase: PHASE.ACTION_PHASE,
    phases: {
      [PHASE.ACTION_PHASE]: {
        next: PHASE.POINTS_PHASE,
        allowedMoves: ["selectTranslation", "takeHint"],
        endPhaseIf: (G, _ctx) => !isNil(G.currentContext.points),
        onPhaseBegin: (G, ctx) => {
          setCurrentContex(G, ctx);
        }
      },
      [PHASE.POINTS_PHASE]: {
        next: PHASE.ACTION_PHASE,
        allowedMoves: ["endTurn"],
        onTurnEnd: (_G, ctx) => ctx.events.endPhase()
      }
    },
    onTurnEnd: (G, _ctx) => {
      G.currentContext = undefined;
      G.secret.currentContext = undefined;
    },
    endGameIf: (G, ctx) => {
      const player = G.players[ctx.currentPlayer];
      if (player.points >= 10) return ctx.currentPlayer;
    }
  }
});

export default LanguageGame;
