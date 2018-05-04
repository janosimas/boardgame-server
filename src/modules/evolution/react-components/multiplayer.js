import React from 'react';

import { Client } from 'boardgame.io/react';
import Evolution from '../game';
import EvolutionBoard from '../board';

const App = Client({
  game: Evolution,
  numPlayers: 2,
  board: EvolutionBoard,
  multiplayer: true,
});

const Multiplayer = () => (
  <div style={{ padding: 50 }}>
    <h1>Multiplayer</h1>
    <div className="runner">
      <div className="run">
        <App gameID="multi" playerID="0" />
        &lt;App playerID=&quot;0&quot;/&gt;
      </div>
      <div className="run">
        <App gameID="multi" playerID="1" />
        &lt;App playerID=&quot;1&quot;/&gt;
      </div>
    </div>
  </div>
);

export default Multiplayer;
