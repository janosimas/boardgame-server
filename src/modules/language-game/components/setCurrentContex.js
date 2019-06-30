import { getCompleteTextFromWord } from "./getCompleteTextFromWord";
import { map, indexOf } from "ramda";
import { getTranslation } from "./getTranslation";
import { SOURCE_LANGUAGE, DESTIN_LANGUAGE } from "./gameOptions";
import { getImages } from "./getImages";

const FROM_ORIGINAL_TO_TRANSLATION = true;

const fromTranslationToOriginal = (G, _ctx, wordsToTranslate, currentWordItem) => {
  G.currentContext = {
    word: getTranslation(currentWordItem.word, SOURCE_LANGUAGE, DESTIN_LANGUAGE),
    translations: []
  };

  G.currentContext.translations = map(
    wordItem => getCompleteTextFromWord(wordItem),
    wordsToTranslate
  );
}

const fromOriginalToTranslation = (G, _ctx, wordsToTranslate, currentWordItem) => {
  G.currentContext = {
    word: getCompleteTextFromWord(currentWordItem),
    translations: []
  };

  G.currentContext.translations = map(
    wordItem => getTranslation(wordItem.word, SOURCE_LANGUAGE, DESTIN_LANGUAGE),
    wordsToTranslate
  );
}

export const setCurrentContex = (G, ctx) => {
  let wordsToTranslate = ctx.random.Shuffle(G.secret.words).slice(1, 5);
  const currentWordItem = wordsToTranslate[0];

  wordsToTranslate = ctx.random.Shuffle(wordsToTranslate);

  G.secret.currentContext = {
    right_option: indexOf(currentWordItem, wordsToTranslate)
  };

  if(FROM_ORIGINAL_TO_TRANSLATION)
    fromOriginalToTranslation(G, ctx, wordsToTranslate, currentWordItem);
  else
    fromTranslationToOriginal(G, ctx, wordsToTranslate, currentWordItem);

  G.secret.currentContext.images = getImages(currentWordItem);
  // G.currentContext.revealed_images = G.secret.currentContext.images;
  G.currentContext.revealed_images = [null, null, null, null];
};
