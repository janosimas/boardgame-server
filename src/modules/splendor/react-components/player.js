import React from 'react';
import { renderGem } from './gem';
import { YELLOW, GEM } from '../components/gems';
import { reduce } from 'ramda';

const calcPoints = player => {
  let total = 0;
  Object.keys(GEM).map(gem => total += reduce((acc, c) => acc + c.points, 0, player.cards[GEM[gem]]));
  return total;
}

export const renderPlayer = (player) => {
  const totalPoints = calcPoints(player)

  return (<div style={{ border: "3px solid red", margin: "5px", width: "100px" }}>
    <div>{"Points: " + totalPoints}</div>
    <div style={{
      display: "flex",
      flexWrap: 'wrap'
    }}>
      {renderGem(YELLOW, player.gems[YELLOW])}
      {Object.keys(GEM).map(gem => renderGem(GEM[gem], player.gems[GEM[gem]], player.cards[GEM[gem]].length))}
    </div>
  </div>);
}