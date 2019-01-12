import Block from './block';

class LBlock extends Block {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'L';
    this.startPos = [[0, 6], [1, 4], [1, 5], [1, 6]];
    this.currentPos = this.startPos;
    this.pos = [[1, 0], [1, 1], [1, 2], [0, 2]];
  }
}

export default LBlock;
