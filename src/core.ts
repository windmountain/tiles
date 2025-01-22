export const newGame = () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7];
  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return [...array, 8];
}

export const isAdjacentTo8 = (n, tiles) => {
  const indexOf8 = tiles.indexOf(8);
  const indexOfN = tiles.indexOf(n);
  const xs = [0, 1, 2, 0, 1, 2, 0, 1, 2];
  const ys = [0, 0, 0, 1, 1, 1, 2, 2, 2];
  const xOf8 = xs[indexOf8];
  const yOf8 = ys[indexOf8];
  const xOfN = xs[indexOfN];
  const yOfN = ys[indexOfN];
  const deltaX = Math.abs(xOf8 - xOfN);
  const deltaY = Math.abs(yOf8 - yOfN);
  return deltaX + deltaY === 1;
}

const swap = (n, tiles) => {
  const indexOf8 = tiles.indexOf(8);
  const indexOfN = tiles.indexOf(n);
  const newTiles = [...tiles];
  newTiles[indexOf8] = n;
  newTiles[indexOfN] = 8;
  return newTiles;
};

export const move = (n, tiles) => {
  return isAdjacentTo8(n, tiles) ? swap(n, tiles) : [...tiles];
}

export const isSolved = (tiles) => {
  return tiles.reduce((memo, tile, index) => memo && tile === index, true);
}
