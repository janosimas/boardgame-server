import React from 'react';
import PropTypes from 'prop-types';
import PlayerBoard from './player';

import './board.css';
import { PHASES } from '../components/phases';
import { currentPlayer } from '../components/utils';

class EvolutionBoard extends React.Component {
  constructor(props) {
    super(props);

    this.moves = {
      clickOnCard: (cardIndex) => {
        if (this.props.ctx.phase === PHASES.CARD_ACTION_PHASE) {
          this.props.moves.clickOnCard(cardIndex);
        } else if (this.props.ctx.phase === PHASES.PLAY_FOOD_PHASE) {
          this.props.moves.clickOnCardForFood(cardIndex);
        }
      },
      clickOnSpecie: (specieID) => {
        this.props.moves.clickOnSpecie(specieID);
      },
      clickOnWateringHole: () => {
        this.props.moves.eatFromWateringHole();
      },
      newTrait: (specieID) => {
        this.props.moves.newTrait(specieID);
      },
      increasePopulation: (specieID) => {
        this.props.moves.increasePopulation(specieID);
      },
      increaseBodySize: (specieID) => {
        this.props.moves.increaseBodySize(specieID);
      },
      createNewSpecie: (index) => {
        this.props.moves.createNewSpecie(index);
      },
      onClickEndTurn: () => {
        this.props.moves.endTurn();
      }
    };
  }

  renderControls(G, ctx) {
    let player = currentPlayer(G, ctx);

    let controls = [];
    controls.push(<div key='current-player'>Current player: {player.name}</div>);
    controls.push(<div key='current-phase'>Current phase: {ctx.phase}</div>);

    if (ctx.phase !== PHASES.PLAY_FOOD_PHASE) {
      controls.push(<button key='end-turn' type="button" onClick={() => this.moves.onClickEndTurn()}>end turn</button>);
    }

    return controls;
  }

  render() {
    const G = this.props.G;
    const ctx = this.props.ctx;
    const players = G.players;
    const playersRender = [];
    for (const player of players) {
      playersRender.push(
        <PlayerBoard moves={this.moves}
          G={G}
          ctx={this.props.ctx}
          player={player}
          key={player.name}
        />
      );
    }

    const control = this.renderControls(G, ctx);

    return (
      <div>
        <div className='play-area'>
          <div className='main-board' onClick={this.moves.clickOnWateringHole} >
            <div><h3>Watering hole:{G.wateringHole}</h3></div>
            <div><h5>Food bank:{G.foodBank}</h5></div>
          </div>
          <div className='player-board-list'>
            {playersRender}
          </div>
        </div>
        <div className='controls'>
          {control}
        </div>
      </div>
    );
  }
}

EvolutionBoard.propTypes = {
  moves: PropTypes.object,
  G: PropTypes.object,
  ctx: PropTypes.object,
};

export default EvolutionBoard;
