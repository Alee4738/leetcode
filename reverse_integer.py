"""
7. Reverse Integer
Easy

Given a 32-bit signed integer, reverse digits of an integer.

Example 1:

Input: 123
Output: 321

Example 2:

Input: -123
Output: -321

Example 3:

Input: 120
Output: 21

Note:
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

"""

def reverse(x: int) -> int:     
  result = 0
  sign = 1 if x >= 0 else -1
  x = abs(x)
  num_digits = 0
  
  while True:
    x, next_digit = divmod(x, 10)
    if (x == 0 and next_digit == 0) or num_digits > 10:
      final_result = sign * result
      if -1 * pow(2, 31) <= final_result and final_result <= pow(2, 31) - 1:
        return final_result
      else:
        return 0
        
    result *= 10
    result += next_digit
    num_digits += 1
    