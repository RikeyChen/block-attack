/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./public/stylesheets";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game/blocks/block.js":
/*!**********************************!*\
  !*** ./src/game/blocks/block.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Block {
  constructor(type = 'null', start = true) {
    this.type = type;
    this.symbol = 'X';
    this.startPos = [[0, 0]];
    this.currentPos = this.startPos;
    this.pos = [[0, 0]];
    this.start = start;
    this.pivot = this.currentPos[0];
    this.rotate = this.rotate.bind(this);
  }

  findBottomRow(pos) {
    const xValues = [];
    pos.forEach(coords => xValues.push(coords[0]));
    const maxX = Math.max(...xValues);
    const maxIndices = [];
    xValues.forEach((x, idx) => {
      if (x === maxX) maxIndices.push(idx);
    });
    const bottomRow = pos.filter((pos, idx) => maxIndices.includes(idx));
    return bottomRow;
  }

  shift(newCoords) {
    this.start = false;
    this.currentPos = newCoords;
    return this.currentPos;
  }

  rotate() {
    this.pivot = this.currentPos[0];
    this.currentPos = this.currentPos.map((coord) => {
      const [x, y] = coord;
      const relativeV = [x - this.pivot[0], y - this.pivot[1]];
      const rotatedV = [
        ((relativeV[0] * 0) + (relativeV[1] * 1)),
        ((relativeV[0] * -1) + (relativeV[1] * 0)),
      ];
      const newX = rotatedV[0] + this.pivot[0];
      const newY = rotatedV[1] + this.pivot[1];
      return [newX, newY];
    });
    return this.currentPos;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Block);


/***/ }),

/***/ "./src/game/blocks/i_block.js":
/*!************************************!*\
  !*** ./src/game/blocks/i_block.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ "./src/game/blocks/block.js");


class IBlock extends _block__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(type = 'threes') {
    super(type);
    this.symbol = 'I';
    this.startPos = [[0, 4], [0, 3], [0, 5], [0, 6]];
    this.currentPos = this.startPos;
    this.pos = [[0, 0], [0, 1], [0, 2], [0, 3]];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (IBlock);


/***/ }),

/***/ "./src/game/blocks/j_block.js":
/*!************************************!*\
  !*** ./src/game/blocks/j_block.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ "./src/game/blocks/block.js");


class JBlock extends _block__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'J';
    this.startPos = [[1, 5], [0, 4], [1, 4], [1, 6]];
    this.currentPos = this.startPos;
    this.pos = [[0, 0], [1, 0], [1, 1], [1, 2]];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (JBlock);


/***/ }),

/***/ "./src/game/blocks/l_block.js":
/*!************************************!*\
  !*** ./src/game/blocks/l_block.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ "./src/game/blocks/block.js");


class LBlock extends _block__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'L';
    this.startPos = [[1, 5], [0, 6], [1, 4], [1, 6]];
    this.currentPos = this.startPos;
    this.pos = [[1, 0], [1, 1], [1, 2], [0, 2]];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (LBlock);


/***/ }),

/***/ "./src/game/blocks/o_block.js":
/*!************************************!*\
  !*** ./src/game/blocks/o_block.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ "./src/game/blocks/block.js");


class OBlock extends _block__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'O';
    this.startPos = [[0, 4], [0, 5], [1, 4], [1, 5]];
    this.currentPos = this.startPos;
    this.pos = [[0, 0], [0, 1], [1, 0], [1, 1]];
  }

  rotate() {

  }
}

/* harmony default export */ __webpack_exports__["default"] = (OBlock);


/***/ }),

/***/ "./src/game/blocks/s_block.js":
/*!************************************!*\
  !*** ./src/game/blocks/s_block.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ "./src/game/blocks/block.js");


class SBlock extends _block__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'S';
    this.startPos = [[1, 5], [0, 5], [0, 6], [1, 4]];
    this.currentPos = this.startPos;
    this.pos = [[1, 0], [1, 1], [0, 1], [0, 2]];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (SBlock);


/***/ }),

