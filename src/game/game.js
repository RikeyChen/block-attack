import Board from './board';

class Game {
  constructor(board = new Board()) {
    this.board = board;
    this.play = this.play.bind(this);
    this.play();
  }

  play() {
    const block = this.board.nextBlock();
    this.board.renderBlockStart(block);

    // while (this.board.descendable(block)) {
    //   setTimeout(this.board.descendBlock(block), 1000);
    //   console.log(block.pos);
    // }
    const descendBlock = setInterval(() => {
      this.board.descendBlock(block);
      // console.log(block.pos);
      // console.log(this.board.descendable(block));
      if (!this.board.descendable(block)) {
        clearInterval(descendBlock);
      }
    }, 1000);
  }
}

export default Game;
