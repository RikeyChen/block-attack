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

  findMostRightRow(pos) {
    const yValues = [];
    pos.forEach(coords => yValues.push(coords[1]));
    const maxY = Math.max(...yValues);
    const maxIndices = [];
    yValues.forEach((y, idx) => {
      if (y === maxY) maxIndices.push(idx);
    });
    const mostRightRow = pos.filter((pos, idx) => maxIndices.includes(idx));
    return mostRightRow;
  }

  findMostLeftRow(pos) {
    const yValues = [];
    pos.forEach(coords => yValues.push(coords[1]));
    const minY = Math.min(...yValues);
    const minIndices = [];
    yValues.forEach((y, idx) => {
      if (y === minY) minIndices.push(idx);
    });
    const mostLeftRow = pos.filter((pos, idx) => minIndices.includes(idx));
    return mostLeftRow;
  }

  shift(newCoords) {
    this.start = false;
    this.currentPos = newCoords;
    return this.currentPos;
  }

  rotate() {
    console.log('ROTATING');
    this.pivot = this.currentPos[0];
    this.currentPos = this.currentPos.map((coord) => {
      const [x, y] = coord;
      const newX = y + this.pivot[0] - this.pivot[1];
      const newY = this.pivot[0] + this.pivot[1] - x;
      return [newX, newY];
    });
    return this.currentPos;
  }
}

export default Block;
