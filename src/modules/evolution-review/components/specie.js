import { traitsBehaviour } from "./traits/base_traits";
import { getSpecie } from "./specieID";

export const specieEat = (state, ctx, specieID, food) => {
  const [specie] = getSpecie(state, ctx, specieID);
  const hungry = specie.population - specie.food;
  let tempFood = food;
  if (tempFood > hungry) {
    tempFood = hungry;
  }
  specie.food += tempFood;

  // sanity check
  if (specie.food > specie.population) {
    specie.food = specie.population;
  }

  food -= tempFood;
  if (food === 0) {
    return;
  }

  for (const trait of specie.traits) {
    if (traitsBehaviour.hasownproperty(trait.name + 'storeFood')) {
      traitsBehaviour[trait.name + 'storeFood'](state, ctx, specieID, trait, food);
    }
  }
}