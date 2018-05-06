import Trait from './trait';
import { getSpecie } from '../specieID';
import { isHungry } from '../utils';
import { traitsBehaviour } from './base_traits';

const name = 'Burrowing';

class Burrowing extends Trait {
  constructor(food) {
    super(name, [], food);
  }
}

const canBeAttackedBy = (G, ctx, defendingSpecieId, attackerSpecieId) => {
  const [defendingSpecie] = getSpecie(G, ctx, defendingSpecieId);
  return isHungry(G, ctx, defendingSpecie);
}
// register functions in functions map
traitsBehaviour[name + 'canBeAttackedBy'] = canBeAttackedBy;

const BurrowingCards = [];
BurrowingCards.push(new Burrowing(1));
BurrowingCards.push(new Burrowing(2));
BurrowingCards.push(new Burrowing(3));
BurrowingCards.push(new Burrowing(3));
BurrowingCards.push(new Burrowing(4));
BurrowingCards.push(new Burrowing(4));
BurrowingCards.push(new Burrowing(5));


export default BurrowingCards;