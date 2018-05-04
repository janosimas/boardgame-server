import React from 'react';

import { Client } from 'boardgame.io/react';
import Evolution from '../game';
import EvolutionBoard from '../board';

const App = Client({
  game: Evolution,
  numPlayers: 2,
  board: EvolutionBoard,
  multiplayer: false,
});

const PassNPlay = () => (
  <div style={{ padding: 50 }}>
    <h1>{"Pass'n'Play"}</h1>
    <App />
  </div>
);

export default PassNPlay;
