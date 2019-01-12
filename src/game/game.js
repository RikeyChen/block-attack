import Board from './board';

class Game {
  constructor(board = new Board()) {
    this.board = board;
    this.over = this.over.bind(this);
    this.playNextBlock = this.playNextBlock.bind(this);
    this.time = 1000;
  }

  over() {
    this.board.gameOver();
  }

  playNextBlock() {
    console.log(this.board.currentBlock);
    this.board.renderBlockStart(this.board.currentBlock);
    const descendBlock = setInterval(() => {
      this.board.descendBlock(this.board.currentBlock);
      console.log('HITTING');
      if (!this.board.descendable(this.board.currentBlock)) {
        console.log('CLEARING');
        clearInterval(descendBlock);
        this.board.currentBlock = this.board.next();
        if (!this.over) {
          console.log('PLAYING NEXT');
          this.playNextBlock();
        }
      }
    }, 1000);
  }
}

export default Game;
