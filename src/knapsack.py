import unittest
import numpy as np
import pprint

def knapsack(items, capacity):
  """
  :type items: List[(int, int)] (weight, value)
  :type capacity: int
  :rtype: int
  """
  # Dynamic Programming: memoize by i and capacity
  dummy_value = 0
  # memo = [[ dummy_value for _ in range(capacity+1)] for _ in range(len(items))]
  memo = np.full((len(items), capacity + 1), dummy_value)

  def knapsack_from(i, free_capacity):
    if i < 0 or i >= len(items) or free_capacity < 0 or free_capacity > capacity:
      return 0
    elif memo[i][free_capacity] != dummy_value:
      return memo[i][free_capacity]
    else:
      # either take the item and get its value or don't
      weight, value = items[i]
      next_weight = free_capacity - weight
      if next_weight >= 0:
        memo[i][free_capacity] = max(knapsack_from(i+1, next_weight) + value, knapsack_from(i+1, free_capacity))
      else:
        memo[i][free_capacity] = knapsack_from(i+1, free_capacity)
      return memo[i][free_capacity]

  # for i in range(len(items)):
  #   for j in range(capacity+1):
  #     knapsack_from(i, j)

  # print()
  # print()
  result = knapsack_from(0, capacity)
  # print(memo)

  return result


class TestKnapsack(unittest.TestCase):
  # lower weight should have lower value value:weight ratio
  # higher weight should have higher value:weight ratio
  # This forces the person to switch when their capacity increases
  # [(1,0), (1,1), (1,1), (2,1), (5,6), (5,7), (9,15), (10,20)]
  def total_value(self, items):
    return sum([item[1] for item in items])

  def test_switch(self):
    self.assertEqual(knapsack(
      [(1,1), (2,1), (10,20), (1,0), (5,7), (5,6), (9,15), (1,1), ], 1),
      self.total_value([(1,1)]))  # value 1
    
    self.assertEqual(knapsack(
      [(1,1), (2,1), (10,20), (1,0), (5,7), (5,6), (9,15), (1,1), ], 3),
      self.total_value([(1,1), (1,1)])) # value 2; or [(2,1), (1,1)]
    
    self.assertEqual(knapsack(
      [(1,1), (2,1), (10,20), (1,0), (5,7), (5,6), (9,15), (1,1), ], 10),
      self.total_value([(10,20)])) # value 20

    self.assertEqual(knapsack(
      [(1,1), (2,1), (10,20), (1,0), (5,7), (5,6), (9,15), (1,1), ], 9),
      self.total_value([(9,15)])) # value 15

    self.assertEqual(knapsack(
      [(1,1), (2,1), (10,20), (1,0), (5,7), (5,6), (9,15), (1,1), ], 20),
      self.total_value([(1,1), (9,15), (10,20)])) # # value 36
      

if __name__ == '__main__':
  unittest.main()