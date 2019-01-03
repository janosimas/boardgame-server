import React from 'react';
import { uniq } from 'ramda';
import { Gem } from './gem';
import { YELLOW, GEM } from '../components/gems';
import { PHASE } from '../components/phases';

export const renderHold = (G, ctx, moves, gemsOnHold) => {
  let okButton = null;
  if (ctx.phase === PHASE.ACTION_PHASE
    && (uniq(gemsOnHold).length === 3
      || (gemsOnHold.length === 2 && gemsOnHold[0] === gemsOnHold[1]))) {
    okButton = <button onClick={() => moves.finishSelectingGems(gemsOnHold)}>{"ok"}</button>;
  } else if (ctx.phase === PHASE.END_TURN_PHASE
    && gemsOnHold.length > 0) {
    okButton = <button onClick={() => moves.finishSelectingGems(gemsOnHold)}>{"ok"}</button>;
  }

  return <div style={{ display: "flex" }}>
    {
      gemsOnHold.map((gem, i) =>
        <Gem key={i} onClick={() => moves.removeFromHold(i)} gem={gem} />)
    }
    {okButton}
  </div>
}

export const renderTokens = (G, ctx, moves) => {
  return (
    <div
      style={{
        border: "3px solid green",
        margin: "5px",
        display: 'flex'
      }}>
      <Gem gem={YELLOW} tokens={G.gems[YELLOW]} />
      {Object.keys(GEM).map(gem =>
        <Gem
          key={gem}
          onClick={() => moves.selectGemToBuy(GEM[gem])}
          gem={GEM[gem]}
          tokens={G.gems[GEM[gem]]} />
      )}
    </div>
  );
}