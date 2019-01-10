import Block from './block';

class ZBlock extends Block {
  constructor(type = 'threes') {
    super(type);
    this.symbol = 'Z';
    this.pos = [[0, 0], [0, 1], [1, 1], [1, 2]];
  }
}

export default ZBlock;
