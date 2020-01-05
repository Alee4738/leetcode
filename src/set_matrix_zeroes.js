/*
Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.

Example 1:

Input: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
Output: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]

Example 2:

Input: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
Output: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]

Follow up:

    A straight forward solution using O(mn) space is probably a bad idea.
    A simple improvement uses O(m + n) space, but still not the best solution.
    Could you devise a constant space solution?


*/
 * /
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return;
  }

  let m = matrix.length;
  let n = matrix[0].length;

  // the rows and cols that will be set to 0
  let rows = new Array(m);
  let cols = new Array(n);

  // record all existing 0s
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        rows[i] = true;
        cols[j] = true;
      }
    }
  }

  // set rows to 0
  rows.map((_, r) => {
    for (let c = 0; c < n; c++) {
      matrix[r][c] = 0;
    }
  });

  // set cols to 0
  cols.map((_, c) => {
    for (let r = 0; r < m; r++) {
      matrix[r][c] = 0;
    }
  });
};