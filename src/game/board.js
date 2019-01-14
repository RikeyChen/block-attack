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
    this.shiftBlock = this.shiftBlock.bind(this);
    this.renderBlock = this.renderBlock.bind(this);
    this.clearRows = this.clearRows.bind(this);
    this.shiftClearedRow = this.shiftClearedRow.bind(this);
    this.dropBlock = this.dropBlock.bind(this);
    this.setPresetBlock = this.setPresetBlock.bind(this);
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

  clearRows() {
    this.rowClearCount = 0;
    this.lowestRowCleared = null;
    for (let idx1 = 0; idx1 < this.grid.length; idx1++) {
      if (this.grid[idx1].every(coord => coord !== 'X')) {
        this.rowClearCount += 1;
        this.lowestRowCleared = idx1;
        for (let idx2 = 0; idx2 < this.grid[idx1].length; idx2++) {
          this.grid[idx1][idx2] = 'X';
        }
      }
    }
  }

  shiftClearedRow() {
    const tempGrid = this.grid.map(a => Object.assign([], a));
    for (let idx1 = 0; idx1 <= (this.lowestRowCleared - this.rowClearCount); idx1++) {
      for (let idx2 = 0; idx2 < this.grid[idx1].length; idx2++) {
        this.grid[idx1][idx2] = 'X';
      }
    }

    for (let idx3 = 0; idx3 <= (this.lowestRowCleared - this.rowClearCount); idx3++) {
      for (let idx4 = 0; idx4 < this.grid[idx3].length; idx4++) {
        this.grid[idx3 + 1][idx4] = tempGrid[idx3][idx4];
      }
    }
    this.rowClearCount -= 1;
  }

  dropBlock(block) {
    const newCoords = this.setPresetBlock(block);
    this.rowsDropped = newCoords[0][0] - block.currentPos[0][0];
    this.renderBlock('X', block.currentPos);
    block.shift(newCoords);
    this.renderBlock(block.symbol, newCoords);
  }

  setPresetBlock(block) {
    const presetBlock = {
      currentPos: block.currentPos.map(coord => Object.assign([], coord)),
    };

    const tempGrid = this.grid.map(a => Object.assign([], a));

    let shiftable = true;
    while (shiftable) {
      const newCoords = this.nextLevel(presetBlock, 'down');
      for (let i = 0; i < newCoords.length; i++) {
        const [x, y] = newCoords[i];
        if (x === 21 || y === 10 || (tempGrid[x][y] !== 'X'
          && searchForArray(presetBlock.currentPos, newCoords[i]) === -1)) {
          shiftable = false;
          break;
        }
      }
      if (shiftable) presetBlock.currentPos = newCoords;
    }
    return presetBlock.currentPos;
  }
}

export default Board;
