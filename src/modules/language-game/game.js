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

import request from "sync-request";
import dotenv from "dotenv";
dotenv.config();

const getImages = wordItem => {
  const imageSearchString =
    isNil(wordItem.search_aid) || isNil(wordItem.search_aid.image)
      ? wordItem.word
      : wordItem.search_aid.image;

  const requestOptions = {
    key: process.env.PIXABAY_KEY,
    per_page: 4,
    q: imageSearchString
  };

  let requestUrl = "https://pixabay.com/api/?";
  for (const key in requestOptions) {
    const element = requestOptions[key];
    requestUrl += key + "=" + element + "&";
  }

  var res = request("GET", requestUrl);
  var body = JSON.parse(res.getBody("utf8"));

  return body.hits.map(obj => obj.webformatURL);
};

const getTranslation = word => {
  const requestOptions = {
    key: process.env.YANDEX_KEY,
    lang: "de-en",
    format: "plain",
    text: word
  };

  let requestUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate?";
  for (const key in requestOptions) {
    const element = requestOptions[key];
    requestUrl += key + "=" + element + "&";
  }

  var res = request("GET", requestUrl);
  var body = JSON.parse(res.getBody("utf8"));

  return body.text;
};

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
        word: getCompleteTextFromWord(currentWordItem),
        translations: []
      };

      const wordsToTranslate = map(
        index => G.secret.words[index].word,
        indexOfWordsToTranslate
      );

      G.secret.currentContext = {};
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
