import React from 'react'
import { Client } from 'boardgame.io/react';
import Evolution from './game';
import EvolutionBoard from './react-components/board';

const App = Client({
  game: Evolution,
  numPlayers: 2,
  board: EvolutionBoard,
  multiplayer: false,
  debug: false
});


const Singleplayer = () => (
  <div style={{ padding: 50 }}>
    <h1>Singleplayer</h1>
    <App gameID="single" />
  </div>
);

export default Singleplayer;
