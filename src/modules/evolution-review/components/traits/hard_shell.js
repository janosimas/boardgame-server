import { Trait, TRAIT_TYPE } from './trait';
import { traitsBehaviour } from './traits_behaviour';

const name = 'HardShell';

class HardShell extends Trait {
  constructor(food) {
    super(name, [TRAIT_TYPE.DEFENSIVE], food, '+4 Body Size when determining if this species can be attacked.');
  }
}

const increaseDefense = () => {
  return 4;
}

// register functions in functions map
traitsBehaviour[name + 'increaseDefense'] = increaseDefense;

const HardShellCards = [];
HardShellCards.push(new HardShell(1));
HardShellCards.push(new HardShell(2));
HardShellCards.push(new HardShell(3));
HardShellCards.push(new HardShell(3));
HardShellCards.push(new HardShell(4));
HardShellCards.push(new HardShell(4));
HardShellCards.push(new HardShell(5));

export default HardShellCards;
