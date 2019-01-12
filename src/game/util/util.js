const searchForArray = (array, targetArray) => {
  let i; let j; let
    current;
  for (i = 0; i < array.length; ++i) {
    if (targetArray.length === array[i].length) {
      current = array[i];
      for (j = 0; j < targetArray.length && targetArray[j] === current[j]; ++j);
      if (j === targetArray.length) { return i; }
    }
  }
  return -1;
};

export default searchForArray;
