class Block {
  constructor(type = 'null') {
    this.type = type;
    this.symbol = 'X';
    this.startPos = [[0, 0]];
    this.currentPos = this.startPos;
    this.pos = [[0, 0]];
  }
  // rotate method

  findBottomRow() {
    const xValues = [];
    this.currentPos.forEach(pos => xValues.push(pos[0]));
    const maxX = Math.max(...xValues);
    const maxIndices = [];
    xValues.forEach((x, idx) => {
      if (x === maxX) maxIndices.push(idx);
    });
    const bottomRow = this.currentPos.filter((pos, idx) => maxIndices.includes(idx));
    return bottomRow;
  }

  descend(newCoords) {
    const newPos = this.currentPos.map((coord, idx) => newCoords[idx]);
    this.currentPos = newPos;
    return this.currentPos;
  }
}

export default Block;
