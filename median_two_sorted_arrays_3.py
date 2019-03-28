import random
import unittest

def avg(a, b):
  return (a + b) / 2
  
def medianSorted(nums):
  s = len(nums)
  if s == 0:
    return None
  elif s % 2 == 0:
    return avg(nums[s//2], nums[s//2 + 1])
  else:
    return nums[s//2]

def findMedianSortedArrays(nums1: 'List[int]', nums2: 'List[int]') -> 'float':
  s1, s2 = len(nums1),  len(nums2)
  n = s1 + s2
  med = n // 2
  
  # Base cases
  # any 0-length arrays
  if s1 == 0:
    return medianSorted(nums2)
  elif s2 == 0:
    return medianSorted(nums1)

  # arrays don't overlap
  if nums1[-1] < nums2[0]:
    # everything in nums1 < everything in nums2
    if n % 2 == 1:  # odd, no averaging, no chance of needing both arrays
      if med < s1:  # median in the left array
        return nums1[med]
      else: # median in the right array
        return nums2[med - s1]
    else: # even, averaging, chance of needing both arrays
      if med == s1: # need to use both arrays
        return avg(nums1[med - 1], nums2[0])
      elif med < s1:
        return avg(nums1[med - 1], nums1[med])
      else:
        return avg(nums2[med - 1 - s1], nums2[med - s1])

  elif nums2[-1] < nums1[0]:
    # everything in nums2 < everything in nums1
    if n % 2 == 1:  # odd, no averaging, no chance of needing both arrays
      if med < s2:  # median in the left array
        return nums2[med]
      else: # median in the right array
        return nums1[med - s2]
    else: # even, averaging, chance of needing both arrays
      if med == s1: # need to use both arrays
        return avg(nums2[med - 1], nums1[0])
      elif med < s1:
        return avg(nums2[med - 1], nums2[med])
      else:
        return avg(nums1[med - 1 - s2], nums1[med - s2])

  else:
    # TODO
    i, j = s1 // 2, s2 // 2 # in all cases except one, i + j == med

    if s1 % 2 == 1 and s2 % 2 == 1: # i + j != med when it should
      if i < s1 - 1:
        i = i + 1
      else:
        j = j + 1

    while True:
      max_left = max(nums1[i - 1], nums2[j - 1])  # TODO: what if i or j == 0?
      min_right = min(nums1[i], nums2[j])

      if max_left <= min_right:
        if n % 2 == 1:
          return min_right
        else:
          return avg(max_left, min_right)
      else:
        # calculate shift amount (relative to i)
        if nums1[i - 1] > nums2[j]:
          shift = -1
        else:
          shift = 1
        
        i = i + shift
        j = j - shift

# Define oracles
def combine_sort(l1, l2):
  tmp = l1 + l2
  tmp.sort()
  return tmp


# Testing begins
# created sorted lists, even and odd length
e1 = [random.randint(-10, 10) for i in range(4)]
e2 = [random.randint(-10, 10) for i in range(6)]
o1 = [random.randint(-10, 10) for i in range(5)]
o2 = [random.randint(-10, 10) for i in range(7)]
e1.sort()
e2.sort()
o1.sort()
o2.sort()

class TestFindMedianSortedArrays(unittest.TestCase):
  
  def test_randoms(self):
    e1 = [random.randint(-10, 10) for i in range(4)]
    e2 = [random.randint(-10, 10) for i in range(6)]
    o1 = [random.randint(-10, 10) for i in range(5)]
    o2 = [random.randint(-10, 10) for i in range(7)]
    e1.sort()
    e2.sort()
    o1.sort()
    o2.sort()
    e1e2 = combine_sort(e1, e2)
    e1o1 = combine_sort(e1, o1)
    e1o2 = combine_sort(e1, o2)
    e2o1 = combine_sort(e2, o1)
    e2o2 = combine_sort(e2, o2)
    o1o2 = combine_sort(o1, o2)

    self.assertEqual(medianSorted(e1e2), findMedianSortedArrays(e1, e2))
    self.assertEqual(medianSorted(e1e2), findMedianSortedArrays(e2, e1))

    self.assertEqual(medianSorted(e1o1), findMedianSortedArrays(e1, o1))
    self.assertEqual(medianSorted(e1o1), findMedianSortedArrays(o1, e1))

    self.assertEqual(medianSorted(e1o2), findMedianSortedArrays(e1, o2))
    self.assertEqual(medianSorted(e1o2), findMedianSortedArrays(o2, e1))

    self.assertEqual(medianSorted(e2o1), findMedianSortedArrays(e2, o1))
    self.assertEqual(medianSorted(e2o1), findMedianSortedArrays(o1, e2))

    self.assertEqual(medianSorted(e2o2), findMedianSortedArrays(e2, o2))
    self.assertEqual(medianSorted(e2o2), findMedianSortedArrays(o2, e2))

    self.assertEqual(medianSorted(o1o2), findMedianSortedArrays(o1, o2))
    self.assertEqual(medianSorted(o1o2), findMedianSortedArrays(o2, o1))

if __name__ == '__main__':
  unittest.main()
