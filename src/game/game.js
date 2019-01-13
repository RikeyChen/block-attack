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
          this.board.descendBlock(this.board.currentBlock);
          break;
        case 'ArrowUp':
          this.board.rotateBlock(this.board.currentBlock);
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
      this.board.descendBlock(currentBlock);
      if (!this.board.descendable(currentBlock)) {
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
