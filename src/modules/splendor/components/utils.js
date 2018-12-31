import { GEM, YELLOW } from "./gemTypes";

const dealFromDeck = (G, deck) => {
  while (G.cards[deck].length < 4) {
    if (G.decks[deck].length > 0) {
      G.cards[deck].push(G.decks[deck].pop());
    } else {
      break;
    }
  }
}

export const dealCards = (G) => {
  dealFromDeck(G, 'tier1');
  dealFromDeck(G, 'tier2');
  dealFromDeck(G, 'tier3');
}

const countColor = (player, color) => player.gems[color] + player.cards[color].length;

const reduceColor = (player, card, color) => {
  const temp = card[color] - countColor(player, color);
  if (temp < 0) {
    return 0;
  } else {
    return temp;
  }
}

export const canBuy = (player, card) => {
  let accum = 0;
  for (const key in GEM) {
    accum += reduceColor(player, card, GEM[key]);
  }

  return accum <= player.gems[YELLOW];
}