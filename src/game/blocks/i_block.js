import Block from './block';

class IBlock extends Block {
  constructor(type = 'threes') {
    super(type);
    this.symbol = 'I';
    this.startPos = [[0, 4], [0, 3], [0, 5], [0, 6]];
    this.currentPos = this.startPos;
    this.pos = [[0, 0], [0, 1], [0, 2], [0, 3]];
  }
}

export default IBlock;
