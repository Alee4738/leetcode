"""
Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

Note:

The solution set must not contain duplicate triplets.

Example:

Given array nums = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]
"""
import unittest

def threeSum(nums):
  """
  :type nums: List[int]
  :rtype: List[List[int]]
  """
  indicesOf = {}
  for i in range(len(nums)):
    if indicesOf.get(nums[i]) == None:
      indicesOf[nums[i]] = [i]
    else:
      indicesOf.get(nums[i]).append(i)

  print('hello')
  print(indicesOf)

  return [[-1, 0, 1], [-1, 2, -1]]






class TestThreeSum(unittest.TestCase):
  def setify(self, l):
    return { frozenset(triplet) for triplet in l }

  def test_none(self):
    returned_result = threeSum([1, 2, 3, 4, 5])
    expected_result = [
      
    ]
    self.assertEqual(
      self.setify(returned_result), 
      self.setify(expected_result)
      )

    returned_result = threeSum([-1])
    expected_result = [
      
    ]
    self.assertEqual(
      self.setify(returned_result), 
      self.setify(expected_result)
      )

    returned_result = threeSum([])
    expected_result = [

    ]
    self.assertEqual(
      self.setify(returned_result), 
      self.setify(expected_result)
      )

    returned_result = threeSum([-1, 3, 2, 1])
    expected_result = [
      
    ]
    self.assertEqual(
      self.setify(returned_result), 
      self.setify(expected_result)
      )


  def test_single_triplet(self):
    returned_result = threeSum([-1, 0, 1])
    expected_result = [
      [-1, 0, 1],
    ]
    self.assertEqual(
      self.setify(returned_result), 
      self.setify(expected_result)
      )

    returned_result = threeSum([0, 0, 0])
    expected_result = [
      [0, 0, 0]
    ]
    self.assertEqual(
      self.setify(returned_result), 
      self.setify(expected_result)
      )

    returned_result = threeSum([-1, 2, -1])
    expected_result = [
      [-1, 2, -1]
    ]
    self.assertEqual(
      self.setify(returned_result), 
      self.setify(expected_result)
      )

    returned_result = threeSum([-1, 5, -4, 3])
    expected_result = [
      [-1, 5, -4]
    ]
    self.assertEqual(
      self.setify(returned_result), 
      self.setify(expected_result)
      )

  def test_leet(self):
    returned_result = threeSum([-1, 0, 1, 2, -1, -4])
    expected_result = [
      [-1, 0, 1],
      [-1, -1, 2]
    ]
    self.assertEqual(
      self.setify(returned_result), 
      self.setify(expected_result)
      )

if __name__ == '__main__':
  unittest.main()

