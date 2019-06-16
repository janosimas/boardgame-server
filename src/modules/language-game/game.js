/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from "boardgame.io/core";
import { INVALID_MOVE } from "boardgame.io/dist/core";

import { isNil, isEmpty, uniq, contains, map } from "ramda";

import { default as german } from "./languages/de-de.js";

const getImages = word => {
  const imageSearchString = isNil(word.search_aid.image) ? word : word.search_aid.image
  return imageSearchString;
};

const getTranslation = word => {
  return word;
};

const getCompleteTextFromWord = item => {
  let completeText = "";
  if (!isNil(item.prefix)) completeText += item.prefix + ' ';

  completeText += item.word;

  if (!isNil(item.sufix)) completeText += ' ' + item.sufix;

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
    selectTranslation: (G, ctx) => {},

    selectPictureToShow: (G, ctx) => {}
  },
  flow: {
    onTurnBegin: (G, ctx) => {
      const currentWordIndex = parseInt(
        ctx.random.Number() * G.secret.words.length,
        10
      );
      const indexOfWordsToTranslate = [currentWordIndex];
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

      const currentWordItem = G.secret.words[currentWordIndex];
      G.currentContext = {
        word: getCompleteTextFromWord(),
        translations: []
      };

      const wordsToTranslate = map(
        index => G.secret.words[index].word,
        indexOfWordsToTranslate
      );

      G.currentContext.translations = map(getTranslation, wordsToTranslate);

      G.secret.currentContext.images = getImages(currentWordItem);
      G.secret.currentContext.revealed_images = [false, false, false, false];
      G.currentContext.revealed_images = [null, null, null, null];
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
