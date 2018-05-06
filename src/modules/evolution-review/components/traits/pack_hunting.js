import Trait from './trait';
import { getSpecie } from '../specieID';
import { traitsBehaviour } from './base_traits';

const name = 'Pack Hunting';

class PackHunting extends Trait {
  constructor(food) {
    super(name, [], food);
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