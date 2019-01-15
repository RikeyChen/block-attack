import Board from './board';

class Game {
  constructor(board = new Board()) {
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

export default Game;
