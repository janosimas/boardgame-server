/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import tic_tac_toe from './tic-tac-toe';
import splendor from './splendor';


const routes = [
  {
    name: 'Tic-Tac-Toe',
    routes: tic_tac_toe.routes,
  },
  {
    name: 'Splendor',
    routes: splendor.routes,
  }
];

export default routes;
