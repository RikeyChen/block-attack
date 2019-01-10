class Board {
  constructor(grid) {
    this.grid = grid;
    this.gameOver = this.gameOver.bind(this);
    this.fullBoard = this.fullBoard.bind(this);
  }

  gameOver() {
    return this.fullBoard();
  }

  fullBoard() {
    this.grid[20];
  }

  row() {
    this.grid;
  }
}

export default Board;
