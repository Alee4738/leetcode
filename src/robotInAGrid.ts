// Cracking the Coding Interview
// Problem 8.2 Robot in a grid

import { TestCase, runTests } from './testHelpers';

enum Direction {
  Right,
  Down,
}

function helper(
  grid: boolean[][],
  curPos: [number, number],
  curPath: Direction[],
  seen: boolean[][]
): Direction[] | undefined {
  const row = curPos[0];
  const col = curPos[1];

  if (
    !(0 <= row && row < grid.length) ||
    !(0 <= col && col < grid[0].length) ||
    !grid[row][col] ||
    seen[row][col]
  ) {
    return undefined;
  } else if (row === grid.length - 1 && col === grid[0].length - 1) {
    return curPath;
  }

  curPath.push(Direction.Right);
  let result = helper(grid, [row, col + 1], curPath, seen);
  if (result !== undefined) {
    return result;
  }
  curPath.pop();

  curPath.push(Direction.Down);
  result = helper(grid, [row + 1, col], curPath, seen);
  if (result !== undefined) {
    return result;
  }
  curPath.pop();

  seen[row][col] = true;
  return undefined;
}

// assume that there is at least 1 row and 1 col
function findPath(grid: boolean[][]): Direction[] | undefined {
  // you can traverse cell (i,j) if grid[i][j] is true. Otherwise, you can't
  const seen: boolean[][] = [];
  for (let i = 0; i < grid.length; i++) {
    seen.push([]);
  }
  return helper(grid, [0, 0], [], seen);
}

describe(findPath.name, () => {
  const testCases: TestCase<boolean[][], Direction[] | undefined>[] = [
    new TestCase([[true]], []),
    new TestCase([[false]], undefined),
    new TestCase(
      [
        [true, false],
        [false, true],
      ],
      undefined
    ),
    new TestCase(
      [
        [true, false, false, true, true],
        [true, true, true, false, false],
        [false, true, true, false, false],
        [true, true, false, false, false],
        [false, true, true, true, true],
      ],
      [
        Direction.Down,
        Direction.Right,
        Direction.Down,
        Direction.Down,
        Direction.Down,
        Direction.Right,
        Direction.Right,
        Direction.Right,
      ]
    ),
    /*
      1 - - 1 1
      1 1 1 - -
      - 1 1 - -
      1 1 - - -
      - 1 1 1 1

      path [D R D D D R R R]
      helper([0,0]) -> path
        helper(0,1) -> undef
        helper(1,0) -> path
          helper(1,1) -> path
            helper(1,2) -> undef
              helper(1,3) -> undef
              helper(2,2) -> undef
                helper(2,3) -> undef
                helper(3,2) -> undef
            helper(2,1) -> path
              helper(2,2) -> undef
              helper(3,1) -> path
                helper(3,2) -> undef
                helper(4,1) -> path
                  helper(4,2) -> path
                    helper(4,3) -> path
                      helper(4,4) -> path
      */
  ];

  runTests(testCases, (testCase) => {
    const actualResult = findPath(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
