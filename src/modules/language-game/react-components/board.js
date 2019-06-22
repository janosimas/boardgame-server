import React from "react";
import PropTypes from "prop-types";
import "./board.css";

import { isNil } from "ramda";

import { OptionsComponent } from "./translation";
import { HintBlock } from "./hint";
import { PHASE } from "../components/phase";

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.selectTranslation = selectedTranslationIndex => {
      this.props.moves.selectTranslation(selectedTranslationIndex);
    };

    this.takeHint = selectedHintIndex => {
      this.props.moves.takeHint(selectedHintIndex);
    };

    this.selectPictureToShow = () => {};
  }

  render() {
    const G = this.props.G;
    const ctx = this.props.ctx;
    const playerID = this.props.playerID;
    if(!isNil(ctx.gameover))
    {
      return(
        <div>
          <h1>We have a winner!!!</h1>
          <div>Winner: {ctx.gameover}</div>
        </div>
      )
    }

    if (ctx.phase === PHASE.ACTION_PHASE) {
      return (
        <div>
          <h1>{G.currentContext.word}</h1>
          <HintBlock
            options={G.currentContext.revealed_images}
            onTakeHint={this.takeHint}
          />
          <OptionsComponent
            options={G.currentContext.translations}
            onSelectTranslation={this.selectTranslation}
          />
        </div>
      );
    } else {
      let state;
      if (G.currentContext.points === 0) {
        state = <div>{"Wrong answer! :-("}</div>;
      } else {
        state = (
          <div>
            <div>{"Correct!"}</div>
            <div>{"You got " + G.currentContext.points}</div>
          </div>
        );
      }
      return (
        <div>
          <h1>Player: {playerID}</h1>
          {state}
          <button onClick={() => this.props.moves.endTurn()}>OK</button>
        </div>
      );
    }
  }
}

export default Board;
