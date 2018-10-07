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
    valid_parens = {}  # key: start index, val: end index
    open_parens = []    # indices of open parentheses as stack

    # find substrings matching '(valid_paren)' pattern.
    # note: does not combine '()()' into a single substring,
    # so only strings like '((()))' '(())' '()' will match
    for i in range(len(s)):
        if s[i] == '(':
            open_parens.append(i)

        # combine with last seen open paren, if there is one
        elif len(open_parens) > 0:
            valid_parens[open_parens.pop()] = i

    # combine '(valid_paren)(valid_paren)' into single substring
    # optimization: only care about max length, so it's ok to overwrite valid parens
    # if we know they're shorter than others.
    # The valid parens that can extend are shorter than their extended versions.
    max_len = 0
    for start in range(len(s)):
        # extend valid paren substring as far as possible
        end = valid_parens.get(start)
        while end:
            next_end = valid_parens.get(end + 1)
            if next_end:
                valid_parens[start] = next_end
            end = next_end

        max_len = max(max_len, valid_parens.get(start, start - 1) - start + 1)

    return max_len


assert(longest_valid_parentheses('(()') == 2)
assert(longest_valid_parentheses(')()())') == 4)
assert(longest_valid_parentheses('((()(()))(()') == 8)
assert(longest_valid_parentheses(')((())(()())(()') == 10)
assert(longest_valid_parentheses(')()())()()(') == 4)

# 0 1 2 3 4 5 6 7 8 9 0 1
# '( ( ( ) ( ( ) ) ) ( ( )'

