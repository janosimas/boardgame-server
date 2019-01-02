import React from 'react';
import { GEM } from '../components/gems';
import { TIER } from '../components/tiers';
import { renderGem } from './gem';
import { isNil } from 'ramda';
import { canBuy } from '../components/utils';

// TODO: highlight possible cards to buy
const renderCard = (G, ctx, playerID, card, moves, isSelected) => {
  const view = [];
  if (card === undefined) {
    return;
  }

  view.push(<div key={'header'} style={{ display: "flex" }}>{renderGem(card.bonus)} {card.points}</div>);

  for (const key in GEM) {
    const gem = GEM[key];
    view.push(<div key={gem} style={{ display: "flex" }}>{renderGem(gem)}{": " + card[gem]}</div>);
  }

  const style = { border: "3px solid black", margin: "5px", width: "100px" };
  if (isSelected && ctx.currentPlayer === playerID) {
    style.border = "3px solid blue";
    if (canBuy(G.players[playerID], card)) {
      view.push(<button key={'buy'} onClick={() => moves.buyCard()}>ok</button>);
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