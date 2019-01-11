import SquareBlock from './blocks/square_block';
import TriBlock from './blocks/tri_block';
import LBlock from './blocks/l_block';
import JBlock from './blocks/j_block';
import ZBlock from './blocks/z_block';
import SBlock from './blocks/s_block';
import IBlock from './blocks/i_block';

const row = [
  'X', 'X', 'X', 'X', 'X',
  'X', 'X', 'X', 'X', 'X',
];

const defaultGrid = [];

// Make default grid 20 rows in height
for (let i = 0; i < 20; i++) {
  defaultGrid.push(Array.from(row));
}

class Board {
  constructor(grid = defaultGrid) {
    this.grid = grid;
    this.blocked = false;
    this.currentBlock = null;
    this.pieces = [];

    this.gameOver = this.gameOver.bind(this);
    this.renderBlockStart = this.renderBlockStart.bind(this);
    this.blockRenderable = this.blockRenderable.bind(this);
    this.nextBlock = this.nextBlock.bind(this);
  }

  gameOver() {
    return !this.blockRenderable();
  }

  nextBlock() {
    if (this.pieces.length === 0) {
      this.pieces = [
        new SquareBlock(), new SquareBlock(), new SquareBlock(), new SquareBlock(),
        new TriBlock(), new TriBlock(), new TriBlock(), new TriBlock(),
        new LBlock(), new LBlock(), new LBlock(), new LBlock(),
        new JBlock(), new JBlock(), new JBlock(), new JBlock(),
        new ZBlock(), new ZBlock(), new ZBlock(), new ZBlock(),
        new SBlock(), new SBlock(), new SBlock(), new SBlock(),
        new IBlock(), new IBlock(), new IBlock(), new IBlock(),
      ];
    }

    return this.pieces.splice(
      Math.floor(Math.random() * this.pieces.length - 1),
      1,
    )[0];
  }

  blockRenderable(block) {
    const inc = block.type === 'threes' ? 3 : 4;
    for (let i = 0; i < block.pos.length; i++) {
      const [x, y] = block.pos[i];
      if (this.grid[x + inc][y + inc] !== 'X') {
        return false;
      }
    }
    return true;
  }

  nextLevel(block) {
    const newPos = block.pos.map((coord) => {
      const [x, y] = coord;
      return [x, y + 1];
    });
    return newPos;
  }

  descendBlock(block) {
    block.descend(nextLevel(block));
  }

  renderBlockStart(block) {
    const inc = block.type === 'threes' ? 3 : 4;
    for (let i = 0; i < block.pos.length; i++) {
      const [x, y] = block.pos[i];
      this.grid[x][y + inc] = block.symbol;
    }
  }
}

export default Board;
