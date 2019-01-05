import { GEM, YELLOW } from "./gems";
import { reduce } from 'ramda';
import { TIER } from "./tiers";

export const calcPoints = player => {
  let total = 0;
  Object.keys(GEM).map(gem => total += reduce((acc, c) => acc + c.points, 0, player.cards[GEM[gem]]));
  return total;
}

const dealFromDeck = (G, deck) => {
  while (G.cards[deck].length < 4) {
    if (G.decks[deck].length > 0) {
      G.cards[deck].push(G.decks[deck].pop());
    } else {
      break;
    }
  }
}

export const dealCards = (G, ctx) => {
  for (const tier in TIER) {
    if (TIER.hasOwnProperty(tier)) {
      G.decks[TIER[tier]] = ctx.random.Shuffle(G.decks[TIER[tier]])
      dealFromDeck(G, TIER[tier]);
    }
  }
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

export const canReserve = (G, player) => G.gems[YELLOW] != 0 && player.reserved.length != 3;

export const countGems = player => {
  let acc = 0;
  for (const key in player.gems) {
    acc += player.gems[key];
  }
  return acc;
}
