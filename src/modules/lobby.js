/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import { Lobby } from "boardgame.io/react";
import { default as Board } from "./language-game/react-components/board.js";
import { default as Game } from "./language-game/game.js";
import "./app.css";

const importedGames = [{ game: Game, board: Board }];

// CSS for the sidebar is taken from vue.css
const App = () => (
  <div style={{ padding: 50 }}>
    <h1>Lobby</h1>

    <Lobby
      gameServer={`https://${window.location.hostname}:8000`}
      lobbyServer={`https://${window.location.hostname}:8000`}
      gameComponents={importedGames}
    />
  </div>
);

export default App;
