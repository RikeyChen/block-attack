import Block from './block';

class TriBlock extends Block {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'T';
    this.pos = [[1, 0], [1, 1], [0, 1], [1, 2]];
  }
}

export default TriBlock;
