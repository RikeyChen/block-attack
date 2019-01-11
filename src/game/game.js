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
  }
}

export default Game;
