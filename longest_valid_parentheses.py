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
    memo = set()

    def valid_parentheses(start, end):
        if start == end:
            return True
        if start == end:
            return True
        if start > end:
            return False
        if end - start == 1:
            return False
        if end - start == 2 and s[start] == '(' and s[end - 1] == ')':
            return True
        if (start, end) in memo:
            return True

        for i in range(start + 1, end):
            if valid_parentheses(start, i) and s[i] == '(' and s[end - 1] == ')' \
                    and valid_parentheses(i + 1, end - 1):
                memo.add((start, i))
                memo.add((i, end))
                return True
        return False





        # if start == end:
        #     return True
        # if start > end:
        #     return False
        # if end - start == 1:
        #     return False
        # if end - start == 2 and s[start] == '(' and s[end - 1] == ')':
        #     return True
        # if (start, end) in memo:
        #     return True
        #
        # if s[start] == '(' and s[end - 1] == ')':
        #     # (valid_paren)
        #     if valid_parentheses(start + 1, end - 1):
        #         memo.add((start, end))
        #         return True
        # if s[start] == '(' and s[start + 1] == ')':
        #     # ()valid_paren
        #     if valid_parentheses(start + 2, end):
        #         memo.add((start, end))
        #         return True
        # if s[end - 2] == '(' and s[end - 1] == ')':
        #     # valid_paren()
        #     if valid_parentheses(start, end - 2):
        #         memo.add((start, end))
        #         return True
        # return False

    # fill the memo
    for i in range(len(s)):
        for j in range(i + 2, len(s) + 1):
            valid_parentheses(i, j)
    # valid_parentheses(0, len(s))

    # find max length
    max_length = 0
    for valid_paren in memo:
        length = valid_paren[1] - valid_paren[0]
        if length > max_length:
            max_length = length

    return max_length


assert(longest_valid_parentheses('(()') == 2)
assert(longest_valid_parentheses(')()())') == 4)
assert(longest_valid_parentheses('((()(()))(()') == 8)
assert(longest_valid_parentheses(')((())(()())(()') == 10)

# 0 1 2 3 4 5 6 7 8 9 0 1
# '( ( ( ) ( ( ) ) ) ( ( )'

