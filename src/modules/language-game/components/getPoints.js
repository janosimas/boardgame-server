import { isNil } from "ramda";

export const getPoints = (G, ctx) => {
  let points = 10;
  for (let index = 0; index < G.currentContext.revealed_images.length; index++) {
    const element = G.currentContext.revealed_images[index];
    if(!isNil(element))
      points -= 2;
  }
  return points;
};
