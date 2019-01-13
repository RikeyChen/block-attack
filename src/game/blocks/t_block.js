import Block from './block';

class TBlock extends Block {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'T';
    this.startPos = [[1, 5], [0, 5], [1, 4], [1, 6]];
    this.currentPos = this.startPos;
    this.pos = [[1, 1], [0, 1], [1, 0], [1, 2]];
  }
}

export default TBlock;
