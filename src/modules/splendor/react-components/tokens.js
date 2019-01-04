import React from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'ramda';
import { Gem } from './gem';
import { YELLOW, GEM } from '../components/gems';
import { PHASE } from '../components/phases';

export const TokensHold = (props) => {
  const { ctx, moves, gemsOnHold } = props;
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

TokensHold.propTypes = {
  ctx: PropTypes.object.isRequired,
  moves: PropTypes.array.isRequired,
  gemsOnHold: PropTypes.array.isRequired
}

export const Tokens = (props) => {
  const { G, onClick } = props;
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
          onClick={() => onClick(GEM[gem])}
          gem={GEM[gem]}
          tokens={G.gems[GEM[gem]]} />
      )}
    </div>
  );
}

Tokens.propTypes = {
  G: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}