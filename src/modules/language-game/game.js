/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from "boardgame.io/core";
import { INVALID_MOVE } from "boardgame.io/dist/core";

import { isNil, isEmpty, uniq, contains, map, indexOf } from "ramda";

import { default as german } from "./languages/de-de.js";

import { getTranslation, getImages } from "./components/requests";

import dotenv from "dotenv";
dotenv.config();

const getCompleteTextFromWord = item => {
  let completeText = "";
  if (!isNil(item.prefix)) completeText += item.prefix + " ";

  completeText += item.word;

  if (!isNil(item.sufix)) completeText += " " + item.sufix;

  return completeText;
};

const LanguageGame = Game({
  name: "LanguageGame",

  setup: ctx => {
    let G = {
      secret: {
        words: ctx.random.Shuffle([...german.words])
      }
    };
    return G;
  },

  moves: {
    selectTranslation: (G, ctx, selected_option) => {
      if(selected_option === G.secret.currentContext.right_option)
        ctx.events.endTurn();
    },

    selectPictureToShow: (G, ctx) => {}
  },
  flow: {
    onTurnBegin: (G, ctx) => {
      const currentWordIndex = parseInt(
        ctx.random.Number() * G.secret.words.length,
        10
      );
      let indexOfWordsToTranslate = [currentWordIndex];
      for (let i = 0; i < 4; ++i) {
        for (;;) {
          // get random words different from the target word
          let index = parseInt(ctx.random.Number() * G.secret.words.length, 10);
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

      G.currentContext.translations = map(getTranslation, wordsToTranslate);

      G.secret.currentContext.images = getImages(currentWordItem);
      G.currentContext.revealed_images = G.secret.currentContext.images;
      // G.currentContext.revealed_images = [null, null, null, null];
    },
    onTurnEnd: (G, ctx) => {
      G.currentContext = undefined;
      G.secret.currentContext = undefined;
    },
    onMove: (G, ctx) => {},
    endGameIf: (G, ctx) => {}
  }
});

export default LanguageGame;
