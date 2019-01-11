import Board from './board';

class Game {
  constructor(board = new Board()) {
    this.board = board;
    this.play = this.play.bind(this);
    this.play();
    this.over = this.over.bind(this);
  }

  over() {
    this.board.gameOver();
  }

  play() {
    console.log('BEFORE:', this.board.grid);
    this.board.currentBlock = this.board.next();
    this.currentBlock = this.board.currentBlock;
    console.log('AFTER:', this.board.grid);
    this.board.renderBlockStart(this.currentBlock);
    const descendBlock = setInterval(() => {
      this.board.descendBlock(this.currentBlock);
      if (!this.board.descendable(this.currentBlock)) {
        clearInterval(descendBlock);
      }
    }, 1000);
  }
}

export default Game;
