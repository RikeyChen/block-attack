import Block from './block';

class JBlock extends Block {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'J';
    this.pos = [[0, 0], [1, 0], [1, 1], [1, 2]];
  }
}

export default JBlock;
