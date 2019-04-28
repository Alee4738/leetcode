def climbStairs(self, n):
  """
  :type n: int
  :rtype: int
  """
  # A[0] is 0 steps away from top
  # A[1] is 1 step away from top, so there is 1 distinct way (1)
  # A[2] is 2 steps away from top, so there are 2 distinct ways (1+1, 2)
  # A[3] is 3 steps away, so there are 3 ways (1+1+1, 1+2, 2+1)
  # A[4] => 5 ways (1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2)
  distinctWays = [0, 1, 2, 3, 5]
  
  # fill in array as needed
  for i in range(5, n + 1):
    # num ways after taking 1-length step + num ways after taking 2-length step
    # Note they don't overlap because first step is different
    distinctWays.append(distinctWays[i-1] + distinctWays[i-2])
  
  return distinctWays[n]
  