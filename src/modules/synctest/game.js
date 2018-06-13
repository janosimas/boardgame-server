import { Game } from 'boardgame.io/dist/core';

const SyncTest = {
  name: 'SyncTest',
  setup: () => ({
    click: [],
    count: 0,
    endTurn: false
  }),
  moves: {
    click(G, ctx) {
      const GCopy = Object.assign({}, G);
      GCopy.click.push(0);
      GCopy.endTurn = true;
      return GCopy;
    },
  },
  flow: {
    onMove: (G, ctx) => {
      if(G.click.length == 2) {
        const GCopy = Object.assign({}, G);
        GCopy.count++;
        GCopy.click = [];
        return GCopy;
      }

      return G;
    },
    endTurnIf: (G, ctx) => G.endTurn,
    onTurnEnd: (G, ctx) => {
      const GCopy = Object.assign({}, G);
      GCopy.endTurn = false;
      return GCopy;
    }
  }
}

export default Game(SyncTest);
