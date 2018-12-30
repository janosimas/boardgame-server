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

import { GEM } from '../components/gemTypes';

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

  renderTokens(G) {
    return (<div style={{ border: "3px solid green", margin: "5px", width: "160px" }}>
      <div>{GEM.YELLOW + ": " + G.gems[GEM.YELLOW]}</div>
      <div>{GEM.RED + ": " + G.gems[GEM.RED]}</div>
      <div>{GEM.GREEN + ": " + G.gems[GEM.GREEN]}</div>
      <div>{GEM.BLUE + ": " + G.gems[GEM.BLUE]}</div>
      <div>{GEM.WHITE + ": " + G.gems[GEM.WHITE]}</div>
      <div>{GEM.BLACK + ": " + G.gems[GEM.BLACK]}</div>
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
      <div style={{ border: "3px solid black", margin: "5px", width: "160px" }}>{view}</div>
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

  render() {
    const G = this.props.G;
    const tokens = this.renderTokens(G);
    const cards = this.renderCards(G);

    return (
      <div>
        <div>{tokens}</div>
        <div>{cards}</div>
        {this.props.playerID}
        {this.props.isConnected}
      </div>
    );
  }
}

export default Board;
