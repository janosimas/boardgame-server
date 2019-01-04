import React from 'react';
import PropTypes from 'prop-types';
import { GEM } from '../components/gems';
import { TIER } from '../components/tiers';
import { Gem } from './gem';
import { isNil } from 'ramda';
import { canBuy, canReserve } from '../components/utils';
import { PHASE } from '../components/phases';

// TODO: highlight possible cards to buy
export const Card = (props) => {
  const { G, ctx, playerID, card, isSelected, onSelect, onBuy, onReserve } = props;
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
    if (!isNil(onBuy) && canBuy(G.players[playerID], card)) {
      view.push(
        <button
          key={'buy'}
          onClick={onBuy}>
          {'buy'}
        </button>
      );
    }

    if (!isNil(onReserve) && canReserve(G, G.players[playerID])) {
      view.push(
        <button
          key={'reserve'}
          onClick={onReserve}>
          {'reserve'}
        </button>
      );
    }
  }

  return (
    <div style={style} onClick={onSelect} >{view}</div>
  )
}

Card.propTypes = {
  G: PropTypes.object.isRequired,
  ctx: PropTypes.object.isRequired,
  playerID: PropTypes.any.isRequired,
  card: PropTypes.object.isRequired,
  moves: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onBuy: PropTypes.func,
  onReserve: PropTypes.func,
  isSelected: PropTypes.bool
}

export const renderCards = (G, ctx, playerID, moves, turnState) => {
  return (
    <div>
      {Object.keys(TIER).map(key => {
        return <div key={key} style={{ display: "flex" }}>
          {
            G.cards[TIER[key]].map((card, i) =>
              <Card
                key={i} G={G}
                ctx={ctx}
                playerID={playerID}
                card={card}
                onSelect={() => moves.selectCard(TIER[key], i)}
                onBuy={() => moves.buyCard()}
                onReserve={() => moves.reserveCard()}
                isSelected={(!isNil(turnState.selectedCard)) && turnState.selectedCard.tier === TIER[key] && turnState.selectedCard.index === i} />
            )
          }
        </div>
      })}
    </div>
  )
}