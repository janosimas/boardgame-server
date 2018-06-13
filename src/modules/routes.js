/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import tic_tac_toe from './tic-tac-toe';
import evolution from './evolution-review';
import synctest from './synctest';

const routes = [
  {
    name: 'Tic-Tac-Toe',
    routes: tic_tac_toe.routes,
  },
  {
    name: 'Evolution',
    routes: evolution.routes,
  },
  {
    name: 'SyncTest',
    routes: synctest.routes,
  }
];

export default routes;
