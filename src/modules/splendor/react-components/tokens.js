import React from 'react';
import { uniq } from 'ramda';
import { renderGem } from './gem';
import { YELLOW, GEM } from '../components/gems';

export const renderHold = (moves, gemsOnHold) => {
  let okButton = null;
  if (uniq(gemsOnHold).length === 3
    || (gemsOnHold.length === 2 && gemsOnHold[0] === gemsOnHold[1])) {
    okButton = <button onClick={() => moves.finishSelectingGems(gemsOnHold)}>{"ok"}</button>;
  }

  return <div style={{ display: "flex" }}>
    {
      gemsOnHold.map((gem, i) =>
        <div key={i} onClick={() => moves.removeFromHold(i)} >{renderGem(gem)}</div>)
    }
    {okButton}
  </div>
}

export const renderTokens = (G, moves) => {
  return (
    <div
      style={{
        border: "3px solid green",
        margin: "5px",
        display: 'flex'
      }}>
      <div style={{ display: "flex" }}>{renderGem(YELLOW, G.gems[YELLOW])}</div>
      {Object.keys(GEM).map(gem => <div
        key={gem}
        onClick={() => moves.selectGem(GEM[gem])}
        style={{ display: "flex" }}>{renderGem(GEM[gem], G.gems[GEM[gem]])}</div>)}
    </div>
  );
}