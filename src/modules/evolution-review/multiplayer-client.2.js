import React from 'react'
import { Client } from 'boardgame.io/react';
import Evolution from './game';
import EvolutionBoard from './react-components/board';

const App = Client({
  game: Evolution,
  numPlayers: 2,
  board: EvolutionBoard,
  multiplayer: true,
  debug: false
});

const Multiplayer2 = () => (
  <div style={{ padding: 50 }}>
    <h1>Multiplayer</h1>
    <div>
      <App gameID="multi" playerID="1" />
      &lt;App playerID=&quot;1&quot;/&gt;
    </div>
  </div>
);

export default Multiplayer2;
