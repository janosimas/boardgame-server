import React from 'react';
import { renderGem } from './gem';
import { YELLOW, GEM } from '../components/gems';
import { calcPoints } from '../components/utils';
import { renderCard } from './card';
import { RESERVE } from '../components/tiers';
import { isNil } from 'ramda';

export const renderPlayer = (G, ctx, player, moves) => {
  const totalPoints = calcPoints(player)

  return (
    <div style={{
      display: "flex"
    }}>
      <div style={{ border: "3px solid red", margin: "5px", width: "100px" }}>
        <div>{"Points: " + totalPoints}</div>
        <div style={{
          display: "flex",
          flexWrap: 'wrap'
        }}>
          {renderGem(YELLOW, player.gems[YELLOW])}
          {Object.keys(GEM).map(gem => renderGem(GEM[gem], player.gems[GEM[gem]], player.cards[GEM[gem]].length))}
        </div>
      </div>
      {player.reserved.map((card, i) =>
        renderCard(
          G,
          ctx,
          player,
          card,
          moves,
          (!isNil(G.selectedCard)) && G.selectedCard.tier === RESERVE && G.selectedCard.index === i
        )
      )}
    </div>
  );
}