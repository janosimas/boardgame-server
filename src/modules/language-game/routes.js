/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import {Player1, Player2} from './components/multiplayer';

const routes = [
  {
    path: '/lang/player1',
    text: 'Player1',
    component: Player1,
  },
  {
    path: '/lang/player2',
    text: 'Player2',
    component: Player2,
  },
];

export default routes;