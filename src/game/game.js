import Board from './board';

class Game {
  constructor(board = new Board()) {
    this.board = board;
    this.over = this.over.bind(this);
    this.playNextBlock = this.playNextBlock.bind(this);
    this.time = 1000;
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
        } else {
          this.playNextBlock();
        }
      }
    }, 1000);
  }
}

export default Game;
