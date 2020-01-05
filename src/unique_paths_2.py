"""
A robot is located at the top-left corner of a m x n grid.
The robot can only move either down or right at any point in time.
The robot is trying to reach the bottom-right corner of the grid.

Now consider if some obstacles are added to the grids. How many unique paths would there be?
An obstacle and empty space is marked as 1 and 0 respectively in the grid.

Note: m and n will be at most 100.

Example 1:

Input:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
Output: 2
Explanation:
There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right

"""
import unittest


def uniquePathsWithObstacles(obstacleGrid):
    """
    :type obstacleGrid: List[List[int]]
    :rtype: int
    """
    if not obstacleGrid:
        return 0

    # key: (row, col); value: number of unique paths starting from obstacleGrid[row][col]
    memo = {}

    nrows, ncols = len(obstacleGrid), len(obstacleGrid[0])

    def unique_paths_starting_from(row, col):
        if obstacleGrid[row][col] == 1:
            return 0
        elif row == nrows - 1 and col == ncols - 1:
            return 1
        elif (row, col) in memo:
            return memo[(row, col)]

        total = 0
        # try to move down
        if col + 1 < ncols and obstacleGrid[row][col + 1] == 0:
            total += unique_paths_starting_from(row, col + 1)

        # try to move right
        if row + 1 < nrows and obstacleGrid[row + 1][col] == 0:
            total += unique_paths_starting_from(row + 1, col)

        memo[(row, col)] = total
        return total

    return unique_paths_starting_from(0, 0)


class TestUniquePathsWithObstacles(unittest.TestCase):
    def test_empty(self):
        self.assertEqual(uniquePathsWithObstacles([]), 0)

    def test_single_cell(self):
        self.assertEqual(uniquePathsWithObstacles([
            [0],
        ]), 1)
        self.assertEqual(uniquePathsWithObstacles([
            [1],
        ]), 1)

    def test_single_row_no_obstacles(self):
        self.assertEqual(uniquePathsWithObstacles([
            [0, 0, 0],
        ]), 1)

    def test_single_column_no_obstacles(self):
        self.assertEqual(uniquePathsWithObstacles([
            [0],
            [0],
            [0],
        ]), 1)

    def test_single_row_obstacles(self):
        self.assertEqual(uniquePathsWithObstacles([
            [0, 1, 0],
        ]), 0)
        self.assertEqual(uniquePathsWithObstacles([
            [0, 0, 1],
        ]), 0)

    def test_single_column_obstacles(self):
        self.assertEqual(uniquePathsWithObstacles([
            [0],
            [1],
            [0],
        ]), 0)
        self.assertEqual(uniquePathsWithObstacles([
            [0],
            [0],
            [1],
        ]), 0)

    def test_2by2_no_obstacles(self):
        self.assertEqual(uniquePathsWithObstacles([
            [0, 0],
            [0, 0],
        ]), 2)

    def test_2by2_obstacles(self):
        self.assertEqual(uniquePathsWithObstacles([
            [0, 0],
            [1, 0],
        ]), 1)
        self.assertEqual(uniquePathsWithObstacles([
            [0, 1],
            [0, 0],
        ]), 1)
        self.assertEqual(uniquePathsWithObstacles([
            [0, 1],
            [1, 0],
        ]), 0)
        self.assertEqual(uniquePathsWithObstacles([
            [0, 0],
            [0, 1],
        ]), 0)

    def test_3by4_no_obstacles(self):
        self.assertEqual(uniquePathsWithObstacles([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]), 10)

    def test_3by4_obstacles(self):
        self.assertEqual(uniquePathsWithObstacles([
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
        ]), 6)
        self.assertEqual(uniquePathsWithObstacles([
            [0, 0, 0, 0],
            [1, 0, 1, 0],
            [0, 1, 0, 0],
        ]), 1)