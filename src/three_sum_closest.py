def threeSumClosest(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: int
    """
    if len(nums) < 3:
        return 0

    # two pointer solution
    nums.sort()

    min_error = nums[0] + nums[1] + nums[2] - target
    if min_error == 0:
        return target

    for i in range(len(nums)):
        beg, end = i + 1, len(nums) - 1
        while end - beg > 0:
            test_sum = nums[i] + nums[beg] + nums[end]
            err = test_sum - target

            if abs(err) < abs(min_error):
                min_error = err

            if min_error == 0:
                return test_sum

            if test_sum < target:
                beg = beg + 1
            elif test_sum > target:
                end = end - 1

    return min_error + target


zero_off = [-1, 0, 1]
one_off = [1, 1, 1]
two_off = [5, 1, -2, 3]
lc_1 = [1, 1, -1, -1, 3]  # -1, expect -1

# print(threeSumClosest(zero_off, 0))
# print()
# print(threeSumClosest(one_off, 2))
# print()
# print(threeSumClosest(two_off, 0))
# print()
print(threeSumClosest(lc_1, -1))
print()
