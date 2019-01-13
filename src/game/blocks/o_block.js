import Block from './block';

class OBlock extends Block {
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

export default OBlock;
