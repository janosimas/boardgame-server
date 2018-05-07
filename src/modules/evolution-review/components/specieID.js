export class SpecieID {
  constructor(playerID, specieIdx) {
    this.playerID = playerID;
    this.specieIdx = specieIdx;
  }
}

export const getPlayer = (G, ctx, specieID) => {
  return G.players[specieID.playerID];
}

export const getSpecie = (G, ctx, specieID) => {
  const player = getPlayer(G, ctx, specieID);
  return [ player.species[specieID.specieIdx], player ];
}
