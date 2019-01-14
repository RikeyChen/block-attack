import Board from './board';

class Game {
  constructor(board = new Board()) {
    this.board = board;
    this.over = this.over.bind(this);
    this.playNextBlock = this.playNextBlock.bind(this);
    this.time = 1000;
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowDown':
          this.board.shiftBlock(this.board.currentBlock, 'down');
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
        default:
          break;
      }
    });
  }

  over() {
    return this.board.gameOver;
  }

  playNextBlock() {
    const { currentBlock } = this.board;
    if (currentBlock.start && this.board.blockRenderable(currentBlock)) {
      this.board.renderBlockStart(currentBlock);
    }
    const descendBlock = setInterval(() => {
      this.board.shiftBlock(currentBlock, 'down');
      if (!this.board.shiftable(currentBlock, 'down')) {
        this.board.clearRows();
        if (this.board.rowClearCount > 0) {
          const shiftClearedRows = setInterval(() => {
            this.board.shiftClearedRow();
            if (this.board.rowClearCount === 0) {
              clearInterval(shiftClearedRows);
              this.board.currentBlock = this.board.next();
              clearInterval(descendBlock);
              setTimeout(() => this.playNextBlock(), 500);
            }
          }, 50);
        } else {
          this.board.currentBlock = this.board.next();
          clearInterval(descendBlock);
          setTimeout(() => this.playNextBlock(), 500);
        }

        if (this.over()) {
          console.log('GAME OVER');
        }

        // this.board.currentBlock = this.board.next();
        // clearInterval(descendBlock);
        // if (this.over()) {
        //   console.log('GAME OVER');
        // } else {
        //   setTimeout(() => this.playNextBlock(), 500);
        // }
      }
    }, this.time);
  }
}

export default Game;
