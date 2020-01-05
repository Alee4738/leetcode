from typing import List

def find_pivot(nums: List[int]) -> int:
	"""In a sorted list rotated clockwise by pivot, return index of pivot"""
	if not nums:
		return -1

	# pivot is 0 or length of list is 1
	if nums[0] <= nums[-1]:
		return 0

	# binary search for the pivot condition is met
	beg, end = 0, len(nums)
	while end > beg:
		mid = (beg + end) // 2

		if nums[mid - 1] > nums[mid]:
			return mid
		elif nums[mid] > nums[0]: # look right
			beg = mid
		elif nums[mid] < nums[0]: # look left
			end = mid
		else:
			print('list contained a duplicate when it shouldn\'t have. Exiting...')
			return -2

	print('list was not actually pivoted. Exiting...')
	return -3


def rotated_binary_search(nums: List[int], target: int, pivot: int) -> int:
	"""
	Search a sorted list rotated clockwise by pivot, return index of target

	pivot -- number of indices rotated, (int in range [0, len(nums)))
	"""
	length = len(nums)
	beg, end = pivot, length + pivot

	while end > beg:
		mid = (beg + end) // 2
		mid_rot = mid % length  # rotated index of mid

		if nums[mid_rot] > target:
			end = mid
		elif nums[mid_rot] < target:
			beg = mid + 1
		else:
			return mid_rot

	return -1


def search(nums: List[int], target: int):
	return rotated_binary_search(nums, target, find_pivot(nums))


def main():
	test_cases = [
		[[10, 2, 4, 6, 8], 8],
		[[10, 2, 4, 6, 8], 9],
		[[], 0],
		[[0], 0],
		[[1, 2, 3, 4, 5], 4],
		[[3, 4, 5, 1, 2], 4],
		[[3, 1], 0],
		[[3, 1], 1],
		[[3, 5, 1], 0],
		[[1, 3], 3],
	]

	for tc in test_cases:
		print('Input: ' + str(tc))
		print('Output: ' + str(search(tc[0], tc[1])))
		print()


if __name__ == "__main__":
	main()