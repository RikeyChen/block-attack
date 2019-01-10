import Block from './block';

class SquareBlock extends Block {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'S';
    this.pos = [[0, 0], [0, 1], [1, 0], [1, 1]];
  }
}

export default SquareBlock;
