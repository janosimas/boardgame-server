import { getSpecie, SpecieID } from './specieID';
import { FOOD_TYPE } from './food_type';
import { specieEat } from './specie';
import { traitsBehaviour } from './traits/base_traits';

export const eat = (state, ctx, specieID, food, source, types, triggerEffects) => {
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
    if (traitsBehaviour.hasownproperty(trait.name + 'specieGotFood')) {
      traitsBehaviour[trait.name + 'specieGotFood'](state, ctx, specieID, source, types);
    }
  }
};

const triggerSpecieGotFoodLeft = (state, ctx, specieID, source, types) => {
  const [specie] = getSpecie(state, ctx, specieID);
  for (const trait of specie.traits) {
    if (traitsBehaviour.hasownproperty(trait.name + 'giveFoodLeft')) {
      if (traitsBehaviour[trait.name + 'giveFoodLeft'](state, ctx, source, types)) {
        eat(state, ctx, new SpecieID(specieID.playerID, specieID.specieIdx - 1), 1, source, types);
      }
    }
  }
};

const triggerSpecieGotFoodRight = (state, ctx, specieID, source, types) => {
  const [specie] = getSpecie(state, ctx, specieID);
  for (const trait of specie.traits) {
    if (traitsBehaviour.hasownproperty(trait.name + 'giveFoodRight')) {
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
        if (traitsBehaviour.hasownproperty(trait.name + 'globalSpecieGotFood')) {
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
  return isHungry(G, ctx, specieID);
}

export const canEatFoodType = (G, ctx, specieID, foodtypes) => {
  if (foodtypes.includes(FOOD_TYPE.MEAT)) {
    return isCarnivore(G, ctx, specieID);
  } else if (foodtypes.includes(FOOD_TYPE.PLANT)) {
    return canEatPlant(G, ctx, specieID);
  }
  assert(0);
  return false;
}

export const canEatPlant = (G, ctx, specieID) => {
  return !isCarnivore(G, ctx, specieID);
}

export const isCarnivore = (G, ctx, specieID) => {
  const [specie] = getSpecie(G, ctx, specieID);
  for (const trait of specie.traits) {
    if (trait.isCarnivore) {
      return true;
    }
  }
  return false;
}

export const canAddTrait = (G, ctx, specieID, trait) => {
  const [specie] = getSpecie(G, ctx, specieID);
  if (specie.traits.length === 4) {
    return false;
  }

  for (const ownedTrait of specie.traits) {
    if (trait.name === ownedTrait.name) {
      return false;
    }
  }

  return true;
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
  const [attackingSpecie] = getSpecie(G, ctx, attackingSpecieID);
  const [defendingSpecie] = getSpecie(G, ctx, defendingSpecieID);

  return attackingSpecie.bodySize > defendingSpecie.bodySize;
}
