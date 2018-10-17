"""
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example:

Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7
Explanation: Because the path 1→3→1→1→1 minimizes the sum.

"""


def minPathSum(grid):
    """
    :type grid: List[List[int]]
    :rtype: int
    """
    # base cases
    if not grid or len(grid[0]) == 0:
        return 0
    elif len(grid) == 1:  # 1 column
        return sum(grid[0])
    elif len(grid[0]) == 1:  # 1 row
        return sum([row[0] for row in grid])

    # classic DP solution
    # initialize to "unset" == -1
    num_rows, num_cols = len(grid), len(grid[0])
    mps = [[-1 for _ in range(num_cols)] for _ in range(num_rows)]  # m x n array of minimum path sum

    def min_path_sum(start_row, start_col):
        if mps[start_row][start_col] != -1:
            pass
        elif start_row == num_rows - 1 and start_col == num_cols - 1:
            mps[start_row][start_col] = grid[start_row][start_col]
        elif start_row + 1 >= num_rows:  # at last row, go right
            mps[start_row][start_col] = grid[start_row][start_col] + min_path_sum(start_row, start_col + 1)
        elif start_col + 1 >= num_cols:  # at last col, go down
            mps[start_row][start_col] = grid[start_row][start_col] + min_path_sum(start_row + 1, start_col)
        else:
            mps[start_row][start_col] = grid[start_row][start_col] + min(min_path_sum(start_row + 1, start_col),
                                                                         min_path_sum(start_row, start_col + 1))

        return mps[start_row][start_col]

    return min_path_sum(0, 0)
