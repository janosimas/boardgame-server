/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import PassNPlay from './passnplay-client';
import Multiplayer from './multiplayer-client';

const routes = [
  {
    path: '/evolution/passnplay',
    text: 'Pass\'n\'Play',
    component: PassNPlay,
  },
  {
    path: '/evolution/multiplayer',
    text: 'Multiplayer',
    component: Multiplayer,
  }
];

export default routes;
