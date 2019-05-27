"""
3. Longest Substring Without Repeating Characters
Medium

Given a string, find the length of the longest substring without repeating characters.

Example 1:

Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3. 

Example 2:

Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:

Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
             Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

"""
from typing import *

def lengthOfLongestSubstring(s: str) -> int:
  # sliding window solution
  # current substr is s[start:end] (end is not inclusive)
  start = end = 0

  # answer and current substring length
  ans = substr_len = 0

  # set of chars in current substr
  seen = set()

  while end < len(s):
    if s[end] not in seen:
      seen.add(s[end])
      end += 1
      substr_len += 1
    else:
      while start < end:
        if s[start] != s[end]:
          seen.remove(s[start])
          start += 1
          substr_len -= 1
        else:
          start += 1
          break
      end += 1

    ans = max(ans, substr_len)

    # print('Current substr: ' + s[start:end])
    # print('Current length: ' + str(end - start))
    # print('Max length: ' + str(ans))
    # print()

  return ans

