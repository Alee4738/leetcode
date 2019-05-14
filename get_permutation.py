"""
The set [1,2,3,...,n] contains a total of n! unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for n = 3:

    "123"
    "132"
    "213"
    "231"
    "312"
    "321"

Given n and k, return the kth permutation sequence.

Note:

    Given n will be between 1 and 9 inclusive.
    Given k will be between 1 and n! inclusive.

Example 1:

Input: n = 3, k = 3
Output: "213"

Example 2:

Input: n = 4, k = 9
Output: "2314"

"""

def getPermutation(n: int, k: int) -> str:
  # Utilizing that we have 1..n each exactly once
  # factorial[i] = i!
  fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880]
  result = []
  
  if k == fact[n]:
    return ''.join([ str(i) for i in range(n, 0, -1)])

  # the first p permutations start with 1, 
  # then the next p start with 2, and the next with 3, ... until n
  # where p is (n-1)!, so we have n bins of size (n-1)!
  # Find where k fits, and we've found the first number
  # Then move on to the second number, which splits into (n-1) bins of size (n-2)!
  to_place = list(range(n + 1))

  for bin_size in fact[n - 1::-1]:
    for j in range(1, len(to_place)):
      # print(bin_size, j, k)
      if j * bin_size >= k:
        # starts with to_place[j]
        result.append(str(to_place[j]))
        to_place.pop(j)
        k -= (j - 1) * bin_size
        # print(result)
        # print(to_place)
        # print()
        break


  return ''.join(result)



  # A generic permutation of numbers (result can start as anything)
  # Time Limit Exceeded
  # result = [ i + 1 for i in range(n)]

  # for _ in range(k - 1):
  #   # permute result
  #   for i in range(n - 2, -1, -1):
  #     # find rightmost A[i] where A[i] < A[i+1]
  #     if i == 0 or result[i] < result[i + 1]:
  #       # swap A[i] with the rightmost A[j] where A[i] < A[j]
  #       for j in range(i + 1, n):
  #         if j == n - 1 or (result[i] < result[j] and result[i] >= result[j + 1]):
  #           result[i], result[j] = result[j], result[i]
  #           break

  #       # reverse A[i+1:end]
  #       result[i + 1:] = result[-1:i:-1]
  #       break
  
  # return ''.join([ str(i) for i in result ])

