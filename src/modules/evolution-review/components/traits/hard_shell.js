import Trait from './trait';
import { traitsBehaviour } from './base_traits';

const name = 'HardShell';

class HardShell extends Trait {
  constructor(food) {
    super(name, [], food);
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