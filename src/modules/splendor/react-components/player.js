import React from 'react';
import { Gem } from './gem';
import { YELLOW, GEM } from '../components/gems';
import { calcPoints } from '../components/utils';
import { renderCard } from './card';
import { RESERVE } from '../components/tiers';
import { isNil } from 'ramda';
import { PHASE } from '../components/phases';

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
          <Gem gem={YELLOW} tokens={player.gems[YELLOW]} />
          {Object.keys(GEM).map(gem =>
            <Gem
              key={gem}
              gem={GEM[gem]}
              tokens={player.gems[GEM[gem]]}
              cards={player.cards[GEM[gem]].length}
              onClick={ctx.phase === PHASE.END_TURN_PHASE ? () => moves.selectGemToDiscard(GEM[gem]) : null}
            />
          )}
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