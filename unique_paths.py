"""
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time.
The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many unique paths are there?
"""
from scipy.special import comb


def uniquePaths(m, n):
    """
    :type m: int
    :type n: int
    :rtype: int
    """
    if m == 1 or n == 1:
        return 1
    else:
        return comb(m+n-2, m-1, exact=True)


"""
We could also do something like uniquePaths(m, n) = uniquePaths(m-1, n) + uniquePaths(m, n-1)
while checking that we can move in each of those directions
"""