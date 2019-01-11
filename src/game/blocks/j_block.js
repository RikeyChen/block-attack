import Block from './block';

class JBlock extends Block {
  constructor(type = 'fours') {
    super(type);
    this.symbol = 'J';
    this.startPos = [[0, 4], [1, 4], [1, 5], [1, 6]];
    this.currentPos = this.startPos;
    this.pos = [[0, 0], [1, 0], [1, 1], [1, 2]];
  }
}

export default JBlock;
