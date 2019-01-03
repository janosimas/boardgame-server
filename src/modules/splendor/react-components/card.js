import React from 'react';
import { GEM } from '../components/gems';
import { TIER } from '../components/tiers';
import { Gem } from './gem';
import { isNil } from 'ramda';
import { canBuy, canReserve } from '../components/utils';
import { PHASE } from '../components/phases';

// TODO: highlight possible cards to buy
export const renderCard = (G, ctx, playerID, card, moves, isSelected) => {
  const view = [];
  if (card === undefined) {
    return;
  }

  view.push(<div key={'header'} style={{
    display: "flex",
  }}>
    <Gem gem={card.bonus} />
    {card.points}
  </div>);

  view.push(
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
      key={'cards'}
    >
      {Object.keys(GEM).map(key => card[GEM[key]] === 0 ? null :
        <Gem
          key={key}
          style={{ display: "flex" }}
          gem={GEM[key]}
          tokens={card[GEM[key]]}
        />)}
    </div>
  );

  const style = { border: "3px solid black", margin: "5px", width: "100px" };
  if (ctx.phase === PHASE.ACTION_PHASE && isSelected && ctx.currentPlayer === playerID) {
    style.border = "3px solid blue";
    if (canBuy(G.players[playerID], card)) {
      view.push(
        <button
          key={'buy'}
          onClick={() => moves.buyCard()}>
          {'buy'}
        </button>
      );
    }

    if (canReserve(G, G.players[playerID])) {
      view.push(
        <button
          key={'reserve'}
          onClick={() => moves.reserveCard()}>
          {'reserve'}
        </button>
      );
    }
  }

  return (
    <div style={style}>{view}</div>
  )
}

export const renderCards = (G, ctx, playerID, moves, selectedCard) => {
  return (
    <div>
      {Object.keys(TIER).map(key => {
        return <div key={key} style={{ display: "flex" }}>
          {G.cards[TIER[key]].map((card, i) => <div
            key={i}
            onClick={ctx.phase === PHASE.ACTION_PHASE ? () => moves.selectCard(TIER[key], i) : null}
          >{renderCard(G, ctx, playerID, card, moves, (!isNil(selectedCard)) && selectedCard.tier === TIER[key] && selectedCard.index === i)}</div>)}
        </div>
      })}
    </div>
  )
}