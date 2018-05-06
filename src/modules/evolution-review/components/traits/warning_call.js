import Trait from './trait';
import { AmbushName } from './ambush';
import { getSpecie } from '../specieID';
import { traitsBehaviour } from './base_traits';

const name = 'Warning Call';

class WarningCall extends Trait {
  constructor(food) {
    super(name, [], food);
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