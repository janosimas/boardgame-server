import React from 'react';
import PropTypes from 'prop-types';
import { PHASES } from '../components/phases';
import { canEat, isCarnivore } from '../components/utils';
import { getSpecie } from '../components/specieID';

class SpecieBoard extends React.Component {
  render() {
    const G = this.props.G;
    const ctx = this.props.ctx;
    const moves = this.props.moves;
    const player = this.props.player;
    const specieID = this.props.specieID;
    const [specie] = getSpecie(G, ctx, specieID);

    const traitsRender = [];
    for (const trait of specie.traits) {
      traitsRender.push(<div className='trait' key={trait.name}>{trait.name}</div>);
    }

    const currentPlayer = ctx.currentPlayer;
    const phase = ctx.phase;

    let clinOnTrait = undefined;
    let clinOnPopulation = undefined;
    let clinOnBodySize = undefined;

    if (currentPlayer === player.id) {
      switch (phase) {
        case PHASES.CARD_ACTION_PHASE:
          clinOnPopulation = () => moves.increasePopulation(specieID);
          clinOnBodySize = () => moves.increaseBodySize(specieID);
          clinOnTrait = () => moves.newTrait(specieID);
          break;
        default:
          break;
      }
    }

    let clickOnSpecie = undefined;
    if (phase === PHASES.EAT_PHASE) {
      clickOnSpecie = () => moves.clickOnSpecie(specieID);
    }

    const specieStyle = isCarnivore(G, ctx, specieID) ? { background: '#FFccaa' } : undefined;

    let specieBoardClass = 'specie-board';
    if (phase === PHASES.EAT_PHASE) {
      if (currentPlayer === player.id) {
        if (player.selectedSpecie === specieID) {
          specieBoardClass += ' highlight-green';
        }

        if (player.selectedSpecie === undefined
          && canEat(G, ctx, specieID)) {
          specieBoardClass += ' highlight-blue';
        }
      }
    }

    return (
      <div className={specieBoardClass} onClick={clickOnSpecie} >
        <div className='specie-traits' onClick={clinOnTrait} style={specieStyle}>
          {traitsRender}
        </div>
        <div className='specie-values'>
          <div className='specie-population' onClick={clinOnPopulation}>
            {specie.population}
          </div>
          <div className='specie-body-size' onClick={clinOnBodySize}>
            {specie.bodySize}
          </div>
          <div className='specie-food'>
            {specie.food}
          </div>
        </div>
      </div>
    );
  }
}

SpecieBoard.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  player: PropTypes.object,
  specieID: PropTypes.object,
  id: PropTypes.number,
  moves: PropTypes.object,
};

export default SpecieBoard;
