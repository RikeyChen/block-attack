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

    this.board.grid.forEach((row, idx1) => {
      const rowNode = document.createElement('div');
      rowNode.className = `row ${idx1}`;

      row.forEach((col, idx2) => {
        const colNode = document.createElement('div');
        colNode.className = `pos-${idx1}-${idx2}`;
        rowNode.appendChild(colNode);
      });

      gameContainer.appendChild(rowNode);
    });
  }

  renderBlocks() {
    const { grid } = this.board;

    grid.forEach((row, idx1) => {
      row.forEach((col, idx2) => {
        const pos = document.getElementsByClassName(`pos-${idx1}-${idx2}`)[0];
        if (grid[idx1][idx2] !== 'X') {
          pos.className += ` ${this.game.currentBlock.symbol}`;
        }
      });
    });
  }
}

export default App;

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();

  app.renderBlocks();
});
