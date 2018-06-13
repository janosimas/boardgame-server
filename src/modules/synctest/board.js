import React from 'react';

class SyncTestBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button key='click'
                type="button"
                onClick={() => this.props.moves.click()}>
                  click
        </button>
        <div>
          current player: {this.props.ctx.currentPlayer}
          <br/>
          turn: {this.props.ctx.turn}
          <br />
          count: {this.props.G.count}
        </div>
      </div>
    );
  }
}

export default SyncTestBoard;
