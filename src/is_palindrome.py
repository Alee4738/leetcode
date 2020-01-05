"""
9. Palindrome Number
Easy

Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

Example 1:

Input: 121
Output: true

Example 2:

Input: -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

Example 3:

Input: 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

Follow up:

Coud you solve it without converting the integer to a string?
"""

def isPalindrome(x: int) -> bool:
  if x < 0: # no negative numbers
    return False
  elif x <= 9:  # single digits
    return True
  
  stack = []
  while x > 0:
    x, digit = divmod(x, 10)
    stack.append(digit)
  
  # print(stack)
  
  for i in range(len(stack) // 2):
    # print(stack[i], stack[-i-1])
    if stack[i] != stack[-i-1]:
      return False
  return True
  
  
  
    