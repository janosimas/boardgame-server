import request from "sync-request";

export const getTranslation = (word, sourceLanguage, destinLanguage) => {
  const requestOptions = {
    key: process.env.YANDEX_KEY,
    lang: sourceLanguage + "-" + destinLanguage,
    format: "plain",
    text: word
  };
  let requestUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate?";
  for (const key in requestOptions) {
    const element = requestOptions[key];
    requestUrl += key + "=" + element + "&";
  }
  var res = request("GET", encodeURI(requestUrl));
  var body = JSON.parse(res.getBody("utf8"));
  return body.text;
};