/***/ "./src/game/blocks/t_block.js":
/*!************************************!*\
  !*** ./src/game/blocks/t_block.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ "./src/game/blocks/block.js");


class TBlock extends _block__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'T';
    this.startPos = [[1, 5], [0, 5], [1, 4], [1, 6]];
    this.currentPos = this.startPos;
    this.pos = [[1, 1], [0, 1], [1, 0], [1, 2]];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TBlock);


/***/ }),

/***/ "./src/game/blocks/z_block.js":
/*!************************************!*\
  !*** ./src/game/blocks/z_block.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ "./src/game/blocks/block.js");


class ZBlock extends _block__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'Z';
    this.startPos = [[1, 5], [0, 4], [0, 5], [1, 6]];
    this.currentPos = this.startPos;
    this.pos = [[0, 0], [0, 1], [1, 1], [1, 2]];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ZBlock);


/***/ }),

/***/ "./src/game/board.js":
/*!***************************!*\
  !*** ./src/game/board.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_o_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/o_block */ "./src/game/blocks/o_block.js");
/* harmony import */ var _blocks_t_block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks/t_block */ "./src/game/blocks/t_block.js");
/* harmony import */ var _blocks_l_block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks/l_block */ "./src/game/blocks/l_block.js");
/* harmony import */ var _blocks_j_block__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blocks/j_block */ "./src/game/blocks/j_block.js");
/* harmony import */ var _blocks_z_block__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./blocks/z_block */ "./src/game/blocks/z_block.js");
/* harmony import */ var _blocks_s_block__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./blocks/s_block */ "./src/game/blocks/s_block.js");
/* harmony import */ var _blocks_i_block__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blocks/i_block */ "./src/game/blocks/i_block.js");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/util */ "./src/util/util.js");









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
    this.blastEffect = this.blastEffect.bind(this);
    this.next = this.next.bind(this);
    this.currentBlock = this.next();
    this.gameOver = false;
  }

  next() {
    if (this.pieces.length === 0) {
      this.pieces = [
        new _blocks_o_block__WEBPACK_IMPORTED_MODULE_0__["default"](), new _blocks_o_block__WEBPACK_IMPORTED_MODULE_0__["default"](), new _blocks_o_block__WEBPACK_IMPORTED_MODULE_0__["default"](), new _blocks_o_block__WEBPACK_IMPORTED_MODULE_0__["default"](),
        new _blocks_t_block__WEBPACK_IMPORTED_MODULE_1__["default"](), new _blocks_t_block__WEBPACK_IMPORTED_MODULE_1__["default"](), new _blocks_t_block__WEBPACK_IMPORTED_MODULE_1__["default"](), new _blocks_t_block__WEBPACK_IMPORTED_MODULE_1__["default"](),
        new _blocks_l_block__WEBPACK_IMPORTED_MODULE_2__["default"](), new _blocks_l_block__WEBPACK_IMPORTED_MODULE_2__["default"](), new _blocks_l_block__WEBPACK_IMPORTED_MODULE_2__["default"](), new _blocks_l_block__WEBPACK_IMPORTED_MODULE_2__["default"](),
        new _blocks_j_block__WEBPACK_IMPORTED_MODULE_3__["default"](), new _blocks_j_block__WEBPACK_IMPORTED_MODULE_3__["default"](), new _blocks_j_block__WEBPACK_IMPORTED_MODULE_3__["default"](), new _blocks_j_block__WEBPACK_IMPORTED_MODULE_3__["default"](),
        new _blocks_z_block__WEBPACK_IMPORTED_MODULE_4__["default"](), new _blocks_z_block__WEBPACK_IMPORTED_MODULE_4__["default"](), new _blocks_z_block__WEBPACK_IMPORTED_MODULE_4__["default"](), new _blocks_z_block__WEBPACK_IMPORTED_MODULE_4__["default"](),
        new _blocks_s_block__WEBPACK_IMPORTED_MODULE_5__["default"](), new _blocks_s_block__WEBPACK_IMPORTED_MODULE_5__["default"](), new _blocks_s_block__WEBPACK_IMPORTED_MODULE_5__["default"](), new _blocks_s_block__WEBPACK_IMPORTED_MODULE_5__["default"](),
        new _blocks_i_block__WEBPACK_IMPORTED_MODULE_6__["default"](), new _blocks_i_block__WEBPACK_IMPORTED_MODULE_6__["default"](), new _blocks_i_block__WEBPACK_IMPORTED_MODULE_6__["default"](), new _blocks_i_block__WEBPACK_IMPORTED_MODULE_6__["default"](),
      ];
    }

    return this.pieces.splice(
      Math.floor(Math.random() * this.pieces.length - 1),
      1,
    )[0];
  }

  blockRenderable(block) {
    if (block.start) {
      if (block instanceof _blocks_i_block__WEBPACK_IMPORTED_MODULE_6__["default"]) {
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
          && Object(_util_util__WEBPACK_IMPORTED_MODULE_7__["default"])(block.currentPos, newCoords[i]) === -1)) {
        return false;
      }
    }
    return true;
  }

  // Clockwise rotation matrix = [0 1
  //                            -1 0]
  rotatable(block) {
    block.pivot = block.currentPos[0];
    const newCoords = block.currentPos.map((coord) => {
      const [x, y] = coord;
      const relativeV = [x - block.pivot[0], y - block.pivot[1]];
      const rotatedV = [
        ((relativeV[0] * 0) + (relativeV[1] * 1)),
        ((relativeV[0] * -1) + (relativeV[1] * 0)),
      ];
      const newX = rotatedV[0] + block.pivot[0];
      const newY = rotatedV[1] + block.pivot[1];
      return [newX, newY];
    });

    for (let i = 0; i < newCoords.length; i++) {
      const [x, y] = newCoords[i];
      if (this.grid[x][y] !== 'X'
        && Object(_util_util__WEBPACK_IMPORTED_MODULE_7__["default"])(block.currentPos, newCoords[i]) === -1) {
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

  blastEffect() {
    let blasts = document.getElementsByClassName('blast');
    for (let i = 0; i < blasts.length; i++) {
      const blast = blasts[i];
      blast.className = 'blast on';
    }

    blasts = document.getElementsByClassName('blast');

    setTimeout(() => {
      for (let i = 0; i < blasts.length; i++) {
        const blast = blasts[i];
        blast.className = 'blast off';
      }
    }, 500);
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
    if (this.rowClearCount > 0) this.blastEffect();
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
          && Object(_util_util__WEBPACK_IMPORTED_MODULE_7__["default"])(presetBlock.currentPos, newCoords[i]) === -1)) {
          shiftable = false;
          break;
        }
      }
      if (shiftable) presetBlock.currentPos = newCoords;
    }
    return presetBlock.currentPos;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Board);


