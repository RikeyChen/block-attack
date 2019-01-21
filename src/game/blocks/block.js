class Block {
  constructor(type = 'null', start = true) {
    this.type = type;
    this.symbol = 'X';
    this.startPos = [[0, 0]];
    this.currentPos = this.startPos;
    this.pos = [[0, 0]];
    this.start = start;
    this.pivot = this.currentPos[0];
    this.rotate = this.rotate.bind(this);
  }

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

  shift(newCoords) {
    this.start = false;
    this.currentPos = newCoords;
    return this.currentPos;
  }

  rotate() {
    this.pivot = this.currentPos[0];
    this.currentPos = this.currentPos.map((coord) => {
      const [x, y] = coord;
      const relativeV = [x - this.pivot[0], y - this.pivot[1]];
      const rotatedV = [
        ((relativeV[0] * 0) + (relativeV[1] * 1)),
        ((relativeV[0] * -1) + (relativeV[1] * 0)),
      ];
      const newX = rotatedV[0] + this.pivot[0];
      const newY = rotatedV[1] + this.pivot[1];
      return [newX, newY];
    });
    return this.currentPos;
  }
}

export default Block;
