/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './board.css';

import { GEM, YELLOW } from './gems';
import { renderGem } from '../react-components/gem';
import { uniq } from 'ramda';
import { renderCards } from '../react-components/card';
import { renderHold } from '../react-components/gemHold';
import { ACTION } from '../react-components/actions';

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      gemsOnHold: []
    };

    this.moves = {
      registerAction: actionID => {
        this.setState({ actionID });
      },

      checkAction: actionID => actionID === this.state.actionID,

      selectGem: (gem) => {
        if (this.props.ctx.currentPlayer != this.props.playerID) {
          return;
        }

        if (!this.moves.checkAction(ACTION.SELECT_GEM)) {
          this.moves.resetActionState();
          this.moves.registerAction(ACTION.SELECT_GEM);
        }

        const gemsOnHold = this.state.gemsOnHold;
        if (this.props.G.gems[gem] === 0
          || uniq(gemsOnHold).length === 3
          || (gemsOnHold.length === 2 && (gemsOnHold[0] === gemsOnHold[1] || gemsOnHold[0] === gem || gemsOnHold[1] === gem))) {
          return;
        }
        gemsOnHold.push(gem);
        this.setState({ gemsOnHold });
      },

      removeFromHold: (index) => {
        if (this.props.ctx.currentPlayer != this.props.playerID) {
          return;
        }

        const gemsOnHold = this.state.gemsOnHold;
        gemsOnHold.splice(index, 1);
        this.setState({ gemsOnHold });
      },

      finishSelectingGems: (gems) => {
        if (this.props.ctx.currentPlayer != this.props.playerID) {
          return;
        }

        this.props.moves.clickGem(gems);
        this.moves.resetActionState();
      },

      resetActionState: () => {
        const gemsOnHold = [];
        const selectedCard = undefined;
        this.setState({ gemsOnHold, selectedCard });
      },

      selectCard: (tier, index) => {
        if (this.props.ctx.currentPlayer != this.props.playerID) {
          return;
        }

        if (!this.moves.checkAction(ACTION.SELECT_CARD)) {
          this.moves.resetActionState();
          this.moves.registerAction(ACTION.SELECT_CARD);
        }

        const selectedCard = {
          tier,
          index
        }
        this.setState({ selectedCard });
      }
    }
  }

  renderTokens(G) {
    return (<div style={{ border: "3px solid green", margin: "5px", width: "100px" }}>
      <div style={{ display: "flex" }}>{renderGem(YELLOW)} {": " + G.gems[YELLOW]}</div>
      {Object.keys(GEM).map(gem => <div
        key={gem}
        onClick={() => this.moves.selectGem(GEM[gem])}
        style={{ display: "flex" }}>{renderGem(GEM[gem])} {": " + G.gems[GEM[gem]]}</div>)}
    </div>);
  }

  renderPlayer(player) {
    return (<div style={{ border: "3px solid red", margin: "5px", width: "100px" }}>
      <div style={{ display: "flex" }}>{renderGem(YELLOW)} {": " + player.gems[YELLOW]}</div>
      {Object.keys(GEM).map(gem => <div key={gem} style={{ display: "flex" }}>{renderGem(GEM[gem])} {": " + player.cards[GEM[gem]].length + "+" + player.gems[GEM[gem]]}</div>)}
    </div>);
  }

  render() {
    const G = this.props.G;
    const playerID = this.props.playerID;

    return (
      <div>
        <div>{renderHold(this.state.gemsOnHold, this.moves)}</div>
        <div>{this.renderTokens(G)}</div>
        <div>{renderCards(G, this.state.selectedCard, this.moves.selectCard)}</div>
        <div>{this.renderPlayer(G.players[playerID])}</div>
        {this.props.playerID}
        {this.props.isConnected}
      </div>
    );
  }
}

export default Board;
