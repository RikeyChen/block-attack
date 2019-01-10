import Block from './block';

class SBlock extends Block {
  constructor(type = 'threes') {
    super(type);
    this.symbol = 'S';
    this.pos = [[1, 0], [1, 1], [0, 1], [0, 2]];
  }
}

export default SBlock;
