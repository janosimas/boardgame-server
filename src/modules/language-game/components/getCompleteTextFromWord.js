import { isNil } from "ramda";
export const getCompleteTextFromWord = item => {
  let completeText = "";
  if (!isNil(item.prefix))
    completeText += item.prefix + " ";
  completeText += item.word;
  if (!isNil(item.sufix))
    completeText += " " + item.sufix;
  return completeText;
};