/***/ }),

/***/ "./src/game/game.js":
/*!**************************!*\
  !*** ./src/game/game.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/game/board.js");


class Game {
  constructor(board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"]()) {
    this.board = board;
    this.over = this.over.bind(this);
    this.playNextBlock = this.playNextBlock.bind(this);
    this.level = 1;
    this.time = (this.level === 1 ? 1000 : (1000 / (2 * this.level)));
    this.score = 0;
    this.updateLevel = this.updateLevel.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.eventListenMovement = this.eventListenMovement.bind(this);

    this.update = setInterval(() => {
      this.updateScore();
      this.updateLevel();
    }, 25);

    document.addEventListener('keydown', this.eventListenMovement);
  }

  eventListenMovement(e) {
    switch (e.key) {
      case 'ArrowDown':
        this.board.shiftBlock(this.board.currentBlock, 'down');
        this.score += 40 * this.level;
        break;
      case 'ArrowUp':
        this.board.rotateBlock(this.board.currentBlock);
        break;
      case 'ArrowLeft':
        this.board.shiftBlock(this.board.currentBlock, 'left');
        break;
      case 'ArrowRight':
        this.board.shiftBlock(this.board.currentBlock, 'right');
        break;
      case ' ':
        this.board.dropBlock(this.board.currentBlock);
        this.score += 40 * this.level * this.board.rowsDropped;
        break;
      default:
        break;
    }
  }

  over() {
    return this.board.gameOver;
  }

  scoringByLinesCleared() {
    return {
      1: 40,
      2: 100,
      3: 300,
      4: 1200,
    };
  }

  updateLevel() {
    const level = document.getElementsByClassName('level')[0];
    level.innerHTML = `Level ${this.level}`;
  }

  updateScore() {
    const score = document.getElementsByClassName('score')[0];
    score.innerHTML = `Score: ${this.score}`;
  }

  playNextBlock() {
    if (this.score >= ((10000 * 2.5) * (2 ** this.level))) {
      this.level += 1;
      this.updateLevel();
    }
    const { currentBlock } = this.board;
    if (currentBlock.start && this.board.blockRenderable(currentBlock)) {
      this.board.renderBlockStart(currentBlock);
    } else {
      document.removeEventListener('keydown', this.eventListenMovement);
      clearInterval(this.update);
      return;
    }

    const descendBlock = setInterval(() => {
      this.board.shiftBlock(currentBlock, 'down');
      if (!this.board.shiftable(currentBlock, 'down')) {
        this.board.clearRows();
        if (this.board.rowClearCount > 0) {
          this.score += this.scoringByLinesCleared()[this.board.rowClearCount] * (this.level + 1);
          this.updateScore();
          const shiftClearedRows = setInterval(() => {
            this.board.shiftClearedRow();
            if (this.board.rowClearCount === 0) {
              clearInterval(shiftClearedRows);
              this.board.currentBlock = this.board.next();
              clearInterval(descendBlock);
              this.playNextBlock();
            }
          }, 50);
        } else {
          this.board.currentBlock = this.board.next();
          clearInterval(descendBlock);
          if (!this.over()) {
            this.playNextBlock();
          }
        }
      }
    }, this.time);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/game */ "./src/game/game.js");


