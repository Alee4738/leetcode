/**
 * @param {number} n
 * @return {number[][]}
 */
let generateMatrixByBox = function (m, i, acc) {
  let bound = m.length - i - 1;

  // base case
  if (bound - i === 0) {
    m[i][i] = acc++;
    return;
  }

  // right
  for (let j = i; j < bound; j++) {
    m[i][j] = acc++;
  }
  // down
  for (let j = i; j < bound; j++) {
    m[j][bound] = acc++;
  }
  // left
  for (let j = bound; j > i; j--) {
    m[bound][j] = acc++;
  }
  // up
  for (let j = bound; j > i; j--) {
    m[j][i] = acc++;
  }

  // recurse if not another base case (2-size box)
  if (bound - i !== 1) {
    generateMatrixByBox(m, i + 1, acc);
  }
};

var generateMatrix = function (n) {
  // approach: build squares
  let matrix = new Array(n);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(n);
  }
  generateMatrixByBox(matrix, 0, 1);
  return matrix;
};
