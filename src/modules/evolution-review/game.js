import { Game } from 'boardgame.io/dist/core';
import { Specie } from './components/specie';
import Player from './components/player';
import { PHASES } from './components/phases';
import { BaseTraits } from './components/traits/base_traits';
import { FOOD_TYPE } from './components/food_type';
import { getCardFromHand, eat, drawCard, getState, currentPlayer, attackOtherSpecie, isCarnivore, canEat, canAddTrait, canIncreasePopulation, canIncreaseBodySize, triggerOnPhaseBeginTraits, triggerOnPhaseEndTraits, loosePopulation } from './components/utils';
import { SpecieID, getSpecie, getPlayer } from './components/specieID';

const Evolution = {
  name: 'Evolution',
  setup: (ctx) => {
    let G = {
      secret: {},
      players: [],
      discard: [],
      wateringHole: 0,
      foodBank: 100,
      // playerView: PlayerView.STRIP_SECRETS
    };

    // create n players for the game
    for (var i = 0; i < ctx.numPlayers; i++) {
      const player = new Player(i, 'Player ' + (i + 1));
      player.species.push(new Specie(player.id, 0));
      G.players.push(player);
    }

    G.secret.traitsDeck = ctx.random.Shuffle(BaseTraits);
    G.selectedCards = [];

    return G;
  },
  moves: {
    endTurn: (G, ctx) => {
      const state = getState(G, ctx);
      const player = currentPlayer(state, ctx);
      player.endTurn = true;
      state.endTurn = true;
      return state;
    },
    //////////////////////////////////////////
    // play card for food phase
    clickOnCardForFood: (G, ctx, index) => {
      const state = getState(G, ctx);
      const player = currentPlayer(state, ctx);
      const card = getCardFromHand(state, ctx, index);
      if (!card) {
        // client feedback
        player.hand.push(card);
        return G;
      }

      state.selectedCards.push(card);
      state.endTurn = true;

      return state;
    },
    //////////////////////////////////////////
    // cards action phase
    clickOnCard: (G, ctx, index) => {
      const state = getState(G, ctx);
      const player = currentPlayer(state, ctx);

      player.selectedCardIndex = index;
      return state;
    },

    newTrait: (G, ctx, specieID) => {
      const state = getState(G, ctx);
      const player = currentPlayer(state, ctx);
      if (player.selectedCardIndex === undefined) {
        return G;
      }

      const trait = getCardFromHand(state, ctx, player.selectedCardIndex);
      if(!canAddTrait(state, ctx, specieID, trait)) {
        player.hand.push(trait);
        return G;
      }

      const [specie] = getSpecie(state, ctx, specieID);
      specie.traits.push(trait);
      player.selectedCardIndex = undefined;
      return state;
    },
    increasePopulation: (G, ctx, specieID) => {
      const state = getState(G, ctx);
      const player = currentPlayer(state, ctx);
      if (player.selectedCardIndex === undefined) {
        return G;
      }

      if(!canIncreasePopulation(state, ctx, specieID)) {
        return G;
      }

      getCardFromHand(state, ctx, player.selectedCardIndex);
      const [specie] = getSpecie(state, ctx, specieID);
      specie.population++;
      player.selectedCardIndex = undefined;
      return state;
    },
    increaseBodySize: (G, ctx, specieID) => {
      const state = getState(G, ctx);
      const player = currentPlayer(state, ctx);
      if (player.selectedCardIndex === undefined) {
        return G;
      }

      if(!canIncreaseBodySize(state, ctx, specieID)) {
        return G;
      }

      getCardFromHand(state, ctx, player.selectedCardIndex);
      const [specie] = getSpecie(state, ctx, specieID);
      specie.bodySize++;
      player.selectedCardIndex = undefined;
      return state;
    },
    createNewSpecie: (G, ctx, position) => {
      const state = getState(G, ctx);
      const player = currentPlayer(state, ctx);
      if (player.selectedCardIndex === undefined) {
        return G;
      }

      getCardFromHand(state, ctx, player.selectedCardIndex);
      player.species.splice(position, 0, new Specie());
      player.selectedCardIndex = undefined;
      return state;
    },
    //////////////////////////////////////////
    // eat phase actions
    clickOnSpecie: (G, ctx, specieID) => {
      const state = getState(G, ctx);
      const player = currentPlayer(state, ctx);
      const clickedPlayer = getPlayer(state, ctx, specieID);
      if (clickedPlayer.id === player.id && canEat(G, ctx, specieID)) {
        // select specie
        if (player.selectedSpecie === undefined) {
          player.selectedSpecie = specieID;
          return state;
        }

        // deselect specie
        if (player.selectedSpecie.playerID === specieID.playerID
          && player.selectedSpecie.specieIdx === specieID.specieIdx) {
          player.selectedSpecie = undefined;
          return state;
        }

        // change selection (not carnivore)
        // TODO: allow attacking own species
        if (clickedPlayer.id === player.id && !isCarnivore(state, ctx, specieID)) {
          player.selectedSpecie = specieID;
          return state;
        }

        // attack owned specie
        return attackOtherSpecie(state, ctx, specieID);
      } else {
        return attackOtherSpecie(state, ctx, specieID);
      }
    },
    eatFromWateringHole: (G, ctx) => {
      const state = getState(G, ctx);
      const player = currentPlayer(state, ctx);
      if (player.selectedSpecie === undefined) {
        return G;
      }

      const specieID = player.selectedSpecie;
      if (!canEat(G, ctx, specieID)
        || isCarnivore(G, ctx, specieID)
        || state.wateringHole === 0) {
        return G;
      }

      let food = 1;
      eat(state, ctx, specieID, food, 'wateringHole', [FOOD_TYPE.PLANT]);

      player.selectedSpecie = undefined;
      state.endTurn = true;
      return state;
    }
    //////////////////////////////////////////
  },
  flow: {
    endGameIf: (G, ctx) => {
      return undefined;
    },
    phases: [
      {
        name: PHASES.PLAY_FOOD_PHASE,
        allowedMoves: ['clickOnCardForFood'],
        endTurnIf: (G, ctx) => {
          return G.endTurn;
        },
        onTurnEnd: (G, ctx) => {
          const state = getState(G, ctx);
          state.endTurn = undefined;
          return state;
        },
        endPhaseIf: (G, ctx) => {
          if (G.selectedCards.length === G.players.length) {
            return PHASES.CARD_ACTION_PHASE;
          } else if (G.selectedCards.length === G.players.length) {
            throw Error("Mais cartas que jogadores?!?!");
          }
          else {
            return false;
          }
        },
        onPhaseBegin: (G, ctx) => {
          const state = getState(G, ctx);
          state.selectedCards = [];
          for (const player of state.players) {
            drawCard(state, ctx, player.id, 4 + player.species.length);
          }

          triggerOnPhaseBeginTraits(state, ctx);
          return state;
        },
        onPhaseEnd: (G, ctx) => {
          const state = getState(G, ctx);
          const selectedCards = state.selectedCards;
          let food = 0;
          for (const card of selectedCards) {
            food += card.food;
          }

          if (food > state.foodBank) {
            food = state.foodBank;
          }

          if (food > 0) {
            state.foodBank -= food;
          }

          state.wateringHole += food;
          if (state.wateringHole < 0) {
            state.wateringHole = 0;
          }

          state.selectedCards = [];

          triggerOnPhaseEndTraits(state, ctx);
          return state;
        }
      },
      {
        name: PHASES.CARD_ACTION_PHASE,
        allowedMoves: ['clickOnCard', 'newTrait', 'increasePopulation', 'increaseBodySize', 'createNewSpecie', 'endTurn'],
        endTurnIf: (G, ctx) => {
          const player = currentPlayer(G, ctx);
          // end turn if the player has no card in hand
          // and no selected card
          return (!player.hand.length && !player.selectedCard) || G.endTurn;
        },
        onTurnBegin: (G, ctx) => {
          return G;
        },
        onTurnEnd: (G, ctx) => {
          const state = getState(G, ctx);
          state.endTurn = undefined;
          return state;
        },
        endPhaseIf: (G, ctx) => {
          let endPhase = true;
          for (const player of G.players) {
            if (player.hand.length || player.selectedCard) {
              endPhase = false;
              break;
            }
          }

          let playersPassTurn = true;
          for (const player of G.players) {
            playersPassTurn = playersPassTurn && player.endTurn;
          }

          if (endPhase || playersPassTurn) {
            return PHASES.EAT_PHASE;
          } else {
            return false;
          }
        },
        onPhaseBegin(G, ctx) {
          const state = getState(G, ctx);
          triggerOnPhaseBeginTraits(state, ctx);
          return state;
        },
        onPhaseEnd: (G, ctx) => {
          const state = getState(G, ctx);

          for (const player of state.players) {
            player.endTurn = false;
          }

          triggerOnPhaseEndTraits(state, ctx);
          return state;
        }
      },
      {
        name: PHASES.EAT_PHASE,
        allowedMoves: ['clickOnSpecie', 'eatFromWateringHole', 'endTurn'],
        endPhaseIf: (G, ctx) => {
          let playersPassTurn = true;
          for (const player of G.players) {
            playersPassTurn = playersPassTurn && player.endTurn;
          }

          if (playersPassTurn) {
            return PHASES.PLAY_FOOD_PHASE;
          } else {
            return false;
          }
        },
        onPhaseBegin: (G, ctx) => {
          const state = getState(G, ctx);
          triggerOnPhaseBeginTraits(state, ctx);
          return state;
        },
        onPhaseEnd: (G, ctx) => {
          const state = getState(G, ctx);
          for (const player of state.players) {
            for (let index = 0; index < player.species.length; index++) {
              const specie = player.species[index];

              while (specie.population > specie.food) {
                loosePopulation(state, ctx, new SpecieID(player.id, index));
              }

              player.food += specie.food;
              specie.food = 0;
            }
          }

          for (let index = 0; index < state.players.length; index++) {
            const player = state.players[index];
            if (player.species.length === 0) {
              player.species.push(new Specie());
            }
            player.endTurn = false;
          }

          triggerOnPhaseEndTraits(state, ctx);
          return state;
        },
        onTurnBegin: (G, ctx) => {
          const state = getState(G, ctx);
          const player = currentPlayer(G, ctx);
          player.endTurn = false;
          return state;
        },
        onTurnEnd: (G, ctx) => {
          const state = getState(G, ctx);
          state.endTurn = undefined;
          return state;
        },
        endTurnIf: (G, ctx) => {
          return G.endTurn;
        }
      }
    ]
  }
};

export default Game(Evolution);
