import { INVALID_MOVE } from "boardgame.io/core";
import { getPoints } from "./getPoints";
import { TRANSLATION_OPTIONS } from "./gameOptions";
export const selectTranslationMove = (G, ctx, selected_option) => {
  if (selected_option < 0 || selected_option > TRANSLATION_OPTIONS)
    return INVALID_MOVE;
  if (selected_option === G.secret.currentContext.right_option) {
    const player = G.players[ctx.currentPlayer];
    const points = getPoints(G, ctx);
    G.currentContext.points = points;
    player.points += points;
  }
  else {
    G.currentContext.points = 0;
  }
};
