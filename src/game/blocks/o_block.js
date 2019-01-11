import Block from './block';

class OBlock extends Block {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'O';
    this.pos = [[0, 0], [0, 1], [1, 0], [1, 1]];
  }
}

export default OBlock;
