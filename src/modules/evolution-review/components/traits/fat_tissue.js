import { Trait, TRAIT_TYPE } from './trait';
import { PHASES } from '../phases';
import { isHungry } from '../utils';
import { getSpecie } from '../specieID';
import { traitsBehaviour } from './traits_behaviour';

const FatTissueName = 'Fat Tissue';

class FatTissue extends Trait {
  constructor(food) {
    super(FatTissueName, [TRAIT_TYPE.EATING], food, 'May store food on this card up to its Body Size. Before the Food Cards are revealed, move this food to the species board.');
    this.storedFood = 0;
  }
}

const canEat = (G, ctx, specieID, trait) => {
  if (isHungry(G, ctx, specieID)) {
    return true;
  }

  const [specie] = getSpecie(G, ctx, specieID);
  return trait.storedFood < specie.bodySize;
}

// register functions in functions map
traitsBehaviour[FatTissueName + 'canEat'] = canEat;

const storeFood = (G, ctx, specieID, trait, food) => {
  trait.storedFood += food;
  const [specie] = getSpecie(G, ctx, specieID);
  if (trait.storedFood > specie.bodySize) {
    trait.storedFood = specie.bodySize;
  }

  trait.name = FatTissueName + ' (' + trait.storedFood + ')';
}

// register functions in functions map
traitsBehaviour[FatTissueName + 'storeFood'] = storeFood;

const onPhaseEnd = (state, ctx, specieID, trait) => {
  if (ctx.phase === PHASES.PLAY_FOOD_PHASE) {
    if (trait.storedFood > 0) {

      const [specie] = getSpecie(state, ctx, specieID);

      specie.food = trait.storedFood;
      if (specie.food > specie.bodySize) {
        specie.food = specie.bodySize;
      }

      trait.storedFood -= specie.food;
      trait.name = FatTissueName + ' (' + trait.storedFood + ')';
    }
  }
}

// register functions in functions map
traitsBehaviour[FatTissueName + 'onPhaseEnd'] = onPhaseEnd;

const FatTissueCards = [];
FatTissueCards.push(new FatTissue(-1));
FatTissueCards.push(new FatTissue(0));
FatTissueCards.push(new FatTissue(3));
FatTissueCards.push(new FatTissue(4));
FatTissueCards.push(new FatTissue(4));
FatTissueCards.push(new FatTissue(5));
FatTissueCards.push(new FatTissue(5));


export default FatTissueCards;
