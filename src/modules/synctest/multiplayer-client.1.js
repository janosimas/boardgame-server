import React from 'react'
import { Client } from 'boardgame.io/react';
import SyncTest from './game';
import SyncTestBoard from './board';

const App = Client({
  game: SyncTest,
  numPlayers: 2,
  board: SyncTestBoard,
  multiplayer: true,
  debug: false
});

const Multiplayer1 = () => (
  <div style={{ padding: 50 }}>
    <h1>Multiplayer</h1>
    <div>
      <App gameID="multi" playerID="0" />
      &lt;App playerID=&quot;0&quot;/&gt;
    </div>
  </div>
);

export default Multiplayer1;
