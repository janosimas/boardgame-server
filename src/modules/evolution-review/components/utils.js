import { getSpecie, SpecieID } from './specieID';
import { FOOD_TYPE } from './food_type';
import { specieEat } from './specie';
import { traitsBehaviour } from './traits/traits_behaviour';

export const currentPlayer = (G, ctx) => {
  return G.players[ctx.currentPlayer];
};

export const getState = (G) => {
  return Object.assign({}, G);
};

export const eat = (state, ctx, specieID, food, source, types, triggerEffects = true) => {
  if (state[source] < food) {
    food = state[source];
  }

  state[source] -= food;
  specieEat(state, ctx, specieID, food);

  if (triggerEffects) {
    triggerSpecieGotFood(state, ctx, specieID, source, types);
  }
}

const triggerSpecieGotFood = (state, ctx, specieID, source, types) => {
  triggerSpecieGotFoodSelf(state, ctx, specieID, source, types);
  triggerSpecieGotFoodLeft(state, ctx, specieID, source, types);
  triggerSpecieGotFoodRight(state, ctx, specieID, source, types);

  triggerSpecieGotFoodGlobal(state, ctx, specieID, source, types);
};

const triggerSpecieGotFoodSelf = (state, ctx, specieID, source, types) => {
  const [specie] = getSpecie(state, ctx, specieID);
  for (const trait of specie.traits) {
    if (traitsBehaviour.hasOwnProperty(trait.name + 'specieGotFood')) {
      traitsBehaviour[trait.name + 'specieGotFood'](state, ctx, specieID, source, types);
    }
  }
};

const triggerSpecieGotFoodLeft = (state, ctx, specieID, source, types) => {
  const [specie] = getSpecie(state, ctx, specieID);
  for (const trait of specie.traits) {
    if (traitsBehaviour.hasOwnProperty(trait.name + 'giveFoodLeft')) {
      if (traitsBehaviour[trait.name + 'giveFoodLeft'](state, ctx, source, types)) {
        eat(state, ctx, new SpecieID(specieID.playerID, specieID.specieIdx - 1), 1, source, types);
      }
    }
  }
};

const triggerSpecieGotFoodRight = (state, ctx, specieID, source, types) => {
  const [specie] = getSpecie(state, ctx, specieID);
  for (const trait of specie.traits) {
    if (traitsBehaviour.hasOwnProperty(trait.name + 'giveFoodRight')) {
      if (traitsBehaviour[trait.name + 'giveFoodRight'](state, ctx, source, types)) {
        eat(state, ctx, new SpecieID(specieID.playerID, specieID.specieIdx + 1), 1, source, types);
      }
    }
  }
};

const triggerSpecieGotFoodGlobal = (state, ctx, specieID, source, types) => {
  for (let playerID = 0; playerID < state.players.length; playerID++) {
    const player = state.players[playerID];
    for (let specieIdx = 0; specieIdx < player.species.length; specieIdx++) {
      const specie = player.species[specieIdx];
      for (const trait of specie.traits) {
        if (traitsBehaviour.hasOwnProperty(trait.name + 'globalSpecieGotFood')) {
          const { food, newSource, newType } = traitsBehaviour[trait.name + 'globalSpecieGotFood'](state, ctx, source, types);
          if (food) {
            eat(state, ctx, new SpecieID(playerID, specieIdx), food, newSource, newType);
          }
        }
      }
    }
  }
};

export const isHungry = (G, ctx, specieID) => {
  const [specie] = getSpecie(G, ctx, specieID);
  return specie.food < specie.population;
}

export const canEat = (G, ctx, specieID) => {
  if (isHungry(G, ctx, specieID)) {
    return true;
  }

  const [specie] = getSpecie(G, ctx, specieID);
  for (const trait of specie.traits) {
    if (traitsBehaviour.hasOwnProperty(trait.name + 'canEat')) {
      if (traitsBehaviour[trait.name + 'canEat'](G, ctx, specieID, trait)) {
        return true;
      }
    }
  }

  return false;
}

export const canEatFoodType = (G, ctx, specieID, foodtypes) => {
  if (foodtypes.includes(FOOD_TYPE.MEAT)) {
    return isCarnivore(G, ctx, specieID);
  } else if (foodtypes.includes(FOOD_TYPE.PLANT)) {
    return canEatPlant(G, ctx, specieID);
  }

  return false;
}

export const canEatPlant = (G, ctx, specieID) => {
  return !isCarnivore(G, ctx, specieID);
}

export const isCarnivore = (G, ctx, specieID) => {
  const [specie] = getSpecie(G, ctx, specieID);
  for (const trait of specie.traits) {
    if (trait.carnivore) {
      return true;
    }
  }
  return false;
}

export const canAddTrait = (G, ctx, specieID, trait) => {
  const [specie] = getSpecie(G, ctx, specieID);

  for (const ownedTrait of specie.traits) {
    if (trait.name === ownedTrait.name) {
      return false;
    }
  }

  if (specie.traits.length < 4) {
    return true;
  }else {
    return false;
  }
}

export const canIncreasePopulation = (G, ctx, specieID) => {
  const [specie] = getSpecie(G, ctx, specieID);
  return specie.population < 9;
}

export const canIncreaseBodySize = (G, ctx, specieID) => {
  const [specie] = getSpecie(G, ctx, specieID);
  return specie.bodySize < 9;
}

export const canAttack = (G, ctx, attackingSpecieID, defendingSpecieID) => {
  if (!(attackValue(G, ctx, attackingSpecieID) > defenseValue(G, ctx, defendingSpecieID))) {
    return false;
  }

  if (!canBeAttacked(G, ctx, attackingSpecieID, defendingSpecieID)) {
    return false;
  }

  return true;
}

