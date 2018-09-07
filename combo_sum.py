import unittest


def combo_sum(candidates, target):
    return list(combo_sum_gen(candidates, target, 0, []))


def combo_sum_gen(candidates, target, start, path):
    for i in range(start, len(candidates)):
        if candidates[i] == target:
            path.append(candidates[i])
            yield path.copy()
            path.pop()
        elif candidates[i] < target:
            path.append(candidates[i])
            generator = combo_sum_gen(candidates, target - candidates[i], i, path)
            for whole_path in generator:
                yield whole_path
            path.pop()


def combo_sum_dfs_tree(candidates, target, start, path, answers):
    # every time you find an answer, just add it to answers
    if target < 0:
        return

    for i in range(start, len(candidates)):
        if candidates[i] == target:
            path.append(candidates[i])
            answers.append(path.copy())
            path.pop()
        elif candidates[i] < target:
            path.append(candidates[i])
            combo_sum_dfs_tree(candidates, target - candidates[i], i, path, answers)
            path.pop()

    return


def combo_sum_dfs(candidates, target, start):
    """

    Preconditions:
    candidates is sorted from greatest to least
    candidates has no duplicates
    all numbers in candidates > 0
    target > 0
    0 <= start < len(candidates))
    """
    if target <= 0:
        return None

    for i in range(start, len(candidates)):
        if candidates[i] == target:
            return [candidates[i]]
        elif candidates[i] < target:
            ret = combo_sum_dfs(candidates, target - candidates[i], i)
            if ret:
                ret.append(candidates[i])
                return ret


# Another idea: use combo_sum_dfs as a generator, but you have to calculate
# the next start to use as well as target (and maintain the return list)




class TestComboSumDfsTree(unittest.TestCase):
    def test_regular(self):
        answers = []
        combo_sum_dfs_tree([5, 4, 3, 2, 1], 8, 0, [], answers)
        answers_tups = [tuple(l) for l in answers]
        self.assertEqual(set(answers_tups), {
            (5, 3),
            (5, 2, 1),
            (5, 1, 1, 1),
            (4, 4),
            (4, 3, 1),
            (4, 2, 2),
            (4, 2, 1, 1),
            (4, 1, 1, 1, 1),
            (3, 3, 2),
            (3, 3, 1, 1),
            (3, 2, 2, 1),
            (3, 2, 1, 1, 1),
            (3, 1, 1, 1, 1, 1),
            (2, 2, 2, 2),
            (2, 2, 2, 1, 1),
            (2, 2, 1, 1, 1, 1),
            (2, 1, 1, 1, 1, 1, 1),
            (1, 1, 1, 1, 1, 1, 1, 1),
        })

    def test_start(self):
        answers = []
        combo_sum_dfs_tree([5, 4, 3, 2, 1], 10, 1, [], answers)
        answers_tups = [tuple(l) for l in answers]
        self.assertEqual(set(answers_tups), {
            (4, 4, 2),
            (4, 4, 1, 1),
            (4, 3, 3),
            (4, 3, 2, 1),
            (4, 3, 1, 1, 1),
            (4, 2, 2, 2),
            (4, 2, 2, 1, 1),
            (4, 2, 1, 1, 1, 1),
            (4, 1, 1, 1, 1, 1, 1),
            (3, 3, 3, 1),
            (3, 3, 2, 2),
            (3, 3, 2, 1, 1),
            (3, 3, 1, 1, 1, 1),
            (3, 2, 2, 2, 1),
            (3, 2, 2, 1, 1, 1),
            (3, 2, 1, 1, 1, 1, 1),
            (3, 1, 1, 1, 1, 1, 1, 1),
            (2, 2, 2, 2, 2),
            (2, 2, 2, 2, 1, 1),
            (2, 2, 2, 1, 1, 1, 1),
            (2, 2, 1, 1, 1, 1, 1, 1),
            (2, 1, 1, 1, 1, 1, 1, 1, 1),
            (1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
        })

    def test_unsolvable(self):
        answers = []
        combo_sum_dfs_tree([5], 0, 0, [], answers)
        self.assertEqual(set(answers), set())

        answers = []
        combo_sum_dfs_tree([5], 1, 0, [], answers)
        self.assertEqual(set(answers), set())

        answers = []
        combo_sum_dfs_tree([5], 6, 0, [], answers)
        self.assertEqual(set(answers), set())

        answers = []
        combo_sum_dfs_tree([5, 4], 0, 0, [], answers)
        self.assertEqual(set(answers), set())

        answers = []
        combo_sum_dfs_tree([5], 0, 0, [], answers)
        self.assertEqual(set(answers), set())


class TestComboSumDfs(unittest.TestCase):
    def test_regular(self):
        self.assertEqual(combo_sum_dfs([5, 4, 3, 2, 1], 12, 0)
                         , [2, 5, 5])
        self.assertEqual(combo_sum_dfs([5, 4, 3, 2, 1], 25, 0)
                         , [5, 5, 5, 5, 5])

    def test_start(self):
        self.assertEqual(combo_sum_dfs([5, 4, 3, 2, 1], 25, 1)
                         , [1, 4, 4, 4, 4, 4, 4])

    def test_unsolvable(self):
        self.assertEqual(combo_sum_dfs([5], 0, 0)
                         , None)
        self.assertEqual(combo_sum_dfs([5], 1, 0)
                         , None)
        self.assertEqual(combo_sum_dfs([5], 6, 0)
                         , None)
        self.assertEqual(combo_sum_dfs([5, 4], 6, 0)
                         , None)


if __name__ == '__main__':
    unittest.main()
