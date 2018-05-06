import Trait from './trait';
import PHASES from '../phases';
import { getSpecie } from '../specieID';
import { traitsBehaviour } from './base_traits';

const name = 'Fertile';

class Fertile extends Trait {
  constructor(food) {
    super(name, [], food);
  }
}

const onPhaseEnd = (state, ctx, specieID, trait) => {
  if (ctx.phase === PHASES.PLAY_FOOD_PHASE) {
    if (state.wateringHole > 0) {
      const [specie] = getSpecie(state, ctx, specieID);
      specie.population++;
    }
  }
}

// register functions in functions map
traitsBehaviour[name + 'onPhaseEnd'] = onPhaseEnd;

const FertileCards = [];
FertileCards.push(new Fertile(2));
FertileCards.push(new Fertile(3));
FertileCards.push(new Fertile(4));
FertileCards.push(new Fertile(5));
FertileCards.push(new Fertile(6));
FertileCards.push(new Fertile(6));
FertileCards.push(new Fertile(7));


export default FertileCards;