
export class Trait {
  constructor(name, types, food, text) {
    this.name = name;
    this.food = food;
    this.types = types;
    this.className = 'trait';
    this.text = text;
  }
}

export const TRAIT_TYPE = {
  DEFENSIVE: 'Defensive trait',
  EATING: 'Eating trait',
  CARNIVORE: 'Carnivore trait',
  CLIMATE: 'Climate trait',
  OTHER: 'Other trait'
};