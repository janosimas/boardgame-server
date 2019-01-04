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

import { uniq, countBy } from 'ramda';
import { renderCards } from '../react-components/card';
import { renderHold, renderTokens } from '../react-components/tokens';
import { ACTION } from '../react-components/actions';
import { Player } from '../react-components/player';
import { countGems } from './utils';
import { PHASE } from './phases';

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

      selectGemToDiscard: (gem) => {
        if (this.props.ctx.currentPlayer != this.props.playerID) {
          return;
        }

        if (!this.moves.checkAction(ACTION.SELECT_GEM)) {
          this.moves.resetActionState();
          this.moves.registerAction(ACTION.SELECT_GEM);
        }

        const gemsOnHold = this.state.gemsOnHold;
        if (countGems(this.props.G.players[this.props.ctx.currentPlayer]) - gemsOnHold.length <= 10) {
          return;
        }

        gemsOnHold.push(gem);
        this.setState({ gemsOnHold });
      },
      selectGemToBuy: (gem) => {
        if (this.props.ctx.currentPlayer != this.props.playerID) {
          return;
        }

        if (!this.moves.checkAction(ACTION.SELECT_GEM)) {
          this.moves.resetActionState();
          this.moves.registerAction(ACTION.SELECT_GEM);
        }

        const gemsOnHold = this.state.gemsOnHold;
        const count = countBy(g => g)(gemsOnHold)[gem];
        // can't buy if there are no available tokens
        if (this.props.G.gems[gem] - count === 0) {
          return;
        }
        // already have 3 unique tokens
        if (uniq(gemsOnHold).length === 3) {
          return;
        }
        // can only take a second token of the same color
        // if there were 4 or more tokens of that color
        if (gemsOnHold.length === 1
          && count === 1
          && this.props.G.gems[gem] < 4) {
          return;
        }

        // can't buy a 3rd gem if:
        // - already have two gems of the same color
        // - already have one gem of the selected color
        if (gemsOnHold.length === 2
          && (gemsOnHold[0] === gemsOnHold[1]
            || gemsOnHold[0] === gem
            || gemsOnHold[1] === gem)) {
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

        if (this.props.ctx.phase === PHASE.ACTION_PHASE) {
          this.props.moves.clickGem(gems);
        } else if (this.props.ctx.phase === PHASE.END_TURN_PHASE) {
          this.props.moves.discardExtraTokens(gems);
        }

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
      },

      buyCard: () => {
        if (this.props.ctx.currentPlayer != this.props.playerID) {
          return;
        }

        if (!this.moves.checkAction(ACTION.SELECT_CARD)) {
          return;
        }

        const selectedCard = this.state.selectedCard;
        this.moves.resetActionState();
        this.props.moves.buyCard(selectedCard.tier, selectedCard.index);
      },

      reserveCard: () => {
        if (this.props.ctx.currentPlayer != this.props.playerID) {
          return;
        }

        if (!this.moves.checkAction(ACTION.SELECT_CARD)) {
          return;
        }

        const selectedCard = this.state.selectedCard;
        this.moves.resetActionState();
        this.props.moves.reserveCard(selectedCard.tier, selectedCard.index);
      }
    }
  }

  render() {
    const G = this.props.G;
    const ctx = this.props.ctx;
    const playerID = this.props.playerID;
    const turnState = this.state;

    return (
      <div>
        <div>{renderHold(G, ctx, this.moves, this.state.gemsOnHold)}</div>
        <div>{renderTokens(G, ctx, this.moves)}</div>
        <div>{renderCards(G, ctx, playerID, this.moves, turnState)}</div>
        <Player
          G={G}
          ctx={ctx}
          playerID={playerID}
          moves={this.moves}
          turnState={turnState}
        />
        {this.props.playerID}
        {this.props.isConnected}
        <div>Current phase: {ctx.phase}</div>
      </div>
    );
  }
}

export default Board;
