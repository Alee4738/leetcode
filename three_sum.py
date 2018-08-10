"""
Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0?
Find all unique triplets in the array which gives the sum of zero.

Note: The solution set must not contain duplicate triplets.
"""

# Naive solution: consider all possible unique triplet indices
def threeSum(nums):
    ret = []
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            for k in range(j + 1, len(nums)):
                if nums[i] + nums[j] + nums[k] == 0:
                    candidate = sorted([nums[i], nums[j], nums[k]])
                    # check no duplicates before adding
                    is_duplicate = False
                    for triplet in ret:
                        if candidate == triplet:
                            is_duplicate = True
                            break
                    if not is_duplicate:
                        ret.append(candidate)
    return ret

# Smoke tests
none = [1, 1, 1]
one = [-1, 0, 1, 0, -1]
multiple = [-2, -1, 0, 1, 2, 3]
unsorted = [1, -1, 0, -2, 2, 5, -3]

print(threeSum(none))
print()
print(threeSum(one))
print()
print(threeSum(multiple))
print()
print(threeSum(unsorted))
print()