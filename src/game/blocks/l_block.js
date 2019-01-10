import Block from './block';

class LBlock extends Block {
  constructor(type = 'threes') {
    super(type);
    this.symbol = 'L';
    this.pos = [[1, 0], [1, 1], [1, 2], [0, 2]];
  }
}

export default LBlock;
