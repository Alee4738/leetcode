"""
Given a collection of distinct integers, return all possible permutations.
"""
import itertools
import unittest

# # itertools solution
# def permute(nums):
#     return list(list(p) for p in itertools.permutations(nums))


# my own solution
def permute(nums):
    if not nums:
        return []
    elif len(nums) == 1:
        return [nums]
    else:
        # split into head, tail
        # put head in every possible position of permute(tail)
        head = nums[0]
        tail = nums[1:]
        answers = []
        for tail_perm in permute(tail):
            for i in range(len(tail) + 1):
                next_perm = tail_perm.copy()
                next_perm.insert(i, head)
                answers.append(next_perm)
        return answers


class TestPermute(unittest.TestCase):
    def test_regular(self):
        self.assertListEqual(sorted(permute([1, 2, 3])), [
                             [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]
        ])