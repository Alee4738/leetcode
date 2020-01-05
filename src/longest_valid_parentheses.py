"""
Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

Example 1:

Input: "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()"

Example 2:

Input: ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()"
"""


def longest_valid_parentheses(s):
    """
    :type s: str
    :rtype: int
    """
    if not s:
        return 0

    stack = []
    dp = [0] * len(s)

    for i in range(len(s)):
        if s[i] == "(":
            stack.append(i)
            dp[i] = 0
        else:  # we have a closing brace
            if len(stack) == 0:
                dp[i] = 0
            else:
                pos = stack.pop()
                dp[i] = dp[pos - 1] + i - pos + 1
    return max(dp)

    # Understanding the key line: dp[i] = dp[pos - 1] + i - pos + 1
    # "nested paren substring" means a parentheses substring of the form '(())' or '((()))' but not '()()'.
    # pos represents the starting index of the current nested paren substring
    # i - pos + 1 is the length of the nested valid paren substring
    # dp[pos - 1] is the length of the previous valid paren substring
    # (not necessarily only nested) that ends at s[pos - 1]


assert(longest_valid_parentheses('(()') == 2)
assert(longest_valid_parentheses(')()())') == 4)
assert(longest_valid_parentheses('((()(()))(()') == 8)
assert(longest_valid_parentheses(')((())(()())(()') == 10)
assert(longest_valid_parentheses(')()())()()(') == 4)
assert(longest_valid_parentheses('()((())))()') == 8)
assert(longest_valid_parentheses('))()(())((())))(((())))') == 12)

