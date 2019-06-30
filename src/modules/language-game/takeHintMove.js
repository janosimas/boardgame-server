import { INVALID_MOVE } from "boardgame.io/core";
import { IMAGE_OPTIONS } from "./components/gameOptions";
export const takeHintMove = (G, _ctx, selected_hint) => {
  if (selected_hint < 0 || selected_hint > IMAGE_OPTIONS)
    return INVALID_MOVE;
  G.currentContext.revealed_images[selected_hint] =
    G.secret.currentContext.images[selected_hint];
};
