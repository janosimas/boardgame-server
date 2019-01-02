import React from 'react';
import { GEM } from '../components/gems';
import { TIER } from '../components/tiers';
import { renderGem } from './gem';
import { isNil } from 'ramda';
import { canBuy, canReserve } from '../components/utils';

// TODO: highlight possible cards to buy
const renderCard = (G, ctx, playerID, card, moves, isSelected) => {
  const view = [];
  if (card === undefined) {
    return;
  }

  view.push(<div key={'header'} style={{
    display: "flex",
  }}>
    {renderGem(card.bonus)}
    {card.points}
  </div>);

  view.push(<div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
    }}>
    {Object.keys(GEM).map(key => card[GEM[key]] === 0 ? null :
      <div key={key} style={{ display: "flex" }}>{renderGem(GEM[key], card[GEM[key]])}</div>)}
  </div>
  );

  const style = { border: "3px solid black", margin: "5px", width: "100px" };
  if (isSelected && ctx.currentPlayer === playerID) {
    style.border = "3px solid blue";
    if (canBuy(G.players[playerID], card)) {
      view.push(<button key={'buy'} onClick={() => moves.buyCard()}>buy</button>);
    }

    if (canReserve(G, G.players[playerID])) {
      view.push(<button key={'reserve'} onClick={() => moves.reserveCard()}>reserve</button>);
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
            onClick={() => moves.selectCard(TIER[key], i)}
          >{renderCard(G, ctx, playerID, card, moves, (!isNil(selectedCard)) && selectedCard.tier === TIER[key] && selectedCard.index === i)}</div>)}
        </div>
      })}
    </div>
  )
}