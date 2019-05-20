"""
89. Gray Code
The gray code is a binary numeral system where two successive values differ in only one bit.

Given a non-negative integer n representing the total number of bits in the code, print the sequence of gray code. A gray code sequence must begin with 0.

Example 1:

Input: 2
Output: [0,1,3,2]
Explanation:
00 - 0
01 - 1
11 - 3
10 - 2

For a given n, a gray code sequence may not be uniquely defined.
For example, [0,2,3,1] is also a valid gray code sequence.

00 - 0
10 - 2
11 - 3
01 - 1

Example 2:

Input: 0
Output: [0]
Explanation: We define the gray code sequence to begin with 0.
             A gray code sequence of n has size = 2n, which for n = 0 the size is 20 = 1.
             Therefore, for n = 0 the gray code sequence is [0].


"""

"""
Strategy: start at 0, then flip the correct bit each time
Number the bits of the answer (num) as 
  num_n-1, num_n-2, ... num_1, num_0 where num_n-1 is most significant bit and num_0 least significant bit
If num starts off at 000...000 (n bits), then we need to flip (in order):
  bit 0, then num becomes 1 (001)
  bit 1, then num becomes 3 (011)
  bit 0 -> num == 2 (010)
  bit 2 -> num == 6 (110)
Organize this into a table to find the pattern
  bit to change, num in binary, num value
  0, 000...0001, 1
  1, 000...0011, 3
  0, 000...0010, 2
  2, 000...0110, 6
  0, 000...0111, 7
  1, 000...0101, 5
  0, 000...0100, 4
  3, 000...1100, 12
  0, 000...1101, 13
  1, 000...1111, 15
  0, 000...1110, 14
  2, 000...1010, 10
  0, 000...1011, 11
  1, 000...1001, 9
  0, 000...1000, 8
  ...

This solution keeps a running next number (next_num), which starts at 0
The array bit_to_change = [0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, ...]
  is implicitly available by bit_to_change[i] == bit_to_change(i)
We change the bit using xor and left-shifting
  Recall that for any number (a), a ^ 0 = a
  Also recall we can flip a single bit (x) by x ^ 1
  So, we create a one-hot value 00..010..00 where 1 is in the place of the bit we want to flip
    by left-shifting 1 the appropriate number of times
"""
from typing import *

def bit_to_change(index):
  num_shifts = 0
  prev, curr = 1, 2
  while True:
    if index % curr == prev - 1:
      return num_shifts
    prev = curr
    curr = 2 * curr
    num_shifts += 1

def grayCode(n: int) -> List[int]:
  res = [0]
  next_num = 0
  for i in range(pow(2, n) - 1):
    next_num = next_num ^ (1 << bit_to_change(i))
    res.append(next_num)
  return res
