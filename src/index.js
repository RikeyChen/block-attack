import Game from './game/game';

class App {
  constructor(game = new Game()) {
    this.game = game;
    this.populateGrid = this.populateGrid.bind(this);
  }

  populateGrid() {
    const { board } = this.game;
    const gameContainer = document.getElementsByClassName('game-container')[0];

    board.grid.forEach((row, idx1) => {
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
}

export default App;

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.populateGrid();
});
