
export class Trait {
  constructor(name, types, food, text) {
    this.name = name;
    this.food = food;
    this.types = types;
    this.className = 'trait';
    this.text = text;
    this.exibitName = name;
  }
}

export const TRAIT_TYPE = {
  DEFENSIVE: 'Defensive trait',
  EATING: 'Eating trait',
  CARNIVORE: 'Carnivore trait',
  CLIMATE: 'Climate trait',
  OTHER: 'Other trait'
};

export const TRAIT_TYPE_COLOR = {
  DEFENSIVE: 'gray',
  EATING: 'green',
  CARNIVORE: 'red',
  CLIMATE: 'blue',
  OTHER: 'yellow'
}