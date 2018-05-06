import { Trait, TRAIT_TYPE } from './trait';
import { getSpecie } from '../specieID';
import { traitsBehaviour } from './base_traits';

const name = 'Horns';

class Horns extends Trait {
  constructor(food) {
    super(name, [TRAIT_TYPE.DEFENSIVE], food, 'A Carnivore must decrease its Population by 1 when attacking this species.');
  }
}

const beforeAttack = (state, ctx, attackerSpecieId, defendingSpecieId) => {
  const [attackerSpecie] = getSpecie(state, ctx, attackerSpecieId);
  attackerSpecie.population--;
}

// register functions in functions map
traitsBehaviour[name + 'beforeAttack'] = beforeAttack;

const HornsCards = [];
HornsCards.push(new Horns(1));
HornsCards.push(new Horns(2));
HornsCards.push(new Horns(3));
HornsCards.push(new Horns(3));
HornsCards.push(new Horns(4));
HornsCards.push(new Horns(4));
HornsCards.push(new Horns(5));

export default HornsCards;