import Block from './block';

class IBlock extends Block {
  constructor(type = 'threes') {
    super(type);
    this.symbol = 'I';
    this.pos = [[0, 0], [0, 1], [0, 2], [0, 3]];
  }
}

export default IBlock;
