import Block from './block';

class SBlock extends Block {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'S';
    this.startPos = [[1, 5], [0, 5], [0, 6], [1, 4]];
    this.currentPos = this.startPos;
    this.pos = [[1, 0], [1, 1], [0, 1], [0, 2]];
  }
}

export default SBlock;
