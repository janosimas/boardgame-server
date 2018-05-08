import { Trait, TRAIT_TYPE } from './trait';
import { PHASES } from '../phases';
import { getSpecie } from '../specieID';
import { traitsBehaviour } from './traits_behaviour';

const name = 'Fertile';

class Fertile extends Trait {
  constructor(food) {
    super(name, [TRAIT_TYPE.OTHER], food, 'Before the food cards are revealed, increase this species Population by 1 if there is food on the Watering Hole from the previous round.');
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
