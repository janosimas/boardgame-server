import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'boardgame.io/ui';

import SpecieBoard from './specie';
import { PHASES } from '../components/phases';
import { SpecieID } from '../components/specieID';

class PlayerBoard extends React.Component {
  render() {
    const G = this.props.G;
    const ctx = this.props.ctx;
    const moves = this.props.moves;
    const player = this.props.player;
    const species = player.species;

    const currentPlayer = ctx.currentPlayer;
    let clickOnCard = undefined;
    let createNewSpecie = undefined;
    const phase = ctx.phase;
    if (currentPlayer === player.id) {
      switch (phase) {
        case PHASES.CARD_ACTION_PHASE:
          createNewSpecie = moves.createNewSpecie;
        // falls through
        case PHASES.PLAY_FOOD_PHASE:
          clickOnCard = moves.clickOnCard;
          break;
        default:
          break;
      }
    }

    const handRender = player.hand.map((card, index) => {
      let className = 'card';
      if (currentPlayer === player.id && player.selectedCardIndex === index) {
        className += ' highlight-green';
      }
      return <Card
        className={className}
        isFaceUp={currentPlayer === this.props.player.id}
        canHover={currentPlayer === player.id}
        onClick={clickOnCard && (() => clickOnCard(index))}
        front={
          <div>
            <div className='name'>
              {card.name}
            </div>
            <div className='food'>
              {card.food}
            </div>
          </div>}
        key={index} />;
    });

    const speciesRender = species.map((specie, index) => {
      return <SpecieBoard
        G={G}
        ctx={ctx}
        player={player}
        moves={moves}
        specieID={new SpecieID(player.id, index)}
        key={index}
      />;
    });

    const size = speciesRender.length;
    for (let index = size; index >= 0; index--) {
      speciesRender.splice(index, 0, <div className='between-species' key={100 + index} onClick={createNewSpecie && (() => createNewSpecie(index))} ></div>);
    }

    return (
      <div className='player-board'>
        <div className='player-name'>
          {player.name}
        </div>
        {
          <div className='player-hand'>
            {handRender}
          </div>
        }
        <div className='species-list'>
          {speciesRender}
        </div>
      </div>
    );
  }
}

PlayerBoard.propTypes = {
  player: PropTypes.object,
  moves: PropTypes.object,
  ctx: PropTypes.object,
  G: PropTypes.object
};

export default PlayerBoard;
