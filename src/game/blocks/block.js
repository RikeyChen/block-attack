class Block {
  constructor(type = 'null') {
    this.type = type;
    this.symbol = 'X';
    this.pos = [[0, 0]];
  }
  // rotate method

  descend(newCoords) {
    const newPos = this.pos.map((coord, idx) => newCoords(idx));
    this.pos = newPos;
  }
}

export default Block;
