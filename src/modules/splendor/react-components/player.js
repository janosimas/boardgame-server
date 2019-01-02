import React from 'react';
import { renderGem } from './gem';
import { YELLOW, GEM } from '../components/gems';
import { calcPoints } from '../components/utils';

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