import Block from './block';

class SBlock extends Block {
  constructor(type = 'threes') {
    super(type);
    this.symbol = 'S';
    this.startPos = [[1, 3], [1, 4], [0, 4], [0, 5]];
    this.currentPos = this.startPos;
    this.pos = [[1, 0], [1, 1], [0, 1], [0, 2]];
  }
}

export default SBlock;
