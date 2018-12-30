
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