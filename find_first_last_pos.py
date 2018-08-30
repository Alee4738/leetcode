"""
Find First and Last Position of Element in Sorted Array


Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

Your algorithm's runtime complexity must be in the order of O(log n).

If the target is not found in the array, return [-1, -1].
"""


def find_first_pos(nums, target):
	if not nums:
		return -1

	if len(nums) == 1:
		return 0 if (nums[0] == target) else -1

	# binary search with a twist
	beg, end = 0, len(nums)
	while end > beg:
		mid = (beg + end) // 2
		if nums[mid] > target:  # look left
			end = mid
		elif nums[mid] < target:  # look right
			beg = mid + 1
		# at this point, nums[middle index] is target
		# check if it's the leftmost instance of target
		elif mid == 0 or nums[mid - 1] < target:
			return mid
		else: # look left
			end = mid
	return -1


def find_last_pos(nums, target):
	if not nums:
		return -1

	if len(nums) == 1:
		return 0 if (nums[0] == target) else -1

	# binary search with a twist
	beg, end = 0, len(nums)
	while end > beg:
		mid = (beg + end) // 2
		if nums[mid] > target:  # look left
			end = mid
		elif nums[mid] < target:  # look right
			beg = mid + 1
		# at this point, nums[middle index] is target
		# check if it's the leftmost instance of target
		elif (mid == len(nums) - 1) or nums[mid + 1] > target:
			return mid
		else: # look right
			beg = mid + 1
	return -1


def find_first_last_pos(nums, target):
	return [find_first_pos(nums, target), find_last_pos(nums, target)]


def main():
	test_cases = [
		[[], 0],
		[[0], 0],
		[[0, 1], 0],
		[[-1, 0, 1], 0],
		[[-1, 0, 0, 0, 1], 0],
		[[-5, -4, -2, -1, 0, 0, 0], 0],
		[[0, 0, 0, 1, 2, 3, 4], 0],
		[[5,7,7,8,8,10], 6],
		[[5,7,7,8,8,10], 8],
	]

	for tc in test_cases:
		print('Input: ' + str(tc))
		print('Output: ' + str(find_first_last_pos(tc[0], tc[1])))
		print()


if __name__ == "__main__":
	main()