/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from 'boardgame.io/core';
import { INVALID_MOVE } from 'boardgame.io/dist/core';

import { isNil, isEmpty, uniq } from 'ramda';

const LanguageGame = Game({
  name: 'LanguageGame',

  setup: (ctx) => ({}),

  moves: {
    selectTranslation: (G, ctx) => {

    },

    selectPictureToShow: (G, ctx) => {

    }
  },
  flow: {
    onTurnBegin:(G, ctx) => {

    },
    onMove: (G, ctx) => {},
    endGameIf: (G, ctx) => {},
  }
});

export default LanguageGame;