class App {
  constructor(game = new _game_game__WEBPACK_IMPORTED_MODULE_0__["default"]()) {
    this.game = game;
    this.populateGrid = this.populateGrid.bind(this);
    this.board = this.game.board;
    this.renderBlocks = this.renderBlocks.bind(this);
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

/* harmony default export */ __webpack_exports__["default"] = (App);

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementsByClassName('start-button')[0];
  const retryButton = document.getElementsByClassName('start-button')[1];

  const startGame = () => {
    const startModal = document.getElementsByClassName('modal')[0];
    if (startModal) startModal.className = 'modal-off';

    const app = new App();

    if (document.getElementsByClassName('row').length === 0) {
      app.populateGrid();
    }

    const render = setInterval(() => {
      app.renderBlocks();
    }, 25);

    app.game.playNextBlock();

    const checkGameOver = setInterval(() => {
      if (app.game.over()) {
        clearInterval(render);
        clearInterval(checkGameOver);
        const gameOverModal = document.getElementById('game-over');
        gameOverModal.className = 'modal';
        retryButton.onclick = () => {
          document.removeEventListener('click', startGame);
          document.location.href = '';
        };
      }
    }, 25);
  };

  startButton.addEventListener('click', startGame);
});


/***/ }),

/***/ "./src/util/util.js":
/*!**************************!*\
  !*** ./src/util/util.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const searchForArray = (array, targetArray) => {
  let i; let j; let
    current;
  for (i = 0; i < array.length; ++i) {
    if (targetArray.length === array[i].length) {
      current = array[i];
      for (j = 0; j < targetArray.length && targetArray[j] === current[j]; ++j);
      if (j === targetArray.length) { return i; }
    }
  }
  return -1;
};

/* harmony default export */ __webpack_exports__["default"] = (searchForArray);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map