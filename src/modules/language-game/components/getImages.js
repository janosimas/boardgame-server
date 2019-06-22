import { isNil } from "ramda";
import request from "sync-request";
import { DEFAULT_TRANSLATION_FOR_IMAGE, SOURCE_LANGUAGE } from "./gameOptions";
import { getTranslation } from "./getTranslation";

export const getImages = wordItem => {
  let imageSearchString = null;
  if (isNil(wordItem.search_aid) || isNil(wordItem.search_aid.image)) {
    // if we don't have a helper string
    // get the for in the default language
    imageSearchString = getTranslation(
      wordItem.word,
      SOURCE_LANGUAGE,
      DEFAULT_TRANSLATION_FOR_IMAGE
    );
  } else {
    imageSearchString = wordItem.search_aid.image;
  }
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
