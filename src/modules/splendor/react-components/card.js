import React from 'react';
import { GEM } from '../components/gems';
import { TIER } from '../components/tiers';
import { renderGem } from './gem';

const renderCard = (card) => {
  const view = [];
  if (card === undefined) {
    return;
  }

  view.push(<div style={{ display: "flex" }}>{renderGem(card.bonus)} {card.points}</div>);

  for (const key in GEM) {
    const gem = GEM[key];
    view.push(<div style={{ display: "flex" }}>{renderGem(gem)}{": " + card[gem]}</div>);
  }

  return (
    <div style={{ border: "3px solid black", margin: "5px", width: "100px" }}>{view}</div>
  )
}

export const renderCards = (G) => {
  return (
    <div>
      {Object.keys(TIER).map(key => {
        return <div key={key} style={{ display: "flex" }}>
          {G.cards[TIER[key]].map((card, i) => <div key={i}>{renderCard(card)}</div>)}
        </div>
      })}
    </div>
  )
}