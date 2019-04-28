import unittest
import numpy as np

def minDistance(word1, word2):
  """
  :type word1: str
  :type word2: str
  :rtype: int
  """
  len1, len2 = len(word1), len(word2)
  highestDistance = max(len1, len2)
  # dist = []
  # dist = [ [highestDistance for _ in range(len1+1)] for _ in range(len2+1)]
  dist = np.full((len1+1, len2+1), highestDistance, dtype=int)
  
  # initialize
  dist[:, len2] = range(len1, -1, -1)
  dist[len1, :] = range(len2, -1, -1)
  
  def helper(i, j):
    # min distance between word1[i:] and word2[j:]
    if i == len1 or j == len2:
      return dist[i][j]
    elif i < 0 or j < 0:
      return highestDistance
    elif dist[i][j] != highestDistance:
      return dist[i][j]
    else:
      if word1[i] == word2[j]:
        dist[i][j] = helper(i+1, j+1)
      else:
        # Make word1 into word2 (equivalent to the other way around)
        # 3 options to act on word1: add, delete, replace
        dist[i][j] = min(helper(i, j+1), helper(i+1, j), helper(i+1, j+1)) + 1
      
      return dist[i][j]

  return helper(0, 0)


class TestEditDistance(unittest.TestCase):
  def test_equal_strings(self):
    self.assertEqual(minDistance('Ab', 'Ab'), 0)
    self.assertEqual(minDistance('', ''), 0)

  def test_single_chars(self):
    self.assertEqual(minDistance('a', 'a'), 0)
    self.assertEqual(minDistance('a', 'A'), 1)
    self.assertEqual(minDistance('a', ''), 1)
    self.assertEqual(minDistance('', 'a'), 1)

  def test_custom_1(self):
    self.assertEqual(minDistance('edit', 'eDit'), 1)
    self.assertEqual(minDistance('edit', 'edit'), 0)
    self.assertEqual(minDistance('edit', 'e'), 3)

  def test_one_away(self):
    self.assertEqual(minDistance('edit distance', 'eDit distance'), 1)
    self.assertEqual(minDistance('edit distance', 'eit distance'), 1)
    self.assertEqual(minDistance('eit distance', 'edit distance'), 1)

  def test_two_away(self):
    self.assertEqual(minDistance('edit distance', 'eDit Distance'), 2)
    self.assertEqual(minDistance('edit distance', 'eitdistance'), 2)
    self.assertEqual(minDistance('eit disTance', 'edit distance'), 2)
    
  def test_leetcode_1(self):
    self.assertEqual(minDistance('horse', 'ros'), 3)

if __name__ == '__main__':
    unittest.main()