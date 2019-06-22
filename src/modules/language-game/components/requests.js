import { isNil } from "ramda";

import request from "sync-request";

export const getImages = wordItem => {
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

export const getTranslation = word => {
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
