"""
Given a collection of distinct integers, return all possible permutations.
"""
import itertools
import unittest


def permute(nums):
    return list(list(p) for p in itertools.permutations(nums))


class TestPermute(unittest.TestCase):
    def test_regular(self):
        self.assertListEqual(sorted(permute([1, 2, 3])), [
                             [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]
        ])