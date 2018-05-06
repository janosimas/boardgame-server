import Trait from './trait';
import PHASES from '../phases';
import { eat } from '../utils';
import FOOD_TYPE from '../food_type';
import { traitsBehaviour } from './base_traits';

const name = 'Long Neck';

class LongNeck extends Trait {
  constructor(food) {
    super(name, [], food);
  }
}

const onPhaseEnd = (state, ctx, specieID, trait) => {
  if (ctx.phase === PHASES.PLAY_FOOD_PHASE) {
    eat(state, ctx, specieID, 1, 'foodBank', [FOOD_TYPE.PLANT]);
  }
}

// register functions in functions map
traitsBehaviour[name + 'onPhaseEnd'] = onPhaseEnd;

const LongNeckCards = [];
LongNeckCards.push(new LongNeck(3));
LongNeckCards.push(new LongNeck(4));
LongNeckCards.push(new LongNeck(5));
LongNeckCards.push(new LongNeck(6));
LongNeckCards.push(new LongNeck(7));
LongNeckCards.push(new LongNeck(8));
LongNeckCards.push(new LongNeck(9));

export default LongNeckCards;