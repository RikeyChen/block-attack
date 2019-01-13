import OBlock from './blocks/o_block';
import TBlock from './blocks/t_block';
import LBlock from './blocks/l_block';
import JBlock from './blocks/j_block';
import ZBlock from './blocks/z_block';
import SBlock from './blocks/s_block';
import IBlock from './blocks/i_block';
import searchForArray from '../util/util';

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

    this.renderBlockStart = this.renderBlockStart.bind(this);
    this.blockRenderable = this.blockRenderable.bind(this);
    // this.descendBlock = this.descendBlock.bind(this);
    this.shiftBlock = this.shiftBlock.bind(this);
    this.renderBlock = this.renderBlock.bind(this);
    this.next = this.next.bind(this);
    this.currentBlock = this.next();
    this.gameOver = false;
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
    if (block.start) {
      if (block instanceof IBlock) {
        for (let i = 0; i < block.startPos.length; i++) {
          const [x, y] = block.startPos[i];
          if (this.grid[x + 1][y] !== 'X') {
            this.gameOver = true;
            return false;
          }
        }
      } else {
        const startBottomRow = block.findBottomRow(block.startPos);
        for (let i = 0; i < startBottomRow.length; i++) {
          const [x, y] = startBottomRow[i];
          if (this.grid[x][y] !== 'X') {
            this.gameOver = true;
            return false;
          }
        }
      }
    } return true;
  }

  nextLevel(block, direction) {
    const newPos = block.currentPos.map((coord) => {
      const [x, y] = coord;
      switch (direction) {
        case 'down':
          return [x + 1, y];
          break;
        case 'right':
          return [x, y + 1];
        case 'left':
          return [x, y - 1];
        default:
          break;
      }
    });
    return newPos;
  }

  shiftBlock(block, direction) {
    if (this.shiftable(block, direction)) {
      this.renderBlock('X', block.currentPos);
      block.shift(this.nextLevel(block, direction));
      this.renderBlock(block.symbol, block.currentPos);
    }
  }

  rotateBlock(block) {
    if (this.rotatable(block)) {
      this.renderBlock('X', block.currentPos);
      block.rotate();
      this.renderBlock(block.symbol, block.currentPos);
    }
  }

  shiftable(block, direction) {
    const newCoords = this.nextLevel(block, direction);
    for (let i = 0; i < newCoords.length; i++) {
      const [x, y] = newCoords[i];
      if (x === 21 || y === 10 || (this.grid[x][y] !== 'X'
          && searchForArray(block.currentPos, newCoords[i]) === -1)) {
        return false;
      }
    }
    return true;
  }

  // shiftable(block, direction) {
  //   switch (direction) {
  //     case 'right':
  //       const mostRightRow = block.findMostRightRow(block.currentPos);
  //       for (let i = 0; i < mostRightRow.length; i++) {
  //         const [x, y] = mostRightRow[i];
  //         if (y === 9 || this.grid[x][y + 1] !== 'X') {
  //           return false;
  //         }
  //       }
  //       break;
  //     case 'left':
  //       const mostLeftRow = block.findMostLeftRow(block.currentPos);
  //       for (let i = 0; i < mostLeftRow.length; i++) {
  //         const [x, y] = mostLeftRow[i];
  //         if (y === 0 || this.grid[x][y - 1] !== 'X') {
  //           return false;
  //         }
  //       }
  //       break;
  //     case 'down':
  //       const bottomRow = block.findBottomRow(block.currentPos);
  //       for (let i = 0; i < bottomRow.length; i++) {
  //         const [x, y] = bottomRow[i];
  //         if (x === 20 || this.grid[x + 1][y] !== 'X') {
  //           return false;
  //         }
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //   return true;
  // }

  rotatable(block) {
    block.pivot = block.currentPos[0];
    const newCoords = block.currentPos.map((coord) => {
      const [x, y] = coord;
      const newX = y + block.pivot[0] - block.pivot[1];
      const newY = block.pivot[0] + block.pivot[1] - x;
      return [newX, newY];
    });

    for (let i = 0; i < newCoords.length; i++) {
      const [x, y] = newCoords[i];
      if (this.grid[x][y] !== 'X'
        && searchForArray(block.currentPos, newCoords[i]) === -1) {
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
