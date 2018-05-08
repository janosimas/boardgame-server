import { Trait, TRAIT_TYPE } from './trait';
import { getSpecie } from '../specieID';
import { isHungry } from '../utils';
import { traitsBehaviour } from './traits_behaviour';

const name = 'Burrowing';

class Burrowing extends Trait {
  constructor(food) {
    super(name, [TRAIT_TYPE.DEFENSIVE, TRAIT_TYPE.CLIMATE], food, 'This specie cannot be attacked if it has enought food to prevent from starving.');
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
