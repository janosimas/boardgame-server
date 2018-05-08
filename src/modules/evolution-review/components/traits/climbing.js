import { Trait, TRAIT_TYPE } from './trait';
import { traitsBehaviour } from './traits_behaviour';
import { getSpecie } from '../specieID';

const name = 'Climbing';

class Climbing extends Trait {
  constructor(food) {
    super(name, [TRAIT_TYPE.DEFENSIVE, TRAIT_TYPE.CARNIVORE], food, 'A Carnivore must have climbing to attack this specie.');
    this.climbing = true;
  }
}

const canBeAttackedBy = (G, ctx, defendingSpecieId, attackerSpecieId) => {
  const [attackerSpecie] = getSpecie(G, ctx, attackerSpecieId);
  for (const attTrait of attackerSpecie.traits) {
    if (attTrait.climbing === true) {
      return true;
    }
  }

  return false;
}
// register functions in functions map
traitsBehaviour[name + 'canBeAttackedBy'] = canBeAttackedBy;

const ClimbingCards = [];
ClimbingCards.push(new Climbing(1));
ClimbingCards.push(new Climbing(2));
ClimbingCards.push(new Climbing(3));
ClimbingCards.push(new Climbing(3));
ClimbingCards.push(new Climbing(4));
ClimbingCards.push(new Climbing(4));
ClimbingCards.push(new Climbing(5));


export default ClimbingCards;
