/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { Lobby } from 'boardgame.io/react';
import { default as BoardSplendor} from './splendor/components/board.js'
import { default as Splendor} from './splendor/game.js'
import './app.css';

const importedGames = [
  { game: Splendor, board: BoardSplendor },
];

// CSS for the sidebar is taken from vue.css
const App = () => (
  <div style={{ padding: 50 }}>
    <h1>Lobby</h1>

    <Lobby
      gameServer="http://localhost:8000"
      lobbyServer="http://localhost:8000"
      gameComponents={importedGames}
    />
  </div>
);

export default App;
