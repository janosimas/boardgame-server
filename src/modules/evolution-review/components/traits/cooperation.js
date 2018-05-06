import Trait from './trait';
import { traitsBehaviour } from './base_traits';

const name = 'Cooperation';

class Cooperation extends Trait {
  constructor(food) {
    super(name, [], food);
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