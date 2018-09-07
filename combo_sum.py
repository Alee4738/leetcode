import unittest

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


class TestComboSum(unittest.TestCase):

  def test_regular(self):
    self.assertEqual(combo_sum_dfs([5,4,3,2,1], 12, 0)
      , [2,5,5])
    self.assertEqual(combo_sum_dfs([5,4,3,2,1], 25, 0)
      , [5,5,5,5,5])

  def test_start(self):
    self.assertEqual(combo_sum_dfs([5,4,3,2,1], 25, 1)
      , [1,4,4,4,4,4,4])

  def test_unsolvable(self):
    self.assertEqual(combo_sum_dfs([5], 0, 0)
      , None)
    self.assertEqual(combo_sum_dfs([5], 1, 0)
      , None)
    self.assertEqual(combo_sum_dfs([5], 6, 0)
      , None)
    self.assertEqual(combo_sum_dfs([5,4], 6, 0)
      , None)

  









if __name__ == '__main__':
  unittest.main()