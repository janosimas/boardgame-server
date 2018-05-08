import { Trait, TRAIT_TYPE } from './trait';
import { traitsBehaviour } from './traits_behaviour';

const name = 'Cooperation';

class Cooperation extends Trait {
  constructor(food) {
    super(name, [TRAIT_TYPE.EATING], food, 'When this specie takes food, your species to the right takes 1 food from the same source.');
  }
}

const giveFoodRight = (G, ctx, source, type) => {
  return true;
}
// register functions in functions map
traitsBehaviour[name + 'giveFoodRight'] = giveFoodRight;

const CooperationCards = [];
CooperationCards.push(new Cooperation(0));
CooperationCards.push(new Cooperation(3));
CooperationCards.push(new Cooperation(3));
CooperationCards.push(new Cooperation(4));
CooperationCards.push(new Cooperation(4));
CooperationCards.push(new Cooperation(5));
CooperationCards.push(new Cooperation(5));


export default CooperationCards;
