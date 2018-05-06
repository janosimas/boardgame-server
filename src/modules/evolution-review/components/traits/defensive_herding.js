import Trait from './trait';
import { getSpecie } from '../specieID';
import { traitsBehaviour } from './base_traits';

const name = 'Defensive Herding';

class DefensiveHerding extends Trait {
  constructor(food) {
    super(name, [], food);
  }
}

const canBeAttackedBy = (G, ctx, defendingSpecieId, attackerSpecieId) => {
  const [defendingSpecie] = getSpecie(G, ctx, defendingSpecieId);
  const [attackerSpecie] = getSpecie(G, ctx, attackerSpecieId);
  return attackerSpecie.population > defendingSpecie.population;
}
// register functions in functions map
traitsBehaviour[name + 'canBeAttackedBy'] = canBeAttackedBy;

const DefensiveHerdingCards = [];
DefensiveHerdingCards.push(new DefensiveHerding(2));
DefensiveHerdingCards.push(new DefensiveHerding(3));
DefensiveHerdingCards.push(new DefensiveHerding(4));
DefensiveHerdingCards.push(new DefensiveHerding(5));
DefensiveHerdingCards.push(new DefensiveHerding(6));
DefensiveHerdingCards.push(new DefensiveHerding(7));
DefensiveHerdingCards.push(new DefensiveHerding(8));


export default DefensiveHerdingCards;