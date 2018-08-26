export class SpecieID {
  constructor(playerID, specieIdx) {
    this.playerID = playerID;
    this.specieIdx = specieIdx;
  }
}

export const getPlayer = (G, ctx, specieID) => {
  if(!specieID) {
    throw Error('Undefined specie.');
  }
  const player =  G.players[specieID.playerID];
  if(!player) {
    throw Error('Undefined player: ' + specieID.playerID);
  }

  return player;
}

export const getSpecie = (G, ctx, specieID) => {
  const player = getPlayer(G, ctx, specieID);
  return [ player.species[specieID.specieIdx], player ];
}
