class Block {
  constructor(type = 'null', start = true) {
    this.type = type;
    this.symbol = 'X';
    this.startPos = [[0, 0]];
    this.currentPos = this.startPos;
    this.pos = [[0, 0]];
    this.start = start;
  }
  // rotate method

  findBottomRow(pos) {
    const xValues = [];
    pos.forEach(coords => xValues.push(coords[0]));
    const maxX = Math.max(...xValues);
    const maxIndices = [];
    xValues.forEach((x, idx) => {
      if (x === maxX) maxIndices.push(idx);
    });
    const bottomRow = pos.filter((pos, idx) => maxIndices.includes(idx));
    return bottomRow;
  }

  descend(newCoords) {
    this.start = false;
    const newPos = this.currentPos.map((coord, idx) => newCoords[idx]);
    this.currentPos = newPos;
    return this.currentPos;
  }
}

export default Block;
