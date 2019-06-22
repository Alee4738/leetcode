"""
74. Search a 2D Matrix
Medium

Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

	Integers in each row are sorted from left to right.
	The first integer of each row is greater than the last integer of the previous row.

Example 1:

Input:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 3
Output: true

Example 2:

Input:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 13
Output: false

"""
import unittest
from typing import *


def searchMatrix(M: List[List[int]], target: int) -> bool:
	nrows = len(M)
	if nrows == 0:
		return False
	ncols = len(M[0])
	if ncols == 0:
		return False

	# make sure target is within bounds
	if target < M[0][0] or M[-1][-1] < target:
		return False

	# find row (binary search)
	start, end = 0, nrows
	row = (start + end) // 2
	while not (M[row][0] <= target and (row == nrows - 1 or target < M[row + 1][0])):
		if target < M[row][0]:
			# look left
			end = row
		elif target > M[row][0]:
			# look right
			start = row
		else:
			return True

		row = (start + end) // 2

	# find column (binary search)
	start, end = 0, ncols
	while start < end:
		col = (start + end) // 2
		if target < M[row][col]:
			# look left
			end = col
		elif target > M[row][col]:
			# look right
			start = col + 1
		else:
			return True

	return False


class TestStringMethods(unittest.TestCase):
	def test_present(self):
		self.assertTrue(searchMatrix([
				[0, 5, 10, 23],
				[24, 30, 31, 32],
				[50, 60, 70, 80]
			], 31))

	def test_absent(self):
		self.assertFalse(searchMatrix([
			[0, 5, 10, 23],
			[24, 30, 31, 32],
			[50, 60, 70, 80]
		], 29))

	def test_edges(self):
		self.assertTrue(searchMatrix([
			[0, 5, 10, 23],
			[24, 30, 31, 32],
			[50, 60, 70, 80]
		], 0))
		self.assertTrue(searchMatrix([
			[0, 5, 10, 23],
			[24, 30, 31, 32],
			[50, 60, 70, 80]
		], 80))
		self.assertTrue(searchMatrix([
			[0, 5, 10, 23],
			[24, 30, 31, 32],
			[50, 60, 70, 80]
		], 32))
		self.assertTrue(searchMatrix([
			[0, 5, 10, 23],
			[24, 30, 31, 32],
			[50, 60, 70, 80]
		], 50))

if __name__ == '__main__':
	unittest.main()
