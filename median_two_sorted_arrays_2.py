import random

# created sorted lists, even and odd length
e1 = [random.randint(-10, 10) for i in range(4)]
e2 = [random.randint(-10, 10) for i in range(6)]
o1 = [random.randint(-10, 10) for i in range(5)]
o2 = [random.randint(-10, 10) for i in range(7)]
e1.sort()
e2.sort()
o1.sort()
o2.sort()

# Define oracles
def combine_sort(l1, l2):
  tmp = l1 + l2
  tmp.sort()
  return tmp

def median(l):
  tmp = l.copy()
  tmp.sort()
  n = len(l)
  if n % 2 == 1:
    return tmp[n//2]
  else:
    return (tmp[n//2 - 1] + tmp[n//2])/2


# 

# assign i and j



len_a, len_b = len(a), len(b)
mid_1 = len_a // 2
mid_2 = len_b // 2
n = len_a + len_b


# Condition 1
if mid_1 + mid_2 == n // 2:
  try_stack.append((mid_1, mid_2))
else:
  # case: len(a) odd and len(b) odd, so we are off by 1
  try_stack.append((mid_1 + 1, mid_2))
  try_stack.append((mid_1, mid_2 + 1))


while not try_stack:
  i, j = try_stack.pop()

  # Calculate relevant numbers
  max_left = max(a[i-1], b[j-1])
  min_right = min(a[i], b[j])

  # Condition 2
  if max_left <= min_right:
    # the two conditions hold, median must be here
    if n % 2 == 1:
      return min_right
    else:
      return (max_left + min_right) / 2  


