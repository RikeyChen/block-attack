import Game from './game/game';

class App {
  constructor(game = new Game()) {
    this.game = game;
    this.populateGrid = this.populateGrid.bind(this);
    this.board = this.game.board;
    this.renderBlocks = this.renderBlocks.bind(this);
    this.populateGrid();
  }

  populateGrid() {
    const gameContainer = document.getElementsByClassName('block-game')[0];
    for (let idx1 = 1; idx1 < this.board.grid.length; idx1++) {
      const rowNode = document.createElement('div');
      rowNode.className = `row ${idx1}`;

      for (let idx2 = 0; idx2 < this.board.grid[idx1].length; idx2++) {
        const colNode = document.createElement('div');
        colNode.className = `pos-${idx1}-${idx2}`;
        rowNode.appendChild(colNode);
      }
      gameContainer.appendChild(rowNode);
    }
  }

  renderBlocks() {
    const { grid } = this.board;
    for (let idx1 = 1; idx1 < grid.length; idx1++) {
      for (let idx2 = 0; idx2 < grid[idx1].length; idx2++) {
        const pos = document.getElementsByClassName(`pos-${idx1}-${idx2}`)[0];
        if (grid[idx1][idx2] !== 'X') {
          pos.className = `pos-${idx1}-${idx2} ${grid[idx1][idx2]}`;
        } else {
          pos.className = `pos-${idx1}-${idx2}`;
        }
      }
    }
  }
}

export default App;

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  const render = setInterval(() => {
    app.renderBlocks();
  }, 10);
  app.game.playNextBlock(app);

  if (app.game.over()) {
    clearInterval(render);
  }
  window.shiftClearedRow = app.game.board.shiftClearedRow;
  window.grid = app.game.board.grid;
  window.shiftBlock = app.game.board.shiftBlock;
  window.currentBlock = app.game.board.currentBlock;
  window.playNextBlock = app.game.playNextBlock;
  window.renderBlocks = app.renderBlocks;
});
