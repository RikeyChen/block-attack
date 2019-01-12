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

// Make default grid 21 rows in height
for (let i = 0; i < 21; i++) {
  defaultGrid.push(Array.from(row));
}

class Board {
  constructor(grid = defaultGrid) {
    this.grid = grid;
    this.pieces = [];

    this.gameOver = this.gameOver.bind(this);
    this.renderBlockStart = this.renderBlockStart.bind(this);
    this.blockRenderable = this.blockRenderable.bind(this);
    this.descendBlock = this.descendBlock.bind(this);
    this.renderBlock = this.renderBlock.bind(this);
    this.next = this.next.bind(this);
    this.currentBlock = this.next();
  }

  gameOver() {
    return !this.blockRenderable(this.currentBlock);
  }

  next() {
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
    switch (block.constructor.name) {
      case 'IBlock':
        for (let i = 0; i < block.startPos.length; i++) {
          const [x, y] = block.startPos[i];
          if (this.grid[x + 1][y] !== 'X') return false;
        }
        break;
      case 'JBlock':
      case 'LBlock':
      case 'TBlock':
        for (let i = 1; i < block.startPos.length; i++) {
          const [x, y] = block.startPos[i];
          if (this.grid[x][y] !== 'X') return false;
        }
        break;
      case 'OBlock':
      case 'SBlock':
      case 'ZBlock':
        for (let i = 2; i < block.startPos.length; i++) {
          const [x, y] = block.startPos[i];
          if (this.grid[x][y] !== 'X' && !block.startPos.includes([x, y])) return false;
        }
        break;
      default:
        break;
    }
    return true;
    // for (let i = 0; i < block.startPos.length; i++) {
    //   const [x, y] = block.startPos[i];
    //   if (block instanceof IBlock) {
    //     if (this.grid[x + 1][y] !== 'X') {
    //       return false;
    //     }
    //   } else if (!block.currentPos.includes([x, y])
    //             && this.grid[x + 1][y] !== 'X') {
    //     return false;
    //   }
    // }
    // return true;
  }

  nextLevel(block) {
    const newPos = block.currentPos.map((coord) => {
      const [x, y] = coord;
      return [x + 1, y];
    });
    return newPos;
  }

  descendBlock(block) {
    this.renderBlock('X', block.currentPos);
    block.descend(this.nextLevel(block));
    this.renderBlock(block.symbol, block.currentPos);
  }

  descendable(block) {
    const nextCoords = this.nextLevel(block);
    for (let i = 0; i < nextCoords.length; i++) {
      const [x, y] = nextCoords[i];
      if (x < 1 || x > 20) {
        return false;
      }
      if (!block.currentPos.includes([x, y]) && this.grid[x][y] !== 'X') {
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
    for (let i = 0; i < block.startPos.length; i++) {
      const [x, y] = block.startPos[i];
      this.grid[x][y] = block.symbol;
    }
  }
}

export default Board;
