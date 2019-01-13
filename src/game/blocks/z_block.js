import Block from './block';

class ZBlock extends Block {
  constructor(type = 'threes') {
    super(type);
    this.symbol = 'Z';
    this.startPos = [[1, 4], [0, 3], [0, 4], [1, 5]];
    this.currentPos = this.startPos;
    this.pos = [[0, 0], [0, 1], [1, 1], [1, 2]];
  }
}

export default ZBlock;
