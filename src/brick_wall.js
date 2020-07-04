/*
There is a brick wall in front of you. The wall is rectangular and has several rows of bricks. The bricks have the same height but different width. You want to draw a vertical line from the top to the bottom and cross the least bricks.

The brick wall is represented by a list of rows. Each row is a list of integers representing the width of each brick in this row from left to right.

If your line go through the edge of a brick, then the brick is not considered as crossed. You need to find out how to draw the line to cross the least bricks and return the number of crossed bricks.

You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks.

 

Example:

Input: [[1,2,2,1],
        [3,1,2],
        [1,3,2],
        [2,4],
        [3,1,2],
        [1,3,1,1]]

Output: 2
*/
/**
 * @param {number[][]} wall
 * @return {number}
 */
var leastBricks = function (wall) {
  // from top down, counting all the bricks you pass
  // if a row has all 1-length bricks (n bricks), then there are n+1 cracks
  let m = wall.length; // rows
  let n = wall[0].reduce((acc, c) => acc + c) + 1; // columns
  let crossed = {}; // max number of keys is n+1, one for each crack represented by index 0,...,n

  let findCracks = function (row) {
    let pos = []; // indices of cracks
    let ltr = 0; // left-to-right counter
    row.map((width, i) => {
      ltr += width;
      if (i !== row.length - 1) {
        pos.push(ltr);
      }
    });
    return pos;
  };

  // count into negatives (but that's ok because we'll do a min)
  wall.map((row) => {
    let cracks = findCracks(row);
    cracks.map((i) => {
      if (crossed[i]) {
        crossed[i] -= 1;
      } else {
        crossed[i] = -1;
      }
    });
  });

  console.log(crossed);
  let min = Math.min(...Object.values(crossed));
  if (min === Infinity) {
    min = 0;
  }
  return m + min;
};
