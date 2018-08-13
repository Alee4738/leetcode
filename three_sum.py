"""
Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0?
Find all unique triplets in the array which gives the sum of zero.

Note: The solution set must not contain duplicate triplets.
"""

# Two-pointer solution: sort, then use the 2sum method to converge
def threeSum(nums):
    if len(nums) < 3:
        return []

    snums = sorted(nums)
    ret = []

    # TODO: make repeated number checks (don't want i to index -1, then -1 again
    # TODO: same with the other indices
    
    for i in range(len(snums)):
        beg = i + 1
        end = len(snums) - 1
        while end - beg > 0:
            test_sum = snums[i] + snums[beg] + snums[end]
            if test_sum < 0:
                beg = beg + 1
            elif test_sum > 0:
                end = end - 1
            else:
                ret.append([snums[i], snums[beg], snums[end]])



































    # counts = dict()
    # for i in nums:
    #     counts[i] = counts.get(i, 0) + 1
    #
    # # dictionary whose keys are numbers needed to complete a triple
    # # values are sets of triples that depend on the key
    # possible_triples = set()
    #
    # # fill the dictionary of numbers to look for
    # for num1 in counts.keys():
    #     for num2 in counts.keys():
    #         # get unique triple (sorted)
    #         other_num = -1 * (num1 + num2)
    #         possible_triples.add(tuple(sorted([num1, num2, other_num])))
    #
    # three_sums = []
    #
    # # validate that each triple exists
    # for triple in possible_triples:
    #     # compare frequency of each item in triple with frequency in nums
    #     freq = dict()
    #     for item in triple:
    #         freq[item] = freq.get(item, 0) + 1
    #
    #     valid_triple = True
    #     for key, val in freq.items():
    #         if counts.get(key, 0) < val:
    #             valid_triple = False
    #
    #     if valid_triple:
    #         three_sums.append(list(triple))
    #
    # return three_sums


# Smoke tests
none = [1, 1, 1]
one = [-1, 0, 1, 0, -1]
multiple = [-2, -1, 0, 1, 2, 3]
unsorted = [1, -1, 0, -2, 2, 5, -3]
many = [0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, -1, -1, -1, -1]

print(threeSum(none))
print()
print(threeSum(one))
print()
print(threeSum(multiple))
print()
print(threeSum(unsorted))
print()
print(threeSum(many))
print()