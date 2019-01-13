import Board from './board';

class Game {
  constructor(board = new Board()) {
    this.board = board;
    this.over = this.over.bind(this);
    this.playNextBlock = this.playNextBlock.bind(this);
    this.time = 1000;
    document.addEventListener('keydown', (e) => {
      console.log(e);
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
        this.board.currentBlock = this.board.next();
        clearInterval(descendBlock);
        if (this.over()) {
          console.log('GAME OVER');
        } else {
          this.playNextBlock();
        }
      }
    }, 1000);
  }
}

export default Game;
