/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from "boardgame.io/core";

import { contains, map, indexOf, isNil } from "ramda";

import { default as german } from "./languages/de-de.js";

import { getTranslation } from "./components/getTranslation";
import { getImages } from "./components/getImages";
import { getCompleteTextFromWord } from "./components/getCompleteTextFromWord";
import { PHASE } from "./components/phase.js";
import { selectTranslationMove } from "./components/selectTranslationMove";
import { takeHintMove } from "./takeHintMove";
import {
  TRANSLATION_OPTIONS,
  SOURCE_LANGUAGE,
  DESTIN_LANGUAGE
} from "./components/gameOptions";

import dotenv from "dotenv";
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
          let wordsToTranslate = ctx.random.Shuffle(G.secret.words).slice(1, 5);

          const currentWordItem = wordsToTranslate[0];
          G.currentContext = {
            word: getCompleteTextFromWord(currentWordItem),
            translations: []
          };

          wordsToTranslate = ctx.random.Shuffle(wordsToTranslate);

          G.secret.currentContext = {
            right_option: indexOf(currentWordItem, wordsToTranslate)
          };

          G.currentContext.translations = map(
            wordItem => getTranslation(wordItem.word, SOURCE_LANGUAGE, DESTIN_LANGUAGE),
            wordsToTranslate
          );

          G.secret.currentContext.images = getImages(currentWordItem);
          // G.currentContext.revealed_images = G.secret.currentContext.images;
          G.currentContext.revealed_images = [null, null, null, null];
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
