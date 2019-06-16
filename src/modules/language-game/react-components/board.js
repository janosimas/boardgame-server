
import React from 'react';
import PropTypes from 'prop-types';
import './board.css';

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
    };

    this.moves = {

      selectTranslation: () => {},
      selectPictureToShow: () => {},
    }
  }

  render() {
    const G = this.props.G;
    const ctx = this.props.ctx;
    const playerID = this.props.playerID;
    const turnState = this.state;

    return (
      <div>
      </div>
    );
  }
}

export default Board;
