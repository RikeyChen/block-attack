const level = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];

const defaultGrid = [];

// Make default grid 21 rows in height
for (let i = 0; i < 21; i++) {
  defaultGrid.push(Array.from(level));
}

class Board {
  constructor(grid = defaultGrid) {
    this.grid = grid;
    this.gameOver = this.gameOver.bind(this);
    this.fullBoard = this.fullBoard.bind(this);
  }

  gameOver() {
    return this.fullBoard();
  }

  fullBoard() {
    for (let i = 0; i < 10; i++) {
      if (
        this.grid[i][0]
      && this.grid[i][1]
      && this.grid[i][2]
      && this.grid[i][3]
      && this.grid[i][4]
      ) return true;
    }
    return false;
  }
}

export default Board;
