/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import Multiplayer1 from './multiplayer-client.1';
import Multiplayer2 from './multiplayer-client.2';

const routes = [
  {
    path: '/synctest/multiplayer1',
    text: 'Multiplayer1',
    component: Multiplayer1,
  },
  {
    path: '/synctest/multiplayer2',
    text: 'Multiplayer2',
    component: Multiplayer2,
  }
];

export default routes;
