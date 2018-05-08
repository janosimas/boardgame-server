import { Trait, TRAIT_TYPE } from './trait';
import { getSpecie } from '../specieID';
import { traitsBehaviour } from './traits_behaviour';

const name = 'Pack Hunting';

class PackHunting extends Trait {
  constructor(food) {
    super(name, [TRAIT_TYPE.CARNIVORE], food, 'This species Body Size is equal to its Population + Body Size when determining if it can attack other species.');
  }
}

const increaseAttack = (G, ctx, specieID) => {
  const [specie] = getSpecie(G, ctx, specieID);
  return specie.population;
}

// register functions in functions map
traitsBehaviour[name + 'increaseAttack'] = increaseAttack;


const PackHuntingCards = [];
PackHuntingCards.push(new PackHunting(-3));
PackHuntingCards.push(new PackHunting(-2));
PackHuntingCards.push(new PackHunting(-1));
PackHuntingCards.push(new PackHunting(0));
PackHuntingCards.push(new PackHunting(1));
PackHuntingCards.push(new PackHunting(2));
PackHuntingCards.push(new PackHunting(3));

export default PackHuntingCards;
