"""
Given a collection of numbers that might contain duplicates, return all possible unique permutations.
"""
import unittest


def permuteUnique(nums):
    if not nums:
        return []
    elif len(nums) == 1:
        return [nums]
    else:
        head = nums[0]
        tail = nums[1:]
        answers = []
        for tail_perm in permuteUnique(tail):
            # to not double-count duplicates
            # get highest index of element == head, then add 1
            start = 0
            for i in range(len(tail) - 1, -1, -1):
                if tail_perm[i] == head:
                    start = i + 1
                    break

            # make the permutations
            for j in range(start, len(tail_perm) + 1):
                perm = tail_perm.copy()
                perm.insert(j, head)
                answers.append(perm)

        return answers


class TestPermuteUnique(unittest.TestCase):
    def test_regular(self):
        answers = permuteUnique([1, 1, 2, 3])
        answers.sort()
        self.assertListEqual(answers, [
            [1, 1, 2, 3],
            [1, 1, 3, 2],
            [1, 2, 1, 3],
            [1, 2, 3, 1],
            [1, 3, 1, 2],
            [1, 3, 2, 1],
            [2, 1, 1, 3],
            [2, 1, 3, 1],
            [2, 3, 1, 1],
            [3, 1, 1, 2],
            [3, 1, 2, 1],
            [3, 2, 1, 1],
        ])


if __name__ == '__main__':
    unittest.main()
