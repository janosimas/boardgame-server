/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from "boardgame.io/core";
import { INVALID_MOVE } from "boardgame.io/dist/core";

import { contains, map, indexOf, isNil } from "ramda";

import { default as german } from "./languages/de-de.js";

import { getTranslation } from "./components/getTranslation";
import { getImages } from "./components/getImages";
import { getCompleteTextFromWord } from "./components/getCompleteTextFromWord";
import { getPoints } from "./components/getPoints";

import {
  TRANSLATION_OPTIONS,
  SOURCE_LANGUAGE,
  DESTIN_LANGUAGE,
  IMAGE_OPTIONS
} from "./components/gameOptions";

import dotenv from "dotenv";
import { PHASE } from "./components/phase.js";
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
    selectTranslation: (G, ctx, selected_option) => {
      if (selected_option < 0 || selected_option > TRANSLATION_OPTIONS)
        return INVALID_MOVE;

      if (selected_option === G.secret.currentContext.right_option) {
        const player = G.players[ctx.currentPlayer];
        const points = getPoints(G, ctx);
        G.currentContext.points = points;
        player.points += points;
      } else {
        G.currentContext.points = 0;
      }
    },

    takeHint: (G, ctx, selected_hint) => {
      if (selected_hint < 0 || selected_hint > IMAGE_OPTIONS)
        return INVALID_MOVE;

      G.currentContext.revealed_images[selected_hint] =
        G.secret.currentContext.images[selected_hint];
    },

    endTurn: (G, ctx) => {
      ctx.events.endTurn();
    }
  },
  flow: {
    startingPhase: PHASE.ACTION_PHASE,
    phases: {
      [PHASE.ACTION_PHASE]: {
        next: PHASE.POINTS_PHASE,
        allowedMoves: ["selectTranslation", "takeHint"],
        endPhaseIf: (G, ctx) => !isNil(G.currentContext.points),
        onPhaseBegin: (G, ctx) => {
          const currentWordIndex = parseInt(
            ctx.random.Number() * G.secret.words.length,
            10
          );
          let indexOfWordsToTranslate = [currentWordIndex];
          for (let i = 0; i < TRANSLATION_OPTIONS; ++i) {
            for (;;) {
              // get random words different from the target word
              let index = parseInt(
                ctx.random.Number() * G.secret.words.length,
                10
              );
              if (!contains(index, indexOfWordsToTranslate)) {
                indexOfWordsToTranslate.push(index);
                break;
              }
            }
          }
          indexOfWordsToTranslate = ctx.random.Shuffle(indexOfWordsToTranslate);

          const currentWordItem = G.secret.words[currentWordIndex];
          G.currentContext = {
            word: getCompleteTextFromWord(currentWordItem),
            translations: []
          };

          G.secret.currentContext = {
            right_option: indexOf(currentWordIndex, indexOfWordsToTranslate)
          };

          const wordsToTranslate = map(
            index => G.secret.words[index].word,
            indexOfWordsToTranslate
          );

          G.currentContext.translations = map(
            word => getTranslation(word, SOURCE_LANGUAGE, DESTIN_LANGUAGE),
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
        onTurnEnd: (G, ctx) => ctx.events.endPhase()
      }
    },
    onTurnEnd: (G, ctx) => {
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
