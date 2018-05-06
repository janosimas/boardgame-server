import { Trait, TRAIT_TYPE } from './trait';

export const AmbushName = 'Ambush';

class Ambush extends Trait {
  constructor(food) {
    super(AmbushName, [TRAIT_TYPE.CARNIVORE], food, 'Nagates Warning Call when attacking.');
  }
}

const AmbushCards = [];
AmbushCards.push(new Ambush(3));
AmbushCards.push(new Ambush(2));
AmbushCards.push(new Ambush(1));
AmbushCards.push(new Ambush(0));
AmbushCards.push(new Ambush(1));
AmbushCards.push(new Ambush(2));
AmbushCards.push(new Ambush(3));

export default AmbushCards;