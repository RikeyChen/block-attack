import Block from './block';

class ZBlock extends Block {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'Z';
    this.startPos = [[1, 5], [0, 4], [0, 5], [1, 6]];
    this.currentPos = this.startPos;
    this.pos = [[0, 0], [0, 1], [1, 1], [1, 2]];
  }
}

export default ZBlock;
