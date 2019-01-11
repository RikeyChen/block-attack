import OBlock from './blocks/o_block';
import TBlock from './blocks/t_block';
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
    this.pieces = [];

    this.gameOver = this.gameOver.bind(this);
    this.renderBlockStart = this.renderBlockStart.bind(this);
    this.blockRenderable = this.blockRenderable.bind(this);
    this.nextBlock = this.nextBlock.bind(this);
    this.descendBlock = this.descendBlock.bind(this);
    this.renderBlock = this.renderBlock.bind(this);
  }

  gameOver() {
    return !this.blockRenderable();
  }

  nextBlock() {
    if (this.pieces.length === 0) {
      this.pieces = [
        new OBlock(), new OBlock(), new OBlock(), new OBlock(),
        new TBlock(), new TBlock(), new TBlock(), new TBlock(),
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
      return [x + 1, y];
    });
    return newPos;
  }

  descendBlock(block) {
    this.renderBlock('X', block.pos);
    block.descend(this.nextLevel(block));
    this.renderBlock(block.symbol, block.pos);
  }

  descendable(block) {
    const nextCoords = this.nextLevel(block);
    for (let i = 0; i < nextCoords.length; i++) {
      const [x, y] = nextCoords[i];
      if ((this.grid[x][y] !== 'X' && this.grid[x][y] !== 'C') || this.grid[x][y] === undefined) {
        return false;
      }
    } return true;
  }

  renderBlock(blockSym, coords) {
    for (let i = 0; i < coords.length; i++) {
      const [x, y] = coords[i];
      this.grid[x][y] = blockSym;
    }
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
