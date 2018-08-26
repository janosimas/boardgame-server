import { Trait, TRAIT_TYPE } from './trait';
import { FOOD_TYPE } from '../food_type';
import { eat } from '../utils';
import { traitsBehaviour } from './traits_behaviour';

const name = 'Foraging';

class Foraging extends Trait {
  constructor(food) {
    super(name, [TRAIT_TYPE.EATING], food, 'Anytime this species eats Plant Food, take 1 additional Plant Food from the same source.');
  }
}

const specieGotFood = (state, ctx, specieID, source, types) => {
  if (types.includes(FOOD_TYPE.PLANT)) {
    let food = 1;
    eat(state, ctx, specieID, food, source, types, false);
  }
}

// register functions in functions map
traitsBehaviour[name + 'specieGotFood'] = specieGotFood;

const ForagingCards = [];
ForagingCards.push(new Foraging(0));
ForagingCards.push(new Foraging(3));
ForagingCards.push(new Foraging(3));
ForagingCards.push(new Foraging(4));
ForagingCards.push(new Foraging(4));
ForagingCards.push(new Foraging(5));
ForagingCards.push(new Foraging(5));


export default ForagingCards;
