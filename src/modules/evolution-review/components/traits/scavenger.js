import { Trait, TRAIT_TYPE } from './trait';
import FOOD_TYPE from '../food_type';
import { traitsBehaviour } from './base_traits';

const name = 'Scavenger';

class Scavenger extends Trait {
  constructor(food) {
    super(name, [TRAIT_TYPE.EATING], food, 'Take 1 food from the Food Bank when any species is attacked by a Carnivore.');
  }
}

const globalSpecieGotFood = (state, ctx, source, types) => {
  if (types.includes(FOOD_TYPE.ATTACK)) {
    return { food: 1, newSource: source, newType: [FOOD_TYPE.MEAT] };
  }
}

// register functions in functions map
traitsBehaviour[name + 'globalSpecieGotFood'] = globalSpecieGotFood;

const ScavengerCards = [];
ScavengerCards.push(new Scavenger(2));
ScavengerCards.push(new Scavenger(3));
ScavengerCards.push(new Scavenger(4));
ScavengerCards.push(new Scavenger(5));
ScavengerCards.push(new Scavenger(6));
ScavengerCards.push(new Scavenger(6));
ScavengerCards.push(new Scavenger(7));

export default ScavengerCards;