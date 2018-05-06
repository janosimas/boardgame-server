import { Trait, TRAIT_TYPE } from './trait';
import { getSpecie } from '../specieID';
import { traitsBehaviour } from './base_traits';

const name = 'Symbiosis';

class Symbiosis extends Trait {
  constructor(food) {
    super(name, [TRAIT_TYPE.DEFENSIVE], food, 'This species cannot be attacked if your species to the right has a larger Body Size than this species.');
  }
}

const canBeAttackedBy = (G, ctx, defendingSpecieId, attackerSpecieId) => {
  const [defendingSpecie, player] = getSpecie(G, ctx, defendingSpecieId);
  if ((player.species.length) > defendingSpecieId + 1) {
    const specieToTheRight = player.species(defendingSpecieId + 1);
    if (this.bodySize < specieToTheRight.bodySize) {
      return false;
    }
  }

  return true;
}

// register functions in functions map
traitsBehaviour[name + 'canBeAttackedBy'] = canBeAttackedBy;

const SymbiosisCards = [];
SymbiosisCards.push(new Symbiosis(1));
SymbiosisCards.push(new Symbiosis(2));
SymbiosisCards.push(new Symbiosis(3));
SymbiosisCards.push(new Symbiosis(3));
SymbiosisCards.push(new Symbiosis(4));
SymbiosisCards.push(new Symbiosis(4));
SymbiosisCards.push(new Symbiosis(5));

export default SymbiosisCards;