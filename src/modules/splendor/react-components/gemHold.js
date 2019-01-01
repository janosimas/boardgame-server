import React from 'react';
import { uniq } from 'ramda';
import { renderGem } from './gem';

export const renderHold = (gemsOnHold, moves) => {
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