import { Trait, TRAIT_TYPE } from './trait';
import { AmbushName } from './ambush';
import { getSpecie } from '../specieID';
import { traitsBehaviour } from './traits_behaviour';

const name = 'Warning Call';

class WarningCall extends Trait {
  constructor(food) {
    super(name, [TRAIT_TYPE.DEFENSIVE], food, 'A Carnivore must have Ambush to attack your species that are adjacent to this species.');
  }
}

const canBeAttackedByLeft = (G, ctx, defendingSpecieId, attackerSpecieID) => {
  const [attackerSpecie] = getSpecie(G, ctx, attackerSpecieID);
  for (const trait of attackerSpecie.traits) {
    if (trait.name === AmbushName) {
      return true;
    }
  }

  return false;
}

// register functions in functions map
traitsBehaviour[name + 'canBeAttackedByLeft'] = canBeAttackedByLeft;

const canBeAttackedByRight = (G, ctx, defendingSpecieId, attackerSpecieID) => {
  const [attackerSpecie] = getSpecie(G, ctx, attackerSpecieID);
  for (const trait of attackerSpecie.traits) {
    if (trait.name === AmbushName) {
      return true;
    }
  }

  return false;
}

// register functions in functions map
traitsBehaviour[name + 'canBeAttackedByRight'] = canBeAttackedByRight;

const WarningCallCards = [];
WarningCallCards.push(new WarningCall(1));
WarningCallCards.push(new WarningCall(2));
WarningCallCards.push(new WarningCall(3));
WarningCallCards.push(new WarningCall(3));
WarningCallCards.push(new WarningCall(4));
WarningCallCards.push(new WarningCall(4));
WarningCallCards.push(new WarningCall(5));

export default WarningCallCards;
