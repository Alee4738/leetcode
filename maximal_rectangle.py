import unittest
import pprint

def maximal_rectangle(matrix):
  """
  :type matrix: List[List[str]]
  :rtype: int
  """
  if len(matrix) == 0 or len(matrix[0]) == 0:
    return 0

  m, n = len(matrix), len(matrix[0])
  
  # starting at matrix[i][j], 
  # tup[i][j] = (num consecutive 1's going right, num consecutive 1's going down)
  # so if matrix[i][j] = 1, then tup[i][j] is at least (1,1)
  # and if matrix[i][j] = 0, tup[i][j] = (0,0)
  tup = [[ (0,0) for _ in range(n)] for _ in range(m)]

  # fill in from bottom right upwards
  for i in range(m-1,-1,-1):
    for j in range(n-1,-1,-1):
      if matrix[i][j] == '1':
        r_add = tup[i+1][j][1] if i < m-1 else 0
        d_add = tup[i][j+1][0] if j < n-1 else 0
        tup[i][j] = (1 + d_add, 1 + r_add)

  print()
  print()
  pprint.pprint(tup)

  # record only max area
  area = 0

  for i in range(m):
    for j in range(n):
      r, d = tup[i][j]
      if r != 0:
        # using tup, there are 3 options for maximal rectangle
        # 1: use 1xr row from (i,j)
        # 2: use dx1 column from (i,j)
        # 3: try to get as big a rectangle as possible, max length r and max width d
        # This depends on the "inner" rectangle, which can be found using tup[i+1][j+1]
        pot = [r, d]
        if i < m-1 and j < n-1 and r > 1 and d > 1:
          r2, d2 = tup[i+1][j+1]
          if r2 > 0 and d2 > 0:
            pot.append((1 + min(r-1, r2)) * (1 + min(d-1, d2)))
        print(i, end=' ')
        print(j)
        print(pot)
        area = max(area, *pot)

  
  




  return area


class TestMaximalRectangle(unittest.TestCase):
  # def test_0_length(self):
  #   self.assertEqual(maximal_rectangle([
  #     [],
  #     [],
  #     ]), 0)

  #   self.assertEqual(maximal_rectangle([
  #     [],
  #     ]), 0)

  # def test_all_0(self):
  #   self.assertEqual(maximal_rectangle([
  #     ['0','0','0','0',],
  #     ['0','0','0','0',],
  #     ]), 0)

  # def test_all_1(self):
  #   self.assertEqual(maximal_rectangle([
  #     ['1','1','1','1',],
  #     ['1','1','1','1',],
  #     ]), 8)    

  # def test_1by1(self):
  #   self.assertEqual(maximal_rectangle([
  #     ['1','0','1','0','0','1',],
  #     ['0','1','1','1','0','1',],
  #     ['0','1','1','1','1','1',],
  #     ['0','0','1','1','1','1',],
  #     ['1','0','1','0','0','1',]
  #     ]), 8)

  # def test_1byn(self):
  #   self.assertEqual(maximal_rectangle([
  #     ['1','1','1','1','1','1',],
  #     ['0','1','1','0','0','1',],
  #     ]), 6)


  # def test_nby1(self):
  #   self.assertEqual(maximal_rectangle([
  #     ['0','1',],
  #     ['1','1',],
  #     ['1','0',],
  #     ['1','0',],
  #     ['0','0',]
  #     ]), 3)

  # def test_2by2(self):
  #   self.assertEqual(maximal_rectangle([
  #     ['1','0',],
  #     ['1','1',],
  #     ]), 2)

  # def test_custom(self):
  #   self.assertEqual(maximal_rectangle([
  #     ['1','0','1','0','0','1',],
  #     ['0','1','1','1','0','1',],
  #     ['0','1','1','1','1','1',],
  #     ['0','0','1','1','1','1',],
  #     ['1','0','1','0','0','1',]
  #     ]), 8)

  def test_pathological(self):
    # self.assertEqual(maximal_rectangle([
    #   ['1','1','1','1','1',],
    #   ['1','0','1','1','1',],
    #   ['1','1','1','1','1',],
    #   ['1','1','1','1','1',],
    #   ]), 12)

    self.assertEqual(maximal_rectangle([
      ['1','1','1','1',],
      ['1','1','1','1',],
      ['1','1','0','0',],
      ['1','1','0','0',],
      ]), 8)

  # def test_leetcode_2(self):
  #   self.assertEqual(maximal_rectangle([
  #     ["1","1","1","1","1","1","1","1"],
  #     ["1","1","1","1","1","1","1","0"],
  #     ["1","1","1","1","1","1","1","0"],
  #     ["1","1","1","1","1","0","0","0"],
  #     ["0","1","1","1","1","0","0","0"]
  #     ]), 21)

if __name__ == '__main__':
  unittest.main()