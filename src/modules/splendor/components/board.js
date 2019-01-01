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

import { GEM, YELLOW } from '../components/gemTypes';
import { RenderGem } from '../react-components/gem';
import { uniq } from 'ramda';

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

    const G = this.props.G;
    this.moves = {
      selectGem: (gem) => {
        if (this.props.ctx.currentPlayer != this.props.playerID) {
          return;
        }

        const gemsOnHold = this.state.gemsOnHold;
        if (G.gems[gem] === 0
          || uniq(gemsOnHold).length === 3
          || (gemsOnHold.length === 2 && (gemsOnHold[0] === gemsOnHold[1] || gemsOnHold[0] === gem || gemsOnHold[1] === gem))) {
          return;
        }
        gemsOnHold.push(gem);
        // G.gems[gem]--;
        this.setState({ gemsOnHold });
      },

      removeFromHold: (index) => {
        if (this.props.ctx.currentPlayer != this.props.playerID) {
          return;
        }

        const gemsOnHold = this.state.gemsOnHold;
        // G.gems[gemsOnHold[index]]++;
        gemsOnHold.splice(index, 1);
        this.setState({ gemsOnHold });
      },

      clickGem: (gems) => {
        if (this.props.ctx.currentPlayer != this.props.playerID) {
          return;
        }

        this.props.moves.clickGem(gems);
        const gemsOnHold = [];
        this.setState({ gemsOnHold });
      }
    }
  }

  renderTokens(G) {
    return (<div style={{ border: "3px solid green", margin: "5px", width: "160px" }}>
      <div>{YELLOW + ": " + G.gems[YELLOW]}</div>
      {Object.keys(GEM).map(gem => <div key={gem} onClick={() => this.moves.selectGem(GEM[gem])} >{GEM[gem] + ": " + G.gems[GEM[gem]]}</div>)}
    </div>);
  }

  renderObj(obj) {
    const view = [];
    if (obj === undefined) {
      return (<div />);
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        view.push(<div>{key + ": " + element}</div>);
      }
    }
    return (
      <div style={{ border: "3px solid black", margin: "5px", width: "100px" }}>{view}</div>
    )
  }

  renderCards(G) {
    return (
      <div>
        <div style={{ display: "flex" }}>
          {G.cards.tier1.map((card, i) => <div key={i}>{this.renderObj(card)}</div>)}
        </div>
        <div style={{ display: "flex" }}>
          {G.cards.tier2.map((card, i) => <div key={i}>{this.renderObj(card)}</div>)}
        </div>
        <div style={{ display: "flex" }}>
          {G.cards.tier3.map((card, i) => <div key={i}>{this.renderObj(card)}</div>)}
        </div>
      </div>
    )
  }

  renderPlayer(player) {
    return (<div style={{ border: "3px solid red", margin: "5px", width: "160px" }}>
      <div>{YELLOW + ": " + player.gems[YELLOW]}</div>
      {Object.keys(GEM).map(gem => <div key={gem}>{GEM[gem] + ": " + player.cards[GEM[gem]].length + "+" + player.gems[GEM[gem]]}</div>)}
    </div>);
  }

  renderHold() {
    const gemsOnHold = this.state.gemsOnHold;
    let okButton = null;
    if (uniq(gemsOnHold).length === 3
      || (gemsOnHold.length === 2 && gemsOnHold[0] === gemsOnHold[1])) {
      okButton = <button onClick={() => this.moves.clickGem(gemsOnHold)}>{"ok"}</button>;
    }

    return <div style={{ display: "flex" }}>
      {this.state.gemsOnHold.map((gem, i) => <div key={i} onClick={() => this.moves.removeFromHold(i)} >{RenderGem[gem]}</div>)}
      {okButton}
    </div>
  }

  render() {
    const G = this.props.G;
    const ctx = this.props.ctx;
    const playerID = this.props.playerID;

    return (
      <div>
        <div>{this.renderHold()}</div>
        <div>{this.renderTokens(G)}</div>
        <div>{this.renderCards(G)}</div>
        <div>{this.renderPlayer(G.players[playerID])}</div>
        {this.props.playerID}
        {this.props.isConnected}
      </div>
    );
  }
}

export default Board;
