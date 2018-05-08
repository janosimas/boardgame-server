import { Trait, TRAIT_TYPE } from './trait';
import { PHASES } from '../phases';
import { eat } from '../utils';
import { FOOD_TYPE } from '../food_type';
import { traitsBehaviour } from './traits_behaviour';

const name = 'Long Neck';

class LongNeck extends Trait {
  constructor(food) {
    super(name, [TRAIT_TYPE.EATING], food, 'Before Food Cards are revealed, take 1 Plant Food from the Food Bank.');
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