const canBeAttacked = (G, ctx, attackerSpecieId, defendingSpecieId) => {
  const [defendingSpecie, player] = getSpecie(G, ctx, defendingSpecieId);
  for (const trait of defendingSpecie.traits) {
    if (traitsBehaviour.hasOwnProperty(trait.name + 'canBeAttackedBy')) {
      if (!traitsBehaviour[trait.name + 'canBeAttackedBy'](G, ctx, defendingSpecieId, attackerSpecieId)) {
        return false;
      }
    }
  }


  if (defendingSpecieId.specieIdx > 0) {
    const [leftDefendingSpecie] = getSpecie(G, ctx, new SpecieID(defendingSpecieId.playerID, defendingSpecieId.specieIdx - 1));
    for (const trait of leftDefendingSpecie.traits) {
      if (traitsBehaviour.hasOwnProperty(trait.name + 'canBeAttackedByLeft')) {
        if (!traitsBehaviour[trait.name + 'canBeAttackedByLeft'](G, ctx, defendingSpecieId, attackerSpecieId)) {
          return false;
        }
      }
    }
  }

  if (defendingSpecieId.specieIdx + 1 < player.species.length) {
    const [rightDefendingSpecie] = getSpecie(G, ctx, new SpecieID(defendingSpecieId.playerID, defendingSpecieId.specieIdx + 1));
    for (const trait of rightDefendingSpecie.traits) {
      if (traitsBehaviour.hasOwnProperty(trait.name + 'canBeAttackedByLeft')) {
        if (!traitsBehaviour[trait.name + 'canBeAttackedByLeft'](G, ctx, defendingSpecieId, attackerSpecieId)) {
          return false;
        }
      }
    }
  }

  return true;
};

const defenseValue = (G, ctx, specieID) => {
  const [specie] = getSpecie(G, ctx, specieID);

  let defValue = specie.bodySize;

  for (const trait of specie.traits) {
    if (traitsBehaviour.hasOwnProperty(trait.name + 'increaseDefense')) {
      defValue += traitsBehaviour[trait.name + 'increaseDefense'](G, ctx, specie);
    }
  }

  return defValue;
}

const attackValue = (G, ctx, specieID) => {
  const [specie] = getSpecie(G, ctx, specieID);

  let attValue = specie.bodySize;

  for (const trait of specie.traits) {
    if (traitsBehaviour.hasOwnProperty(trait.name + 'increaseAttack')) {
      attValue += traitsBehaviour[trait.name + 'increaseAttack'](G, ctx, specie);
    }
  }

  return attValue;
}

export const drawCard = (state, ctx, playerID, number) => {
  number = number || 1;
  for (let index = 0; index < number; index++) {
    const card = state.secret.traitsDeck.pop();
    if (!card) {
      // empty deck
      break;
    }

    state.players[playerID].hand.push(card);
  }
};

export const loosePopulation = (state, ctx, specieID) => {
  const [specie, player] = getSpecie(state, ctx, specieID);
  specie.population--;

  if (specie.population === 0) {
    player.species.splice(specieID.specieIdx, 1);
  }
};

const triggerPlayerSpecieTrait = (state, ctx, functionName) => {
  for (const player of state.players) {
    for (const specie of player.species) {
      for (const trait of specie.traits) {
        if (traitsBehaviour.hasOwnProperty(trait.name + functionName)) {
          traitsBehaviour[trait.name + functionName](state, ctx, new SpecieID(player.species.indexOf(specie), state.players.indexOf(player)), trait);
        }
      }
    }
  }
};

export const triggerOnPhaseEndTraits = (state, ctx) => {
  triggerPlayerSpecieTrait(state, ctx, 'onPhaseEnd');
};

export const triggerOnPhaseBeginTraits = (state, ctx) => {
  triggerPlayerSpecieTrait(state, ctx, 'onPhaseBegin');
};

export const triggerBeforeAttack = (state, ctx, defendingSpecieID, attackingSpecieID) => {
  const [defendingSpecie] = getSpecie(state, ctx, defendingSpecieID);
  for (const trait of defendingSpecie.traits) {
    if (traitsBehaviour.hasOwnProperty(trait.name + 'beforeAttack')) {
      traitsBehaviour[trait.name + 'beforeAttack'](state, ctx, attackingSpecieID, defendingSpecieID);
    }
  }
};

export const attackOtherSpecie = (state, ctx, defendingSpecieID) => {
  const player = currentPlayer(state, ctx);
  if (player.selectedSpecie === undefined) {
    return state;
  }

  const [specie] = getSpecie(state, ctx, player.selectedSpecie);
  if (!canEat(state, ctx, player.selectedSpecie)
    || !isCarnivore(state, ctx, player.selectedSpecie)
    || state.foodBank === 0) {
    return state;
  }

  const [defendingSpecie] = getSpecie(state, ctx, defendingSpecieID);
  if (!canAttack(state, ctx, player.selectedSpecie, defendingSpecieID)) {
    return state;
  }

  triggerBeforeAttack(state, ctx, defendingSpecieID, player.selectedSpecie);

  loosePopulation(state, ctx, defendingSpecieID);

  const missingFood = specie.population - specie.food;
  const food = defendingSpecie.bodySize > missingFood ? missingFood : defendingSpecie.bodySize;
  eat(state, ctx, player.selectedSpecie, food, 'foodBank', [FOOD_TYPE.MEAT, FOOD_TYPE.ATTACK]);

  player.selectedSpecie = undefined;
  state.endTurn = true;
  return state;
};

export const getCardFromHand = (state, ctx, index) => {
  const player = currentPlayer(state, ctx);
  // sanity check
  if (index < 0 || index > player.hand.length) {
    return undefined;
  }

  const card = player.hand.splice(index, 1)[0];
  return card;
};
